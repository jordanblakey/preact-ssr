import { h, Component } from 'preact'
import { Router, route } from 'preact-router'
import AsyncRoute from 'preact-async-route'

import Header from './header'

// Code-splitting is automated for routes
import Home from '../routes/home'
import Profile from '../routes/profile'
import Default from '../routes/default'
import Redirect from '../routes/redirect'

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */

  state = {
    isAuthed: false
  }

  isAuthenticated = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(resolve, 100, this.state.isAuthed)
    })
    return promise
  }

  handleRoute = e => {
    if (typeof e === 'undefined') {
      const e = {}
      e.url = location.pathname
      this.check(e)
    } else {
      this.check(e)
    }
  }

  check = async e => {
    switch (e.url) {
      case '/test/jordan':
        const isAuthed = await this.isAuthenticated()
        if (!isAuthed) {
          alert('not authed')
          route('/', true)
        }
        break
      default:
        this.currentUrl = e.url
        break
    }
  }

  componentDidUpdate = () => {
    this.handleRoute()
  }

  render() {
    return (
      <div id="app">
        <button
          style="position: absolute; z-index: 100"
          onClick={() => {
            this.setState({ isAuthed: !this.state.isAuthed })
          }}
        >
          Auth Me
        </button>
        <button
          style="position: absolute; z-index: 100; left: 100px;"
          onClick={() => {
            route('/triggered-route')
          }}
        >
          Trigger Route
        </button>
        <Header />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Profile path="/profile/" user="me" />
          <Profile path="/profile/:user" />
          <Default default text="this is a demo route that always matches" />
          <AsyncRoute
            path="/test/:name"
            getComponent={() =>
              import('../routes/test').then(module => module.default)
            }
            loading={() => <div>loading...</div>}
            name="anon"
          />
          <Redirect path="/redirect" to="/test/redirectedguy" />
        </Router>
      </div>
    )
  }
}

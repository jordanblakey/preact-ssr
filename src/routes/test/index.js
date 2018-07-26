import { h, Component } from 'preact'
import style from './style'

export default class Test extends Component {
  state = {
    time: Date.now(),
    count: 10
  }

  updateTime = () => {
    this.setState({ time: Date.now() })
  }
  render({ name }) {
    return (
      <div class={style.test}>
        <h1>Hello, {name}</h1>
        <p>Test</p>
      </div>
    )
  }
}

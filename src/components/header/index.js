import { h } from 'preact'
import { Link, Match } from 'preact-router/match'
import style from './style'

const Header = () => (
  <header class={style.header}>
    <h1>Preact App</h1>
    <Match path="/">
      {({ matches, path, url }) => (
        <p>
          <span>matches: {matches}</span>
          <span>path: {path}</span>
          <span>url: {url}</span>
        </p>
      )}
    </Match>
    <p>
      <span>
        <Match path="/">
          {({ matches }) => matches && <span>You are Home!</span>}
        </Match>
      </span>
    </p>
    <nav>
      <Link activeClassName={style.active} href="/">
        Home
      </Link>
      <Link activeClassName={style.active} href="/profile">
        Me
      </Link>
      <Link activeClassName={style.active} href="/profile/john">
        John
      </Link>
      <Link activeClassName={style.active} href="/test/jordan">
        Test: Jordan
      </Link>
      <a href="https://google.com" native>
        Google
      </a>
    </nav>
  </header>
)

export default Header

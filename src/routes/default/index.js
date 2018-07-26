import { h, Component } from 'preact'
import style from './style'

export default class Default extends Component {
  render({ text }) {
    return (
      <div class={style.default}>
        <h1>Hello, {text}</h1>
      </div>
    )
  }
}

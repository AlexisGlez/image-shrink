/**
 * React renderer.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import '@public/style.css'

ReactDOM.render(
  <div className="app">
    <h4>Welcome to React, Electron and Typescript</h4>
    <p>Hello</p>
  </div>,
  document.getElementById('app'),
)

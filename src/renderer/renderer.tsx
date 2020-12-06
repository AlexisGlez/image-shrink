import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Home } from './screens/Home'

import '@public/materialize.min.js'

import '@public/style.css'
import '@public/all.min.css'
import '@public/materialize.min.css'

ReactDOM.render(
  <div className="app">
    <Home />
  </div>,
  document.getElementById('app'),
)

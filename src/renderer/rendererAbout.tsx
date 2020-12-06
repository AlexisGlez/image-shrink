import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { About } from './screens/About'

import '@public/materialize.min.js'

import '@public/all.min.css'
import '@public/materialize.min.css'

ReactDOM.render(
  <div className="about">
    <About />
  </div>,
  document.getElementById('about'),
)

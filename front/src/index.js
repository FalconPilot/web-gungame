import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import App from './components/App'

import './stylesheets/base/index.css'
import './stylesheets/base/falcon.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

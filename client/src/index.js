import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import App from './components/app/app'


import './templates/float-admin-v1.1/light-version/plugins/bootstrap/css/bootstrap.min.css'
import './templates/float-admin-v1.1/light-version/plugins/simple-line-icons/simple-line-icons.css'
import './templates/float-admin-v1.1/light-version/plugins/font-awesome/css/font-awesome.min.css'
import './templates/float-admin-v1.1/light-version/plugins/pace/pace.css'
import './templates/float-admin-v1.1/light-version/plugins/jasny-bootstrap/css/jasny-bootstrap.min.css'
import './templates/float-admin-v1.1/light-version/plugins/nano-scroll/nanoscroller.css'
import './templates/float-admin-v1.1/light-version/plugins/iCheck/blue.css'
import './templates/float-admin-v1.1/light-version/plugins/datatables/jquery.dataTables.min.css'
import './templates/float-admin-v1.1/light-version/plugins/datatables/responsive.bootstrap.min.css'
import './templates/float-admin-v1.1/light-version/css/style.css'
import './index.css'

// import './templates/float-admin-v1.1/light-version/plugins/jquery/dist/jquery.min.js'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
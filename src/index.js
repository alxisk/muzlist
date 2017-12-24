import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import App from './components/App'
import './style.styl'
import configureApi from './utils/soundCloudApi'

configureApi()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

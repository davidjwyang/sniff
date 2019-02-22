import React from 'react'
import ReactDOM from 'react-dom'

import AppRouter from './components/app-router.jsx'
import ReactReduxApp from './components/redux/react_redux_app.jsx'

const app = document.getElementById("app")

ReactDOM.render(<ReactReduxApp App={AppRouter}/>, app)

if (module.hot) {
	module.hot.accept()
}

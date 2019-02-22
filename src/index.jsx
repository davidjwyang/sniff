import React from 'react'
import ReactDOM from 'react-dom'

import AppRouter from './components/app-router.jsx'
import react_redux_app from './components/redux/react_redux_app.jsx'

const app = document.getElementById("app")


ReactDOM.render( react_redux_app(AppRouter), app)

if (module.hot) {
	module.hot.accept()
}

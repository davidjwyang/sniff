import React from 'react'
import { Provider } from 'react-redux'

import storeFactory from './store-factory'
import rootReducer from './reducers.js'

let store = storeFactory(rootReducer)

const ReactReduxApp = ({App}) => {
	return (
		<Provider store={store}>
			<App/>
		</Provider>
	)
}

export default ReactReduxApp
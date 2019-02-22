import { Provider } from 'react-redux'

import storeFactory from './store-factory'
import rootReducer from './reducers.js'

let store = storeFactory(rootReducer)

export default (component) => (props) => (
	<Provider store={store}>
		<component/>
	</Provider>
)
	
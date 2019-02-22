import { createStore, applyMiddleware } from 'redux'
import Thunk from 'redux-thunk'

export default storeFactory = (rootReducer) => {
	let store = createStore(rootReducer, applyMiddleware(Thunk))
	store.subscribe( (state, action) => console.log(`${action}`))
	return store
}
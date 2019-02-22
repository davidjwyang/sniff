import { createStore, applyMiddleware } from 'redux'
import Thunk from 'redux-thunk'

let storeFactory = (rootReducer) => {
	let store = createStore(rootReducer, applyMiddleware(Thunk))
	store.subscribe( () => console.log(store.getState()))
	return store
}

export default storeFactory
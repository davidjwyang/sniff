import { combineReducers } from 'react-redux'

import C from './actions/constants'

const user = (state = {}, action) => {
	switch (action.type) {
		case C.SessionUser.loading:
			return { ...state, loading : action.loading }
		case C.SessionUser.update:
			return { ...action.user, loading : action.loading }
		case C.SessionUser.failure:
			return { ...state, loading : action.loading, err : action.err }
		default:
			return state
	}
}

const userData = (state = {}, action) => {
	switch (action.type) {
		case C.UserData.loading:
			return { ...state, loading : action.loading }
		// action.userData is not the same reference as as state.   
		case C.UserData.update: 
			action.userData.loading = action.loading
			return action.userData
		case C.UserData.failure:
			return { ...state, err : actions.err }
		default: 
			return state
	}
} 



export default combineReducers({ user, userData })

import C from './constants'

import { UserData } from './user-data'

//Actions (for authentification and login)
export const SessionUser = {
	loading : () => ({
		type : C.SessionUser.loading,
		loading : true
	}),

	update : (user) => ({
		type : C.SessionUser.update,
		loading : false, 
		user
	}),

	failure : (err) => ({
		type : C.SessionUser.failure,
		loading : false,
		err
	})
} 

SessionUser.fetch =	() => {
		return (dispatch, getState) => {
			dispatch(SessionUser.loading())
			fetch('/app/auth/sessionUser').then(res => {
				return res.json()
			}).then(user => {
				dispatch(SessionUser.update(user))
				// Fetch UserData after we get user from server. 
				if ( user.signedIn && !user.new )
					dispatch(UserData.fetch(data.email))
			}).catch(err => {
				dispatch(SessionUser.failure(err))
			})
		}	
	}


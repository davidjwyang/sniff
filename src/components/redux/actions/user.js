import C from './constants'

import { UserData } from './user-data'

//Actions (for authentification and login)
export const SessionUser = {
	fetch : () => {
		return (dispatch, getState) => {
			dispatch(this.loading())
			fetch('app/auth/sessionUser').then(res => {
				return res.json()
			}).then(user => {
				dispatch(this.update(user))
				// Fetch UserData after we get user from server. 
				if ( user.signedIn && !user.new )
					dispatch(this.UserData.fetch(data.email))
			}).catch(err => {
				dispatch(this.failure(err))
			})
		}	
	},

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


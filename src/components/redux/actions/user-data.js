import C from './constants'

//All User Data
export const UserData = {
	fetch : (email) => {
		return (dispatch, getState) => {
			dispatch(this.loading())
			fetch(`/app/api/users/email/${email}`).then(res => {
				return res.json()
			}).then(userData => {
				dispatch(this.update(userData))
			}).catch(err => {
				dispatch(this.failure(err))
			})
		}	
	},

	post : (userData) => {
		return (dispatch, getState) => {
			dispatch(this.loading())
			fetch(`/app/api/userDatas/`, {
				method : 'POST',
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify(userData)
			}).then(res => {
				return res.json()
			}).then(userData => {
				dispatch(this.update(userData))
			}).catch(err => {
				dispatch(this.failure(err))
			})
		}
	},

	loading : () => ({
		type : C.UserData.Loading,
		loading : true
	}),

	update : (userData) => ({
		type : C.UserData.update,
		loading : false, 
		userData
	}),

	failure : (err) => ({
		type : C.UserData.failure,
		loading : false,
		err
	})
} 

//User Descrip 
export const UserDescrip = {
	post : (descrip) => {
		return (dispatch, getState) => {
			let newUserData = deepCopyUserData(getState().userData)
			dispatch(UserData.loading())
			fetch(`/app/api/descrips/${newUserData.userId}`, {
				method : 'POST',
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify(descrip)
			}).then(res => {
				return res.json()
			}).then(descrip => {
				newUserData.descrip = descrip 
				dispatch(UserData.update(newUserData))
			}).catch(err => {
				dispatch(UserData.failure(err))
			}) 
		}
	} 
}


//User Wags
export const UserWags ={
	post : (wag) => {
		return (dispatch, getState) => {
			let newUserData = deepCopyUserData(getState().userData)
			dispatch(UserData.loading())
			fetch(`/app/api/wags/${newUserData.userId}`, {
				method : 'POST',
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify({ userId : wag })
			}).then(res => {
				return res.json()
			}).then(wag => {
				newUserData.wags.from.push(wag)
				UserData.update(newUserData)
			}).catch(err => {
				dispatch(UserData.failure(err))
			})
		} 
	}
}

function deepCopyUserData(userData) {
	let descrip = { ...UserData.descrip }
	let wags = { to : { ...userData.wags.to }, from : { ...userData.wags.from } }
	return { ...userData, descrip, wags }
}



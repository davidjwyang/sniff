
function createFetchConstants(name) {
	name = name.toUpperCase()
	return 
	({
		fetch : `FETCH ${name}`,
		loading : `LOADING ${name}`,
		update : `UPDATE ${name}`,
		failure : `FAILURE ${name}`
	})
}

const constants = {
	SessionUser : { 
		...createFetchConstants('SESSION USER')
	},

	UserData : {
		...createFetchConstants('USER DATA')
	},

	PostDescrip : 'POST DESCRIP',

	PostWags : 'POST WAGS'
}

export default constants
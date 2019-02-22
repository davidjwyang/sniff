import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import { SessionUser } from './redux/actions/user'

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = { googleApiLoaded : false, loggedIn : false }

		this.signIn = this.signIn.bind(this)
	}

	loadGoogleApi() {   
		window.gapi.load('auth2', () => {
			if (!window.gapi.auth2.getAuthInstance()) {
				if (!window.config || !window.config.googleClientId) {
					console.log('Missing Google Client ID or config file'
						+ '/static/config.js')
				} else {
					window.gapi.auth2.init({ client_id: window.config.googleClientId})
				}
			} 
		})
	} 

	signIn() {
		const auth2 = window.gapi.auth2.getAuthInstance()	
		
		auth2.signIn().then(googleUser => {
			fetch('/app/auth/signin', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id_token: googleUser.getAuthResponse().
					id_token 
				})
			}).then(response => {
				if (response.ok) {
					response.json().then(user => {
						//We should also update userData at the same time. 
						this.props.onSignin(user)
					})
				} else {
					response.json().then(error => {
						console.log(`App login failed: ${error}`)
					})
				}
			}).catch(err => {
				console.log(`Error posting login to app: ${err}`)
			})
			// The catch block above will catch errors in auth2.signIn, but will not handle the errors
			// of the handler that is called once the promise is resolved. 
		}, error => {
			console.log(`Error authenticating with Google: ${error}`)
		})
	}

	componentDidMount() {
		this.loadGoogleApi()
	}

	render() {
		return(
			<div>
				{/*Create block level buttons—those that span the full width 
				of a parent— by adding the block prop. */}
				<Button block onClick={this.signIn}>Sign In</Button>
			</div>	
		)
	}
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
	onSignin : (user) => dispatch(SessionUser.update(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login) 
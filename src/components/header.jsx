import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import SessionUser from './redux/actions/user.js'

const Header = (props) => {
	function signOut() {
		const auth2 = window.gapi.auth2.getAuthInstance()
		fetch('/app/auth/signout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }, 
		}).then(response => {
			if (response.ok) {
				auth2.signOut().then(() => {
					console.log('Successfully signed out.')
					props.onSignout()
				})
			}
		})
	}

	return (
		<div>
			<Button block onClick={signOut}>Sign Out</Button>
			<NavLink to={`${props.match.path}/search`}>Search</NavLink> | 
			<NavLink to={`${props.match.path}/account`}>Account</NavLink> |
		</div>
	)
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
	onLogOut : () => dispatch( SessionUser.update({ signedIn : false }) )
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
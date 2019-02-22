import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import App from './App.jsx'
import Login from './login.jsx'

import { SessionUser } from './redux/actions/user'
import { UserData } from './redux/actions/user-data'

class AppRouter extends React.Component {
	constructor(props) {
		super(props)

		this.redirectPath - this.redirectPath.bind(this)
	}

	redirectPath() {
		console.log(this.props.user)
		if (this.props.user.signedIn == false) {
			return <Redirect to="/login" />
		} else {
			return <Redirect to="/app" />
		}
	}	

	componentDidMount() {
		this.props.fetchSessionUser()
	}

	render() {
		if (this.props.user == undefined || 
			this.props.user.loading == undefined ||
			this.props.user.loading) {
			
			return <div> {'LOADING USER'} </div>
		} 
		return (
			<BrowserRouter>	
				<div>		
					{this.redirectPath()}
					<Switch>
						<Route exact path="/login" render={(props) => (
							<Login {...props} />
						)}/>
						<Route path="/app" render={(props) => (
							<App {...props}/>
						)}/>
					</Switch>
				</div>
			</BrowserRouter>
		)
	}
}

const mapStateToProps = state => ({
	user : state.user
})

const mapDispatchToProps = dispatch => ({
	fetchSessionUser : () => dispatch(SessionUser.fetch())
})

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)

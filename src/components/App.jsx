import React from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import {Route, Redirect, Switch} from 'react-router-dom'
import { connect } from 'react-redux'

import Header from './header.jsx'

import CreateAccount from './create-account.jsx'
import Search from './search.jsx' 
import Account from './account.jsx'
import EditDescrip from './edit-descrip.jsx'
import Profile from './profile.jsx'

import { UserData } from './redux/actions/user-data.js'

class App extends React.Component {
	constructor(props) {
		super(props)

		this.loadUserData = this.loadUserData.bind(this)
		this.redirectPath = this.redirectPath.bind(this)
	}

	redirectPath() {
		if (this.props.isNewUser) {
			return <Redirect from='/' to='/app/account'/>

		} else {
			return <Redirect to='/app/create-account'/>
		}
	}

	componentDidMount() {
			
	}

	render() {
		return(
			<div>	
				<div className="header">
					<Header onSignout={this.props.onSignout}
						match={this.props.match}
					/>
				</div>			
				<div>	
					{this.redirectPath()} 
					<Switch>
						{/* this.props.match.path already includes initial '/' */}
						<Route path={`${this.props.match.path}/create-account`} render={ () => <CreateAccount/> }/>
						<Route path={`${this.props.match.path}/search`} render={ () => <Search/> }/>
						<Route path={`${this.props.match.path}/account`} render={ () => <Account/> }/>
						<Route path={`${this.props.match.path}/edit-profile`} render={ () => <EditDescrip/> }/>
						<Route path={`${this.props.match.path}/profile/:userId`} render={(props) => <Profile {...props}/> }/>
					</Switch>
				</div>	
				
				<div className="footer">
			 		Placeholder for footer.
				</div>	
			</div>	
		)
	}	
}

const mapStateToProps = state => ({
	isNewUser : state.user.new
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Login) 
import React from 'react'
import Descrip from './descrip.jsx'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Row, Col, Button } from 'react-bootstrap'	

import UserWags from './redux/actions/user-data'

class Profile extends React.Component {  
	constructor(props) {
		super(props)
		
		this.profUserId = this.props.match.params.userId
		this.state = { profUserData : null}
		this.wagged = false
		this.isUser = false

		this.loadProfile = this.loadProfile.bind(this)
		this.onWag = this.onWag.bind(this)	
	}

	componentDidMount() {
		this.loadProfile()
	}

	loadProfile() {
		fetch(`/app/api/users/userId/${this.profUserId}`).then(res => {
			return res.json()
		}).then( data => {
			//Check if the profile is already wagged to. 
			if (this.props.userData.wags.to.includes(this.profUserId)) 
				this.wagged = true
			if (this.props.userData.userId == this.profUserId)
				this.isUser = true
			this.setState({ profUserData : data })
		}).catch (err => {
			console.log(err)
		})
	}


	render() {
		if (this.state.profUserData == null) {
			return <h1> LOADING PROFILE... </h1>
		}
		return (
			<div>
				<Button type='Button' onClick={this.props.onWag} disabled={this.wagged || this.isUser}>Wag</Button>
				<Descrip human={this.state.profUserData.descrip.human} 
					dog={this.state.profUserData.descrip.dog}
				/> 
			</div>
		)	
	}
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
	onWag : wag => dispatch(UserWags.post(wag))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile) 
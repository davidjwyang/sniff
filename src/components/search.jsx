import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import {Grid, Col, Row} from 'react-bootstrap'
import { connect } from 'react-redux'

class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = { users: null }
		this.loadUsers = this.loadUsers.bind(this)
	}

	componentDidMount() {
		this.loadUsers()
	}

	loadUsers() {
		fetch(`/app/api/users/search/${this.props.userData.userId}`).then(res => {
			return res.json()
		}).then( users => {
			this.setState( {users: users.records} )
		}).catch( err => {
			console.log(err)
		})
	}

	render() {
		if (this.state.users == null) {
			return <h1> LOADING... </h1>
		} 

		return (
			<div>
			<Grid>
			<Col>
				<UserList users={this.state.users}/>
			</Col>
			</Grid>			
			</div>
		)
	}
}

const UserList = (props) => {
	const ConvertArray2Rows = (list) => {
		let rows = list.map(entry => {
			return <Descrip entry={entry}/>
		})
		return <div> {rows} </div>
	}
	return(
		ConvertArray2Rows(props.users)		
	)
}

const Descrip = (props) => {
	let user = props.entry
	return(
		<Row>
			<NavLink to={`/app/profile/${user.userId}`}> 
				<span> {user['descrip']['human']['first name']} | {user.descrip.dog.name} </span> 
			</NavLink>
		</Row>
	)
}

const mapStateToProps = state => ({
	wagsFrom : state.userData.wags.from 
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Search) 

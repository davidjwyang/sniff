import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CreateEntries, FieldGroups, FieldGroup, extractValues, createObject } from './help/form-helpers.jsx'
import { Button, Form } from 'react-bootstrap'

import UserDescrip from './redux/actions/user-data'

class CreateAccount extends React.Component {
	constructor(props) {
		super(props)

		this.humanFieldIds = ['first name', 'last name', 'race', 'ethnicity', 'date of birth', 'height', 
			'occupation', 'hobbies', 'personality', 'instagram']
		this.humanEntries = CreateEntries(this.humanFieldIds) 
		this.requiredHumanFields = ['first name', 'last name', 'age']
		
		this.dogFieldIds = ['name', 'breed', 'size', 'date of birth', 'hobbies', 'personality']
		this.dogEntries = CreateEntries(this.dogFieldIds)
		this.requiredDogFields = ['name']

		this.state = { page : this.postUserIdPage, Form1ErrorMsg : '' }

		this.userData = { email : this.props.email }

		this.onSubmitUserId = this.onSubmitUserId.bind(this)
		this.postUserIdPage = this.postUserIdPage.bind(this)
		this.onSubmitDescrip = this.onSubmitDescrip.bind(this)
		this.postDescripPage = this.postDescripPage.bind(this)	
	}	

	onSubmitUserIdForm(e) {
		e.preventDefault()
		let userId = e.target.userId.value
		fetch(`/app/api/users/userId/${userId}`).then(res => {
			return res.json()
		}).then(data => {
			if (data) {
				this.setState({ Form1ErrorMsg : 'userId is already taken' })				
			} else {
				this.userData.userId = userId
				this.setState({ page : this.postDescripPage })	
			}
		})
	}	

	postUserIdPage() {
		return (
			<div>
				<Form onSubmit={this.onSubmitUserIdForm}>
					<FieldGroup
						id={'userId'}
						type='text'
						label={'User ID'}
						placeholder={'User ID'}
						required
					/>	
					<div> {  this.state.Form1ErrorMsg } </div>
					<Button type='submit'>Submit</Button>
				</Form>	
			</div>
		)
	} 

	onSubmitDescripForm(e) {
		e.preventDefault()
		let values = extractValues(e.target.elements)
		let descrip = {}
		descrip.human = createObject( this.humanFieldIds, values.slice(0, this.humanFieldIds.length) )
		descrip.dog = createObject( this.dogFieldIds, values.slice(this.humanFieldIds.length) )
		this.userData.descrip = descrip

		this.props.onSubmitUserData(this.userData)
	}

	postDescripPage() {
		return (
			<div>
				<Form onSubmit={this.onSubmitDescripForm}>
					<h1>Human</h1>
					<FieldGroups entries={this.humanEntries}
						requiredFields={this.requiredHumanFields}
					/>	
					<h1>Dog</h1>
					<FieldGroups entries={this.dogEntries}
						requiredFields={this.requiredDogFields}
					/>	
					<Button type='submit'>Submit</Button>
				</Form>
			</div>
		)
	}

	render() {
		return this.state.page()
	}
}

const mapStateToProps = state => ({
	email : state.user.email
})

const mapDispatchToProps = dispatch => ({
	onSubmitUserData : userData => dispatch(UserData.post(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount) 


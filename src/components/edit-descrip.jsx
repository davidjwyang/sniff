import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CreateEntries, FieldGroups, FieldGroup, extractValues, createObject } from './help/form-helpers.jsx'
import { Button, Form } from 'react-bootstrap'

import UserDescrip from './redux/actions/user-data'

class EditDescrip extends React.Component {
	constructor(props) {
		super(props)

		this.humanFieldIds = ['first name', 'last name', 'race', 'ethnicity', 'date of birth', 'height', 
			'occupation', 'hobbies', 'personality', 'instagram']
		this.humanEntries = CreateEntries(this.humanFieldIds, Object.values(this.props.userData.Descrip.human)) 
		this.requiredHumanFields = ['first name', 'last name', 'age']
		
		this.dogFieldIds = ['name', 'breed', 'size', 'date of birth', 'hobbies', 'personality']
		this.dogEntries = CreateEntries(this.dogFieldIds, Object.values(this.props.userData.Descrip.dog))
		this.requiredDogFields = ['name']

		this.onSubmitDEscrip = this.onSubmitDescrip.bind(this)
	}

	onSubmitDescripForm(e) {
		e.preventDefault()
		let values = extractValues(e.target.elements)
		let descrip = {}
		descrip.human = createObject( this.humanFieldIds, values.slice(0, this.humanFieldIds.length) )
		descrip.dog = createObject( this.dogFieldIds, values.slice(this.humanFieldIds.length) )

		this.props.onSubmitUserDescrip(descrip)
	}

	render() {
		return (
			<div>
				<Form onSubmit={this.onSubmitDescripForm}>
					<h1>Human</h1>
					<FieldGroups ids={this.humanEntries}/>	
					<h1>Dog</h1>
					<FieldGroups ids={this.dogEntries}/>	
					<Button type='submit'>Submit</Button>
				</Form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	userData : state.userData 
})

const mapDispatchToProps = dispatch => ({
	onSubmitUserDescrip : descrip => dispatch(UserDescrip.post(descrip))
})


export default connect(mapStateToProps, mapDispatchToProps)(EditDescrip)
import React from 'react'
import { Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

const CreateEntries = (ids, values) => {
	if (values == null) {
		values = Array(ids.length)
		values.fill('')
	}
	let entries = Array(ids.length)
	for (let i=0; i<ids.length; i++) {
		entries[i] = { id : ids[i], value : values[i] }
	}
	return entries
}


const FieldGroups = ({ entries, requiredFields }) => {
	let fields = entries.map( ({ id, value }) => {
		let idCap = id.charAt(0).toUpperCase() + id.slice(1)
		let required 
		if (requiredFields.includes(id)) required = true 
		else required = false  
		return(
			<FieldGroup
				id={id}
				type='text'
				label={idCap}
				placeholder={idCap}
				defaultValue={value}
				required={required}
			/>		
		)	
	})
	return fields
}

const FieldGroup = ({ id, label, help, ...props }) => {
	return(
		<FormGroup controlId={id}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...props} />
		</FormGroup>
	)
}

// Extract the values form the e.target array 
const extractValues = (elements) => {
	let values = []
	for (let i = 0; i<elements.length; i++) {
		values.push(elements[i].value)
	}
	return values
}

// Creates object that holds input from form. 
const createObject = (keys, values) => {
	let obj = {}
	for (let i=0; i<keys.length; i++) {
		obj[keys[i]] = values[i]
	}
	return obj
}

export { CreateEntries, FieldGroups, FieldGroup, extractValues, createObject }

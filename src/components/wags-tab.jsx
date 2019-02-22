import React from 'react'
import PropTypes from 'prop-types' 
import { Grid, Row, Col } from 'react-bootstrap'

const WagsTab = ({ wags }) => {
	return (
		<ul>
			<ListItems items={wags.from}/> 
		</ul>
	)
}

const ListItems = ({ items }) => {
	let lis = items.map(item => <li> {item} </li>)
	return lis 
}

WagsTab.propTypes = {
	from : PropTypes.array.isRequired,
	too : PropTypes.array.isRequired
}

export default WagsTab 
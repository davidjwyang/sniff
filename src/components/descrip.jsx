import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

const Descrip = (props) => {

	function ConvertObj2ul(obj) {
		let ul = Object.keys(obj).map( key => {
			if (key == "instagram") {
				return <li>  {key}: <a href={ obj[key] }> { obj[key] } </a> </li>
			}
			else 
				return <li> {key}: { obj[key] } </li>
		})

		return <ul> {ul} </ul>
	}

	return (
		<Grid className = "descrip">
			<Row>
				<Col className = "human-descrip" >
					{ConvertObj2ul(props.human)}
				</Col>
				<Col className = "dog-descrip">
					{ConvertObj2ul(props.dog)}
				</Col>
			</Row>
		</Grid>
	)
}

export default Descrip


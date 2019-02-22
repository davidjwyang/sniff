import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Descrip from './descrip.jsx'
import WagsTab from './wags-tab.jsx'

class Account extends React.Component {
	constructor(props) {
		super(props)

		this.descrip = this.props.userData.descrip
		this.wags = this.props.userData.wags
	}


	componentDidMount() {
	}

	render() {
		return (
			<div>
				<Descrip human={this.descrip.human} dog={this.descrip.dog}/> 
				<h3> Wags </h3>
				<WagsTab wags={this.wags}/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Account) 



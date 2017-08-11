import React, { Component, PropTypes } from 'react';
import * as _ from 'underscore';


export default class Generate extends Component {
	constructor (props) {
		super(props);
	}

	componentDidMount() {
	}

	componentWillMount() {
	}

	componentDidUpdate() {
	}

	componentWillUnmount() {
	}

	onChangeQuery(event)
	{
		this.setState({
			query: event.target.value
		});
	}

	render() {
		return 
		(<div>
			{this.props.params.artist}
		</div>)
	}
}

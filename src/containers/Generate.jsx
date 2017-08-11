import React, { Component, PropTypes } from 'react';
import * as _ from 'underscore';
import $ from 'jquery'

var RAPGENIUS_ACCESS_TOKEN = "WJCDe9kbzfhPQnwzBXQcMw8JExlRMefEWN19V0elsOMNhriiJodaO9Ld6hQ2TZn9";
var ARTIST_SEARCH_ENDPOINT = decodeURIComponent('https%3A%2F%2Fapi.genius.com%2Fartists');
var DATA;

export default class Generate extends Component {
	constructor (props) {
		super(props);
		this.state = {
			data: ""
		}
	}

	componentDidMount() {
		var that = this;
		getData(this.props.params.artist, (data) => {
			that.setState({
				data: data.response.artist
			});
		});
	}

	componentWillMount() {
	}

	componentDidUpdate() {
	}

	componentWillUnmount() {
	}

	render() {
		return (<div></div>);
	}
}

var getData = (id, callback) => {
	var that = this;
	$.ajax({
		url: ARTIST_SEARCH_ENDPOINT+"/"+id,
		type: "GET", 
		dataType: 'json',
		data: {
			"access_token": RAPGENIUS_ACCESS_TOKEN,
		},
		success: (data) => {
			callback(data);
		}
	});
}



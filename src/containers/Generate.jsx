import React, { Component, PropTypes } from 'react';
import * as _ from 'underscore';
import $ from 'jquery'

var RAPGENIUS_ACCESS_TOKEN = "WJCDe9kbzfhPQnwzBXQcMw8JExlRMefEWN19V0elsOMNhriiJodaO9Ld6hQ2TZn9";
var ARTIST_SEARCH_ENDPOINT = decodeURIComponent('https%3A%2F%2Fapi.genius.com%2Fartists');


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

	render() {
		var artist = getData(this.props.params.artist);
		return (<div>{this.props.params.artist}</div>)
	}
}

var getData = (id) => {
	var that = this;
	$.ajax({
		url: ARTIST_SEARCH_ENDPOINT,
		type: "GET", 
		dataType: 'json',
		data: {
			"access_token": RAPGENIUS_ACCESS_TOKEN,
			"id": id
		},
		success: (data) => {
			console.log(data);
		}
	});
}



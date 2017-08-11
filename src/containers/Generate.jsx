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
		var artist = this.state.data;
		console.log(artist);
		return (
			<div className="generate_container">
				<div className = "artist_header">
					<img className = "artist" src = {artist.image_url}/>
					<div className = "sub">
						<p className="name">{artist.name}</p>
						<a href = {"https://twitter.com/" + artist.twitter_name}><img className = "social" src={"https://upload.wikimedia.org/wikipedia/fr/archive/c/c8/20160903181213%21Twitter_Bird.svg"}/></a>
					</div>
				</div>
			</div>
		);
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



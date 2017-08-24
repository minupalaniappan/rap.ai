import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import * as _ from 'underscore';
import $ from 'jquery'

var RAPGENIUS_ACCESS_TOKEN = "WJCDe9kbzfhPQnwzBXQcMw8JExlRMefEWN19V0elsOMNhriiJodaO9Ld6hQ2TZn9";
var ARTIST_SEARCH_ENDPOINT = decodeURIComponent('https%3A%2F%2Fapi.genius.com%2Fartists');
var LYRIC_ENDPOINT = decodeURIComponent('https%3A%2F%2Fimmense-bastion-22463.herokuapp.com%2Fartist');

export default class Generate extends Component {
	constructor (props) {
		super(props);
		this.state = {
			data: "", 
			linesContent: null,
			isLoading: true,
			inspiration: null
		}
		this.loadInspiration = this.loadInspiration.bind(this);

	}

	componentDidMount() {
		var that = this;
		getData(this.props.params.artist, (data) => {
			that.setState({
				data: data.response.artist
			}, () => {
				getLyrics(data.response.artist.name, (data) => {
					that.setState({
						linesContent: data, 
						isLoading: false
					})
				});
			});
		});
	}

	componentWillMount() {
		/* perform ajax */ 
	}

	componentDidUpdate() {
	}

	componentWillUnmount() {
	}

	loadInspiration(event) {
		var line = event.target.dataset.text;
		this.setState({
			inspiration: line
		});
	}

	loadLyrics() {
		var lyrics = [];
		var styleLyrics = this.styleText;
		var loadInsp = this.loadInspiration;
		this.state.linesContent.forEach((elem) => {
			lyrics.push(styleLyrics(elem, loadInsp));
		});
		return (
			<div className = "lyric-container">
				{ lyrics }
			</div>);
	}

	styleText(lyric, loadInspiration) {
		return (
			<div className="text-wrapper" key = {Math.random()} onClick={loadInspiration} data-text={lyric}><p className = "music-lyric" key = {Math.random()}><span>{lyric}</span></p></div>
		)
	}

	render() {
		var artist = this.state.data;
		var lyrics = (<div className = "pad"><p className = "music-lyric-non">Sit tight ... we're crunching lyrics!</p></div>)
		if (!this.state.isLoading) {
			lyrics = this.loadLyrics();
		}
		return (
			<div className="generate_container">
				<div className = "artist_header">
					<img className = "artist" src = {artist.image_url}/>
					<div className = "sub">
						<p className="name">{artist.name}</p>
						<a href = {"https://twitter.com/" + artist.twitter_name}><img className = "social" src={"https://upload.wikimedia.org/wikipedia/fr/archive/c/c8/20160903181213%21Twitter_Bird.svg"}/></a>
					</div>
					{ lyrics }
				</div>
			</div>
		);
	}
}

var getLyrics = (artist, callback) => {
	$.ajax({
	  beforeSend: function(xhr) {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      },
	  url: LYRIC_ENDPOINT+"/"+artist,
	  type: "GET", 
	  dataType: "json",
	  success: (data) => {
	  	callback(data);
	  }
	});

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


import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import * as _ from 'underscore';
import $ from 'jquery'

var RAPGENIUS_ACCESS_TOKEN = "WJCDe9kbzfhPQnwzBXQcMw8JExlRMefEWN19V0elsOMNhriiJodaO9Ld6hQ2TZn9";
var ARTIST_SEARCH_ENDPOINT = decodeURIComponent('https%3A%2F%2Fapi.genius.com%2Fartists');
var DATA = [
	"Know what I'm sayin'?",
	"Fuck what y'all niggas doin'",
	"What you got goin' on, what's happenin'?",
	"Yeah, know what I'm sayin'?",
	"Real niggas in this mothafucka, mane",
	"Hell yeah, y'all niggas lame as hell",
	"Y'all niggas, man, know what I'm sayin'?",
	"If Young Metro don't trust you, I'm gon' shoot you",
	"Hey!",
	"Know what I'm sayin'?",
	"Fuck what y'all niggas doin'",
	"What you got goin' on, what's happenin'?",
	"Yeah, know what I'm sayin'?",
	"Real niggas in this mothafucka, mane",
	"Hell yeah, y'all niggas lame as hell",
	"Y'all niggas, man, know what I'm sayin'?",
	"If Young Metro don't trust you, I'm gon' shoot you",
	"Hey!",
	"Know what I'm sayin'?",
	"Fuck what y'all niggas doin'",
	"What you got goin' on, what's happenin'?",
	"Yeah, know what I'm sayin'?",
	"Real niggas in this mothafucka, mane",
	"Hell yeah, y'all niggas lame as hell",
	"Y'all niggas, man, know what I'm sayin'?",
	"If Young Metro don't trust you, I'm gon' shoot you",
	"Hey!"
]

export default class Generate extends Component {
	constructor (props) {
		super(props);
		this.state = {
			data: "", 
			lines: this.props.params.lines, 
			isLoading: true
		}
		this.setLineCount = this.setLineCount.bind(this);

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
		/* perform ajax */ 
	}

	load() {
		var lines = this.props.params.lines;
		var artist = this.props.params.artist;
		var that = this;
		$.ajax({
		  url: "",
		  success: (data) => {
		  	that.setState({
		  		isLoading: false,
		  		data: data
		  	});
		  },
		  dataType: "json"
		});
	}

	componentDidUpdate() {
	}

	componentWillUnmount() {
	}

	setLineCount(event) {
		var artist = this.props.params.artist;
		var line = event.target.dataset.line;
		this.setState({
			lines: line
		}, () => {
			browserHistory.push('/ai/'+ artist +'/' + line);
		});
	}

	loadLyrics(tot) {
		var lyrics = [];
		var styleLyrics = this.styleText;
		var currDATA = getRandom(DATA, tot);
		currDATA.forEach((elem) => {
			lyrics.push(styleLyrics(elem));
		});


		return (
			<div className = "lyric-container">
				{ lyrics }
			</div>);
	}

	styleText(lyric) {
		return (
			<p className = "music-lyric" key = {Math.random()}>{lyric}</p>
		)
	}

	renderButtonClass() {
		return (
			<div className = "button-lc">
				<p className = "lineCount">Line count: </p>
				<button data-line="5" className={(this.state.lines === "5") ? "active" : "non-active"} onClick={this.setLineCount}>Five</button>
				<button data-line="10" className={(this.state.lines === "10") ? "active" : "non-active"} onClick={this.setLineCount}>Ten</button>
				<button data-line="20" className={(this.state.lines === "20") ? "active" : "non-active" } onClick={this.setLineCount}>Twenty</button>
			</div>
		)
	}

	render() {
		var artist = this.state.data;
		var buttonClass = this.renderButtonClass();
		var lyrics = this.loadLyrics(this.state.lines);
		return (
			<div className="generate_container">
				<div className = "artist_header">
					<img className = "artist" src = {artist.image_url}/>
					<div className = "sub">
						<p className="name">{artist.name}</p>
						<a href = {"https://twitter.com/" + artist.twitter_name}><img className = "social" src={"https://upload.wikimedia.org/wikipedia/fr/archive/c/c8/20160903181213%21Twitter_Bird.svg"}/></a>
					</div>
					{ buttonClass }
					{ lyrics }
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

var getRandom = (arr, n) => {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}



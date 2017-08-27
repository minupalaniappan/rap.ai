import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import * as _ from 'underscore';
import $ from 'jquery';

import YouTube from 'react-youtube'


var RAPGENIUS_ACCESS_TOKEN = "WJCDe9kbzfhPQnwzBXQcMw8JExlRMefEWN19V0elsOMNhriiJodaO9Ld6hQ2TZn9";
var ARTIST_SEARCH_ENDPOINT = decodeURIComponent('https%3A%2F%2Fapi.genius.com%2Fartists');
var INSPIRE_SEARCH_ENDPOINT = decodeURIComponent('https%3A%2F%2Fapi.genius.com%2Fsearch');
var LYRIC_ENDPOINT = decodeURIComponent('https%3A%2F%2Fimmense-bastion-22463.herokuapp.com%2Fartist');
var YTKEY = 'AIzaSyB4qGtZK7NOQ87Y5L_wmktkQ8dTblqoc1c'
var YTLINK = decodeURIComponent('https%3A%2F%2Fwww.googleapis.com%2Fyoutube%2Fv3%2Fsearch')
export default class Generate extends Component {
	constructor (props) {
		super(props);
		this.state = {
			data: "", 
			linesContent: null,
			isLoading: true,
			inspiration: null,
			selectedText: null
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

	generateYoutubeVideo(id) {
		const opts = {
	      height: '240',
	      width: '400',
	      playerVars: { // https://developers.google.com/youtube/player_parameters 
	        autoplay: 1
	      }
	    };
		var yt = (<div><p className = "inspiredby">Inspired by...</p><YouTube
				  videoId={id}            
				  opts={opts}
				/></div>);

		return (yt);
	}

	loadInspiration(event) {
		var line = event.target.dataset.text;
		var randid = event.target.dataset.randid;
		var that = this;
		findSongPerLyric(line, (data) => {
			var url; 
			var hits = data.response.hits;
			if (hits.length) {
				findVideo(hits[0].result.full_title, (data) => {
					if (data.items) {
						that.setState({
							inspiration: data.items[0].id.videoId, 
							selectedText: line
						});
					}
				})
			}
		});
	}

	loadLyrics() {
		var lyrics = [];
		var styleLyrics = this.styleText;
		var state = this.state;
		var loadInsp = this.loadInspiration;
		var genVid = this.generateYoutubeVideo;
		this.state.linesContent.forEach((elem) => {
			lyrics.push(styleLyrics(elem, loadInsp, state, genVid));
		});
		return (
			<div className = "lyric-container">
				{ lyrics }
			</div>);
	}

	styleText(lyric, loadInspiration, state, ytfunc) {
		var yt;
		if (state.inspiration && lyric === state.selectedText) {
			yt = ytfunc(state.inspiration);
		}
		return (
			<div className="text-wrapper" key = {Math.random()}>
				<p className = "music-lyric" key = {Math.random()}>
					<span onClick={loadInspiration} data-text={lyric} data-randid={Math.random()}>{lyric}</span>
				</p>
				<div className = "yt-video-style">{yt}</div>
			</div>
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

var findSongPerLyric = (lyric, callback) => {
	$.ajax({
		url: INSPIRE_SEARCH_ENDPOINT,
		type: "GET", 
		dataType: 'json',
		data: {
			"access_token": RAPGENIUS_ACCESS_TOKEN,
			"q": lyric
		},
		success: (data) => {
			callback(data);
		}
	});
}

var findVideo = (song, callback) => {
	$.ajax({
		url: YTLINK,
		type: "GET", 
		dataType: 'json',
		data: {             
            "maxResults": 25,
            "part": "snippet",                               
			"key": YTKEY,
			"q": song
		},
		success: (data) => {
			callback(data);
		}
	});
}



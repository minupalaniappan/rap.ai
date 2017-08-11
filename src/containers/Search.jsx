import React, { Component, PropTypes } from 'react';
import * as _ from 'underscore';
import $ from 'jquery'
import Autosuggest from 'react-autosuggest';


var RAPGENIUS_ACCESS_TOKEN = "WJCDe9kbzfhPQnwzBXQcMw8JExlRMefEWN19V0elsOMNhriiJodaO9Ld6hQ2TZn9";
var ARTIST_SEARCH_ENDPOINT = decodeURIComponent('https%3A%2F%2Fapi.genius.com%2Fsearch');

// render one item on the list
const renderSuggestion = artist => {
  return (
    <div>
      <div>{artist}</div>
    </div>
  );

} 

export default class Search extends Component {
	constructor (props) {
		super(props);
		this.state = {
			value: "", 
			artists: []
		}
		this.onChange = this.onChange.bind(this);
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
	}

	onChange(event, query) {
	    this.setState({
	      value: query.newValue
	    });
	};

	getSuggestionValue(suggestion) {
		return (suggestion.name)
	}


	onSuggestionsFetchRequested(query)
	{
		var that = this;
		$.ajax({
			url: ARTIST_SEARCH_ENDPOINT,
			type: "GET", 
			dataType: 'json',
			data: {
				"access_token": RAPGENIUS_ACCESS_TOKEN,
				"q": query.value
			},
			success: (data) => {
				var artists = _.uniq(_.pluck(_.pluck(_.pluck(data.response.hits, "result"), "primary_artist"), "name"));
				that.setState({
					artists: artists
				})
			}
		});
	}

  	onSuggestionsClearRequested() {
	    this.setState({
	      artists: []
	    });
  	};

	render() {
		const { value, artists } = this.state;
		const inputProps = {
	      placeholder: 'Search an artist',
	      value,
	      onChange: this.onChange
	    };
	    return (
	      <div>
	        <Autosuggest
		        suggestions={artists}
		        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
		        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
		        getSuggestionValue={this.getSuggestionValue}
		        renderSuggestion={renderSuggestion}
		        inputProps={inputProps}
		    />
	      </div>
	    )
  	}
}
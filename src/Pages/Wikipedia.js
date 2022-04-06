import { render } from '@testing-library/react'; 
import React, { useState } from 'react';

class Wikipedia extends React.Component {
  constructor(props){
    super(props);
    this.count = 0; 
    this.state = {
      wikiSearchReturnValues: [],
      wikiSearchTerms: ""
    }
  }

 


  useWikiSearchEngine = (e) => {
    e.preventDefault();

    this.setState({
      wikiSearchReturnValues: []
    });

    const pointerToThis = this;  //around 12 mins in video

    var url = "https://en.wikipedia.org/w/api.php"; //straight from documentation


    let startTitles = [];

    var params = {
      action: "query",
      list: "search",
      srsearch: this.state.WikiSearchTerms,
      format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach((key) => {
      url += "&" + key + "=" + params[key];
    });

    fetch(url)
      .then(
        function (response) {
          console.log(response);
          return response.json();
        
        }
      )
      .then(
        function (response) {
          for (var key in response.query.search) {
            pointerToThis.state.wikiSearchReturnValues.push({
              queryResultPageFullURL: 'no link',
              queryResultPageID: response.query.search[key].pageid, 
              queryResultPageTitle: response.query.search[key].title,
              queryResultPageSnippet: response.query.search[key].snippet
            });
          }
        }
      )
      .then(
        function (response) {
          var i = 0;
          for(var key2 in pointerToThis.state.wikiSearchReturnValues) { //so this for loop runs 10 times
              startTitles.push(pointerToThis.state.wikiSearchReturnValues[i].queryResultPageTitle);
              i++;
              console.log(startTitles);
              console.log(startTitles.length);
            let page = pointerToThis.state.wikiSearchReturnValues[key2];
            let pageID = page.queryResultPageID;
            let urlForRetrievingPageURLByPageID = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json`;
          
            fetch(urlForRetrievingPageURLByPageID)
              .then(
                function (response) {
                  console.log(response);
                  return response.json();
                }
              )
              .then(
                function (response) {
                   page.queryResultPageFullURL = response.query.pages[pageID].fullurl;
                   pointerToThis.forceUpdate();
                }
              ) 
          }
        }
      )
  }
  changeWikiSearchTerms = (e) => {
    this.setState({
      WikiSearchTerms: e.target.value
    });
  }

  start() {
    console.log(this.count);
  }
  
  render() {
    let wikiSearchResults = [];

    for(var key3 in this.state.wikiSearchReturnValues) {
      this.count = 1; //setState or setValue hook
      wikiSearchResults.push(
        <div className="searchResultDiv" key={key3}>
          <h3>{this.state.wikiSearchReturnValues[key3].queryResultPageTitle}</h3>
          <span className="link"><u>{this.state.wikiSearchReturnValues[key3].queryResultPageFullURL}</u></span>
          <button onClick={this.start}>Start</button>
          <button onClick={this.start}>Finish</button>
          <p className="description" dangerouslySetInnerHTML={{__html: this.state.wikiSearchReturnValues[key3].queryResultPageSnippet}}></p>
        </div>
      );

      //.queryResultPageFullURL for first <h3> part
      // <h3><a href = {this.state.wikiSearchReturnValues[key3]}>{this.state.wikiSearchReturnValues[key3].queryResultPageTitle}</a></h3>

      //<button onClick= {startValue = count}>Start</button>
      //<button onClick= {finishValue = count}>Finish</button> (Andrew's idea)

      //maybe create 10 checkboxes and have two search engines for start and finish
    }
    

    
    return (
      <div className="Wikipedia">
        <h1>Wikipedia Search</h1>
        <form action="">
          <input type="text" value={this.state.WikiSearchTerms || ''} onChange={this.changeWikiSearchTerms}
          placeholder="Search Wikipedia Articles" />
          <button type="submit" onClick={this.useWikiSearchEngine}>Search</button>
          <p id="start">Start:</p>
          <br></br>
          <p id="finish">Finish:</p>
        </form>
        {wikiSearchResults} 
      </div>
    );
  }
}


export default Wikipedia;
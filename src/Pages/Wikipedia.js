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
    this.start = this.start.bind(this); //https://reactjs.org/docs/handling-events.html
    this.finish = this.finish.bind(this);
    this.time = 0;
  }

 


  useWikiSearchEngine = (e) => {
    e.preventDefault();

    this.setState({
      wikiSearchReturnValues2: []
    });
    
    const pointerToThis = this;  //around 12 mins in video

    var url = "https://en.wikipedia.org/w/api.php"; //straight from documentation


    let startTitles = [];
    let wikiSearchReturnValues2 = [];

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
          //console.log(response);
          return response.json();
        
        }
      )
      .then(
        function (response) {
          for (var key in response.query.search) {
            pointerToThis.state.wikiSearchReturnValues2.push({
              queryResultPageFullURL: 'no link',
              queryResultPageID: response.query.search[key].pageid, 
              queryResultPageTitle: response.query.search[key].title,
              queryResultPageSnippet: response.query.search[key].snippet
            });
            //console.log(wikiSearchReturnValues.length);
          }
          
        }
       
      )
      
      .then(
        function (response) {
          var i = 0;
          for(var key2 in pointerToThis.state.wikiSearchReturnValues2) { //so this for loop runs 10 times
              startTitles.push(pointerToThis.state.wikiSearchReturnValues2[i].queryResultPageTitle);
              i++;
              // console.log(startTitles);
              //console.log(startTitles.length);
            let page = pointerToThis.state.wikiSearchReturnValues2[key2];
            let pageID = page.queryResultPageID;
            let urlForRetrievingPageURLByPageID = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json`;
          
            fetch(urlForRetrievingPageURLByPageID)
              .then(
                function (response) {
                  //console.log(response);
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
    console.log(" Start Works!");
   }

   finish() {
    console.log(this.count);
    console.log(" Finish Works!");
   }
  
  render() {
    let wikiSearchResults = [];

    for(var key3 in this.state.wikiSearchReturnValues2) { //CHECK LENGTH OF WIKISEARCHRETURNVALUES
      this.count = key3;
      this.time++;
      wikiSearchResults.push(
        <div className="searchResultDiv" key={key3}>
          <h3>{this.state.wikiSearchReturnValues2[key3].queryResultPageTitle}</h3>
          <span className="link"><u>{this.state.wikiSearchReturnValues2[key3].queryResultPageFullURL}</u></span>
          <button onClick={this.start}>Start</button>
          <button onClick={this.finish}>Finish</button>
          <p className="description" dangerouslySetInnerHTML={{__html: this.state.wikiSearchReturnValues2[key3].queryResultPageSnippet}}></p>
        </div>
      );
      console.log(this.time);
      console.log(this.state.wikiSearchReturnValues2[key3].queryResultPageTitle);
      console.log(this.state.wikiSearchReturnValues2.length);
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
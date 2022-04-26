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
    this.checkButton = this.checkButton.bind(this);
    this.displayWiki = this.displayWiki.bind(this);
    this.time = 0;
    this.currentTitle = "";
    this.currentStartTitle = "";
    this.currentFinishTitle = "";
    this.currentLink = "";
    this.currentStartLink = "";
    this.currentFinishLink = "";
    this.breakOut = false;
  }

 
  

  useWikiSearchEngine = (e) => {
    //document.getElementById("play").style.visibility = "hidden";
    this.time = 0;
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
    console.log("Start Works!");
    this.currentStartTitle = this.currentTitle;
    this.currentStartLink = this.currentLink;
    console.log(this.currentLink);
    console.log(this.currentStartLink);
    document.getElementById("start").innerHTML = this.currentStartTitle;
    this.checkButton();
   }

   finish() {
    console.log("Finish Works!");
    this.currentFinishTitle = this.currentTitle;
    this.currentFinishLink = this.currentLink;
    console.log(this.currentLink);
    console.log(this.currentFinishLink);
    document.getElementById("finish").innerHTML = this.currentFinishTitle;
    this.checkButton();
   }

   checkButton() {
    //console.log("in function");
     let pStart = document.getElementById("start").innerHTML;
     let pFinish = document.getElementById("finish").innerHTML;
     if(pStart !== "" && pFinish !== "" && this.breakOut == false){
       this.breakOut = true;
      //  console.log(pStart);
      //  console.log(pFinish);
      //  console.log(this.currentFinishTitle);
       let playButton = document.createElement("button");
       playButton.innerHTML = "Play";
       playButton.type = "submit";
       playButton.onClick = "displayWiki";
       document.body.appendChild(playButton);
     }
   }

   displayWiki() {
      
   }
  
  
  render() {
    let wikiSearchResults = [];

    for(var key3 in this.state.wikiSearchReturnValues2) { //CHECK LENGTH OF WIKISEARCHRETURNVALUES
      this.time++;
      if(this.time > 170){
        wikiSearchResults.push(
          <div className="searchResultDiv" key={key3}>
            <h3>{this.state.wikiSearchReturnValues2[key3].queryResultPageTitle}</h3>
            <span className="link"><u>{this.state.wikiSearchReturnValues2[key3].queryResultPageFullURL}</u></span>
            <button onClick={this.start}>Start</button>
            <button onClick={this.finish}>Finish</button>
            <p className="description" dangerouslySetInnerHTML={{__html: this.state.wikiSearchReturnValues2[key3].queryResultPageSnippet}}></p>
        </div>
      );
      this.currentTitle = this.state.wikiSearchReturnValues2[key3].queryResultPageTitle;
      this.currentLink = this.state.wikiSearchReturnValues2[key3].queryResultPageFullURL;
      console.log(this.currentTitle);
      console.log(this.currentLink);
      console.log(this.time);
    }
      
      // if(this.time > 10) {
      //   break;
      // }
      // if(this.time === 1){
      //   this.currentTitle = this.state.wikiSearchReturnValues2[key3].queryResultPageTitle;
      //   this.currentLink = this.state.wikiSearchReturnValues2[key3].queryResultPageFullURL;
      //   console.log(this.currentTitle);
      //   console.log(this.currentLink);
      // }
      //console.log(this.time);
      //console.log(this.state.wikiSearchReturnValues2.length);
      //console.log(wikiSearchResults.length);
    }


   
    

    return (
      <div className="Wikipedia">
        <h1>Wikipedia Search</h1>
        <form action="">
          <input type="text" value={this.state.WikiSearchTerms || ''} onChange={this.changeWikiSearchTerms}
          placeholder="Search Wikipedia Articles" />
          <button type="submit" onClick={this.useWikiSearchEngine}>Search</button>
          <p>Start: </p>
          <p id="start">{this.currentStartTitle}</p>
          <br></br>
          <p>Finish: </p>
          <p id="finish">{this.currentFinishTitle}</p>
          <br></br>
        </form>
        {wikiSearchResults} 
      </div>
    );
  }
}


export default Wikipedia;
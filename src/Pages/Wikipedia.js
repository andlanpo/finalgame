import { getByDisplayValue, render } from '@testing-library/react'; 
import React, { useState } from 'react';

class Wikipedia extends React.Component { //SEARCH CANNIT
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
    this.finishedGame = this.finishedGame.bind(this);
    this.time = 0;
    this.currentTitle = "";
    this.currentStartTitle = "";
    this.currentFinishTitle = "";
    this.wikiLink = "";
    this.currentStartLink = "";
    this.currentFinishLink = "";
    this.breakOut = false;
  }

 
  

  useWikiSearchEngine = (e) => {
    //document.getElementById("play").style.visibility = "hidden";
    this.time = 0;
    this.wikiLink = "https://en.wikipedia.org/wiki/";
    // this.currentStartLink = "";
    // this.currentFinishLink = "";
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
    this.currentStartLink = "";
    this.currentStartTitle = this.currentTitle;
    for(let char of this.currentStartTitle){
      if(char === " "){
        this.currentStartLink += "_";
      }
      else if(char === "'"){
        this.currentStartLink += "%27";
      }
      else{
        this.currentStartLink += char;
      }
    }
    console.log(this.currentStartLink);
    //console.log(this.wikiLink += this.currentStartLink);
    document.getElementById("start").innerHTML = this.currentStartTitle;
    this.checkButton();
  }

  finish() {
    console.log("Finish Works!");
    this.currentFinishLink = "";
    this.currentFinishTitle = this.currentTitle;
    for(let char of this.currentFinishTitle){
      if(char === " "){
        this.currentFinishLink += "_";
      }
      else if(char === "'"){
        this.currentFinishLink += "%27";
      }
      else{
        this.currentFinishLink += char;
      }
    }
    console.log(this.currentFinishLink);
    document.getElementById("finish").innerHTML = this.currentFinishTitle;
    this.checkButton();
  }

   checkButton() {
    console.log("in check");
     let pStart = document.getElementById("start").innerHTML;
     let pFinish = document.getElementById("finish").innerHTML;
     if(pStart !== "" && pFinish !== "" && this.breakOut == false){
       this.breakOut = true;
      //  console.log(pStart);
      //  console.log(pFinish);
      //  console.log(this.currentFinishTitle);
       let playButton = document.createElement("button"); //https://sebhastian.com/javascript-create-button/
       playButton.innerHTML = "Play";
       playButton.type = "submit";
       playButton.addEventListener('click', this.displayWiki); //https://quick-adviser.com/how-do-you-add-onclick-event-dynamically-in-react-js/#How_do_you_add_onClick_event_dynamically_in_React_JS
       document.body.appendChild(playButton);
     }
    //https://stackoverflow.com/questions/10418644/creating-an-iframe-with-given-html-dynamically
    // var displayGame = document.createElement("iframe");
    // displayGame.src = this.wikiLink; //...interesting 
    // document.body.appendChild(displayGame);
   }

   displayWiki() {
    let endButton = document.createElement("button");
    playButton.innerHTML = "I did it!";
    playButton.type = "submit";
    playButton.addEventListener('click', this.finishedGame);
    document.body.appendChild(endButton);
    console.log("in display");
    var displayGame = document.createElement("iframe");
    displayGame.id = "wikiPage"
    displayGame.sandbox = "allow-same-origin allow-scripts allow-modals allow-forms" 
    console.log(this.wikiLink);
    console.log(this.currentStartLink);
    console.log(this.currentFinishLink);
    displayGame.src = this.wikiLink += this.currentStartLink;
    displayGame.height = "1000px";
    displayGame.width = "100%";
    displayGame.scroll = "no";
    document.body.appendChild(displayGame);
    // console.log(displayGame.src);
    // console.log("finished");
    var wikiObject = document.getElementById("wikiPage");
    var wikiFrame = wikiObject.contentWindow.document.body.innerHTML;
    var iframeDoc = displayGame.contentDocument || displayGame.contentWindow.document;
    
    //console.log("trying to displayfirst heading" + iframeDoc.document.getElementById("firstHeading"));
    // if (iframeDoc.readyState  == 'complete' ) {
    //   //iframe.contentWindow.alert("Hello");
    //   displayGame.contentWindow.onload = function(){
    //       alert("I am loaded");
    //   };
    //   return;
    // }
    document.querySelector('iframe').onload = function(link = this.wikiLink += this.currentFinishLink){
      // alert(wikiFrame.innerHTML);
      // alert("loaded");
      //var value = displayGame.contentWindow.document.getElementsByTagName("h1"); //https://stackoverflow.com/questions/21471370/get-title-from-iframe-document
      // var heading = wikiObject.contentWindow.document.getElementById("firstHeading");
      // console.log(heading);
      //https://www.w3schools.com/howto/howto_js_element_iframe.asp
      //alert(value);
      // var frameObject = document.getElementById("wikiPage");
      // var frameContent = frameObject.contentWindow.document.body.innerHTML;
      // alert(frameContent);
      // var element = frameObject.contentWindow.document.getElementsByTagName("H1")[0];
      // alert(element);
      
      // let iWindow = wikiObject.contentWindow;
      // let iDoc = iWindow.document;
      // let element = iDoc.getElementsByTagName("h1")[0]
      // var x = document.getElementsByTagName("iframe")[0].contentWindow
      // console.log(element);
      //console.log(x.document.getElementsByTagName("body")[0])
      // console.log(theTitle);
      var el = document.createDocumentFragment(link.path[0])
      let x = document.querySelector("document")
      //http://www.etsav.upc.edu/assignatures/portafoli/tutorial1/3.html
      console.log(x )  
  };
  
    //alert("frame content: " + wikiFrame);

    // displayGame.contentWindow.onload = function () {
    //   console.log("I am loaded");
    // }
  }

  finishedGame() {
    let element = document.getElementById("wikiPage");
    let hidden = element.getAttribute("hidden");
    if (hidden) {
       element.removeAttribute("hidden"); //https://www.dofactory.com/html/iframe/hidden
    }

  }

  
  
  render() {
    let wikiSearchResults = [];

    for(var key3 in this.state.wikiSearchReturnValues2) { //CHECK LENGTH OF WIKISEARCHRETURNVALUES
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
      if(this.time > 10) {
        break;
      }
      if(this.time === 1){
        this.currentTitle = this.state.wikiSearchReturnValues2[key3].queryResultPageTitle;
        //console.log(this.currentTitle);
      }
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
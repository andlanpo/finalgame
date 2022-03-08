import React from 'react'

class Wikipedia extends React.Component {
  constructor(props){
    super(props);
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
          return response.json();
        }
      )
      .then(
        function (response) {
          for (var key in response.query.search) {
            pointerToThis.state.wikiSearchReturnValues.push({
              queryResultPageFullURL: "no link",
              queryResultPageID: response.query.search[key].pageid, 
              queryResultPageTitle: response.query.search[key].title,
              queryResultPageSupport: response.query.search[key].snippet
            });
          }
        }
      )
      .then(
        function (response) {
          for(var key2 in pointerToThis.state.wikiSearchReturnValues) {
            let page = pointerToThis.state.wikiSearchReturnValues[key2];
            let pageID = page.queryResultPageID;
            let urlforRetrievingPageURLyPageID = "hhtps://en.wikipedia.org/w/api.php?origin*&action=query&prop=info&pageids=${pageID}@inprop=url&format=json";
          
            fetch(urlforRetrievingPageURLyPageID)
              .then(
                function (response) {
                  return response.json();
                }
              )
              // .then(
              //   function (response) {
              //     page.queryResultPageFullURL = response.query.pages[pageID].fullurl;
              //   }
              // ) //around 23:50
          }
        }
      )

  }
}

function Wikipedia() {
  return (
    <div>Wikipedia
      <iframe id="frame" src="https://en.wikipedia.org/wiki/Waluigi" height= "500px" width= "100%"></iframe>

    </div>
  )
}

export default Wikipedia
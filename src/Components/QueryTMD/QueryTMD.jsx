import React, { useState } from "react";
import ReactJson from "react-json-view";
import "../../styles.css";

function QueryTMD() {
  const [inputValue, setInputValue] = useState("");
  const [APIOutput, setAPIOutput] = useState('{"cosa":0}');

  const inputStyle = {
    marginTop: 20
  };

  async function searchSeries() {
    console.log("Click call API");
    const response = await fetch(
      "https://api.themoviedb.org/3/search/tv?api_key=2338881dcdb02abf883bcd2fd0123766&language=en-US&page=1&query=" +
        inputValue +
        "&include_adult=false"
    );
    const json = await response.json();
    setAPIOutput(JSON.stringify(json));
  }

  async function searchEpisodes() {}

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  const handleNodeClick = (nodeData) => {
    console.log("inside handlenodeclick");
    console.log(nodeData.value);
    console.log(nodeData);
    searchEpisodes();
  };

  return (
    <div>
      <div className="labelT">Search series:</div>
      <input value={inputValue} onChange={handleChange} />
      <button className="buttonT" onClick={() => searchSeries()}>
        Search
      </button>
      <div style={inputStyle}>{inputValue}</div>
      <ReactJson
        src={JSON.parse(APIOutput)}
        onSelect={(data: any) => {
          //console.log(data);
          handleNodeClick(data);
        }}
        iconStyle="square"
        quotesOnKeys={false}
        displayDataTypes={false}
        displayObjectSize={false}
        collapseStringsAfterLength={30}
        enableClipboard={(copy) => {
          console.log("copy", copy);
        }}
      />
    </div>
  );
}

export default QueryTMD;

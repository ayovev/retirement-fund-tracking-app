import React, { Component } from "react";
import "./Home.css";
// import TradingViewWidget from "../components/TradingViewWidget";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>401k Tracking & Analysis</h1>
          <p>Add news feed with updates or something here</p>
          <br></br>
          <img src="https://www.finviz.com/image.ashx?dow"></img>
          <img src="https://www.finviz.com/image.ashx?sp500"></img>
          <img src="https://www.finviz.com/image.ashx?nasdaq"></img>
        </div>
        {/* <TradingViewWidget /> */}
      </div>
    );
  }
}

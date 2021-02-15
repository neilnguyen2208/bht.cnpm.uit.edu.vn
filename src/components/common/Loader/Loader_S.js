
import React from 'react';
import "./Loader_S.scss"
import "./Loader.scss";

export default class Loader extends React.Component {
  render() {
    return (
      <div className="loader-container">
        <div className="d-flex">
          <div class="loadingio-spinner-blocks-imwn1gmkpba">
            <div class="ldio-dko3k82fjf6">
              <div style={{ left: "15px", top: "15px", animationDelay: "0s" }}></div>
              <div style={{ left: "40px", top: "15px", animationDelay: "0.125s" }}></div>
              <div style={{ left: "65px", top: "15px", animationDelay: "0.25s" }}></div>
              <div style={{ left: "15px", top: "40px", animationDelay: "0.875s" }}>     </div>
              <div style={{ left: "65px", top: "40px", animationDelay: "0.375s" }}></div>
              <div style={{ left: "15px", top: "65px", animationDelay: "0.75s" }}></div>
              <div style={{ left: "40px", top: "65px", animationDelay: "0.625s" }}></div>
              <div style={{ left: "65px", top: "65px", animationDelay: "0.5s" }}></div>
            </div>
          </div>
        </div>
        <div className="loader-text">{this.props.text}</div>
      </div >
    )
  }
}

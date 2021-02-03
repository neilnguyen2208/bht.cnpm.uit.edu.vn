import React from 'react';
import "./Loader.scss"

export default class Loader extends React.Component {
  render() {
    return (
      <div className="loader-container">
        <div style={{ margin: "auto" }} >
          <div className ="loader-spinner-blocks-2wim9ni0j7v">
            <div className ="loader-qqa1psw9t4">
              <div style={{ left: "38px", top: "38px", animationDelay: "0s" }}> </div>
              <div style={{ left: "80px", top: "38px", animationDelay: "0.125s" }}></div>
              <div style={{ left: "122px", top: "38px", animationDelay: "0.25s" }}></div>
              <div style={{ left: "38px", top: "80px", animationDelay: "0.875s" }}></div>
              <div style={{ left: "122px", top: "80px", animationDelay: "0.375s" }}>
              </div > <div style={{ left: "38px", top: "122px", animationDelay: "0.75s" }}>
              </div > <div style={{ left: "80px", top: "122px", animationDelay: "0.625s" }}>
              </div > <div style={{ left: "122px", top: "122px", animationDelay: "0.5s" }}></div>
            </div >
          </div >
        </div >
      </div>
    )
  }
}

//content loader will be set up later

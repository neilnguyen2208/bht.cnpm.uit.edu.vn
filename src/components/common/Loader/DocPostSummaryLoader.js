import React from 'react';
import 'components/styles/Metadata.scss';
import './Loader.scss';

export function DocPostSummaryLoader() {
  return (
    <div className="item-container" >
      <div className="metadata" >
        <div className="d-flex">
          <div className="d-flex">
            <div className="timeline-item d-flex">
              <div className="animated-background" style={{ width: "120px", height: "20px" }}></div>
            </div>
          </div>
          <div className="timeline-item d-flex">
            <div className="animated-background" style={{ width: "120px", height: "20px" }}></div>
          </div>
          <div className="timeline-item d-flex">
            <div className="animated-background" style={{ width: "120px", height: "20px" }}></div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="title">
          <div className="timeline-item d-flex">
            <div className="animated-background" style={{ width: "120px", height: "20px" }}></div>
          </div>
        </div>

        <div className="d-flex" style={{ marginTop: "-8px" }}>
          <div className="d-flex"  >
            <div className="timeline-item d-flex">
              <div className="animated-background" style={{ width: "120px", height: "20px" }}></div>
            </div>
          </div>

          <div className="d-flex" >
            <div className="light-black-label" style={{ marginLeft: "2px" }}>
              <div className="timeline-item d-flex">
                <div className="animated-background" style={{ width: "8px", height: "2px" }}></div>
              </div>
            </div>
            <div className="light-black-label" style={{ marginLeft: "2px" }}>
              <div className="timeline-item d-flex">
                <div className="animated-background" style={{ width: "120px", height: "20px" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="summary-text">
        <div className="timeline-item d-flex">
          <div className="animated-background" style={{ width: "100%", height: "30px" }}></div>
        </div>
      </div>

      <div className="reaction-bar">
        <div className="d-flex mg-top-5px">
          <div className="d-flex">
          </div>

          <div className="d-flex">
            <div className="save-text-container" >
            </div>
            <div className="comment-count-container">
              <div style={{ paddingLeft: "5px" }}>
              </div>
            </div>
          </div>
        </div>
        <div className="link-label mg-top-5px" >
        </div>
      </div>

      <div className="j-c-space-between">
        <div className="d-flex j-c-end" >
          <div className="timeline-item d-flex">
            <div className="animated-background" style={{ width: "60px", height: "20px" }}></div>
          </div>
        </div>
      </div>
    </div >
  );
}


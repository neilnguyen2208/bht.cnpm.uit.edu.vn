import React from 'react';
import 'components/styles/Metadata.scss';
import './Loader.scss';

export default function DocPostSummaryLoader() {
  return (
    <div className="item-container" style={{ border: "none" }} >


      {/* title */}
      <div className="title">
        <div className="timeline-item">
          <div className="animated-background" style={{ width: "100%", height: "32px" }}></div>
        </div>
        <div className="timeline-item">
          <div className="animated-background" style={{ width: "40%", marginTop: "5px", height: "32px" }}></div>
        </div>
      </div>

      {/* metadata 1*/}
      <div className="d-flex" style={{ marginTop: "5px", marginBottom: "8px", width: "100%" }}>
        <div className="timeline-item d-flex w-100-percents">
          <div className="animated-background" style={{ width: "120px", maxWidth: "20%", height: "20px", marginRight: "8px" }}></div>
          <div className="animated-background" style={{ width: "60px", maxWidth: "12%", height: "20px", marginRight: "8px" }}></div>
          <div className="animated-background" style={{ width: "80px", maxWidth: "16%", height: "20px" }}></div>
        </div>
      </div>

      {/* metadata 2 */}
      <div className="reaction-bar">
        <div className="d-flex mg-top-10px  w-100-percents j-c-space-between">
          <div className="d-flex">
            <div className="timeline-item d-flex">
              <div className="animated-background" style={{ width: "60px", height: "60px", borderRadius: "50%" }}></div>
            </div>
            <div className="timeline-item mg-left-10px d-flex-vertical">
              <div className="animated-background" style={{ width: "120px", height: "24px" }}></div>
              <div className="d-flex mg-top-5px">
                <div className="animated-background" style={{ width: "80px", height: "20px", marginRight: "10px" }}></div>
                <div className="animated-background" style={{ width: "80px", height: "20px" }}></div>
              </div>
            </div>
          </div>
          <div className="animated-background" style={{ width: "24px", height: "24px" }}></div>
        </div>
      </div>

    </div >
  );
}


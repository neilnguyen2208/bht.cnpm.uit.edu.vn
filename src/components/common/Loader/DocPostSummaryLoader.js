import React, { Component } from 'react';
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

      {/* title */}
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
            {/* <div> {likeBtn}</div>
                <div className="like-count">{this.props.likes}</div> */}
          </div>

          <div className="d-flex">
            <div className="save-text-container" >
              {/* <div>{saveBtn}</div>
                  {this.isSaved ? "Lưu" : "Huỷ"} */}
            </div>
            <div className="comment-count-container">
              {/* Bình luận */}
              <div style={{ paddingLeft: "5px" }}>
                {/* {this.props.comments} */}
              </div>
            </div>
          </div>
        </div>
        <div className="link-label mg-top-5px" >
          {/* Đọc tiếp ... */}
        </div>
      </div>

      {/* for implement approve item */}
      <div className="j-c-space-between">
        {/* {this.props.type === itemType.approval ? */}
        <div className="d-flex j-c-end" >
          <div className="timeline-item d-flex">
            <div className="animated-background" style={{ width: "60px", height: "20px" }}></div>
          </div>
        </div>
            :
            <></>
        {/* } */}

      </div>
    </div >
  );
}


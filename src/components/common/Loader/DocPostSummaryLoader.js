import React, { Component } from 'react';
import 'components/styles/DocPostSummary.scss';
import './Loader.scss';

export function DocPostSummaryLoader() {
  return (
    <div className="item-container" >
      <div className="item-normal-metadata-container" >
        <div className="d-flex">
          <div className="d-flex">
            <div class="timeline-item d-flex">
              <div class="animated-background" style={{ width: "120px", height: "20px" }}></div>
            </div>
          </div>
          <div class="timeline-item d-flex">
            <div class="animated-background" style={{ width: "120px", height: "20px" }}></div>
          </div>
          <div class="timeline-item d-flex">
            <div class="animated-background" style={{ width: "120px", height: "20px" }}></div>
          </div>
        </div>
      </div>

      {/* title */}
      <div className="mg-left-10px">
        <div className="item-title">
          <div class="timeline-item d-flex">
            <div class="animated-background" style={{ width: "120px", height: "20px" }}></div>
          </div>
        </div>

        <div className="d-flex" style={{ marginTop: "-8px" }}>
          <div className="d-flex"  >
            <div class="timeline-item d-flex">
              <div class="animated-background" style={{ width: "120px", height: "20px" }}></div>
            </div>
          </div>

          <div className="d-flex" >
            <div className="metadata-light-black-label" style={{ marginLeft: "2px" }}>
              <div class="timeline-item d-flex">
                <div class="animated-background" style={{ width: "8px", height: "2px" }}></div>
              </div>
            </div>
            <div className="metadata-light-black-label" style={{ marginLeft: "2px" }}>
              <div class="timeline-item d-flex">
                <div class="animated-background" style={{ width: "120px", height: "20px" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="item-summary">
        <div class="timeline-item d-flex">
          <div class="animated-background" style={{ width: "100%", height: "30px" }}></div>
        </div>
      </div>

      <div className="item-reaction-bar">
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
            <div className="post-comment-count-container">
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
        {/* {this.props.type === itemType.approving ? */}
        <div className="d-flex j-c-end" >
          <div class="timeline-item d-flex">
            <div class="animated-background" style={{ width: "60px", height: "20px" }}></div>
          </div>
        </div>
            :
            <></>
        {/* } */}

      </div>
    </div >
  );
}


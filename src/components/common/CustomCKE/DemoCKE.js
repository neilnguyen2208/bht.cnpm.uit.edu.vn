import React from 'react';
import CustomCKE from './CKEditor';
import Loader from 'components/common/Loader/Loader_S.js';
export default class DemoCKE extends React.Component {
  render() {
    return (
      <div>
        <Loader text="Đang tải..." />
        <CustomCKE id="demo-cke" />
      </div>
    );

  }


}
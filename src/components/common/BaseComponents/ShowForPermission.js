import React, { Component } from 'react'

import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { isGrantedAll } from 'utils/authUtils';

const ShowForPermissionComponent = (props) => {
  const couldShow = isGrantedAll(props.permissions);
  return couldShow ? props.children : null;
};

ShowForPermissionComponent.propTypes = {
  permissions: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
});

export const ShowForPermission = connect(mapStateToProps)(ShowForPermissionComponent);

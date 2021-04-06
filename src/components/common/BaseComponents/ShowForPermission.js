import React, { Component } from 'react'

import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { isGrantedAll } from 'utils/authUtils';

const ShowForPermissionComponent = (props) => {
  const couldShow = isGrantedAll(props.permission);
  return couldShow ? props.children : null;
};

ShowForPermissionComponent.propTypes = {
  permission: PropTypes.string.isRequired,
  userPermissions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  userPermissions: state.user.allPermissions //<--- here you will get permissions for your user from Redux store
});

export const ShowForPermission = connect(mapStateToProps)(ShowForPermissionComponent);

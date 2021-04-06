import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { isGrantedAll } from 'utils/authUtils';
import { openBigModal } from 'redux/services/modalServices'

const RequireLoginComponent = (props) => {
  const couldAction = isGrantedAll(props.permission);
  if (!couldAction) {
    openBigModal('login-modal', {});
  }
  return props.children;
};

RequireLoginComponent.propTypes = {
  permission: PropTypes.string.isRequired,
  userPermissions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  userPermissions: state.user.allPermissions //<--- here you will get permissions for your user from Redux store
});

export const RequireLogin = connect(mapStateToProps)(RequireLoginComponent);

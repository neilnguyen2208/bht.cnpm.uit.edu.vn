
import PropTypes from 'prop-types';
import authService from 'authentication/authenticationServices';

const ShowOnPermission = (props) => {
  const couldShow =
    authService.isGrantedAll(props.permissions)
    || (props.isAny && authService.isGrantedAny(props.permissions));
  return couldShow ? props.children : null;
};

ShowOnPermission.propTypes = {
  permissions: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  isAny: PropTypes.bool
};

export default ShowOnPermission;


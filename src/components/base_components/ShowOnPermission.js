
import authService from 'authentication/authenticationServices';

const ShowOnPermission = (props) => {
  const couldShow =
    authService.isGrantedAll(props.permissions)
    || (props.isAny && authService.isGrantedAny(props.permissions));
  return couldShow ? props.children : null;
};

export default ShowOnPermission;


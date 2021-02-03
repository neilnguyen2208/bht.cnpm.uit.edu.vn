// import * as React from 'react';

// import { Redirect, Route } from 'react-router-dom';

// import { isAllGranted, isAnyGranted } from 'shared/lib/abpUtility';

// declare var abp: any;

// const ProtectedRoute = ({ path, component: Component, isAny, permissions, render, ...rest }: any) => {
//   return (
//     <Route
//       {...rest}
//       render={props => {
//         if (!abp.session.userId)
//           return (
//             <Redirect
//               to={{
//                 pathname: '/login',
//                 state: { from: props.location },
//               }}
//             />
//           );

//           {console.log(permissions)}
//         if (permissions.length > 0 && !
//           ((!isAny && isAllGranted(permissions))
//             || (isAny && isAnyGranted(permissions))
//           )) {
//           return (
//             <Redirect
//               to={{
//                 pathname: '/exception?type=401',
//                 state: { from: props.location },
//               }}
//             />
//           );
//         }

//         return Component ? <Component {...props} /> : render(props);
//       }}
//     />
//   );
// };

// export default ProtectedRoute;

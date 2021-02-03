// import * as React from 'react';

// import { Route, Switch } from 'react-router-dom';
// import ProtectedRoute from 'app/shared/components/Router/ProtectedRoute';
// import utils from 'shared/utils/utils'
// import { navRouters } from './router.config';
// import NotFoundRoute from "./NotFoundRoute";

// const Router = () => {
//   const Login = utils.getRoute('/login').component;
//   const Register = utils.getRoute('/register').component;
//   const Forget = utils.getRoute('/forget').component;
//   const ManagementLayout = utils.getRoute('/admin').component;
//   const AppLayout = utils.getRoute('/').component;
//   const Logout = utils.getRoute('/logout').component;
//   const Exception = utils.getRoute('/exception?:type').component;

//   //Route is AppLayout
//   //ProtectedRoute is ManagementLayout

//   return (
//     <Switch>

//       {/* Login, logout, home */}
//         <Route path="/login" exact render={(props: any) => <AppLayout {...props}><Login {...props}/></AppLayout>}/>

//         <Route path="/register" render={(props: any) => <AppLayout {...props}><Register {...props} /></AppLayout>} />
//         <Route path="/forget" render={(props: any) => <AppLayout {...props}><Forget {...props} /></AppLayout>} />
//       <Route path="/logout" exact render={(props: any) => <Logout {...props} />} />
//       <Route path="/" exact render={(props: any) => <AppLayout {...props} />} />

//       {/* Dashboard */}
//       <ProtectedRoute path="/admin" exact permissions={utils.getRoute('/admin').permissions} render={(props: any) => <ManagementLayout {...props} />} />
//       <ProtectedRoute path="/admin/users" exact permissions={utils.getRoute('/admin/users').permissions}  render={(props: any) => < ManagementLayout {...props} />} />
//       <ProtectedRoute path="/admin/roles" exact permissions={utils.getRoute('/admin/roles').permissions}  render={(props: any) => < ManagementLayout {...props} />} />
//       <ProtectedRoute path="/admin/tenants" exact permissions={utils.getRoute('/admin/tenants').permissions}  render={(props: any) => < ManagementLayout {...props} />} />

//       {/* Exception */}
//       <ProtectedRoute path="/exception?:type" exact permissions={utils.getRoute('/exception?:type').permissions} render={(props: any) => < Exception {...props} />} />

//       {/* Group */}
//       {navRouters.map(route =>
//         (route.permissions.length > 0) ?
//           <ProtectedRoute path={route.path} permissions={route.permissions} key={route.path} exact={route.exact} isAny={route.isAny} render={(props: any) => <AppLayout {...props} />} />
//           :
//           <Route path={route.path} key={route.path} exact={route.exact} render={(props: any) => <AppLayout {...props} />} />
//       )}
//         <Route render={(props => <AppLayout {...props}><NotFoundRoute/></AppLayout>)}/>
//     </Switch>
//   );
// };

// export default Router;

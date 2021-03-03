import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
// import Landing from '../../Landing/index';
// import NotFound404 from '../../DefaultPage/404/index';
// import LockScreen from '../../Account/LockScreen/index';
// import LogIn from '../../Account/LogIn/index';
// import LogInPhoto from '../../Account/LogInPhoto/index';
// import Register from '../../Account/Register/index';
// import RegisterPhoto from '../../Account/RegisterPhoto/index';
// import ResetPassword from '../../Account/ResetPassword/index';
// import ResetPasswordPhoto from '../../Account/ResetPasswordPhoto';
// import WrappedRoutes from './WrappedRoutes';

// Screens
import VendorsService from "../../../screens/Vendors/VendorsService/VendorsService"
import Dashboard from "../../../screens/Dashboard/Dashboard";
import AddStation from "../../../screens/StationManagement/AddStation/AddStation";
import StationManagement from "../../../screens/StationManagement/StationManagement";
import UserManagement from "../../../screens/UserManagement/UserManagement";
import AddUser from "../../../screens/UserManagement/AddUser/AddUser";
import Vendors from '../../../screens/Vendors/Vendors';
import Revenue from "../../../screens/Revenue/Revenue";
import ItemDetails from '../../../screens/Vendors/VendorsService/ItemDetails/ItemDetails';
import AddVendorService from "../../../screens/Vendors/VendorsService/AddVendorService/AddVendorService";
import Users from "../../../screens/Users/Users";
import AddService from "../../../screens/ServiceManagement/AddService/AddService";
import ProfileSettings from "../../../screens/ProfileSettings/ProfileSettings";
import Forgot_password from "../../../screens/ForgotPassword/Forgot_password";
import Log_in from "../../../screens/Login/Log_in";
import Reset_password from "../../../screens/ResetPassword/Reset_password";
import OTP1 from "../../../screens/OTP/OTP";

// components
import Drawer from "../../../components/Drawer/Drawer";

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact={true} path="/" component={Log_in} />
        <Route path="/forgot-password" component={Forgot_password} />
        <Route path="/reset-password" component={Reset_password} />
        <Route path="/otp" component={OTP1} />
        <Route path="/dashboard" render={(props) => <Drawer page={<Dashboard />} />}/>
        <Route path="/station-management" exact={true} render={props => <Drawer page={<StationManagement />} />}/>
      {  <Route path="/station-management/:station_id" render={props => <Drawer page={<AddStation />} />} />}
        <Route path="/user-management" exact={true} render={props => <Drawer page={<UserManagement />} />}/>
        <Route path="/user-management/:user_id" exact={true} render={props => <Drawer page={<AddUser />} />} />
        <Route path="/vendors" exact={true} render={props => <Drawer page={<Vendors />} />} />
        <Route path="/revenue" exact={true} render={props => <Drawer page={<Revenue />} />} />
        <Route path="/users" exact={true} render={props => <Drawer page={<Users />} />} />
        {<Route path="/profile" render={props => <Drawer page={<ProfileSettings />} />} />}
        <Route path="/vendors-service" exact={true} render={props => <Drawer page={<VendorsService />} />} />
        <Route path="/vendors-service/:vendor_id" exact={true} render={props => <Drawer page={<AddVendorService />} />} />
        <Route path="/services/:service_id" exact={true} render={props => <Drawer page={<AddService />} />} />
        <Route path="/vendors-service/item-details/:item_id" exact={true} render={props => <Drawer page={<ItemDetails />} />} />
        {// <Route exact path="/" component={Landing} />
        // <Route path="/404" component={NotFound404} />
        // <Route path="/lock_screen" component={LockScreen} />
        // <Route path="/log_in" component={LogIn} />
        // <Route path="/log_in_photo" component={LogInPhoto} />
        // <Route path="/register" component={Register} />
        // <Route path="/register_photo" component={RegisterPhoto} />
        // <Route path="/reset_password" component={ResetPassword} />
        // <Route path="/reset_password_photo" component={ResetPasswordPhoto} />
      // <Route path="/" component={WrappedRoutes} />
    }
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;

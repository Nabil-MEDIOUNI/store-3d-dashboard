import React, { memo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import LandingPage from "./landingPage";

import SignIn from "./authentification/signin";
import SignUp from "./authentification/signup";
import UserValidation from "./authentification/validation";

import ForgotPassword from "./authentification/passwordRecovery/forgotPassword";
import ResetPassword from "./authentification/passwordRecovery/resetPassword";

import PageNotFound from "./pageNotFound";

import PrivateRoute from "../utils/route/PrivateRoute";
import LoginRoute from "../utils/route/LoginRoute";
import AdminRoute from "../utils/route/AdminRoute";

import Dashboard from "./dashboard";
import Dashboard3D from "./3d-dashboard";

import Settings from "./settings";

import AllDevices from "./devices";
import SingleDevice from "./singleDevice";

import AllUsers from "./users";

import NotificationList from "./notifications";
import DevicePositions from "./devicePositions";

const App = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute
        exact
        path="/dashboard"
        key="dashboard"
        component={Dashboard}
      />
      <PrivateRoute
        exact
        path="/3d-dashboard"
        key="3d-dashboard"
        component={Dashboard3D}
      />
      <PrivateRoute
        exact
        path="/settings"
        key="settings"
        component={Settings}
      />
      <PrivateRoute
        exact
        path="/devices"
        key="devices"
        component={AllDevices}
      />
      <PrivateRoute
        exact
        path="/devices/:id"
        key="singleDevice"
        component={SingleDevice}
      />
      <PrivateRoute
        exact
        path="/device-positions"
        key="device-positions"
        component={DevicePositions}
      />
      <AdminRoute exact path="/users" key="users" component={AllUsers} />
      <PrivateRoute
        exact
        path="/notifications"
        key="notifications"
        component={NotificationList}
      />
      {/* Authentication routes */}
      <LoginRoute exact path="/sign-in" key="sign-in" component={SignIn} />
      <LoginRoute exact path="/sign-up" key="sign-up" component={SignUp} />
      {/* Password recovery routes */}
      <LoginRoute
        exact
        path="/forgot"
        key="forgot"
        component={ForgotPassword}
      />
      <LoginRoute
        path="/reset/:id"
        key="/reset"
        exact
        component={ResetPassword}
      />
      {/* Validation route */}
      <Route
        path="/validate/:validationId"
        key="validate"
        exact
        component={UserValidation}
      />
      {/* Other routes */}
      <Route exact path="/" key="landing-page" component={LandingPage} />
      <Route component={PageNotFound} />
    </Switch>
  </BrowserRouter>
);

export default memo(App);

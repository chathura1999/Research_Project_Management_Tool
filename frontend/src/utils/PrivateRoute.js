import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = localStorage.getItem("userCred");
    return <Route {...rest} render={(props) => (true ? <Component {...props} /> : <Redirect to='/login' />)} />;
};

export default PrivateRoute;

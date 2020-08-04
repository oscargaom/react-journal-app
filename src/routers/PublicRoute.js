import React from 'react'
import PropTypes from 'prop-types'

import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({isAuthenticated, component: Component, ...rest}) => {

    // console.log('=====================');
    // console.log('isAuthenticated PublicRoute');
    // console.log(isAuthenticated);
    // console.log('component');
    // console.log(Component);
    // console.log('rest');
    // console.log(rest);

    return(
        /* Route nos provee por default la prop con la información del history 
            y demás props como location y match gracias al react-router-dom */
        <Route {...rest} 
            component={props => (
                (!isAuthenticated)
                ? <Component {...props} />
                : <Redirect to="/" />
            )}
        />
    );
};

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
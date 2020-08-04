import React from 'react'
import PropTypes from 'prop-types'

const { Route, Redirect } = require("react-router-dom");

export const PrivateRoute = ({isAuthenticated, component: Component, ...rest}) => {
    
    // console.log('=====================');
    // console.log('isAuthenticated PrivateRoute');
    // console.log(isAuthenticated);
    // console.log('component');
    // console.log(Component);
    // console.log('rest');
    // console.log(rest);

    // const {location:{pathname}} = rest;
    // console.log(pathname);
    // localStorage.setItem('lastPath', pathname);

    /*  {...rest} contiene {path: "/", location: {…}, computedMatch: {…}}
        {component} contiene DashboardRoutes
        {props} contiene {history: {…}, location: {…}, match: {…}, staticContext: undefined}

        De manera que este componente si el usuario esta autenticado lo que hace es crear un componente:

            <Route path="/" location={…} computedMatch={…} 
                component={ <DashboardRoutes history={…} location={…} match={…} staticContext=undefined/>}
            />

        en caso contrario:
            
            <Route path="/" location={…} computedMatch={…} 
                component={ <Redirect to="/login"/>}
            />
    */

    return <Route {...rest}
                component={ (props) => {
                    // console.log(props);
                    return (isAuthenticated)
                    ? (<Component {...props} />)
                    : (<Redirect to="/auth/login" />)
                }}
    />;
    
};

/*  El componente se define de tipo función porque los 
    componentes son arrow functions.
*/
PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired 
}
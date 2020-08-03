import React from "react";
import {Redirect} from "@reach/router";
import {AuthContext} from "../context/auth";


export default function PrivateRoute(props) {
    let {component: Component, ...otherProps} = props;

    return (
        <AuthContext.Consumer>
            { ({authUser}) =>
                authUser ? <Component {...otherProps} /> : <Redirect to={"/login"} noThrow/>
            }
        </AuthContext.Consumer>
    )
}



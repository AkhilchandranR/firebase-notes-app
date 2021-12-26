import React from "react"
// we import the Route and Redirect components from rrd.
import { Route, Redirect } from "react-router-dom"
// and this useAuth function from the context.
import { useAuth } from "../useContext"

// make this function called PrivateRoute
// which will expect to take a component parameter, and any others.
export default function PrivateRoute({ component: Component, ...rest }) {
  // extract currentUser from a useAuth call. which might be persistent.
  const { currentUser } = useAuth()
  // when rendered, PrivateRoute is made of a route component.
  // rest props are passed. and you just define this render method
  // which chooses to render the component passed or not, based on
  // whether currentUser is truthy.
  // props are passed through the render method to the component.
  // if it chooses not to render, it will redirect user to login route.
  // which, according to App.js, will take that route and render a component.
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}

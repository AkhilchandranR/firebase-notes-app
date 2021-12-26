// we want React and 2 hooks for this.
import React, { useRef, useState } from "react"
// basic shit from bootstrap.
import { Form, Button, Card, Alert } from "react-bootstrap"
// grab the useAuth function (component?) from our context.
import { useAuth } from "../useContext"
// get Link component, and useHistory component
import { Link, useHistory } from "react-router-dom"
// this is probably something shit.
import CenteredContainer from "./CenteredContainer"

// The login function.
export default function Login() {
  // Just create a new default reference. it works like a pin.
  // a tag. flag. yeah a pin.
  const emailRef = useRef()
  const passwordRef = useRef()
  // run useAuth and extract the login variable.
  const { login } = useAuth()
  // default error useState.
  const [error, setError] = useState("")
  // by default, loading will be false.
  const [loading, setLoading] = useState(false)
  // name the useHistory call: history.
  const history = useHistory()
  // create an async function which takes an event.
  async function handleSubmit(e) {
    // prevents defaulting.
    e.preventDefault()

    // and attempts to do this.
    try {
      setError("")
      // set loading true.
      setLoading(true)
      // before doing anything else, wait for this to call login,
      // with those
      // wait for that function to finish.
      await login(emailRef.current.value, passwordRef.current.value)
      // then push default route to history.
      // this works like a redirect, but it works when  a component
      // is being rendered by the router, not a prop to a route.
      // well it renders the component. perhaps it doesn't refresh.
      history.push("/")
    } catch {
      setError("Failed to log in")
    }
      // if loading is false, the login button is not disabled.
    setLoading(false)
  }
  // and we use some basic form control methods
  // in each form object, we call handleSubmit.
  // but for each .Control object. we use one of the refs we created.
  

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </CenteredContainer>
  )
}

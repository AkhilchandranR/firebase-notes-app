import React, { useState } from "react"
// basic styled elements.
import { Card, Button, Alert } from "react-bootstrap"
// an auth function. that is used.
import { useAuth } from "../useContext"
// the link component, and a custom hook made by reactrouterdom.
// useHistory. what does it do? what are its powers?
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"
import Header from "../components/Header/Header"

export default function Profile() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  // perfect. put the navbar here.
  // so that we can get out of the user route.
  // then don't display

  return (
    <>
    <Header/>
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </CenteredContainer>
    </>
  )
}

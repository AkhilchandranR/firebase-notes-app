import React from "react"
import { Container } from "react-bootstrap"

// it's just a bootstrap container
// uses the hidden children prop.
// and renders everything in a div.
// this is for the login component.
export default function CenteredContainer({ children }) {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {children}
      </div>
    </Container>
  )
}

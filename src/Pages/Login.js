import React, { useRef, useState } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { login } from "../firebase"
import { useNavigate } from "react-router-dom"



export default function Login({navigation}) {
  const emailRef = useRef()
  const passwordRef = useRef()
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const[loggedIn, setLoggedInValue] = useState(false)

  let abortController = new AbortController();
  let aborted = abortController.signal.aborted;

  async function handleLogIn(){
    setLoading(true);
    try {
      await login(emailRef.current.value,passwordRef.current.value)
      setLoggedInValue(true)
      navigate("/");
    } catch{
      alert("Log In Failed");
    }
    setLoading(false);
  }


  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button onClick = {handleLogIn} disabled = {loading} className="btn-btn purple" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
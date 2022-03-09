import React, { useRef, useState } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { login } from "../firebase"


export default function Login({navigation}) {
  const emailRef = useRef()
  const passwordRef = useRef()
  async function handleLogIn(){
    try {
      
      await login(emailRef.current.value, passwordRef.current.value)
      this.props.navigation.navigate('Home');
    } catch {
      alert("Failed to log in")
    }
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
            <Button onClick = {handleLogIn} className="w-100" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
import React, { useRef, useState } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { signup } from "../firebase"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Signup() {
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  let navigate = useNavigate();
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  async function handleSignUp(){
    setLoading(true);
    try {
      await signup(emailRef.current.value,passwordRef.current.value)
      navigate("/");
    } catch{
      alert("Sign Up Failed");
    }
    setLoading(false);
  }


  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button onClick = {handleSignUp} disabled = {loading} className="btn-btn purple" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}
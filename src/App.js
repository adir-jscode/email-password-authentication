import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword  } from "firebase/auth";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import app from './firebase.init';
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);

function App() {
   const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  }
  
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  }
  
  const handleSubmit = (event) => {
       event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
     
      event.stopPropagation();
      return;
    }

    if (!/(?=.*[0-9])/.test(password)) {
      setError('Password should contain one number');
      return;
    }

    setValidated(true);
    setError('');
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
      console.error(error);
    })

    console.log('submit',email,password);
    event.preventDefault();
  }
  return (
    <div className="App">
      <h2 className="text-primary text-center">Please register your account</h2>


      <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-50 mx-auto mt-3">
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmailBlur} type="email" required placeholder="Enter email" />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handlePasswordBlur} type="password" required placeholder="Password" />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
          <p className="text-danger">{ error}</p>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>

      {/* <form onSubmit={handleSubmit} action="">
        <input onBlur={handleEmailBlur} type="email" name="" id="" />
      <br />
      <input onBlur={handlePasswordBlur} type="password" name="" id="" />
      <br />
      <input  type="submit" value="submit" />

      </form> */}
    </div>
  );
}

export default App;

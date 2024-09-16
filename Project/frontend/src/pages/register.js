import React from 'react';
import '../styles/login.css';
import '../styles/pages_general.css';
import axios from 'axios';


function Register() {
  const [form_data, setFormData] = React.useState({
    username: '',
    password: '',
    repeat_password: '',
    email: ''
  });
  const url = "http://" + (process.env.BACKEND_HOST || 'localhost') + "/api/register/";
  const headers = { "Content-Type": "multipart/form-data" };


  const handle_change = (e) => {
    setFormData({ ...form_data, [e.target.name]: e.target.value });
  }

  const handle_submit = (e) => {
    e.preventDefault();
    if (form_data.password !== form_data.repeat_password) {
      alert('Passwords do not match');
      return;
    } else {
      let data = {
        username: form_data.username,
        password: form_data.password,
        email: form_data.email
      }
      console.log(data)
      axios({
          method: 'post',
          url: url,
          data: data,
          headers: headers
        }).then((res) => {
          alert('Registered');
          window.location.href = '/login';
        }).catch((err) => {
          console.log(err);
          alert('Invalid credentials');
        });
    }
  }

  return (
    <div className="container wrapper">

      <div className="login-box">
        <form onSubmit={handle_submit}>
          <h2>Register</h2>

          <div className="input-box">
            <input type="text" name='username' required onChange={handle_change} pattern='[A-Za-z]{3,}' />
            <label>Username</label>
          </div>

          <div className="input-box">
            <input type="email" name='email' required onChange={handle_change} />
            <label>Email</label>
          </div>

          <div className="input-box">
            <input type="password" name='password' required onChange={handle_change} />
            <label>Password</label>
          </div>

          <div className="input-box">
            <input type="password" name='repeat_password' required onChange={handle_change} />
            <label>Confirm Password</label>
          </div>

          <button type="submit">Register</button>
          
        </form>
        <div className="register-link">
            <p>Already have an account? </p>
            <a href="/login">
              <button>Login</button>
            </a>
          </div>
      </div>
     
    </div>
  )
}

export default Register;

import React from 'react';
import '../styles/login.css';
import '../styles/pages_general.css';
import axios from 'axios';

function Login(){
  const [form_data, setFormData] = React.useState({
    username: '',
    password: ''
  });
  const url = "http://" + (process.env.BACKEND_HOST || 'localhost') + "/api/login/";
  const headers = { "Content-Type": "multipart/form-data" };

  const handle_change = (e) => {
    setFormData({ ...form_data, [e.target.name]: e.target.value });
  }

  const handle_submit = (e) => {
    e.preventDefault();
    console.log(form_data)
    axios({
      method: 'post',
      url: url,
      data: form_data,
      headers: headers
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      alert('Logged in');
      window.location.href = '/';
    }).catch((err) => {
      console.log(err);
      alert('Invalid credentials');
    });
  }
  
  return (
      <div class="container wrapper">

      <div className="login-box">
        <form onSubmit={handle_submit}>
          <h2>Login</h2>

          <div className="input-box" >
            <span className="icon">
              <ion-icon name="username"></ion-icon>
            </span>
            <input type="text" name='username' required onChange={handle_change} pattern='[A-Za-z]{3,}'/>
            <label>Username</label>
          </div>
    
          <div className="input-box">
            <span className="icon">
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input type="password" name='password' required onChange={handle_change} />
            <label>Password</label>
          </div>
{/*     
          <div className="remember">
            
            <label><input type="checkbox" /> Remember me</label>
            </div> 
            <div className="forgot">
            <button>Forgot Password?</button>
          </div> */}
          <button type='submit'>Login</button>
          
        </form>

        <div className="register-link">
          <p>Don't have an account? </p>
          <a href="/register">
            <button>Register</button>
          </a>
        </div>
        
      </div>
    
    </div>
  )
}

export default Login;
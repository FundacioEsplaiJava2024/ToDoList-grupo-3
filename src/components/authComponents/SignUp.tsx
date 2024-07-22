import { Component } from 'react';
import './FormStyle.css';

export default class SignUp extends Component {
  render() {
    return (
      <form className='formAuth'>
        <h2 className='title'>Sign Up</h2>

        <div className='forms'>
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
          />

          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />


          <div>
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
        </div>

        <div>
          <button className="buttonForm" type="submit">
            Sign Up
          </button>
        </div>
        <p className="mistake">
          You don't have account? <a href="/">sign in</a>
        </p>
      </form>
    )
  }
}
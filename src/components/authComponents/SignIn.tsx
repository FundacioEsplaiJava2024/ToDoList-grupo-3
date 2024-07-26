import { Component } from "react";
import './FormStyle.css';

export default class Login extends Component {
  render() {
    return (
      <form className='formAuth'>
        <h2 className='title'>Sign In</h2>

        <div className="forms">
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
        </div>
        <div>
          <button className="buttonForm" type="submit">
            Submit
          </button>
        </div>
        <p className="mistake">
          You don't have account? <a href="/sign-up">Sign up</a>
        </p>
      </form>
    );
  }
}
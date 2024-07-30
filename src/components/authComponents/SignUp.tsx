import { Component } from "react";
import './FormStyle.css';
import { HttpService } from './../../services/HttpService';
import { StorageService } from './../../services/StorageService';
import { Navigate } from "react-router-dom";


type RegisterState = {
  username: string,
  password: string,
  email: string,
  error: string,
  redirect: boolean
  usernameError: string,
  passwordError: string,
  emailError: string
};

type RegisterProps = {};
export default class Login extends Component<RegisterProps, RegisterState> {
  httpService: HttpService;
  storageService: StorageService;

  constructor(props: any) {

    super(props);
    this.httpService = new HttpService();
    this.storageService = new StorageService();

    this.register.bind(this);
    this.state = {
      username: '',
      password: '',
      email: '',
      error: '',
      redirect: false,
      usernameError: '',
      passwordError: '',
      emailError: ''
    };
  }
  register(event: any) {
    event.preventDefault();
    console.log(this.state.username)
    const body = { username: this.state.username, email: this.state.email, password: this.state.password };

    if (!body.username || body.username.trim() === '' || body.username.length > 17) {
      this.setState({ usernameError: 'Username must be between 1 and 17 characters' });
      return;
    } else {
      this.setState({ usernameError: '' });
    }

    if (!body.password || body.password.trim() === '' || body.password.length > 25 || body.password.length < 8) {
      this.setState({ passwordError: 'Password must be between 8 and 25 characters' });
      return;
    } else {
      this.setState({ passwordError: '' });
    }

    if (!body.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+/)) {
      this.setState({ passwordError: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character and it can\'t be any other kind' });
      return;
    } else {
      this.setState({ passwordError: '' });
    }

    if (!body.email || body.email.trim() === '' || !body.email.match(/^.+@.+$/)) {
      this.setState({ emailError: 'Invalid email address' });
      return;
    } else {
      this.setState({ emailError: '' });
    }

    this.httpService.doPost('/todolist/user/register'
      , body
      , () => {
        this.setState({ redirect: true })
        alert('User created successfully!');
      }
      , () => this.setState({ error: 'Registration is not successful' }))

  }

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
            onChange={(e) => this.setState({ username: e.target.value })}
          />

          <p style={{ color: 'red' }}>{this.state.usernameError}</p>

          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />

          <p style={{ color: 'red' }}>{this.state.passwordError}</p>

          <div>
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />

            <p style={{ color: 'red' }}>{this.state.emailError}</p>
          </div>
        </div>

        <div>
          <button className="buttonForm" type="submit" onClick={e => this.register(e)}>
            Sign Up
          </button>
        </div>
        <p className="mistake">
          Already registered? <a href="/">Sign in</a>
        </p>
        <p>{this.state.error}</p>
        {this.state.redirect ? <Navigate to="/*" /> : ''}
      </form>
    )
  }
}
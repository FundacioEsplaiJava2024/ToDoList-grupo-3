import { Component } from "react";
import './FormStyle.css';
import {HttpService} from './../../services/HttpService';
import {StorageService} from './../../services/StorageService';
import { Navigate} from "react-router-dom";


type RegisterState = { username: string, password:string, email: string, error:string,redirect:boolean };
type RegisterProps = {};
export default class Login extends Component<RegisterProps,RegisterState> {
httpService:HttpService;
storageService: StorageService;

  constructor(props:any) {

    super(props);
    this.httpService = new HttpService();
    this.storageService = new StorageService();
    
    this.register.bind(this);
    this.state = {
      username: '',
      password: '',
      email: '',
      error:'',
      redirect:false
  };
  }
register(event:any){
  event.preventDefault();
  console.log(this.state.username)
  const body = {username:this.state.username, email:this.state.email, password:this.state.password};
this.httpService.doPost('/todolist/user/register'
  ,body
  ,()=>this.setState({redirect:true})
  ,()=>this.setState({error:'Registration is not successful'}))

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

        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />


        <div>
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>
      </div>

      <div>
        <button className="buttonForm" type="submit" onClick={e=>this.register(e)}>
          Sign Up
        </button>
      </div>
      <p className="mistake">
        You don't have account? <a href="/">sign in</a>
      </p>
      <p>{this.state.error}</p>
      {this.state.redirect?<Navigate to="/*" />:''}
    </form>
  )
}
}
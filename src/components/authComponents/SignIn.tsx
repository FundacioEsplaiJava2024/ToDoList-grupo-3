import { Component } from "react";
import './FormStyle.css';
import {HttpService} from './../../services/HttpService';
import {StorageService} from './../../services/StorageService';
import { Navigate} from "react-router-dom";


type LoginState = { username: string, password:string, error:string,redirect:boolean };
type LoginProps = {};

export default class Login extends Component<LoginProps,LoginState> {
httpService:HttpService;
storageService: StorageService;

  constructor(props:any) {

    super(props);
    this.httpService = new HttpService();
    this.storageService = new StorageService();
    
    this.login.bind(this);
    this.state = {
      username: '',
      password: '',
      error:'',
      redirect:false
  };
  }
login(event:any){
  event.preventDefault();
  console.log(this.state.username)
  const body = {username:this.state.username, password:this.state.password};
this.httpService.doPost('/todolist/user/login'
  ,body
  ,(token:string)=>{this.storageService.setItem("jwt",'Bearer '+token);
   this.setState({redirect:true})
  }
  ,()=>this.setState({error:'Login or password is incorrect'}))

}

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
            onChange={(e) => this.setState({ username: e.target.value })}
          />
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        <div>
          <button className="buttonForm" type="submit" onClick={e=>this.login(e)}>
            Submit
          </button>
        </div>
        <p className="mistake">
          You don't have account? <a href="/sign-up">Sign up</a>
        </p>
        <p>{this.state.error}</p>
        {this.state.redirect?<Navigate to="/tasks" />:''}
      </form>
    );
  }
}
import React ,{ Component } from 'react'
import {Link, Route, Switch, Redirect } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import AuthService from './service/AuthService';
import './App.css';
export default class App extends Component {

  state={
    user: null,
    loading: true
  }
  setUser = (user) => {
    this.setState({
      user: user,
      loading: false
    })
  }

  service = new AuthService()

  checkAuthenticated = () => {
    if(this.state.user === null) {
      this.service.isAuthenticated()
      .then(response => {
        this.setState({
          user: response,
          loading: false
        })
        })
        .catch( err => {
          this.setState({
            user: false,
            loading: false
          })
      })
    }
  }

 userLogout= () => {
    this.service.logout()
     .then(res => {
      this.setState({
        user: false,
        loading: false
      })
     })
 }

  render() {
    this.checkAuthenticated()

    const loggedInNavbar =  
    <>
      <Link to="/profile">Profile</Link>
      <Route path="/profile" component={() => <Profile user={this.state.user}/>} />
      <button onClick={this.userLogout}>Logout</button>
    </>

    return (
      <div className="App">
        Welcome to the Index Page
              
        {this.state.loading && "Loading"}

        {!this.state.loading && this.state.user ? loggedInNavbar : <Redirect to="/login"/> }

        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Switch>
          <Route path="/signup" component={() => <Signup/>} />
          <Route path="/login" component={(props) =>  <Login {...props} setUser={this.setUser}/>} />
        </Switch>
      </div>
    )
  }
}
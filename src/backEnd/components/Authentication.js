import React, {Component} from "react";
import * as XLSX from "xlsx";
//import {getLoja, createLoja} from '../services/LojaService'

class Authentication extends React.Component {
    constructor(){
        super()
        this.state ={
          fullName: '',
          username: '',
          email:'',
          password:'',
        }
        this.changeFullName = this.changeFullName.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleCallback = (childData) =>{
      this.setState({dados: childData})
  }
  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    console.log(file);
    this.setState({ file });
  }
  changeFullName(event){
    this.setState({
      fullName:event.target.value
    })
  }
  changeUsername(event){
    this.setState({
      username:event.target.value
    })
  }
  changeEmail(event){
    this.setState({
      email:event.target.value
    })
  }
  changePassword(event){
    this.setState({
      password:event.target.value
    })
  }
  handleSubmit(event){
    event.preventDefault()

    const registered = {
      fullName: this.state.fullName,
      username: this.state.username,
      email : this.state.email,
      password: this.state.password
    }
    axios.post('http://localhost:4000/app/signup', registered)
    .then(response => console.log(response.data))

    this.setState({
      fullName: '',
      username: '',
      email:'',
      password:''
    })
  }
  render(){
    return(
      
      <div>
        
        <div className="container">
          <div className="form-div">
            <form onSubmit = {this.handleSubmit}>
              <input type="text" placeholder='Full Name' onChange={this.changeFullName} value={this.state.fullName} className="form-control form-group"/>
              <input type="text" placeholder="Username" onChange={this.changeUsername} value={this.state.username} className="form-control form-group"/>
              <input type="text" placeholder="e-mail" onChange={this.changeEmail} value={this.state.email} className="form-control form-group"/>
              <input type="text" placeholder="Password" onChange={this.changePassword} value={this.state.password} className="form-control form-group"/>
              <input type="submit" className="btn btn-danger btn-block" value="Submit"/>
            </form>
            <p>......................................................................</p>
            
          </div>
        </div>
      </div>
    );
  }

}


export default Authentication;
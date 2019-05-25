import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import { Alert } from 'reactstrap';
import './Login.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
export default class Login extends Component {
  
constructor(props) {
    super(props);
    this.state = 
    {login: "",
     password: "",
     isAuth: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  

  handleSubmit(event) {
    
    event.preventDefault();
    const user = {
        login: this.state.login,
        password:this.state.password
      };
      
      axios.post('http://localhost:8000/api/signin',
       user,{ withCredentials: true })
        .then(result => {
          //console.log(document.cookie)
          if(result.status===200){
            
             //var temp=result.data.idUser;
             //var temp1=result.data.type;
             //var temp2=result.data.name;
             var t=true;
            //this.props.getData({id:temp,isAuth:true,name:temp2,type:temp1});
            localStorage.setItem("id", JSON.stringify(result.data.idUser))
    localStorage.setItem("isAuth", JSON.stringify(t))
    localStorage.setItem("name", JSON.stringify(result.data.name))
    localStorage.setItem("type", JSON.stringify(result.data.type));
            this.setState({isAuth:true});
          }          
        });
  }
 

  render() {
    if(this.state.isAuth===true)
    {
       //return <Redirect to='/profile'/>       
       this.props.history.push('/profile')
    }
    return(



      <div style={{'display': 'grid',
      'placeItems': 'center',
      'height': '100vh'}}>
      <Form  style={{'textAlign':'center'}} onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Логин</Label>
          <Input   style={{'borderRadius': '5px','textAlign': 'center'}} type="email" name="login" id="exampleEmail" placeholder="введите логин"  value={this.state.login} onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Пароль</Label>
          <Input   style={{'borderRadius': '5px','textAlign': 'center'}} type="password" name="password" id="examplePassword" placeholder="введите пароль" value={this.state.password} onChange={this.handleChange} />
        </FormGroup>
        <Button style={{'borderRadius': '5px'}} color="success">Войти</Button>
      </Form>
      </div>
    )
    /*
    return(
    <div  style={{'display': 'grid',
    'place-items': 'center',
    'height': '100vh'}}>
      <form  style={{'text-align':'center'}} onSubmit={this.handleSubmit}>
       <div style={{'text-align': 'center',  color: 'green', 'font-family':'Arial, Helvetica, sans-serif'}}><label >
          Почта:
          <div><input  style={{'border-radius': '2px','text-align': 'center'}}type="text"  name="login" value={this.state.login} onChange={this.handleChange} /></div>
        </label></div>
        <br />
        <div style={{'text-align': 'center',  color: 'green', 'font-family':'Arial, Helvetica, sans-serif'}}><label>
          Пароль:
          <div> <input  style={{'border-radius': '2px','text-align': 'center'}} type="text"  name="password" value={this.state.password} onChange={this.handleChange} /></div>
        </label></div>
        <br />
        <input style={{'font-family':'Arial, Helvetica, sans-serif',color: 'green'
    }} type="submit" value="Войти" />
     
      </form>
      </div> 
    );*/

  }
  
}

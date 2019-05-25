import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import { Alert } from 'reactstrap';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
export default class Logout extends Component {

    constructor(props) {
        super(props);
       this.lal=this.lal.bind(this)
        };

    lal(){
      
      localStorage.clear();
      return(<div>
        <Redirect to={{
             pathname: '/'
         }} />
  </div>)
 }    
    
    componentDidMount(){
        axios.get('http://localhost:8000/api/logout',{
            withCredentials: true}).then(response => { 
              if(response.status===200){
                localStorage.removeItem("id");
                localStorage.removeItem("name");
                localStorage.removeItem("type");
                localStorage.removeItem("isAuth");
              }
            })
            .catch(error => {
              console.log(error.response)
          })
         
    }

        render() {
          
         return(<div>
           {this.lal()}
         </div>)
        }    

}
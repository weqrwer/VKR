import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Router, BrowserRouter, Route, Link } from "react-router-dom";
import  NavProf from './NavProf.js';
import { Table } from 'reactstrap';
import { Jumbotron, Container } from 'reactstrap';
export default class ProfessorsApp extends React.Component{
  constructor(props) {
    super(props);
    this.state = { error: null,
      
      items: []
  }
  }
  componentDidMount() {
    var url='http://localhost:8000/api/professorprofile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/professorsapp'
 axios.get(url,{
  withCredentials: true}).then(response => { 
    if(response.status===200){
      console.log(response)
      this.setState({items:response.data})
    }
  })
  .catch(error => {
    console.log(error.response)
});
  }

render(){
  
  if(localStorage.length==0){
    return <Redirect to='/'  /> 
  }
console.log(this.state.items)
return(
  
<div> 
<NavProf />
           <Jumbotron fluid>
              <Container fluid>
                <p className="lead">Заявки студентов</p>
              </Container>
              </Jumbotron>
              <div style={{'margin':'20px'}}>
      <Table bordered responsive hover >
              <thead >
                <tr style={{"textAlign":'center'}}>
                  <th >Название проекта</th>
                  <th >ФИО студента</th>
                  <th >Роль</th>
                  <th >Статус</th>
                </tr>
              </thead>
              <tbody >
                
                {
                  this.state.items.map((item,index) => (
                    <tr key={index} style={{"textAlign":'center'}} >
                    <td  >
                      <Link to={'/professorappoval/'+`${item.idStudent_application}`+'/'+`${item.idRoles_of_project}`} style={{ textDecoration: 'none' ,'color':'black'}}>{item.project_name}</Link>
                    </td>
                     <td  >{`${item.middle_name}`+' '+`${item.name}`}</td>
                     <td >{item.role}</td>
                     <td  >{item.status_of_app}</td>
              
                     </tr>
                  ))
                }
              </tbody>
            </Table>
            </div>
            </div>



)
}
}

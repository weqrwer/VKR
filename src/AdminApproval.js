import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { Jumbotron, Container ,Table} from 'reactstrap';
import  NavAdmin from './NavAdmin';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default class AdminApproval extends React.Component{
    constructor(props) {
      super(props);
      this.state = 
      {information:[]}
    }
    componentDidMount() {
      var url='http://localhost:8000/api/professorprofile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/adminapproval'
      var url2='http://localhost:8000/api/professorprofile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/supervisorapproval'
      if(JSON.parse(localStorage.getItem("type"))=="admin"){
      axios.get(url,{
       withCredentials: true}).then(response => { 
         if(response.status===200){
           console.log(response)
           this.setState({information:response.data})
         }})
       .catch(error => {
         console.log(error.response)}) }
        
         if(JSON.parse(localStorage.getItem("type"))=="supervisor"){
          axios.get(url2,{
           withCredentials: true}).then(response => { 
             if(response.status===200){
               console.log(response)
               this.setState({information:response.data})
             }})
           .catch(error => {
             console.log(error.response)}) }
       }

      
       render(){
     if(localStorage.length==0){
     return <Redirect to='/'  /> 
     }
     if(this.state.information.length==0){
      return ( <div>
        <Jumbotron fluid>
      <Container fluid>
      <p className="lead">Проекты на согласование</p>
      </Container>
      </Jumbotron>
      <div style={{'textAlign':'center'}}> НЕТ ДОСТУПНЫХ ПРОЕКТОВ</div>
      </div>
      )
    }
         return( 
          <div>
            <NavAdmin />
            <Jumbotron fluid>
            <Container fluid>
            <p className="lead">Проекты на согласование</p>
            </Container>
            </Jumbotron>
            <div style={{'margin':'20px'}}>
      <Table bordered responsive hover>
              <thead>
                <tr style={{"textAlign":'center'}}>
                  <th>Название проекта</th>
                  <th>Преподаватель</th>
                  <th>Дата начала</th>
                  <th>Дата конца</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.information.map((item,index) => (
                    <tr key={index} style={{"textAlign":'center'}} >
                    <td  >
                      <Link to={'/adminapprovalofproject/'+`${item.idProjects}`} style={{ textDecoration: 'none' ,'color':'black'}}>{item.project_name}</Link>
                    </td>
                     <td  >{`${item.middle_name}`+`${ item.name}`}</td>
                     <td >{item.begdate}</td>
                     <td  >{item.enddate}</td>
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
  
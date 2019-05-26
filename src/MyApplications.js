
import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Profile.css';
import { Jumbotron, Container } from 'reactstrap';
import { Table } from 'reactstrap';
import NavStudent from "./NavStudent";
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
  
export default class MyApplications extends React.Component{
  constructor(props) {
    super(props);
    this.state={its: []};
  }
  componentDidMount() {
      const tenp=this.props.someData;
      var temp2=JSON.parse(localStorage.getItem("id"));
      const url='http://localhost:8000/api/studentprofile/'+`${temp2}`+'/myapplications';
      axios.get(url,{
  withCredentials: true}).then(response => { 
    if(response.status===200){
      console.log(response)
      this.setState({its:response.data})
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
    console.log(this.state.its)
    return(
      
        <div>
          <NavStudent />
           <Jumbotron fluid>
              <Container fluid>
                <p className="lead">Мои заявки</p>
              </Container>
              </Jumbotron>
              <div style={{'margin':'20px'}}> 
      <Table  bordered responsive hover>
              <thead>
                <tr style={{"textAlign":'center'}}>
                  <th>Название проекта</th>
                  <th>Роль проекта</th>
                  <th>Статус заявки</th>
                  
                </tr>
              </thead>
              <tbody>
                
              {this.state.its.map((item,index) => (
            <tr key={index}  style={{"textAlign":'center'}}>
            <td  >
              <Link to={'/myapplicationss/'+`${item.idStudent_application}`} style={{ textDecoration: 'none','color':'black' }}>{item.project_name}</Link>
            </td>
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
    
    /*
      return(
  
        <table style={{ 'border-collapse': 'collapse','width':"100%",backgroundColor: 'white'}}>
        <thead >
          <tr style={{border: '1px solid black' ,'font-family':'Arial, Helvetica,sans-serif','color': 'green',"height": "30px"}}>
            <th  style={{border: '1px solid black'}}>Название проекта</th>
            <th style={{border: '1px solid black'}}>Роль проекта</th>
            <th style={{border: '1px solid black'}}>Статус заявки</th>
          </tr>
        </thead>
        <tbody >
        {
          this.state.its.map(item => (
            <tr key={item.id}  style={{margin:'0px',padding:'0px',"text-align":'center', "height": "12px",'font-family':'Arial, Helvetica,sans-serif'}}>
            <td class="border-white" style={{border: '1px solid black',margin:'0px',padding:'0px'}}>
              <Link to={'/project/'+`${item.idProjects}`} style={{ textDecoration: 'none' }}>{item.project_name}</Link>
            </td>
             <td  class="border-white"style={{border: '1px solid black',margin:'0px',padding:'0px',align:"center"}}>{item.role}</td>
             <td  class="border-white"style={{border: '1px solid black',margin:'0px',padding:'0px',align:"center"}}>{item.status_of_app}</td>
             </tr>
          ))
        }
         </tbody>
      </table>
      )  
      */  }
}
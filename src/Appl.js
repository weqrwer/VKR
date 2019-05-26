import {Redirect, Link} from 'react-router-dom';
  import React from 'react';
  import axios from 'axios';
import { Table } from 'reactstrap';
import { Jumbotron, Container } from 'reactstrap';
import { Button, CardBody, Card ,Input} from 'reactstrap';
import {  CardText, 
  CardTitle, CardSubtitle} from 'reactstrap';
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
  import  NavAdmin from './NavAdmin';
export default  class Appl extends React.Component{
    constructor(props) {
      super(props);
      this.state = { error: null,
        itemss: []
    }
    }
    componentDidMount() {
      var url='http://localhost:8000/api/professorprofile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/checkstudentappl/'+`${this.props.match.params.idapp}`
   axios.get(url,{
    withCredentials: true}).then(response => { 
      if(response.status===200){
        console.log(response)
        this.setState({itemss:response.data})
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
  return(
  <div >
    <NavAdmin />
  <Jumbotron fluid>
  <Container fluid>
  <p className="lead">Заявка</p>
  </Container>
  </Jumbotron>
  <Card >
  <CardBody>
  <CardTitle> Заявка студента</CardTitle>
  <CardSubtitle className="mb-2 text-muted"> Основная информация</CardSubtitle>
  <CardText >
   {
   this.state.itemss.map(item => (
    <div>
    <div>ФИО студента: {item.middle_name}</div>
    <div>Комментарий: {item.comment}</div>
    <div>Контактная информация: {item.student_contact_inf}</div>
    <div>Дата: {item.date}</div>
    <div>Приоритет: {item.priority}</div>
    <div>Название проекта: {item.project_name}</div>
    <div>Роль проекта: {item.role}</div>
    <div>Статус: {item.status_of_app}</div>
    <br/>
    </div>
   ))}
  </CardText>
  </CardBody>
  </Card>
  </div>
  
  )
  }
  }
  
  
  
  
  
  
  
  
  
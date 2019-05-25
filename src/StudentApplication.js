import React, { Component } from 'react';
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import './Profile.css';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import {  CardText, 
  CardTitle, CardSubtitle} from 'reactstrap';
  import { Jumbotron, Container } from 'reactstrap';
  import { Table } from 'reactstrap';
  import NavStudent from "./NavStudent";

  import {
    
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

  
export default class StudentApplication extends React.Component {
    constructor(props) {
      super(props);
      this.state={ittt: []};
    }
    componentDidMount() {
        const tenp=this.props.someData;
        var tempor=JSON.parse(localStorage.getItem("id"));
        const url='http://localhost:8000/api/studentprofile/'+`${tempor}`+'/myapplications/'+`${this.props.match.params.index}`;
        axios.get(url,{
    withCredentials: true}).then(response => { 
      if(response.status===200){
        console.log(response)
        this.setState({ittt:response.data})
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
      console.log(this.state.ittt)
      if(JSON.parse(localStorage.getItem("type"))=="student"){
      return(
        
          <div>
             <NavStudent />
             <Jumbotron fluid>
        <Container fluid>
          <p className="lead">Заявка</p>
        </Container>
        </Jumbotron><Card >
     <CardBody>
    <CardTitle> Заявка на участие в проекте </CardTitle>
    <CardSubtitle className="mb-2 text-muted"> Основная информация</CardSubtitle>
    <CardText >
       
                {this.state.ittt.map((item,index) => (
              <div key={index} >
              <div  >
                Название проекта: {item.project_name}</div>
               <div > Название роли проекта: {item.role}</div>
               <div> Контактная информация: {item.student_contact_inf}</div>
               <div>Дата подачи заявки: {item.date}</div>
               <div>Приоритет: {item.priority}</div>
               <div>Комментарий: {item.comment}</div>
               <div>Статус заявки: {item.status_of_app}</div>
               </div>
            ))
          }
             </CardText>
  </CardBody>
</Card>    
              </div>
        )}
    }
  
  }
  
  
  
  
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Router, BrowserRouter, Route, Link } from "react-router-dom";
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';
  import NavStudent from "./NavStudent";
  import NavProf from "./NavProf";
  import NavAdmin from "./NavAdmin";
  import { Jumbotron, Container } from 'reactstrap';
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

import './Profile.css';
export default class Profile extends Component{
    constructor(props) {
      super(props);
      this.state={
      ID:0,
      isauth:"",
      name:"",
      type:"",
      info:[]
  }
  
}
   componentDidMount(){

    var link='http://localhost:8000/api/studentprofile/'+`${JSON.parse(localStorage.getItem("id"))}`;
    var link2='http://localhost:8000/api/professorprofile/'+`${JSON.parse(localStorage.getItem("id"))}`;
    if(JSON.parse(localStorage.getItem("type"))=="student"){
      axios.get(link,{
        withCredentials: true}).then(response => { 
          if(response.status===200){
            this.setState({info:response.data})
          }
        })
        .catch(error => {
          console.log(error.response)
      })
    }
    if(JSON.parse(localStorage.getItem("type"))=="admin"||JSON.parse(localStorage.getItem("type"))=="professor"||JSON.parse(localStorage.getItem("type"))=="supervisor"){
      axios.get(link2,{
        withCredentials: true}).then(response => { 
          if(response.status===200){
            this.setState({info:response.data})
          }
        })
        .catch(error => {
          console.log(error.response)
      })
    }
    
    this.setState({ID:JSON.parse(localStorage.getItem("id"))})
    this.setState({isauth:JSON.parse(localStorage.getItem("isAuth"))})
    this.setState({name:JSON.parse(localStorage.getItem("name"))})
    this.setState({type:JSON.parse(localStorage.getItem("type"))})
   }

    render(){
      if(localStorage.length==0){
        return <Redirect to='/'  /> 
      }

        if(JSON.parse(localStorage.getItem("type"))=="admin"){
        return(

          <div>
          <NavAdmin />
          <Jumbotron fluid>
        <Container fluid>
          <p className="lead"> </p>
        </Container>
        </Jumbotron>
          <div>
          <Card >
    <CardBody>
      <CardTitle> Профиль </CardTitle>
      <CardSubtitle className="mb-2 text-muted"> Информация о преподавателе</CardSubtitle>
      <CardText >
      {this.state.info.map(item=>(<div >
             
            <div style={{'font-family':'Arial, Helvetica, sans-serif', 'display': 'inline-block'}}> Департамент: {item.department}   </div>
            <div  style={{'font-family':'Arial, Helvetica, sans-serif' }}> Должность: {item.job}   </div>
            <div  style={{'font-family':'Arial, Helvetica, sans-serif'}}> Имя преподавателя: {item.name} </div>
            <div style={{'font-family':'Arial, Helvetica, sans-serif'}}> Фамилия преподавателя: {item.middle_name} </div>
            <div  style={{'font-family':'Arial, Helvetica, sans-serif'}}> Отчество преподавателя: {item.last_name} </div>
           </div>))}
      </CardText>
    </CardBody>
  </Card>
  
  
            </div>
        </div>


        )
      }
        if (JSON.parse(localStorage.getItem("type"))=="professor"){
           
        return(
          <div>
        <NavProf />
        <Jumbotron fluid>
        <Container fluid>
          <p className="lead"> </p>
        </Container>
        </Jumbotron>
        <div>
        <Card >
  <CardBody>
    <CardTitle> Профиль </CardTitle>
    <CardSubtitle className="mb-2 text-muted"> Информация о преподавателе</CardSubtitle>
    <CardText >
    {this.state.info.map(item=>(<div >
           
          <div style={{'font-family':'Arial, Helvetica, sans-serif', 'display': 'inline-block'}}> Департамент: {item.department}   </div>
          <div  style={{'font-family':'Arial, Helvetica, sans-serif' }}> Должность: {item.job}   </div>
          <div  style={{'font-family':'Arial, Helvetica, sans-serif'}}> Имя преподавателя: {item.name} </div>
          <div style={{'font-family':'Arial, Helvetica, sans-serif'}}> Фамилия преподавателя: {item.middle_name} </div>
          <div  style={{'font-family':'Arial, Helvetica, sans-serif'}}> Отчество преподавателя: {item.last_name} </div>
         </div>))}
    </CardText>
  </CardBody>
</Card>


          </div>
      </div>
        )
      }


      if(JSON.parse(localStorage.getItem("type"))=="student"){
        
        
        return(
          <div>
        <NavStudent />
        <Jumbotron fluid>
        <Container fluid>
          <p className="lead"> </p>
        </Container>
        </Jumbotron>
        <div>
        <Card >
  <CardBody>
    <CardTitle> Профиль </CardTitle>
    <CardSubtitle className="mb-2 text-muted"> Информация о студенте</CardSubtitle>
    <CardText >
    {this.state.info.map(item=>(<div >
           
          <div  style={{'font-family':'Arial, Helvetica, sans-serif' , 'display': 'inline-block'}}> Факультет:  {item.faculty}   </div>
          <div style={{'font-family':'Arial, Helvetica, sans-serif'}}> Департамент: {item.department}   </div>
          <div  style={{'font-family':'Arial, Helvetica, sans-serif' }}> Курс: {item.year_of_study}   </div>
          <div  style={{'font-family':'Arial, Helvetica, sans-serif'}}> Имя студента: {item.name} </div>
          <div style={{'font-family':'Arial, Helvetica, sans-serif'}}> Фамилия студента: {item.middle_name} </div>
          <div  style={{'font-family':'Arial, Helvetica, sans-serif'}}> Отчество студента: {item.last_name} </div>
         </div>))}
    </CardText>
  </CardBody>
</Card>


          </div>
      </div>
        )
      }
    }
  }
  


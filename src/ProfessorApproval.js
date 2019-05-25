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


  



export default class ProfessorApproval extends React.Component{
    constructor(props) {
      super(props);
      this.state = { error: null,
        itemss: []
    }
    this.func=this.func.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.handleClickk=this.handleClickk.bind(this)}
    componentDidMount() {
      var url='http://localhost:8000/api/professorprofile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/professorappoval/'+`${this.props.match.params.idapp}`
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
   
    handleClick() {
      console.log(this.state)
      var urll='http://localhost:8000/api/professorprofile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/professorapproval/'+`${this.props.match.params.idapp}`+'/'+`${this.state.itemss.map(item=>item.Student_idStudent)}`+'/'+`${this.state.itemss.map(item=>item.idRoles_of_project)}`;
      var data ='согласовано'
      axios.post(urll,data,{
    withCredentials: true}).then(response => { 
      if(response.status===200){
        console.log(response)
        console.log("UPDATE OKKKeyyy")
        alert("Статус заявки студента изменен на положительный")
      }
    })
    .catch(error => {
      console.log(error.response)
  })
    }  
    handleClickk() {
      console.log(this.state)
      var urll='http://localhost:8000/api/professorprofile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/professordisapproval/'+`${this.props.match.params.idapp}`+'/'+`${this.state.itemss.map(item=>item.Student_idStudent)}`+'/'+`${this.state.itemss.map(item=>item.idRoles_of_project)}`;
      var data ='отказано'
      axios.post(urll,data,{
    withCredentials: true}).then(response => { 
      if(response.status===200){
        console.log(response)
        console.log("UPDATE OKKK!!")
        alert("Статус заявки студента изменен на отрицательный")
      }
    })
    .catch(error => {
      console.log(error.response)
  })
    } 
  
  
    func(t,tt){
      if(t=='на согласовании' &&  tt=='свободно'&&JSON.parse(localStorage.getItem("type"))=='professor'){
        return (<div><Button style={{'borderRadius': '5px',"margin":'1px'}} color="success"  onClick={() => {this.handleClick()}}> Согласовать</Button>
        <Button  style={{'borderRadius': '5px',"margin":'1px'}} color="danger" onClick={() => {this.handleClickk()}}> Отказать</Button></div>)
      }
    }
  
  render(){
    
    if(localStorage.length==0){
      return <Redirect to='/'  /> 
    }
  console.log(this.state.itemss)
  return(
  
    <div >
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
    {this.func(item.status_of_app,item.status_of_role)}
    
    </div>
   ))}

</CardText>
</CardBody>
</Card>
</div>
  
  
  )
  }
  
  }
  
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

import { Link } from "react-router-dom";
import './Profile.css';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import {  CardText, 
  CardTitle, CardSubtitle} from 'reactstrap';
  import { Jumbotron, Container } from 'reactstrap';
  import { Table } from 'reactstrap';

  import  NavAdmin from './NavAdmin';
export default class ProjectAdminApproval extends React.Component {
  _isMounted = false;
    constructor(props) {
      super(props);
      this.state={
        items: [],
        roles:[]
      };
      this.handleClick=this.handleClick.bind(this);
      this.handleClickk=this.handleClickk.bind(this)
    }
    handleClick() {
      var urll1='http://localhost:8000/api/professorprofile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/supervisorapproval/'+`${this.state.items.map(item=> item.idProjects)}`;
      var urll2='http://localhost:8000/api/professorprofile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/adminapproval/'+`${this.state.items.map(item=> item.idProjects)}`;
      var data ='согласован'
      if(JSON.parse(localStorage.getItem("type"))=="supervisor"){
      axios.get(urll1,{
     withCredentials: true}).then(response => { 
      if(response.status===200){
        console.log(response)
        console.log("UPDATE OKKK")
        alert("Статус проекта изменен на положительный")
       this.props.history.push('/adminapproval')}})
    .catch(error => {
      console.log(error.response)})
    }
    if(JSON.parse(localStorage.getItem("type"))=="admin"){
      axios.get(urll2,{
     withCredentials: true}).then(response => { 
      if(response.status===200){
        console.log(response)
        console.log("UPDATE OKKK")
        alert("Статус проекта изменен на положительный")
       this.props.history.push('/adminapproval')}})
    .catch(error => {
      console.log(error.response)})
    }

    }  
      
  
    handleClickk() {
      var urll1='http://localhost:8000/api/professorprofile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/supervisordisapproval/'+`${this.state.items.map(item=> item.idProjects)}`;
      var urll2='http://localhost:8000/api/professorprofile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/admindisapproval/'+`${this.state.items.map(item=> item.idProjects)}`;
      var data ='отказано администратором'
      if(JSON.parse(localStorage.getItem("type"))=="supervisor"){
      axios.get(urll1,{
    withCredentials: true}).then(response => { 
      if(response.status===200){
        console.log(response)
        console.log("UPDATE OKKK!!")
        alert("Статус проекта изменен на отрицательный")
        this.props.history.push('/adminapproval');
      }
    })
    .catch(error => {
      console.log(error.response)
  })}
  if(JSON.parse(localStorage.getItem("type"))=="admin"){
    axios.get(urll2,{
      withCredentials: true}).then(response => { 
        if(response.status===200){
          console.log(response)
          console.log("UPDATE OKKK!!")
          alert("Статус проекта изменен на отрицательный")
          this.props.history.push('/adminapproval');
        }
      })
      .catch(error => {
        console.log(error.response)
    })
  }
    } 
  
  
  
      componentDidMount() {
        this._isMounted = true;
        var url='http://localhost:8000/api/projectcatalog/'+`${this.props.match.params.id}`;
        var url1='http://localhost:8000/api/projectcatalog/'+`${this.props.match.params.id}`+'/roles';
        axios.get(url,{
         withCredentials: true}).then(response => { 
           if(response.status===200){
             console.log(response)
             if (this._isMounted) {
            // this.setState({items:response.data})
             localStorage.setItem("items", JSON.stringify(response.data))}
             this.setState({items:JSON.parse(localStorage.getItem("items"))})
             return axios.get(url1,{
             withCredentials: true});
           }
         })
         .then((res) => {
          if(res.status===200){
            console.log(res)
            if (this._isMounted) {
            //this.setState({roles:res.data})
            localStorage.setItem("roles", JSON.stringify(res.data))}
            this.setState({roles:JSON.parse(localStorage.getItem("roles"))})
            //console.log(localStorage.getItem("roles"))
      
        }
      }
         )
         .catch(error => {
           console.log(error.response)
       });
       //this.setState({items:JSON.parse(localStorage.getItem("items"))})
      // this.setState({roles:JSON.parse(localStorage.getItem("roles"))})
         }
  
         componentWillUnmount() {
          this._isMounted = false;
        }
    render(){
      
  if(localStorage.length==0){
    return <Redirect to='/'  /> 
  }
      return (
      
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
  
      this.state.items.map(item => (
        
        <div   style={{'font-family':'Arial, Helvetica, sans-serif'}}> 
       
        <div>Название проекта: {item.project_name}</div>
        <div>Тип проекта: {item.type_of_project}</div>
        <div>Количество студентов проекта: {item.amount_of_students}</div>
        <div>Статус проекта: {item.status_of_project}</div>
        <div>Дата начала: {item.begdate}</div>
        <div>Дата конца: {item.enddate}</div>
        <div>Комментарий: {item.comment}</div>
        <div>Местоположение: {item.location}</div>
        <div>Интенсивность: {item.intensity}</div>
        
        </div>
      ))}
        {
        this.state.roles.map(item=>(
            <div   style={{'font-family':'Arial, Helvetica, sans-serif'}}>
              <div>Название роли: {item.role}</div>
              <div>Необходимые навыки: {item.necessary_skills}</div>
              <div>Рекомендации: {item.role_reccomendations}</div>
              <div>Статус роли: {item.status_of_role} </div>
              </div>)
          )
        }
 <Button  style={{'borderRadius': '5px',"margin":'1px'}} color="success" onClick={() => {this.handleClick()}}> Согласовать</Button>
        <Button  style={{'borderRadius': '5px',"margin":'5px'}} color="danger" onClick={() => {this.handleClickk()}}> Отказать</Button>
    

</CardText>
</CardBody>
</Card>
</div>
  
      )
    }
  }
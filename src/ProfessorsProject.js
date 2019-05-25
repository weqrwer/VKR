import React, { Component } from 'react';
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import './Profile.css';
import NavStudent from './NavStudent.js';
import NavProf from "./NavProf";
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import {  CardText, 
  CardTitle, CardSubtitle} from 'reactstrap';
  import { Jumbotron, Container } from 'reactstrap';
  import { Table } from 'reactstrap';
/*
class Button extends React.Component {
  render(){
    return (
      <Link to={'/project/'+`${this.props.otherData}`+'/role/'+`${this.props.someData.idRoles_of_project}`}> Подать заявку</Link>
    )
  }
}*/
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

export default class ProfessorsProject extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        items: [],
        roles:[],stages:[],prep:[],
        collapse: false ,
        collapse1:false
      };
      this.lala=this.lala.bind(this);
      this.student=this.student.bind(this)
      this.toggle = this.toggle.bind(this);
      this.toggle1 = this.toggle1.bind(this);
     this.proff=this.proff.bind(this)
    }
    toggle() {
      this.setState(state => ({ collapse: !state.collapse }));
    }
    toggle1() {
      this.setState(state => ({ collapse1: !state.collapse1 }));
    }
  
      componentDidMount() {
        var url='http://localhost:8000/api/projectcatalog/'+`${this.props.match.params.id}`;
        var url1='http://localhost:8000/api/projectcatalog/'+`${this.props.match.params.id}`+'/roles';
        var url2='http://localhost:8000/api/projectcatalog/'+`${this.props.match.params.id}`+'/stages';
        var url3='http://localhost:8000/api/projectcatalog/'+`${this.props.match.params.id}`+'/prep';
        axios.get(url,{
         withCredentials: true}).then(response => { 
           if(response.status===200){
             console.log(response)
             this.setState({items:response.data})
             return axios.get(url1,{
             withCredentials: true});
           }
         })
         .then((res) => {
          if(res.status===200){
            console.log(res)
            this.setState({roles:res.data})
            return axios.get(url2,{
              withCredentials: true});
        }})
         .then((result) => {
          if(result.status===200){
            this.setState({stages:result.data})
            return axios.get(url3,{
              withCredentials: true});
          }})
          .then((r) => {
            if(r.status===200){
              this.setState({prep:r.data})
            }})

         .catch(error => {
           console.log(error.response)
       });
         }
     lala(t,i,ii){
       if (t=="свободно")
       {
         //console.log("uuu"+ii)
        // return <Button someData={i} otherData={ii}/>

         return <Link to={'/projects/'+`${ii}`+'/role/'+`${i.idRoles_of_project}`} style={{'color':'green'}}> Заявка</Link>
       }
     }

     student(){
       if (JSON.parse(localStorage.getItem("type"))=="student"){
         return <NavStudent />
       }
     }

     proff(){
       if(JSON.parse(localStorage.getItem("type"))=="professor"){
         return <NavProf />
       }
     }
    render(){
      
  if(localStorage.length==0){
    return <Redirect to='/'  /> 
  }
      console.log(this.props.match.params);//работает возвращает объект с айди
      console.log("aaaa"+this.state.items);
      
     
      return (<div >
        {this.student()}
        {this.proff()}
         <Jumbotron fluid>
        <Container fluid>
          <p className="lead">Проект</p>
        </Container>
        </Jumbotron>
      <Card >
     <CardBody>
    <CardTitle> Паспорт проекта </CardTitle>
    <CardSubtitle className="mb-2 text-muted"> Основная информация</CardSubtitle>
    <CardText >
       
        {
        this.state.items.map(item => (
          
          <div>
         
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
        this.state.prep.map(item=>(
            <div  >
              <div>ФИО преподавателя: {`${item.middle_name}`+' '+`${item.name}`+' '+`${item.last_name}`}</div>
             
              </div>)
          )
        }
</CardText>
  </CardBody>
</Card>

<Button color="light" onClick={this.toggle} style={{ marginBottom: '1rem','color':'black' ,'borderColor':'black', 'margin':'10px'}}>Этапы проекта</Button>
        <Collapse isOpen={this.state.collapse}>
        
        <Table bordered responsive hover>
        <thead>
          <tr style={{"textAlign":'center'}}>
            <th>Номер этапа</th>
            <th>Дата начала</th>
            <th>Дата конца</th>
          </tr>
        </thead>
        <tbody>
          
        {
        this.state.stages.map((item,index)=>(
          <tr key={item['number_of_stage']} style={{"textAlign":'center'}} >
          <td  >
          {item.number_of_stage}
          </td>
           <td >{item.begdate}</td>
           <td  >{item.enddate}</td>
    
           </tr>
           )
          )
        }
        </tbody>
      </Table>
        
        </Collapse>
        <Button color="light" onClick={this.toggle1} style={{ marginBottom: '1rem','color':'black' ,'borderColor':'black','margin':'10px'}}>Роли проекта</Button>
        <Collapse isOpen={this.state.collapse1}>
        <Table  responsive bordered hover>
        <thead>
          <tr style={{"textAlign":'center'}}>
            <th>Название роли</th>
            <th>Необходимые навыки</th>
            <th>Рекомендации</th>
            <th>Статус роли</th>
          </tr>
        </thead>
        <tbody>
          
        {
        this.state.roles.map((item,index)=>(
            
          <tr key={index} style={{"textAlign":'center'}} >
          
          <td>   <Link to={'/projj/'+`${this.state.items.map( i=>i.idProjects)}`+'/roleofpr/'+`${item.idRoles_of_project}`} style={{'color':'black'}}> {item.role}</Link>    </td>
           <td >{item.necessary_skills}</td>
           <td  > {item.role_reccomendations}</td>
           <td  > {item.status_of_role} {this.lala(item.status_of_role,item,this.state.items.map(item => item.idProjects))}</td>
    
           </tr>
    )
          )
        }
         </tbody>
      </Table>
        </Collapse>
        

      
        
        
         </div>)
    }
  }
import React, { Component } from 'react';
import {Link,Redirect} from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Table } from 'reactstrap';
import './Profile.css';
import { Jumbotron, Container } from 'reactstrap';
import NavStudent from "./NavStudent";
import NavProf from "./NavProf";
import NavAdmin from "./NavAdmin";
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
  DropdownItem ,Input} from 'reactstrap';
export default class ProjectCatalog extends Component{
  constructor(props) {
    super(props);
    this.state = { error: null,
      isLoaded: false,
      items: []
  }
  }
  
  componentDidMount() {
 axios.get('http://localhost:8000/api/projectcatalog',{
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
if(JSON.parse(localStorage.getItem("type"))=='student')
{
return(
  <div>
    <NavStudent />
    <Jumbotron fluid>
        <Container fluid>
          <p className="lead">Каталог проектов</p>
        </Container>
        </Jumbotron>
        <div style={{'margin':'20px'}}>
<Table bordered responsive hover>
        <thead>
          <tr style={{"textAlign":'center'}}>
            <th>Название проекта</th>
            <th>Статус проекта</th>
            <th>Дата начала</th>
            <th>Дата конца</th>
          </tr>
        </thead>
        <tbody>
          
          {
            this.state.items.map((item,index) => (
              <tr key={index} style={{"textAlign":'center'}} >
              <td  >
                <Link to={'/project/'+`${item.idProjects}`} style={{ textDecoration: 'none' ,'color':'black'}}>{item.project_name}</Link>
              </td>
               <td  >{item.status_of_project}</td>
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

if(JSON.parse(localStorage.getItem("type"))=='professor')
{
return(
  <div>
     <NavProf />
     <Jumbotron fluid>
        <Container fluid>
          <p className="lead">Каталог проектов</p>
        </Container>
        </Jumbotron>
        <div style={{'margin':'20px'}}>
<Table bordered responsive hover>
        <thead>
          <tr style={{"textAlign":'center'}}>
            <th>Название проекта</th>
            <th>Статус проекта</th>
            <th>Дата начала</th>
            <th>Дата конца</th>
          </tr>
        </thead>
        <tbody>
          
          {
            this.state.items.map((item,index) => (
              <tr key={index} style={{"textAlign":'center'}} >
              <td  >
                <Link to={'/project/'+`${item.idProjects}`} style={{ textDecoration: 'none' ,'color':'black'}}>{item.project_name}</Link>
              </td>
               <td  >{item.status_of_project}</td>
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

 if(JSON.parse(localStorage.getItem("type"))=='admin')
{
return(
  <div>
    <NavAdmin />
    <Jumbotron fluid>
        <Container fluid>
          <p className="lead">Каталог проектов</p>
        </Container>
        </Jumbotron>
        <div style={{'margin':'20px'}}>
<Table bordered responsive hover>
        <thead>
          <tr style={{"textAlign":'center'}}>
            <th>Название проекта</th>
            <th>Статус проекта</th>
            <th>Дата начала</th>
            <th>Дата конца</th>
          </tr>
        </thead>
        <tbody>
          
          {
            this.state.items.map((item,index) => (
              <tr key={index} style={{"textAlign":'center'}} >
              <td  >
                <Link to={'/project/'+`${item.idProjects}`} style={{ textDecoration: 'none' ,'color':'black'}}>{item.project_name}</Link>
              </td>
               <td  >{item.status_of_project}</td>
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
/*
return(
  
  <Table style={{'width':"100%" ,'border-collapse': 'collapse',backgroundColor: 'white'}}>
  <thead style={{cellpadding:"0px" , cellspacing:"0px"}}>
    <tr style={{border: '1px solid black',cellpadding:"0px",cellspacing:"0px"}}>
      <th style={{border: '1px solid black',cellpadding:"0",cellspacing:"0","text-align":'center', 'font-family':'Arial, Helvetica,sans-serif','color': 'green',backgroundColor: 'white','border-radius': '5px',"height": "30px"}}>Название проекта</th>
      <th   style={{border: '1px solid black',cellpadding:"0px",cellspacing:"0","text-align":'center','font-family':'Arial, Helvetica,sans-serif','color': 'green',backgroundColor: 'white','border-radius': '5px'}}>Статус проекта</th>
      <th  style={{border: '1px solid black',cellpadding:"0px",cellspacing:"0",'font-family':'Arial, Helvetica,sans-serif','color': 'green',backgroundColor: 'white','border-radius': '5px'}}>Дата начала</th>
      <th  style={{border: '1px solid black',cellpadding:"0px",cellspacing:"0",'font-family':'Arial, Helvetica,sans-serif','color': 'green',backgroundColor: 'white','border-radius': '5px'}}>Дата конца</th>
    </tr>
  </thead>
  <tbody >
  {
    this.state.items.map(item => (
      <tr key={item.id}  style={{margin:'0px',padding:'0px',cellpadding:"0px" , cellspacing:"0px" }}>
      <td  class="border-white" style={{'font-family':'Arial, Helvetica, sans-serif',border: '1px solid black',margin:'0px',padding:'0px',"text-align":'center' ,cellpadding:"0px" , cellspacing:"0px","height": "12px"  }}>
        <Link to={'/project/'+`${item.idProjects}`} style={{ textDecoration: 'none' }}>{item.project_name}</Link>
      </td>
       <td  class="border-white" style={{'font-family':'Arial, Helvetica, sans-serif',border: '1px solid black',margin:'0px',padding:'0px',align:"center","text-align":'center',cellpadding:"0px" , cellspacing:"0px"}}>{item.status_of_project}</td>
       <td  class="border-white" style={{'font-family':'Arial, Helvetica, sans-serif',border: '1px solid black',margin:'0px',padding:'0px',align:"center","text-align":'center',cellpadding:"0px" , cellspacing:"0px"}}>{item.begdate}</td>
       <td  class="border-white" style={{'font-family':'Arial, Helvetica, sans-serif',border: '1px solid black',margin:'0px',padding:'0px',align:"center","text-align":'center',cellpadding:"0px" , cellspacing:"0px"}}>{item.enddate}</td>

       </tr>
    ))
  }
   </tbody>
</Table>


)*/
}
}
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









export default  class StudentApplications extends React.Component{
  constructor(props) {
    super(props);
    this.state = 
    {items: []};

  }
  componentDidMount() {
    
    var ur='http://localhost:8000/api/professorprofile/'+ `${JSON.parse(localStorage.getItem("id"))}`+'/studentappl'
    axios.get(ur,{
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
  render () {
    
  if(localStorage.length==0){
    return <Redirect to='/'  /> 
  }
    return (
    
  <table style={{ 'border-spacing': '0','width':"100%"}}>
  <thead >
    <tr style={{border: '1px solid black'}}>
      <th  style={{border: '1px solid black'}}>Название проекта</th>
      <th style={{border: '1px solid black'}}>ФИО студента</th>
      <th style={{border: '1px solid black'}}>роль</th>
      <th style={{border: '1px solid black'}}>статус</th>
    </tr>
  </thead>
  <tbody >
  {
    this.state.items.map(item => (
      <tr key={item.id}  style={{margin:'0px',padding:'0px'}}>
      <td  style={{border: '1px solid black',margin:'0px',padding:'0px',  float: 'none',display: 'flex', justifyContent: 'center'}}>
        <Link to={'/checkstudentappl/'+`${item.idStudent_application}`}  style={{ textDecoration: 'none' }}>{item.project_name}</Link>
      </td>
       <td style={{border: '1px solid black',margin:'0px',padding:'0px',align:"center"}}>{item.middle_name}</td>
       <td style={{border: '1px solid black',margin:'0px',padding:'0px',align:"center"}}>{item.role}</td>
       <td style={{border: '1px solid black',margin:'0px',padding:'0px',align:"center"}}>{item.status_of_app}</td>

       </tr>
    ))
  }
   </tbody>
</table>

  )
}
}
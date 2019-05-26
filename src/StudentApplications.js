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
      <div>
      <NavAdmin />
      <Jumbotron fluid>
      <Container fluid>
      <p className="lead">Заявки студентов</p>
      </Container>
      </Jumbotron>
      <div style={{'margin':'20px'}}>
     <Table bordered responsive hover>
        <thead>
          <tr style={{"textAlign":'center'}}>
            <th >Название проекта</th>
            <th >ФИО студента</th>
            <th>Роль</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.items.map((item,index) => (
              <tr key={index} style={{"textAlign":'center'}} >
              <td  >
                <Link to={'/checkstudentappl/'+`${item.idStudent_application}`}  style={{ textDecoration: 'none' ,'color':'black'}}>{item.project_name}</Link>
              </td>
               <td  >{`${item.middle_name}`+' '+`${ item.name}`}</td>
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
}
}
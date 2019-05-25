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

  import NavStudent from "./NavStudent";





export default class MyGrades extends React.Component {

    constructor(props) {
      super(props);
      this.state={items: []};
    }
    componentDidMount() {
        
        var temp1=JSON.parse(localStorage.getItem("id"));
        const urll='http://localhost:8000/api/studentprofile/'+`${temp1}`+'/mygrades';
        axios.get(urll,{
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
  
      return(
        
          <div>
              <NavStudent />
             <Jumbotron fluid>
                <Container fluid>
                  <p className="lead">Мои проекты</p>
                </Container>
                </Jumbotron>
        <Table bordered responsive hover>
                <thead>
                  <tr style={{"textAlign":'center'}}>
                    <th>Название проекта</th>
                    <th>Роль проекта</th>
                    <th>Дата начала</th>
                    <th>Дата конца</th>
                    <th>Кредиты</th>
                    <th>Полученные кредиты</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {
                    this.state.items.map((item,index) => (
                      <tr key={index} style={{"textAlign":'center'}} >
                      <td   >
                        <Link to={'/project/'+`${item.idProjects}`} style={{ textDecoration: 'none','color':'black' }}>{item.project_name}</Link>
                      </td>
                       <td  >{item.role}</td>
                       <td > {item.begdate}</td>
                       <td  >{item.enddate}</td>
                       <td  >{item['SUM(credits)']}</td>
                       <td  >{item['SUM(actual_credits)']}</td>
                       </tr>
                    ))
                  }
                </tbody>
              </Table>
              </div>
        
      )
                }
  
  
  }
  
import React, { Component } from 'react';
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import './Profile.css';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import {  CardText, 
  CardTitle, CardSubtitle} from 'reactstrap';

  import { Table } from 'reactstrap';
  import { Jumbotron, Container } from 'reactstrap';
  import  NavProf from './NavProf.js';
export default class ProfessorProjects extends React.Component{
  constructor(props) {
    super(props);
    this.state = { error: null,
      isLoaded: false,
      items: []
  }
  }
  componentDidMount() {
    var url='http://localhost:8000/api/professorprofile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/professorprojects'
 axios.get(url,{
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
return(
  
        <div>
          <NavProf />
           <Jumbotron fluid>
              <Container fluid>
                <p className="lead">Проекты преподавателя</p>
              </Container>
              </Jumbotron>
              <div style={{'margin':'20px'}}>
      <Table bordered responsive hover >
              <thead >
                <tr style={{"textAlign":'center'}}>
                  <th >Название проекта</th>
                  <th >Статус проекта</th>
                  <th >Дата начала</th>
                  <th >Дата конца</th>
                </tr>
              </thead>
              <tbody >
                
                {
                  this.state.items.map((item,index) => (
                    <tr key={index} style={{"textAlign":'center'}} >
                    <td  >
                      <Link to={'/projectt/'+`${item.idProjects}`} style={{ textDecoration: 'none' ,'color':'black'}}>{item.project_name}</Link>
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
}

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

  import  NavProf from './NavProf.js';







export default  
class History extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      
      items: []
  }
  }
  
  componentDidMount() {
  var url='http://localhost:8000/api/professorprofile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/history';
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
          <p className="lead">История проектов</p>
        </Container>
        </Jumbotron>
        <div style={{'margin':'20px'}}>
<Table bordered responsive hover>
        <thead>
          <tr style={{"textAlign":'center'}}>
            <th>Название проекта</th>
            <th>Статус проекта</th>
            <th>Дата изменения статуса</th>
            <th>Ответственное лицо</th>
          </tr>
        </thead>
        <tbody>
          
          {
            this.state.items.map((item,index) => (
              <tr key={index} style={{"textAlign":'center'}} >
              <td  >
                {item.project_name}
              </td>
               <td  >{item.status}</td>
               <td >{item.date_of_status_changing}</td>
               <td >{item.type}</td>
        
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
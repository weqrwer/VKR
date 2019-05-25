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


  import NavStudent from'./NavStudent.js';
  import  NavProf from './NavProf.js';


 

export default class RoleofProfessorsPr extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        items: []
        
      };
    this.student=this.student.bind(this)
    this.proff=this.proff.bind(this)
    }
  
   componentDidMount() {
     var l='http://localhost:8000/api/profile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/proj/'+`${this.props.match.params.idd}`+'/roleofpr/'+`${this.props.match.params.iddd}`
     console.log(l)
   axios.get(l,{
    withCredentials: true}).then(response => { 
      if(response.status===200){
        console.log(' BBBBBBBBBBBBBBBBBBBBBBBBBBBb')
        console.log(response)
        this.setState({items:response.data})
      }
    })
    .catch(error => {
      console.log(error.response)
  });
    }
    student(){
        if (JSON.parse(localStorage.getItem("type"))=="student"){
            return <NavStudent />
        }
    }
     proff(){
        if (JSON.parse(localStorage.getItem("type"))=="professor"){
            return <NavProf />
        }
     }
    render(){
        
      if(localStorage.length==0){
        return <Redirect to='/'  /> 
      }
      console.log(this.state)
      return(<div >
         {this.student()}
         {this.proff()}
        <Jumbotron fluid>
       <Container fluid>
         <p className="lead">Роль проекта</p>
       </Container>
       </Jumbotron>
     <Card >
    <CardBody>
   
   <CardSubtitle className="mb-2 text-muted"> Основная информация</CardSubtitle>
   <CardText >
      {this.state.items.length==0?<div></div>:<div>
        <div>Название роли: {this.state.items[0]['role']}</div>
        <div>Необходимые навыки: {this.state.items[0]['necessary_skills']}</div>
        <div>Факультет: {this.state.items[0]['role_recommendations']}</div>
        <div>Курс: {this.state.items[0]['year_of_study']} </div>
        <div>Статус роли:  {this.state.items[0]['status_of_role']}</div>
        </div>}
  </CardText>
  </CardBody>
  </Card>
        <h7 style={{'marginLeft':'20px'}}> Оценки роли за этапы: </h7>
        <Table  style={{'marginTop':'10px'}}bordered responsive hover>
          <thead>
            <tr style={{"textAlign":'center'}}>
              <th>Номер этапа</th>
              <th>Дата начала</th>
              <th>Дата конца</th>
              <th>Кредиты</th>
            </tr>
          </thead>
          <tbody>
            
          {
          this.state.items.map((item,index)=>(
            <tr key={item['number_of_stage']} style={{"textAlign":'center'}} >
            <td  >
            {item.number_of_stage}
            </td>
             <td >{item.date_beggining}</td>
             <td  >{item.date_ending}</td>
             <td  >{item.credits}</td>
             </tr>
             )
            )
          }
          </tbody>
        </Table>
  <Button style={{'borderRadius': '5px','margin':'15px'}} color="success"><Link to={"/gradesending/"+`${this.props.match.params.idd}`+'/'+`${this.props.match.params.iddd}`} style={{'color':'white'}}> Поставить оценку</Link></Button>
  </div>
  
      )
    }
    
  }
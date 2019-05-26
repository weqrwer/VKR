import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { Jumbotron, Container } from 'reactstrap';
import NavStudent from './NavStudent.js';
import { Button, Form, FormGroup, Label, Input, FormText,Row,Col } from 'reactstrap';
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';

export default class Application extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        student_contact_inf:"",
        priority:"",
        comment:"",
        subb:0
      
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.func=this.func.bind(this)
    }
    handleChange(event) {  
      this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
      //console.log(this.state);
      
      event.preventDefault();
      console.log(this.props.someData)
      var url='http://localhost:8000/api/studentprofile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/application';
      const project = {
        student_contact_inf: this.state.student_contact_inf,
        priority:this.state.priority,
        comment: this.state.comment,
        Roles_of_project_idRoles_of_project:this.props.match.params.index
      };
      axios.post(url,project,{
        withCredentials: true}).then(response => { 
          if(response.status===200){
            console.log(response)
            console.log("insert ok!")
            alert("Форма заполнена успешно!")
            this.props.history.push('/projectcatalog');
            //console.log(this.state.change)
          }
        })
        
    }
 
    render(){
     
      if(localStorage.length==0){
          return <Redirect to='/'  /> 
          }

      console.log(this.props)
      console.log('aaaaa rerender')
    return (

      <div style={{'text-align':'left'}}>
      <NavStudent />
  <Jumbotron fluid>
        <Container fluid>
          <p className="lead">Заявка студента</p>
        </Container>
        </Jumbotron>
<Card >
  <CardBody>
    <CardTitle> Заполните форму </CardTitle>
    <CardText>
<Form  onSubmit={this.handleSubmit}>
<Row form>
          <Col md={4}>
        <FormGroup>
          <Label >Контактная информация</Label>
          <Input  style={{'borderRadius': '5px','textAlign': 'center'}} type='text'  name="student_contact_inf" value={this.state.student_contact_inf} onChange={this.handleChange}  />
        </FormGroup>
        </Col>
        </Row>
        <Row form>
          <Col md={4}>
        <FormGroup>
          <Label for="examplePassword">Приоритет</Label>
          <Input style={{'borderRadius': '5px','textAlign': 'center'}} type="text"  name="priority" value={this.state.priority} onChange={this.handleChange}/>
        </FormGroup>
        </Col>
        </Row>
        <Row form>
          <Col md={4}>
        <FormGroup>
          <Label for="examplePassword">Короткий комментарий</Label>
          <Input style={{'borderRadius': '5px','textAlign': 'center'}} type="textarea" name="comment" value={this.state.comment} onChange={this.handleChange}  />
        </FormGroup>
        </Col>
        </Row>
        <Button style={{'borderRadius': '5px'}} color="success">Отправить заявку</Button>
      </Form>

</CardText>
</CardBody>
</Card>
        
          </div> 
        
        );
      }
  
  
  }


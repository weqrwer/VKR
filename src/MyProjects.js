import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Profile.css';
import { Jumbotron, Container } from 'reactstrap';
import { Table } from 'reactstrap';
import NavStudent from "./NavStudent";
export default class MyProjects extends React.Component
{
    constructor(props) {
      super(props);
      this.state={items: []};
    }
    componentDidMount() {
        const tenp=this.props.someData;
        var temp1=JSON.parse(localStorage.getItem("id"));
        const urll='http://localhost:8000/api/studentprofile/'+`${temp1}`+'/myprojects';
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
                       <td >{item.begdate}</td>
                       <td  >{item.enddate}</td>
                
                       </tr>
                    ))
                  }
                </tbody>
              </Table>
              </div>
        
      )
      /*
      return(
  
        <table style={{ 'border-collapse': 'collapse','width':"100%",backgroundColor: 'white'}}>
        <thead >
          <tr style={{border: '1px solid black'}}>
            <th  style={{border: '1px solid black',"text-align":'center','font-family':'Arial, Helvetica,sans-serif','color': 'green',"height": "30px"}}>Название проекта</th>
            <th style={{border: '1px solid black','font-family':'Arial, Helvetica,sans-serif','color': 'green',"height": "30px"}}>Роль проекта</th>
            <th style={{border: '1px solid black','font-family':'Arial, Helvetica,sans-serif','color': 'green',"height": "30px"}}>Дата начала</th>
            <th style={{border: '1px solid black','font-family':'Arial, Helvetica,sans-serif','color': 'green',"height": "30px"}}>Дата конца</th>
          </tr>
        </thead>
        <tbody >
        {
          this.state.items.map(item => (
            <tr key={item.id}  style={{margin:'0px',padding:'0px','font-family':'Arial, Helvetica,sans-serif', "height": "12px" }}>
            <td   class="border-white"style={{border: '1px solid black',margin:'0px',padding:'0px',"text-align":'center'}}>
              <Link to={'/project/'+`${item.idProjects}`} style={{ textDecoration: 'none'}}>{item.project_name}</Link>
            </td>
             <td  class="border-white"style={{border: '1px solid black',margin:'0px',padding:'0px',"text-align":'center', }}>{item.role}</td>
             <td  class="border-white"style={{border: '1px solid black',margin:'0px',padding:'0px',"text-align":'center', }}>{item.begdate}</td>
             <td  class="border-white" style={{border: '1px solid black',margin:'0px',padding:'0px',"text-align":'center', }}>{item.enddate}</td>
      
             </tr>
          ))
        }
         </tbody>
      </table>
      )  
        */
    }
  }
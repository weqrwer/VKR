import React from 'react';

import Login from "./Login.js";
import MyProjects from "./MyProjects.js";
import ProjectCatalog from "./ProjectCatalog.js";
import ProjectPassport from "./ProjectPassport.js";
import Project from "./Project.js";
import Profile from "./Profile.js";
import MyGrades from "./MyGrades.js";
import Application from "./Application.js";
import MyApplications from "./MyApplications.js";
import Logout from "./Logout.js";
import RoleofPr from "./RoleofPr.js";

import RoleofProfessorsPr from "./RoleofProfessorsPr.js";
import ProfessorsProject from "./ProfessorsProject.js";

import StudentApplications from "./StudentApplications";
import StudentApplication from "./StudentApplication.js";
import AdminApproval from "./AdminApproval.js";
import ProjectAdminApproval from "./ProjectAdminApproval.js";
import ProfessorProjects from "./ProfessorProjects.js";
import ProfessorsApp  from "./ProfessorsApp.js"
import ProfessorApproval from "./ProfessorApproval.js"
import GradeSending from "./GradeSending.js"
import History from "./History.js"
import Appl from "./Appl.js"
import {Redirect} from 'react-router-dom';
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from 'axios';
import './App.css';
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


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
    {id:0,
    isAuth:false,
    name:'',
    type:''};
    this.getUserData=this.getUserData.bind(this);
  }

  getUserData=(somedata)=>{
    //localStorage.setItem("id", JSON.stringify(somedata.id))
    //localStorage.setItem("isAuth", JSON.stringify(somedata.isAuth))
    //localStorage.setItem("name", JSON.stringify(somedata.name))
    //localStorage.setItem("type", JSON.stringify(somedata.type));
    //this.setState(somedata) 
   }

 
  render () {return (
    <BrowserRouter>
      <div>
        <Route exact path='/'   render={(props) => <Login{...props}   getData={this.getUserData}/>}  />
        <Route path='/profile' render={props => <Profile {...props}  someData={this.state}/>}   />

        <Route path='/projectcatalog' render={props => <ProjectCatalog {...props}  someData={this.state}/>}   />
        <Route path='/project/:id' render={props => <Project {...props}  someData={this.state}/>}   />
        <Route path='/proj/:idd/roleofpr/:iddd' render={props => <RoleofPr {...props}  someData={this.state}/>}   />
        <Route path='/projectt/:id' render={props => <ProfessorsProject {...props}  someData={this.state}/>}   />
        <Route path='/projj/:idd/roleofpr/:iddd' render={props => <RoleofProfessorsPr {...props}  someData={this.state}/>}   />




        <Route path='/myprojects' render={props => <MyProjects {...props}  someData={this.state}/>}   />
        <Route path='/mygrades' render={props => <MyGrades {...props}  someData={this.state}/>}   />
        <Route path='/myapplications' render={props => <MyApplications {...props}  someData={this.state}/>}   />
        <Route path='/myapplicationss/:index' render={props => <StudentApplication {...props}  someData={this.state}/>}   />
        <Route path='/projects/:id/role/:index' render={props => <Application {...props}  someData={this.state}/>}   />
        

        <Route path='/adminapproval' render={props => <AdminApproval {...props}  someData={this.state}/>}   />
        <Route path='/adminapprovalofproject/:id' render={props => <ProjectAdminApproval {...props}  someData={this.state}/>}   />
        <Route path='/studentsappl' render={props => <StudentApplications {...props}  someData={this.state}/>}   />
        <Route path='/checkstudentappl/:idapp' render={props => <Appl {...props}  someData={this.state}/>}  />

        <Route path='/professorprojects' render={props => <ProfessorProjects {...props}  someData={this.state}/>}   />
        <Route path='/professorsapps' render={props => <ProfessorsApp {...props}  someData={this.state}/>}   />
        <Route path='/history' render={props => <History {...props}  someData={this.state}/>}   />
        <Route path='/projectpassport' render={props => <ProjectPassport {...props}  someData={this.state}/>}   />
        <Route path='/professorappoval/:idapp/:idrole' render={props => <ProfessorApproval {...props}  someData={this.state}/>}   />
      
        <Route path='/logout' render={props => <Logout{...props}  someData={this.state}/>}   />
        <Route path='/gradesending/:idd/:iddd' render={props => <GradeSending {...props}  someData={this.state}/>}   />
    </div>
    </BrowserRouter>
    )
  }
}

export default App;

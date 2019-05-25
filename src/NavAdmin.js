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



export default  class NavStudent extends React.Component{
    render(){
        return (
            <Navbar color="light" light expand="md">
            <NavbarBrand>НИУ ВШЭ</NavbarBrand>
            <NavbarToggler />
            <Collapse navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink  href="/projectcatalog">Каталог проектов</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/adminapproval/">Проекты на согласование</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/studentsappl">Заявки студентов</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/logout">Выход</NavLink>
                </NavItem>
                </Nav>
            </Collapse>
          </Navbar>
           )
        }
       }
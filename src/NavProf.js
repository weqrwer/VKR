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
          <NavbarToggler  />
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink  href="/projectpassport">Подать заявку</NavLink>
              </NavItem>
              <NavItem>
                <NavLink  href="/projectcatalog">Каталог проектов</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/professorprojects">Мои проекты</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/history">История согласования проектов</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/professorsapps">Заявки студентов</NavLink>
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
import {Redirect} from 'react-router-dom';
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


  import {  Form, FormGroup, Label,  FormText,Row,Col } from 'reactstrap';
 
export default class GradeSending extends React.Component {
    constructor(props) {
      super(props);
      this.state={
      ID:0,
      isauth:"",
      name:"",
      type:"",
      info:[],
      
  }
  this.handleClick=this.handleClick.bind(this)
  }
   componentDidMount(){
  
    var l='http://localhost:8000/api/profile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/proj/'+`${this.props.match.params.idd}`+'/roleofpr/'+`${this.props.match.params.iddd}`
   
      axios.get(l,{
        withCredentials: true}).then(response => { 
          if(response.status===200){
            console.log("aaaaaa"+response.data)
            this.setState({info:response.data})
          }
        })
        .catch(error => {
          console.log(error.response)
      })
    
    this.setState({ID:JSON.parse(localStorage.getItem("id"))})
    this.setState({isauth:JSON.parse(localStorage.getItem("isAuth"))})
    //this.setState({name:JSON.parse(localStorage.getItem("name"))})
    //this.setState({type:JSON.parse(localStorage.getItem("type"))})
   }
   
  handleChangeee=(index)=>(event)=>
  {
    const {info}=this.state;
    this.setState({
      info: info.map((item,id)=>{
  
       if(id===index){
         
          return{...item,[event.target.name]:event.target.value}
         
       }
       else{
        return item
       }
      })})
       
      
    }
    handleClick(){
      var ll='http://localhost:8000/api/professorprofile/'+`${JSON.parse(localStorage.getItem("id"))}`+'/'+`${this.props.match.params.idd}` +'/'+`${this.props.match.params.iddd}`
      axios.post(ll,this.state.info,{
        withCredentials: true}).then(response => { 
          if(response.status===200){
            console.log("aaaaaa"+response.data)
            alert('ok')
            this.props.history.push('/professorprojects')
          }
        })
        .catch(error => {
          console.log(error.response)
      })
    }
   render(){
      
    if(localStorage.length==0){
      return <Redirect to='/'  /> 
    }
     console.log(this.state.info)
     return( <div>
       <NavProf />
 <Jumbotron fluid>
       <Container fluid>
         <p className="lead">Выставление оценок</p>
       </Container>
       </Jumbotron>
       <Card >
    <CardBody>
   
   <CardSubtitle className="mb-2 text-muted"> Основная информация</CardSubtitle>
   <CardText >
   <Form  onSubmit={this.handleSubmit}>

       {this.state.info.map((item,index)=>(<div key={item['number_of_stage']}>    
       <Row form>
          <Col md={3}>
        <FormGroup>
        
        <Label >Оценка за этап {item['number_of_stage']}</Label>
        <Input   name="actual_credits" id="actual_credits"  placeholder={`${item['actual_credits']}`+' из '+`${item['credits']}`} value={this.state.info['actual_credits']} onChange={this.handleChangeee(index)}/>
        </FormGroup>
        </Col>
        </Row>
        </div >  ))}
        </Form>
        </CardText>
  </CardBody>
  </Card>
        <Button  style={{'borderRadius': '5px','margin':'15px'}} color="success" onClick={this.handleClick}>Подтвердить оценки</Button>
   </div>)
     }
  }
  
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import NavProf from "./NavProf";
import { Tooltip } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText,Row,Col } from 'reactstrap';
import { Collapse,  CardBody, Card } from 'reactstrap';
import {  CardText, 
  CardTitle, CardSubtitle} from 'reactstrap';
  import { Jumbotron, Container } from 'reactstrap';
  import { Table } from 'reactstrap';
import update from 'react-addons-update';

export default class ProjectPassport extends Component{
    constructor(props) {
      super(props);
      this.state = { 
        items: [],
        project_name:"",
        type_of_project:"",
        amount_of_students:0,
        status:"на согласовании",
        beginning_date:"",
        ending_date:"",
        comment:"",
        location:"",
        intensity:0,
        main_tasks:"",
        goals:"",
      stagelist:[],
      roleslist:[],
      tooltipOpen: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick=this.handleClick.bind(this)
    this.handleClickk=this.handleClickk.bind(this)
    this.toggle = this.toggle.bind(this);
    this.handleChangee = this.handleChangee.bind(this);
    this.handleChangeee = this.handleChangeee.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hCh=this.hCh.bind(this);
    this.isNull=this.isNull.bind(this)
    this.isNull2=this.isNull2.bind(this)
   }

   toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
    //inputs
    handleChange(event) {  
      this.setState({ [event.target.name]: event.target.value })
    }

    handleChangee=(index)=>(event)=>
    {
      const {stagelist}=this.state;
      this.setState({
        stagelist: stagelist.map((item,id)=>{

         if(id===index){
           
            return{...item,[event.target.name]:event.target.value}
           
         }
         else{
          return item
         }
        })})
         
        
      }


      handleChangeee=(index)=>(event)=>
    {
      const {roleslist}=this.state;
      this.setState({
        roleslist: roleslist.map((item,id)=>{

         if(id===index){
           
            return{...item,[event.target.name]:event.target.value}
           
         }
         else{
          return item
         }
        })})
         
        
      }


      hCh=(myId)=>(event)=>{
        const {roleslist}=this.state;
        this.setState({
          roleslist: roleslist.map((el, id) => {
           if (id === myId) {
            return { ...el, grades: el.grades.map(elem=>{
               return {...elem,[event.target.name]:event.target.value }
            }) }
           }
           return el;
          })
         })
         
      }
      
    handleSubmit(event) {
      event.preventDefault();
      console.log(this.props.someData)
      var url='http://localhost:8000/api/professorprofile/'+`${JSON.parse(localStorage.getItem("id"))}` +'/projectpassport'
      const project = {
        project_name: this.state.project_name,
        type_of_project:this.state.type_of_project,
        amount_of_students: this.state.amount_of_students,
        status:this.state.status,
        beginning_date: this.state.beginning_date,
        ending_date:this.state.ending_date,
        comment: this.state.comment,
        location:this.state.location,
        intensity: this.state.intensity,
        main_tasks:this.state.main_tasks,
        goals: this.state.goals,
        stagelist:this.state.stagelist,
        roleslist:this.state.roleslist
      }
      axios.post(url,project,{
        withCredentials: true}).then(response => { 
          if(response.status===200){
            console.log(response)
            console.log("insert ok")
            alert("Паспорт проекта успешно отправлен!")
            //console.log(this.state.change)
            this.props.history.push('/profile')
          }
        })

    }

    handleClick(){
      var {stagelist}=this.state;
      var joined = stagelist.concat([{"number_of_stage":'',"date_beggining":'',"date_ending":''}]);
      this.setState({ stagelist: joined })
    }
   
    handleClickk(){
      var i;var l={};
      for (i = 0; i < +this.state.stagelist.length; i++) { 
       l['grade_'+`${i+1}`]=0
       }
       console.log(l)
      var {roleslist}=this.state;
      var joined = roleslist.concat([{"role":'',"skills":'',"reccoms":'',"kurs":'', 'grades':[l]}]);
      this.setState({ roleslist: joined })
      var grades=this.state.roleslist.map(i=>i.grades)
      var j= grades.concat(l  )
      this.setState({ grades: j })
      //this.handleClickkk()
      
    }
    
    isNull(){
      if(this.state.stagelist.length==0){
        return 
          {this.state.stagelist.map((item,index)=> (<div >
            Номер этапа
            <input type="text" name="number_of_stage" value={this.state.stagelist['number_of_stage']}  onChange={this.handleChangee(index)} >
            </input>
             Начало этапа
            <input type="text" name="date_beggining" value={this.state.stagelist['date_beggining']}  onChange={this.handleChangee(index)} >
            </input>
            Конец этапа
            <input type="text" name="date_ending" value={this.state.stagelist['date_ending']} onChange={this.handleChangee(index)} >
            </input>
            
            </div>))}
      }
      else{ return (
        <Card style={{"display":'flex','overflow':'auto', 'marginLeft':"30px",'marginBottom':'20px'}}>
        <CardBody>
          <CardText>
                {this.state.stagelist.map((item,index)=> (<div >
                  <Row form>
          <Col md={3}>
        <FormGroup>
                  <Label>Номер этапа</Label>
                  <Input type="text" name="number_of_stage" value={this.state.stagelist['number_of_stage']}  onChange={this.handleChangee(index)} >
                  </Input></FormGroup>
        </Col> 
          <Col md={3}>
        <FormGroup>
                  <Label>Начало этапа</Label>
                  <Input type="text" name="date_beggining" value={this.state.stagelist['date_beggining']}  onChange={this.handleChangee(index)} >
                  </Input></FormGroup>
        </Col>  
          <Col md={3}>
        <FormGroup>
                  <Label>Конец этапа</Label>
                  <Input type="text" name="date_ending" value={this.state.stagelist['date_ending']} onChange={this.handleChangee(index)} >
                  </Input></FormGroup>
        </Col>
        </Row>
                  </div>))}
                  </CardText>
      </CardBody>
      </Card>
      )}
    }

    
    isNull2(){
      if(this.state.roleslist.length==0){
        return 
        {this.state.roleslist.map((item,index)=> (<div>
          Роль проекта
          <input type="text" name="role" value={this.state.stagelist['role']} onChange={this.handleChangeee(index)} >
          </input>
          Навыки
          <input type="text" name="skills" value={this.state.stagelist['skills']} onChange={this.handleChangeee(index)} >
          </input>
          Рекоммендации учебной программы
          <input type="text" name="reccoms" value={this.state.stagelist['reccoms']} onChange={this.handleChangeee(index)} >
          </input>
          Курс
          <input name="kurs" value={this.state.stagelist['kurs']} onChange={this.handleChangeee(index)} >
          </input>
          </div>))

this.state.roleslist.map((itemm,indexx)=>itemm.grades.map( (elem,ind)=> Object.keys(elem).map(  (thing,indexs) => {
  if(indexs===0)
  {
    return (<div>Студент {indexx+1}:<div>Оценка за {indexs+1} этап  {console.log(elem)} <input  type="text" name={"grade_"+`${indexs+1}`} 
    value={elem["grade_"+`${indexs+1}`]}  onChange={this.hCh(indexx)} >
  </input></div></div>)
  }
  else{
    return(<div>Оценка за {indexs+1} этап  {console.log(elem)} <input  type="text" name={"grade_"+`${indexs+1}`} 
    value={elem["grade_"+`${indexs+1}`]}  onChange={this.hCh(indexx)} >
  </input></div>)
  }
 })))
          
  
        }
      }
      else{ return (<div>
        <Card style={{"display":'flex','overflow':'auto','marginLeft':"30px",'marginBottom':'20px'}}>
        <CardBody>
          <CardText>
                {this.state.roleslist.map((item,index)=> (<div >

                  <Row form>
          <Col md={3}>
        <FormGroup>
                  <Label>Роль проекта</Label>
                  <Input type="text" name="role" value={this.state.stagelist['role']} onChange={this.handleChangeee(index)} >
                  </Input></FormGroup>
        </Col>    
          <Col md={3}>
        <FormGroup>
                  <Label>Навыки</Label>
                  <Input type="text" name="skills" value={this.state.stagelist['skills']} onChange={this.handleChangeee(index)}>
                  </Input></FormGroup>
        </Col>   
          <Col md={3}>
        <FormGroup>
                  <Label>Факультет</Label>
                  <Input type="text"  name="reccoms" value={this.state.stagelist['reccoms']} onChange={this.handleChangeee(index)} >
                  </Input></FormGroup>
        </Col>    
        <Col md={3}>
        <FormGroup>
                  <Label>Курс</Label>
                  <Input name="kurs" value={this.state.stagelist['kurs']} onChange={this.handleChangeee(index)} >
                  </Input></FormGroup>
        </Col>
        </Row>  
                  </div>))}
                  
                  </CardText>
      </CardBody>
      </Card>
      <Card style={{"display":'flex','overflow':'auto','marginLeft':"30px",'marginBottom':'20px'}}>
        <CardBody>
          <CardText>
      {this.state.roleslist.map((itemm,indexx)=>itemm.grades.map( (elem,ind)=> Object.keys(elem).map(  (thing,indexs) => {
        if(indexs===0)
        {
          return (<div>Роль {itemm.role}:<div>Оценка за {indexs+1} этап  {console.log(elem)} <Input  type="text" name={"grade_"+`${indexs+1}`} 
          value={elem["grade_"+`${indexs+1}`]}  onChange={this.hCh(indexx)} >
        </Input></div></div>)
        }
        else{
          return(<div>Оценка за {indexs+1} этап  {console.log(elem)} <Input  type="text" name={"grade_"+`${indexs+1}`} 
          value={elem["grade_"+`${indexs+1}`]}  onChange={this.hCh(indexx)} >
        </Input></div>)
        }
       })))}
       </CardText>
      </CardBody>
      </Card>
       </div>
      )}
    }

    render(){  
      
  if(localStorage.length==0){
    return <Redirect to='/'  /> 
  }
      console.log("AAAAAAAA")
      console.log(this.state.roleslist.map(i=>i.grades.map((j,ind)=>console.log(j))))

      console.log(this.state)
    return (
      <div >
        <NavProf />
        <Jumbotron fluid>
        <Container fluid>
          <p className="lead">Проект</p>
        </Container>
        </Jumbotron>
        <Card >
        <CardBody>
        <CardTitle> Заполните паспорт проекта</CardTitle>
  
       <CardText>
        <Form onSubmit={this.handleSubmit}>
        <div style={{'display':'flex','flex-direction': 'row'}} >
        <div style={{'display':'block'}}>
        <Row  form>
         <Col md={12}>
        <FormGroup >
          <Label>
          Название проекта</Label>
            <Input type="text" name="project_name" value={this.state.project_name} onChange={this.handleChange} />
            </FormGroup>
        </Col>
        </Row> 
        <Row form>
          <Col md={12}>
        <FormGroup>
          <Label>
          Тип проекта</Label>
            <Input type="text" name="type_of_project" value={this.state.type_of_project} onChange={this.handleChange} />
            </FormGroup>
        </Col>
        </Row>
            <Row form>
          <Col md={12}>
        <FormGroup>
          <Label>
          Количество студентов</Label>
            <Input  name="amount_of_students" value={this.state.amount_of_students} onChange={this.handleChange} />
            </FormGroup>
        </Col>
        </Row>
            <Row form>
          <Col md={12}>
        <FormGroup>
          <Label>
          Статус проекта</Label>
            <Input type="text" name="status" value={this.state.status} />
            </FormGroup>
        </Col>
        </Row>
            <Row form>
          <Col md={12}>
        <FormGroup>
          <Label>
          Дата начала</Label>
            <Input type="text" name="beginning_date" value={this.state.beginning_date} onChange={this.handleChange} />
            </FormGroup>
        </Col>
        </Row>
            <Row form>
          <Col md={12}>
        <FormGroup>
          <Label>
          Дата конца</Label>
            <Input type="text" name="ending_date" value={this.state.ending_date} onChange={this.handleChange} />
            </FormGroup>
        </Col>
        </Row>
            <Row form>
          <Col md={12}>
        <FormGroup>
          <Label>
          Комментарий к проекту</Label>
            <Input type="textarea" name="comment" value={this.state.comment } onChange={this.handleChange} />
            </FormGroup>
        </Col>
        </Row>
            <Row form>
          <Col md={12}>
        <FormGroup>
          <Label>
            Локация </Label>
            <Input type="text" name="location" value={this.state.location} onChange={this.handleChange} />
            </FormGroup>
        </Col>
        </Row>
            <Row form>
          <Col md={12}>
        <FormGroup>
          <Label>
          Интенсивность</Label>
            <Input name="intensity" value={this.state.intensity} onChange={this.handleChange} />
            </FormGroup>
        </Col>
        </Row>
            <Row form>
          <Col md={12}>
        <FormGroup>
          <Label>
          Основные задачи</Label>
            <Input type="textarea" name="main_tasks" value={this.state.main_tasks} onChange={this.handleChange} />
            </FormGroup>
        </Col>
        </Row>
            <Row form>
          <Col md={12}>
        <FormGroup>
          <Label>
          Цели</Label>
            <Input type="textarea" name="goals" value={this.state.goals} onChange={this.handleChange} />
            </FormGroup>
        </Col>
        </Row>
       
          <Button style={{'borderRadius': '5px','margin':'5px'}} color="success" onClick={this.handleClick}> Добавить этап</Button>
          <Button id="AutoHideExample" style={{'borderRadius': '5px','margin':'5px'}} color="success" onClick={this.handleClickk}> Добавить роль</Button>
          <Tooltip placement="top" isOpen={this.state.tooltipOpen} autohide={false} target="AutoHideExample" toggle={this.toggle}>
          Сначала заполните этапы проектов!
        </Tooltip>
         {/* <input type="submit" value="Отправить заявку" />*/}
          <Button style={{'borderRadius': '5px','margin':'5px'}} color="success">Отправить заявку</Button>
          
         </div>
        <div style={{'display':'block'}}>
        {this.isNull()}
        {this.isNull2()}</div>
         </div>
        </Form>
        </CardText>
        </CardBody>
        </Card>
        </div> 
        
      );
    }
    
  
  }
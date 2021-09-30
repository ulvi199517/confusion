/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import { Button, Card, CardImg, CardTitle, CardBody, CardText, 
        Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, 
        Row, Label, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
const RenderDish =({dish}) => {
    return(
        <div  className="col-12 col-md-5 m-1">
            <Card key={dish.id}>
                <CardImg width='100%' top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>  
        </div>
    );
}
const RenderComments = ({comments}) => {
        if(comments != null)
        return(
            <div  className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className='list-unstyled'>
                {
                    comments.map(comment => {
                        return(
                            <li key={comment.id}>
                            <p className='mb-0'>{comment.comment}</p>
                            <p>
                                -- {comment.author}, 
                                {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </p>
                            </li>
                        )
                    })

                }
                </ul>
                <CommentForm comments={comments}  />
            </div>
        );
        else 
                return(
                    <div></div>
                );
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component{
    constructor(){
        super();

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        }
    }
    toggleNav = () => {
        this.setState({isNavOpen: !this.state.isNavOpen});
    }
    toggleModal = () => {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }
    handleSubmit = (values) =>{
        console.log('Current State is:' + JSON.stringify(values));
        alert('Current State is:' + JSON.stringify(values));
    }
    render(){
        return(
            <div>
                <Button onClick={this.toggleModal} color='light border-dark'><span className='fa fa-pencil fa-lg'></span> Sumbit Comment</Button> 
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Sumbit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Col>
                                    <Label htmlFor='rating'>Rating</Label>
                                    <Control.select
                                            model='.rating' 
                                            id='rating' 
                                            name='rating'
                                            className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="yourName">First Name</Label>
                                    <Control.text 
                                        model=".yourName" 
                                        id="yourName" 
                                        name="yourName"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".yourName"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                            <Col>
                                <Label htmlFor='message'>Comment</Label>
                                    <Control.textarea
                                        model='.message'
                                        id='message'
                                        name='message'
                                        placeholder='Type your comment here...'
                                        className="form-control"
                                        rows='6'
                                        validators={{
                                            required, minLength: minLength(10), maxLength: maxLength(50)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".message"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 10 characters',
                                            maxLength: 'Must be 50 characters or less'
                                        }}
                                    />
                                </Col>        
                            </Row>
                            <Button type="submit" className="bg-primary">
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const DishDetail = ({dish, comments}) => {
        if(dish != null)
        return(
            <div  className="container">
                <div className='row'>
                <Breadcrumb>
                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                <div className='col-12'>
                <h3>{dish.name}</h3>
                </div>
            </div>
                <div className='row'>
                    <RenderDish dish={dish} />
                    <RenderComments comments={comments} />
                </div>
                <div className='row'>

                </div>
            </div>

        );
        else 
            return(
                <div></div>
            )
    
}
export default DishDetail;

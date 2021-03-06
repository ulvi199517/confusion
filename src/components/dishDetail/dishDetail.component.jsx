/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import { Button, Card, CardImg, CardTitle, CardBody, CardText, 
        Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, 
        Row, Label, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from '../loading/loading.component';
import {baseUrl} from '../../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

const RenderDish =({dish}) => {
    return(
        <div  className="col-12 col-md-5 m-1">
            <FadeTransform in transformProps = {{
                exitTransform: 'scale(0.5) translate(-50%)'
            }}>
                <Card key={dish.id}>
                    <CardImg width='100%' top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>  
            </FadeTransform>
        </div>
    );
}
const RenderComments = ({comments, postComment, dishId}) => {
        if(comments != null)
        return(
            <div  className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className='list-unstyled'>
                <Stagger in>
                    {
                        comments.map(comment => {
                            return(
                                <Fade in key={comment.id}>
                                    <li>
                                    <p className='mb-0'>{comment.comment}</p>
                                    <p>
                                        -- {comment.author}, &nbsp;
                                        {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                    </p>
                                    </li>
                                </Fade>
                            )
                        })

                    }

                </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}  />
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
    toggleModal = () => {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }
    handleSubmit = (values) =>{
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
        console.log('Current State is:' + JSON.stringify(values));
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
                                            name='rating'
                                            className="form-control"
                                            required
                                            >
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="author">First Name</Label>
                                    <Control.text 
                                        model=".author" 
                                        id="author" 
                                        name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
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
                                <Label htmlFor='comment'>Comment</Label>
                                    <Control.textarea
                                        model='.comment'
                                        id='comment'
                                        name='comment'
                                        placeholder='Type your comment here...'
                                        className="form-control"
                                        rows='6'
                                        validators={{
                                            required, minLength: minLength(10), maxLength: maxLength(250)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 10 characters',
                                            maxLength: 'Must be 250 characters or less'
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

const DishDetail = (props) => {
    if ( props.isLoading) {
        return(
            <div className='container'>
                <div className='row'>
                    <Loading/>
                </div>
            </div>
        )
    } else if(props.errMess) {
        return(
            <div className='container'>
                <div className='row'>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    } else if(props.dish != null)
        return(
            <div  className="container">
                <div className='row'>
                <Breadcrumb className='w-100'>
                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                <div className='col-12'>
                <h3>{props.dish.name}</h3>
                </div>
            </div>
                <div className='row'>
                    <RenderDish dish={props.dish} />
                    <RenderComments 
                        comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}
                    />
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

import React, { Component } from 'react';
import {Breadcrumb, 
        BreadcrumbItem,
        Button,
        Form,
        FormGroup,
        Label,
        Input,
        Col,
        FormFeedback
    } from 'reactstrap';
import {Link} from 'react-router-dom';

class ContactPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            telNum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstName: false,
                lastName: false,
                telNum: false,
                email: false,
                message: false
            }
        }
    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }
    validate = (firstName, lastName, telNum, email, message) => {
        const errors = {
            firstName: '',
            lastName: '',
            telNum: '',
            email: '',
            message: ''
        };
        if(this.state.touched.firstName && firstName.length < 3)
            errors.firstName = 'First Name should be more than 3 characters';
        else if (this.state.touched.firstName && firstName.length > 10)
            errors.firstName = 'First Name should be less than 10 characters';
        if (this.state.touched.lastName && lastName.length < 3)
            errors.lastName = 'Last Name should be less than 10 characters';
        else if (this.state.touched.lastName && lastName.length > 10)
            errors.lastName = 'Last Name should be less than 10 characters';
        const reg = /^\d+$/;
        if(this.state.touched.telNum && !reg.test(telNum))
            errors.telNum = 'Tel. Number should contain numbers only'
        if(this.state.touched.email && email.split('').filter(x => x === '@').length !==1)
            errors.email = 'Email should contain a @ sign';
        else if(this.state.touched.email && email.split('').filter(x => x === '.').length !==1)
            errors.email = 'Email should contain a . sign';
            if(this.state.touched.message && message.length < 40)
            errors.message = 'Message should be more than 40 characters';
        else if (this.state.touched.message && message.length > 250)
            errors.message = 'Message should be less than 250 characters';
        return errors;
    }
    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.setState({ firstName: '',
        lastName: '',
        telNum: '',
        email: '',
        agree: false,
        contactType: 'Tel.',
        message: ''})
        console.log('Current State is:' + JSON.stringify(this.state));
        alert('Current State is:' + JSON.stringify(this.state));
    }
    render(){
        const errors = this.validate(
            this.state.firstName,
            this.state.lastName,
            this.state.telNum,
            this.state.email,
            this.state.message);

        return(
            <div className="container">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Contact Us</h3>
                        <hr/>
                    </div>
            </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary " href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className='row row-content'>
                    <div className='col-12'>
                        <h3>Send us Your Feedback</h3>
                    </div>
                    <div className='col-12 col-md-9'>
                        <Form onSumbit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input 
                                        type='text' 
                                        id='firstName' 
                                        name='firstName'
                                        placeholder='Type your first name'  
                                        value={this.state.firstName}
                                        required
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur('firstName')}
                                        valid={errors.firstName === ''}
                                        invalid={errors.firstName !== ''}
                                    />
                                    <FormFeedback>{errors.firstName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input 
                                        type='text' 
                                        id='lastName' 
                                        name='lastName'
                                        placeholder='Type your last name'  
                                        value={this.state.lastName}
                                        required
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur('lastName')}
                                        valid={errors.lastName === ''}
                                        invalid={errors.lastName !== ''}  
                                    />
                                    <FormFeedback>{errors.lastName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telNum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Input 
                                        type='tel' 
                                        id='telNum' 
                                        name='telNum'
                                        placeholder='Type your tel number'  
                                        value={this.state.telNum}
                                        required
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur('telNum')}
                                        valid={errors.telNum === ''}
                                        invalid={errors.telNum !== ''}   

                                    />
                                    <FormFeedback>{errors.telNum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input 
                                        type='email' 
                                        id='email' 
                                        name='email'
                                        placeholder='Type your email'  
                                        value={this.state.email}  
                                        required
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur('email')}
                                        valid={errors.email === ''}
                                        invalid={errors.email !== ''}   

                                    />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                            
                                <Col md={{size: 6, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input 
                                                type='checkbox' 
                                                name='agree'
                                                checked={this.state.agree}
                                                onChange={this.handleChange} 
                                            /> 
                                            {' '} <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Input 
                                        type='select'
                                        name='contactType'
                                        value={this.state.contactType}
                                        onChange={this.handleChange}
                                    >
                                    <option>Tel.</option>
                                    <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='feedback' md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type='textarea'
                                           id='message'
                                           name='message'
                                           rows='12'
                                           value={this.state.message}
                                           required
                                           onChange={this.handleChange}
                                           onBlur={this.handleBlur('message')}
                                           valid={errors.message === ''}
                                           invalid={errors.message !== ''}   

                                    />
                                    <FormFeedback>{errors.message}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={{size:10, offset: 2}}>
                                    <Button type='submit' color='primary'>Send Feedback</Button>
                                </Col>

                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactPage;
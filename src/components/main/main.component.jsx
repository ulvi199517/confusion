import React, { Component } from 'react';
import MenuPage from '../../pages/menu/menu.component';
import DishDetail from '../dishDetail/dishDetail.component';
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import HomePage from '../../pages/home/home.component';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import ContactPage from '../../pages/contact/contact.component';
import AboutPage from '../../pages/about/about.component';
import {connect} from 'react-redux';
import {postComment, fetchComments} from '../../redux/comments/comments.action';
import {fetchDishes} from '../../redux/dishes/dishes.action';
import { fetchPromos } from '../../redux/promotions/promotions.action';
import {fetchLeaders} from '../../redux/leaders/leaders.action'
import {postFeedback} from '../../redux/forms/forms.actions';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  onDishSelect(dishId) {
    this.setState({selectedDish: dishId})
  }
  render(){
    const renderHomePage = () => {
      return(
        <HomePage dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                  promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                  leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                  dishesLoading={this.props.dishes.isLoading}
                  promosLoading={this.props.promotions.isLoading}
                  leadersLoading={this.props.leaders.isLoading}
                  dishesErrMess={this.props.dishes.errMess}     
                  promosErrMess={this.props.promotions.errMess}     
                  leadersErrMess={this.props.leaders.errMess}     
        />
      )
    }
    const renderAboutUsPage = () => {
      return(
        <AboutPage leaders={this.props.leaders.leaders}
        />
      )
    }
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    isLoading={this.props.dishes.isLoading}
                    ErrMess={this.props.dishes.errMess}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
        />
      );
    }
    return(
    <div>
      <Header/>
      <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
          <Switch>
          <Route path='/home' component={renderHomePage} />
          <Route exact path='/menu' component={() => <MenuPage dishes={this.props.dishes} />} />
          <Route path='/menu/:dishId' component={DishWithId}/>
          <Route exact path='/contactus' component={() => <ContactPage resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />}/>
          <Route exact path='/aboutus' component={renderAboutUsPage} />

            <Redirect to='/home'/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer/>  
    </div>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => 
              dispatch(postComment(dishId, rating, author, comment)),
postFeedback: feedback => dispatch(postFeedback(feedback)), 
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

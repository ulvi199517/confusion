import React, { Component } from 'react';
import {DISHES} from '../../shared/dishes.data';
import {PROMOTIONS} from '../../shared/promotions.data';
import {LEADERS} from '../../shared/leaders.data';
import {COMMENTS} from '../../shared/comments.data';
import MenuPage from '../../pages/menu/menu.component';
import DishDetail from '../dishDetail/dishDetail.component';
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import HomePage from '../../pages/home/home.component';
import {Switch, Route, Redirect} from 'react-router-dom';
import ContactPage from '../../pages/contact/contact.component';
import AboutPage from '../../pages/about/about.component';

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS
    }
  }
  onDishSelect(dishId) {
    this.setState({selectedDish: dishId})
  }
  render(){
    const renderHomePage = () => {
      return(
        <HomePage dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }
    const renderAboutUsPage = () => {
      return(
        <AboutPage leader={this.state.leaders}
        />
      )
    }
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
        />
      );
    }
    return(
    <div>
      <Header/>
        <Switch>
        <Route path='/home' component={renderHomePage} />
        <Route exact path='/menu' component={() => <MenuPage dishes={this.state.dishes} />} />
        <Route path='/menu/:dishId' component={DishWithId}/>
        <Route exact path='/contactus' component={ContactPage} />
        <Route exact path='/aboutus' component={renderAboutUsPage} />

          <Redirect to='/home'/>
        </Switch>
      <Footer/>  
    </div>

    )
  }
}
export default Main;

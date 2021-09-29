import React, { Component } from 'react';
import {DISHES} from '../../shared/dishes.data';
import {PROMOTIONS} from '../../shared/promotions.data';
import {LEADERS} from '../../shared/leaders.data';
import {COMMENTS} from '../../shared/comments.data';
import Menu from '../../pages/menu/menu.component';
import DishDetail from '../dishDetail/dishDetail.component';
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import Home from '../../pages/home/home.component';
import {Switch, Route, Redirect} from 'react-router-dom';
import Contact from '../../pages/contact/contact.component';

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
    const HomePage = () => {
      return(
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }
    return(
    <div>
      <Header/>
        <Switch>
        <Route path='/home' component={HomePage} />
        <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
        <Route exact path='/contactus' component={Contact} />

          <Redirect to='/home'/>
        </Switch>
      <Footer/>  
    </div>

    )
  }
}
export default Main;


// class Main extends Component {
//   constructor(props){
//     super(props);

//     this.state = {
//       dishes: DISHES,
//       selectedDish: null
//     }
//   }
//   onDishSelect(dishId) {
//     this.setState({selectedDish: dishId})
//   }
//   render(){
//     const {dishes, selectedDish} = this.state;
//     console.log(selectedDish)
//     return(
//     <div>
//       <Header/>
//       <Menu style={{cursor:'pointer'}} dishes={dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
//       <DishDetail dish={dishes.filter((dish) => dish.id === selectedDish)[0]}/>
//       <Footer/>  
//     </div>

//     )
//   }
// }
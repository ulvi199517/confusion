import React, { Component } from 'react';
import {DISHES} from '../../shared/dishes.data';
import Menu from '../menu/menu.component';
import DishDetail from '../dishDetail/dishDetail.component';
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import Home from '../../pages/home/home.component';
import {Switch, Route, Redirect} from 'react-router-dom';


class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
    }
  }
  onDishSelect(dishId) {
    this.setState({selectedDish: dishId})
  }
  render(){
    const HomePage = () => {
      return(
        <Home/>
      )
    }
    return(
    <div>
      <Header/>
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
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
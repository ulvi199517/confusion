import React, { Component } from 'react';
import {DISHES} from '../../shared/dishes.data';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from '../menu/menu.component';
import DishDetail from '../dishDetail/dishDetail.component';

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
      selectedDish: null
    }
  }
  onDishSelect(dishId) {
    this.setState({selectedDish: dishId})
  }
  render(){
    const {dishes, selectedDish} = this.state;
    console.log(selectedDish)
    return(
    <div>
      <Navbar dark color='primary'>
        <div className='container'>
          <NavbarBrand href='/'>Ristorante Con Fusion</NavbarBrand>
          </div>
      </Navbar>
      <Menu style={{cursor:'pointer'}} dishes={dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
      <DishDetail dish={dishes.filter((dish) => dish.id === selectedDish)[0]}/>
    </div>

    )
  }
}
export default Main;

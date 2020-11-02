import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import React, { Component } from 'react';
import Spinner from '../../../components/UI/Spinner/Spinner';

import styles from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault(); // prevent send request - interesting compared to Vue way
    // console.log('ingredients: ', this.props.ingredients )

    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'PJ Burgerssen',
        address: {
          street: '123 Main Street',
          zipCode: '332257',
          country: 'Canada'
        },
        email: 'test@localhost.com'
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error=> {
        this.setState({ loading: false });
        console.error(error);
      })
  }

  render() {
    let form = (
      <form>
        <input className={styles.Input} type="text" name="name" placeholder="Your name" />
        <input className={styles.Input} type="email" name="email" placeholder="Your email" />
        <input className={styles.Input} type="text" name="street" placeholder="Street" />
        <input className={styles.Input} type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
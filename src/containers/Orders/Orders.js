import React, { Component } from 'react';
import axios from '../../axios-orders';
import firebaseurl from '../../firebase.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Order from '../../components/Order/Order';

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get(`${firebaseurl}/orders.json`)
      .then(response => {
        const fetchedOrders = []
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key
          });
        }
        this.setState({orders: fetchedOrders})
        console.log(response.data)
      })
      .catch(error => {
        this.setState({error: true})
      })
      .finally(() => {
        this.setState({loading: false});
      })
  }

  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios);
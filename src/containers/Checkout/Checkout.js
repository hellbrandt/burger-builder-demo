import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  // Dummy ingredients, not passed from Burger Builder
  state = {
    ingredients: {}
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    for (let param of query.entries()) {
      const ingredient = param[0];
      const quantity = param[1];
      ingredients = { ...ingredients, [ingredient]: Number(quantity) }
    }
    this.setState({ ingredients: ingredients });
  }

  checkoutCancelledHandler = () => {
    console.log(this.props.history);
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler} />
      </div>
    );
  }
}

export default Checkout;
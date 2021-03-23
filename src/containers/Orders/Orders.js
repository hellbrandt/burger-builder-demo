import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

// TODO: Add spinner to deleted order
// TODO: Network error still showing as success - why?

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  deleteOrderHandler = (orderId) => {
    this.props.onDeleteOrder(orderId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        this.props.orders.map((order) => (
          <Order
            key={order.id}
            orderId={order.id}
            ingredients={order.ingredients}
            price={order.price}
            deleted={(orderId) => this.deleteOrderHandler(orderId)} />
        ))
      )
    }
    return (
      <div>
        { orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
    onDeleteOrder: (orderId) => dispatch(actions.deleteOrder(orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
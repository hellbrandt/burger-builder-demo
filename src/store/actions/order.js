import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData) // .json is required by Firebase
      .then(response => {
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json') // .json is required by Firebase
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error));
      });
  }
}

export const deleteOrderSuccess = (orderId) => {
  return {
    type: actionTypes.DELETE_ORDER_SUCCESS,
    orderId: orderId // Need this to delete order from redux state
  }
}

export const deleteOrderFail = (error) => {
  return {
    type: actionTypes.DELETE_ORDER_FAIL,
    error: error
  }
}

export const deleteOrderStart = () => {
  return {
    type: actionTypes.DELETE_ORDER_START
  }
}

export const deleteOrder = (orderId) => {
  return dispatch => {
    // dispatch(deleteOrderStart());
    axios.delete('/orders/' + orderId + '.json') // .json is required by Firebase
      .then(response => {
        dispatch(deleteOrderSuccess(orderId));
      })
      .catch(error => {
        dispatch(deleteOrderFail(error));
      });
  }
}

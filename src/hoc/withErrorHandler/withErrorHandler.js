import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary/Auxilliary';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      initialised: false,
      error: null
    }
    componentDidMount() {
      axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      });
      axios.interceptors.response.use(response => response, error => {
        this.setState({ error: error });
      });
      this.setState({ initialised: true });
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }
    render() {
      if (!this.state.initialised) return null;
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler;
import React, { Component } from 'react';

import classes from './Modal.module.css';

import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  componentDidUpdate() {
    console.log('[Modal] did update');
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Could in theory check for more props or use PureComponent which checks all
    // But that doesn't give any benefit here and would take more resource
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    )
  }
}

export default Modal;
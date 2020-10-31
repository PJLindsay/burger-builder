import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = ( WrappedComponent, axios ) => {
  return class extends Component {

    state = {
      error: null
    }

    componentDidMount () {

      // clear prior error on request
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null})
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error})
      });
    }

    // remove any attached interceptors when we unmount so we don't have memory leaks
    componentWillUnmount () {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            { this.state.error ? this.state.error.message : null }
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler;
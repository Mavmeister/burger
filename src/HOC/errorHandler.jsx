import React, {Component} from 'react';
import Modal from '../components/UI/Modal/Modal';
import Wrapper from './wrapper'

// wrapper that returns a function which returns the wrapped component
// with any props passed into that component 
const ErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        componentWillUnmount() {
            // removes interceptors on components that arent being used
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <Wrapper>
                    <Modal 
                        show={this.state.error}
                        modalClose={this.errorConfirmedHandler}>
                        shit.
                        <br/>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Wrapper>
            
            )
        }
    }
}

export default ErrorHandler;
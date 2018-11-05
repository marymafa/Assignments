import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import axios from 'axios';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.inputusername = this.inputusername.bind(this);
        this.inputEmail = this.inputEmail.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
    }
    async  postData() {
        var postNewData = await axios.post('http://localhost:3002/customerData', {
            username: this.props.username,
            email: this.props.email,
            password: this.props.password
        });
    };
    inputusername(e) {
        this.props.updateusername(e.target.value);
    };
    inputEmail(e) {
        this.props.updateEmail(e.target.value);
    };
    inputPassword(e) {
        this.props.updatePassword(e.target.value);
    };
    render() {
        return (
            <div>
                <div>
                    <label>username</label>
                    <input type="text" name="username" onChange={this.inputusername} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" onChange={this.inputEmail} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.inputPassword} />
                </div>
                <div>
                    <button type="button" value="Submit" onClick={() => this.postData()} >Register</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        // username: state.signUpPage.username,
        // email: state.signUpPage.email,
        // password: state.signUpPage.password
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateusername: (username) => {
            dispatch(action.saveusername(username))
        },
        updateEmail: (email) => {
            dispatch(action.saveEmail(email))
        },
        updatePassword: (password) => {
            dispatch(action.savePassWord(password))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);
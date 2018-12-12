import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import axios from 'axios';
import history from '../history'
import { Redirect, Link } from 'react-router-dom';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
        super(props);
        this.inputEmail = this.inputEmail.bind(this);
        this.inputPassword = this.inputPassword.bind(this);

    }
    componentDidMount() {
        sessionStorage.removeItem("jwt-secret");
        history.replace('/')
        console.log("removed", sessionStorage.removeItem('jwt-secret'))
    }
    async  postData() {
        var res = await axios.post('http://localhost:3002/loginData', {
            email: this.props.email,
            password: this.props.password
        });
        console.log("res", res.status);

        if (res.status === 200) {
            var obj = JSON.stringify(res.data);
            sessionStorage.setItem("jwt-secret", obj);
            sessionStorage.getItem('myData', obj);
            this.setState({
                redirect: true,
            })
        } else {
            this.setState({ redirect: false })
        }


    };
    inputEmail(e) {
        this.props.updateEmail(e.target.value);
    };
    inputPassword(e) {
        this.props.updatePassword(e.target.value);
    };
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/viewAllBusinessLocations' />
        }
    }
    render() {
        console.log("this is my state", this.props);

        return (
            <div>
                <div>
                    <Link to="/" >Logout</Link>|
                    <Link to="/signUp" >signup</Link>
                </div>
                <div><h1>Enter your details</h1> </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" onChange={this.inputEmail} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.inputPassword} />
                </div>
                <div>
                    {this.renderRedirect()}
                    <button type="button" value="Submit" onClick={() => this.postData()} >Login</button>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        email: state.loginPage.email,
        password: state.loginPage.password
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateEmail: (email) => {
            dispatch(action.comfirmEmail(email))
        },
        updatePassword: (password) => {
            dispatch(action.comfirmPassword(password))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogIn);
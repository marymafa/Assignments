import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import axios from 'axios';
import history from '../history';
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
        this.logout = this.logout.bind(this)
    }
    async  postData() {
        var res = await axios.post('http://localhost:3002/loginData', {
            email: this.props.email,
            password: this.props.password
        });
        var obj = JSON.stringify(res.data);
        console.log("this is my res", res)
        sessionStorage.setItem("jwt-secret", obj);
        sessionStorage.getItem('myData', obj);
        console.log("obj", obj);

        this.setState({
            redirect: true,
        })
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
    logout() {
        sessionStorage.removeItem("jwt-secret");
        history.replace('/');
    }
    render() {
        console.log("this is my state", this.props);

        return (
            <div>
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

                <div className="link">
                    <Link to="/signUp" onClick={this.logout}><button type="button">signUp</button></Link>
                </div>
                <div className="link">
                    <Link to="/" ><button type="button">logout</button></Link>
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
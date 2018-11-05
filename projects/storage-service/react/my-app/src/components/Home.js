import React from "react";
import { Redirect } from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.redirectData = this.redirectData.bind(this);
    }
    redirectData() {
        this.setState({ redirect: true })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/signUp' />
        }
        return (
            <div>
                <h1 className="home">Storage Service</h1>
                <div className="app" style={{ background: 'red', color: 'white' }} />
                <button className="homebutton" onClick={this.redirectData}>Login/Signup</button>
            </div>
        )
    }
}



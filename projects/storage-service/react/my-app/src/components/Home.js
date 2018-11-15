import React from "react";
import { Redirect, Link } from 'react-router-dom';

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
            return <Redirect to='/business' />
        }
        return (
            <div>
                <h1 className="home">Storage Service</h1>
                <div className="app" style={{ background: 'red', color: 'white' }} />
                <Link  className="homebutton" to="/business" ><button type="button">Register business</button></Link>
                <Link  className="rentbutton" to="/login" ><button type="button">Rent units</button></Link>
            </div>
        )
    }
}



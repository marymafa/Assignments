import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class AllBusinesses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            business: [],
            selectBusinessId: ""
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3002/data").then(result => {
            this.setState({ business: result.data })
        })

    }
    redirectData() {
        this.setState({
            redirect: true,
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/locations' />
        }
    }
    render() {
        return (
            <div>
                <h1>All businesses</h1>
                //google how to store selected values in react redux
                <div className="busid">
                    <label>
                        Business:

                            <select name="selectBusinessId" value={this.state.selectBusinessId} onChange={}>
                            <option value={0}>All businesses</option>
                            {this.state.business.map(business => <option key={business.id} value={business.id}>{business.name}</option>)}
                        </select>
                    </label>
                </div>
                <div>
                    {this.renderRedirect()}
                    <button onClick={() => this.renderRedirect()}>Next</button>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export default class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerDetails: [],
            redirect: false,
        }
    }

    componentDidMount() {
        var getToken = sessionStorage.getItem('jwt-secret');
        let token = JSON.parse(getToken).token
        var decodetoken = jwt.decode(token)
        var results = axios.get("http://localhost:3002/RentAUnit/" + decodetoken.email)
            .then(reponse => this.setState({ customerDetails: reponse.data }))
            .catch(e => console.log(e));

    }

    render() {
        console.log("customerDetails", this.state.customerDetails)
        return (
            <div>
                <h1>you have rented</h1>
                <div>
                    <thead>
                        <tr>
                            <th>Reference Number</th>
                            <th>User name</th>
                            <th>unit</th>
                            <th>unit type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.customerDetails.map(element => {
                            console.log("element", this.state.customerDetails)
                            return <tr name={`row-${element.id}`} key={this.state.customerDetails.indexOf(element)}>
                                <td>{element.id === "undefined" ? "" : element.id}</td>
                                <td>{element.username}</td>
                                <td>{element.unit_name}</td>
                                <td>{element.name}</td>
                            </tr>
                        })}
                    </tbody>
                </div>
            </div>
        )
    }
}
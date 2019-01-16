import React, { Component } from 'react';
import axios from 'axios';

export default class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerDetails: [],
            redirect: false,
        }
    }
   

    componentDidMount() {
        axios.get("http://localhost:3002/locationData").then(result => {
            this.setState({ customerDetails: result.data })
        })
    }
    render() {
        console.log("state", this.state);
        return (
            <div>
                <h1>you have rented</h1>
                <div>
                    <thead>
                        <tr>
                            <th>Reference Number</th>
                            <th>User name</th>
                            <th>location</th>
                            <th>unit</th>
                            <th>unit type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.customerDetails.map(element => {
                            console.log("element", element)
                            return <tr name={`row-${element.id}`} key={this.state.customerDetails.indexOf(element)}>
                                <td>{element.id === "undefined" ? "" : element.id}</td>
                                <td>{element.username}</td>
                                <td>{element.address}</td>
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
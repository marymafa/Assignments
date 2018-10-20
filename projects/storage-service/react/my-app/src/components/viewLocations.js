import React, { Component } from 'react';
import axios from 'axios';
export default class ViewLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: []
        }
    }

    componentWillMount() {
        axios.get("http://localhost:3002/locationData").then(result => {
            this.setState({ location: result.data })
        })


    }

    render() {
        console.log("state", this.state.location);
        return (
            <div>
                <h1>Locations of the Business</h1>
                <div>
                    <thead>
                        <tr>
                            <th>Reference Number</th>
                            <th>Address</th>
                            <th>Country</th>
                            <th>Business Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.location.map(element => {
                            return <tr name={`row-${element.id} ${element.businesses_id}`} key={this.state.location.indexOf(element)}>
                                <td>{element.id === "undefined" ? "" : element.id}</td>
                                <td>{element.address}</td>
                                <td>{element.country}</td>
                                <td>{element.businesses_id === undefined ? "" : element.businesses_id}</td>
                            </tr>
                        })}
                    </tbody>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react';
import axios from 'axios';
export default class ViewLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3002/locationData").then(result => {
            this.setState({ location: result.data })
        })
    }
    render() {
        console.log("state", this.state);
        return (
            <div>
                <h1>Locations of businesses</h1>
                <div>
                    <thead>
                        <tr>
                            <th>Reference Number</th>
                            <th>Address</th>
                            <th>Business Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.location.map(element => {
                            return <tr name={`row-${element.id} ${element.business_id}`} key={this.state.location.indexOf(element)}>
                                <td>{element.id === "undefined" ? "" : element.id}</td>
                                <td>{element.address}</td>
                                <td>{element.business_id === "undefined" ? "" : element.business_id}</td>
                            </tr>
                        })}
                    </tbody>
                </div>
            </div>
        )
    }
}

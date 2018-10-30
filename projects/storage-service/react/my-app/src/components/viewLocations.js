import React, { Component } from 'react';
import axios from 'axios';
export default class ViewLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: [],
           
        }
    }
    componentWillMount() {
        axios.get("http://localhost:3002/locationData").then(result => {
            this.setState({ location: result.data })
            console.log("result", result.data);

        })

    }
    render() {
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
                        {this.state.location.map(user => {
                            console.log("user", user);

                            return <tr name={`row-${user.id} ${user.businesses_id}`} key={this.state.location.indexOf(user)}>
                                <td>{user.id === "undefined" ? "" : user.id}</td>
                                <td>{user.address}</td>
                                <td>{user.country}</td>
                                <td>{user.businesses_id === "undefined" ? "" : user.businesses_id}</td>
                            </tr>
                            console.log("user", user);
                        })}
                    </tbody>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react';
import axios from 'axios';

export default class ViewCustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            redirect: false,
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3002/loginData").then(result => {
            this.setState({ users: result.data })

        })
    }
    render() {
        console.log("state", this.state.users)
        return (
            <div>
                <h1>user Details</h1>
                <div>
                    <thead>
                        <tr>
                            <th>Reference Number</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>unit name</th>
                            <th>blocks_id</th>
                            <th>units_type_id</th>
                            <th>Length</th>
                            <th>Height</th>
                            <th>Width</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(element => {
                            return <tr name={`row-${element.id}${element.blocks_id}${element.units_type_id}`} key={this.state.users.indexOf(element)}>
                                <td>{element.id === "undefined" ? "" : element.id}</td>
                                <td>{element.username}</td>
                                <td>{element.email}</td>
                                <td>{element.password}</td>
                                <td>{element.name}</td>
                                <td>{element.blocks_id === "undefined" ? "" : element.blocks_id}</td>
                                <td>{element.units_type_id === "undefined" ? "" : element.units_type_id}</td>
                                <td>{element.length}</td>
                                <td>{element.height}</td>
                                <td>{element.width}</td>
                            </tr>
                        })}
                    </tbody>
                </div>
            </div>
        )
    }
}
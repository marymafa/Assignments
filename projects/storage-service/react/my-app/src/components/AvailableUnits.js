import React, { Component } from 'react';
import axios from 'axios';
export default class AvailableUnits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableUnits: [],
            redirect: false,
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3002/unitsData").then(result => {
            this.setState({ availableUnits: result.data })
        })
    }
    render() {
        console.log("state");
        return (
            <div>
                <h1>Available units</h1>
                <div>
                    <thead>
                        <tr>
                            <th>Reference Number</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.availableUnits.map(element => {
                            console.log("element")
                            return <tr name={`row-${element.id}`} key={this.state.availableUnits.indexOf(element)}>
                                <td>{element.id === "undefined" ? "" : element.id}</td>
                                <td>{element.unit_name}</td>
                            </tr>
                        })}
                    </tbody>
                </div>
            </div>
        )
    }
}

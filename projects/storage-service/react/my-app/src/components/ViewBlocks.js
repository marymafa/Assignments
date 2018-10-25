import React, { Component } from 'react';
import axios from 'axios';
export default class ViewBlocks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            block: []
        }
    }

    componentWillMount() {
        axios.get("http://localhost:3002/blockData").then(result => {
            this.setState({ location: result.data })
        })
    }
    render() {
        console.log("state", this.state.location);
        return (
            <div>
                <h1>Blocks of the Business locations</h1>
                <div>
                    <thead>
                        <tr>
                            <th>Reference Number</th>
                            <th>Address</th>
                            <th>Locations Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.block.map(element => {
                            return <tr name={`row-${element.id} ${element.locations_id}`} key={this.state.block.indexOf(element)}>
                                <td>{element.id === "undefined" ? "" : element.id}</td>
                                <td>{element.name}</td>
                                <td>{element.locations_id === undefined ? "" : element.locations_id}</td>
                            </tr>
                        })}
                    </tbody>
                </div>
            </div>
        )
    }
}

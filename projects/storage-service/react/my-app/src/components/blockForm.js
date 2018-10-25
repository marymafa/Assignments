import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import axios from 'axios';

class BlockFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        }
        this.inputBlockName = this.inputBlockName.bind(this);
    }
    async  postData() {
        var postNewData = await axios.post('http://localhost:3002/blockData', {
            name: this.props.name
        });
    }

    inputBlockName(e) {
        this.props.updateBlockName(e.target.value)
        console.log("address", this.props.updateAddress(e.target.value))

    }
    render() {
        return (
            <div>
                <h1>Storage Service</h1>
                <h2>Enter the block name of the business</h2>
                <div>
                    <label>Block</label>
                    <input data-toggle="tooltip" data-placement="top" title=" block_name" type="text" onChange={this.inputBlockName} />
                </div>
                <input type="button" value="Submit" onClick={() => this.postData()} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBlockName: (name) => {
            dispatch(action.saveBlockName(name))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlockFrom);
import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";

class BlockFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        }
    }
    handleSubmit() {

    }
    render() {
        return (
            <div>
                <h1>Storage Service</h1>
                <h2>Enter the block name of the business</h2>
                <div>
                    <label>Block</label>
                    <input data-toggle="tooltip" data-placement="top" title=" block_name" type="text" />
                </div>
                <input type="button" value="Submit" />
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
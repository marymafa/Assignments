import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";

class UnitsFrom extends React.Component {
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
                    <label>Units</label>
                    <input data-toggle="tooltip" data-placement="top" title=" units_name" type="text" />
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
            dispatch(action.saveUnits(name))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnitsFrom);
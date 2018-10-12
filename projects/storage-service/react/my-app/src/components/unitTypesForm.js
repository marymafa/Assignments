import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";

class UnitTypesFrom extends React.Component {
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
                <h2>Fill in the details below</h2>
                <div>
                    <label>Name</label>
                    <input data-toggle="tooltip" data-placement="top" title="name" type="text" />
                </div>
                <div>
                    <label>Length</label>
                    <input data-toggle="tooltip" data-placement="top" title="Length" type="text" />
                </div>
                <div>
                    <label>Height</label>
                    <input data-toggle="tooltip" data-placement="top" title="Height" type="text" />
                </div>
                <div>
                    <label>Width</label>
                    <input data-toggle="tooltip" data-placement="top" title="Width" type="text" />
                </div>
                <input type="button" value="Submit" />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.name,
        length: state.length,
        height: state.height,
        width: state. width

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUnitTypesName: (name) => {
            dispatch(action.saveUnitTypesName(name))
        },
        updateUnitTypesLength: (length) => {
            dispatch(action.saveUnitTypesLength(length))
        },
        updateUnitTypesHeight: (height) => {
            dispatch(action.saveUnitTypesHeight(height))
        },
        updateUnitTypesWidth: (width) => {
            dispatch(action.saveUnitTypesWidth(width))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnitTypesFrom);
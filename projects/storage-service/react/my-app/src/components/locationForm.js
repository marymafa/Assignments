import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";

class LocationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: this.props.address
        }
    }
    handleSubmit() {

    }
    render() {
        return (
            <div>
                <h1>Storage Service</h1>
                <h2> Enter the location of the business</h2>
                <div>
                    <label>Address</label>
                    <input data-toggle="tooltip" data-placement="top" title=" addrres" type="text" />
                </div>
                <input type="button" value="Submit" />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        address: state.address
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAddress: (address) => {
            dispatch(action.businessLocation(address))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationForm);
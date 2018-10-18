import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import axios from "axios";

class LocationForm extends React.Component {
    constructor(props) {
        super(props);
        this.inputBusinessName = this.inputBusinessName.bind(this)
    }
    async  postData() {
        console.log("props", this.props);

        var postNewData = await axios.post('http://localhost:3002/locationData', {
            address: this.props.address
        });
    }

    inputBusinessName(e) {
        this.props.updateAddress(e.target.value)
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
                <input type="button" value="Submit" onClick={() => this.postData()} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        address: state.businessLocations.address
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
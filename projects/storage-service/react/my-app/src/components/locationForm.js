import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import { Redirect } from 'react-router-dom';
import axios from "axios";

class LocationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }
    async  postData() {
        var postNewData = await axios.post('http://localhost:3002/locationData', {
            address: this.props.address,
            country: this.props.country
        });
        this.setState({
            redirect: true
        })
    }

    inputAddress(e) {
        console.log("address", this.props.updateAddress(e.target.value))
        this.props.updateAddress(e.target.value)
    }
    inputBusinessCountry(e) {
        console.log("country", this.props.updateCountry(e.target.value));
        this.props.updateCountry(e.target.value)

    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/blocks' />
        }
    }
    render() {

        return (
            <div>
                <h1>Storage Service</h1>
                <h2> Business Locations</h2>
                <div>
                    <label>Address</label>
                    <input data-toggle="tooltip" data-placement="top" title=" address" type="text" onChange={this.inputAddress.bind(this)} />
                </div>
                <div>
                    <label>County</label>
                    <input data-toggle="tooltip" data-placement="top" title=" country" type="text" onChange={this.inputBusinessCountry.bind(this)} />
                </div>
                {this.renderRedirect()}
                <div><button onClick={() => this.postData()}>Submit</button></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        address: state.businessLocations.address,
        country: state.businessLocations.country
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAddress: (address) => {
            dispatch(action.businessLocation(address))
        },
        updateCountry: (bsn) => {
            dispatch(action.countryOfTHEBusiness(bsn))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationForm);
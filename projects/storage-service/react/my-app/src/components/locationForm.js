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
        this.inputAddress = this.inputAddress.bind(this);
        this.inputBusinessCountry = this.inputBusinessCountry.bind(this);
    }
    async  postData() {
        console.log("props", this.props);

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
                    <input data-toggle="tooltip" data-placement="top" title=" address" type="text" onChange={this.inputAddress} />
                </div>
                <div>
                    <label>County</label>
                    <input data-toggle="tooltip" data-placement="top" title=" country" type="text" onChnage={this.inputBusinessCountry} />
                </div>
                {this.renderRedirect()}
                <input type="button" value="Submit" onClick={() => this.postData()} />
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
        updateCountry: (country) => {
            dispatch(action.countryOfTHEBusiness(country))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationForm);
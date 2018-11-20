import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import { log } from "util";

class LocationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
    }
    async  postData() {
        var postNewData = await axios.post('http://localhost:3002/locationData', {
            address: this.props.address,
            country: this.props.country,
            businesses_id: this.props.businesses_id
        });
        this.setState({
            redirect: true
        })
    }
    inputAddress(e) {
        this.props.updateAddress(e.target.value);
    }
    inputBusinessCountry(e) {
        this.props.updateCountry(e.target.value);
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
                    <input data-toggle="tooltip" data-placement="top" title=" address" placeholder="e.g bendor street polokwane" type="text" onChange={this.inputAddress.bind(this)} />
                </div>
                <div>
                    <label>County</label>
                    <input data-toggle="tooltip" data-placement="top" title=" country" placeholder="e.g South Africa" type="text" onChange={this.inputBusinessCountry.bind(this)} />
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
        country: state.businessLocations.country,
        businesses_id: state.selectValues.selections,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAddress: (address) => {
            dispatch(action.businessLocation(address))
        },
        updateCountry: (country) => {
            dispatch(action.countryOfTheBusiness(country))
        },
        updateBusinessID: (businesid) => {
            dispatch(action.businessId(businesid))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationForm);
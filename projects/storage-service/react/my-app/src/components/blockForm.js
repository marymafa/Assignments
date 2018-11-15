import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class BlockFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
        this.inputBlockName = this.inputBlockName.bind(this);
    }
    async  postData() {

        var postNewData = await axios.post('http://localhost:3002/blockData', {
            name: this.props.name,
            locations_id: this.props.locations_id
        });
        this.setState({ redirect: true })

    }
    inputBlockName(e) {

        this.props.updateBlockName(e.target.value)

    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/unit_types' />
        }
    }
    render() {
        return (
            <div>
                <h1>Storage Service</h1>
                <h2>Enter  block name for the business</h2>
                <div>
                    <label>Block</label>
                    <input data-toggle="tooltip" data-placement="top" title=" block_name" type="text" onChange={this.inputBlockName} />
                </div>
                <div>
                    {this.renderRedirect()}
                    <input type="button" value="Submit" onClick={() => this.postData()} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.businessBlocks.name,
        locations_id: state.selectValues.selections,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBlockName: (name) => {
            dispatch(action.saveBlockName(name))
        },
        updateLocationId: (locationid) => {
            dispatch(action.saveLocations_Id(locationid))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlockFrom);
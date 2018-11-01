import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import axios from 'axios';

class UnitsFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.inputName = this.inputName.bind(this);
    }
    async  postData() {
        var postNewData = await axios.post('http://localhost:3002/unitsData', {
            name: this.props.name,
            blocks_id: this.props.blocks_id,
            units_type_id: this.props.units_type_id

        });
     

    }
    inputName(e) {
        this.props.updateBlockName(e.target.value)
    }
    render() {
        return (
            <div>
                <h1>Storage Service</h1>
                <h2>Enter the block name of the business</h2>
                <div>
                    <label>Units</label>
                    <input data-toggle="tooltip" data-placement="top" title="units" type="text" onChange={this.inputName} />
                </div>
                <input type="button" value="Submit" onClick={() => this.postData()} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.businessUnits.name,
        blocks_id: state.selectValues.selections,
        units_type_id: state.selectValues.selections,
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
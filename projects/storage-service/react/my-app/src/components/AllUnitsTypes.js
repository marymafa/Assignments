import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import * as action from "../redux/actions";

class AllUnitsTypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: [],
            selectedUnit: this.props.selections,
            redirect: false,
        }
        this.redirectData = this.redirectData.bind(this)
    }
    componentDidMount() {
        axios.get("http://localhost:3002/unitsData").then(result => {
            this.setState({ unit: result.data })
        })

    }
    SelectValue = (e) => {
        let data = {}
        data = e.target.value
        this.props.saveSelectedVAlues(data)
        console.log("data", data);

    }
    redirectData() {
        this.setState({
            redirect: true,
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/units' />
        }
        return (
            <div>
                <h1>All units</h1>
                <div className="unit">
                    <label>
                        units:
                            <select name="units" onChange={(e) => this.SelectValue(e)} >
                            <option value={0}>All units</option>
                            {this.state.unit.map(unit => <option key={unit.id} value={unit.id}>{unit.name}</option>)}
                        </select>
                    </label>
                </div>
                <div>
                    <button onClick={this.redirectData} >Next</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        store: state.selectValues,
        selections: state.selectValues.selections,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveSelectedVAlues: (data) => {
            dispatch(action.saveSelect(data))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllUnitsTypes);
import React from 'react';
import FogCell from './FogCell';

class FogRow extends React.Component {
	
	render() {
		return(
			<div className="fog-row">
				{this.props.fogRow.map((fogCell, ind) => <FogCell key={ind} fogCell={fogCell} />)}
			</div>
			)
	}
}

export default FogRow;
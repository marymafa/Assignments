import React from 'react';

class FogCell extends React.Component {
	shouldComponentUpdate(next) {
		const current = this.props;
		return next.fogCell !== current.fogCell;
	}
	render() {
		const hidden = {
			backgroundColor: '#000'
		}
		const halfHidden = {
			backgroundColor: '#000',
			opacity: '0.3'
		}
		const show = {
			backgoundColor: 'none',
			transperancy: '0'
		}
		return (
			<div className="fog-cell" style={this.props.fogCell === 0 ? hidden : this.props.fogCell === 1 ? halfHidden : show} />
			)
	}
}

export default FogCell;
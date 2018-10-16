import React from 'react';
import Cell from './Cell';

class BoardRow extends React.Component {
	shouldComponentUpdate(next) {
		let props = this.props;
		return props.cell !== next.cell;
	}
	render() {
		return <div className="row">{this.props.row.map((cell, index) => <Cell key={index} cell={cell} />)}</div>;
	}
}

export default BoardRow;

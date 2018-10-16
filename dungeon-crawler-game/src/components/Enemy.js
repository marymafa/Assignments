import React from 'react';
import { connect } from 'react-redux';


class Enemy extends React.Component {
	render() {
		const props = this.props;
		const enemyObj = props.enemies.filter((enemy) => props.enemyId === enemy.id);
		const enemyPosition = {
			top: enemyObj[0].yCoord,
			left: enemyObj[0].xCoord
		}
		return(
			<div className="enemy" style={enemyPosition} />
			)
	}
}

const mapStateToProps = state => ({
	enemies: state.enemies,
	yCoord: state.enemies.yCoord,
	xCoord: state.enemies.xCoord
});

export default connect(mapStateToProps)(Enemy);
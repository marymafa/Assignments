import React from 'react';
import { connect } from 'react-redux';
import { config } from '../config';
import { makePlayerMove, movePlayer, stopPlayer } from '../actions';

class Player extends React.Component {
	constructor(props) {
		super(props);
		this.handleMove = this.handleMove.bind(this);
		this.stopMove = this.stopMove.bind(this);
	}
	componentWillMount() {
		window.addEventListener('keydown', e => this.handleMove(e));
		window.addEventListener('keyup', this.stopMove);
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', e => this.handleMove(e));
		window.removeEventListener('keyup', this.stopMove);
	}
	handleMove(e) {
		switch (e.keyCode) {
			case config.MOVE_UP_BUTTON:
				e.preventDefault();
				this.props.movePlayer('up');
				break;
			case config.MOVE_DOWN_BUTTON:
				e.preventDefault();
				this.props.movePlayer('down');
				break;
			case config.MOVE_LEFT_BUTTON:
				e.preventDefault();
				this.props.movePlayer('left');
				break;
			case config.MOVE_RIGHT_BUTTON:
				e.preventDefault();
				this.props.movePlayer('right');
				break;
			default:
				return;
		}
	}


	stopMove(e) {
		e.preventDefault();
		switch (e.keyCode) {
			case config.MOVE_UP_BUTTON:
				e.preventDefault();
				this.props.stopPlayer('up');
				break;
			case config.MOVE_DOWN_BUTTON:
				e.preventDefault();
				this.props.stopPlayer('down');
				break;
			case config.MOVE_LEFT_BUTTON:
				e.preventDefault();
				this.props.stopPlayer('left');
				break;
			case config.MOVE_RIGHT_BUTTON:
				e.preventDefault();
				this.props.stopPlayer('right');
				break;
			default:
				return;
		}
	}

	makePlayerMove() {
		this.props.makePlayerMove();
	}

	render() {
		const position = {
			left: this.props.left,
			top: this.props.top,
			width: this.props.size,
			height: this.props.size
		};
		return <div className="player" onClick={() => this.makePlayerMove()} style={position} />;
	}
}

const mapStateToProps = state => ({
	map: state.map,
	left: state.player.xCoord,
	top: state.player.yCoord,
	isMoving: state.player.isMoving,
	xSpeed: state.player.xSpeed,
	ySpeed: state.player.ySpeed,
	size: state.player.size,
	y: state.player.y,
	x: state.player.x,
	yBottom: state.player.yBottom,
	xRight: state.player.xRight,
	closestEnemies: state.player.closestEnemies,
	target: state.player.target,
	armor: state.player.armor,
	weapon: state.player.weapon,
	bossTarget: state.player.bossTarget
});

const mapDispatchToProps = dispatch => ({
	makePlayerMove: () => dispatch(makePlayerMove()),
	movePlayer: direction => dispatch(movePlayer(direction)),
	stopPlayer: direction => dispatch(stopPlayer(direction))
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);

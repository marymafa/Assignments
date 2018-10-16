import React from 'react';
import { connect } from 'react-redux';
import { getPlayerInitialPos, handlePlayerMoves, preventBadMoves, handleFog, handleEnemiesTurn, watchEnemy, playerAttack, bossAction } from '../actions';
import BoardRow from './BoardRow';
import Potion from './Potion';
import Player from './Player';
import Fog from './Fog';
import Item from './Items';
import Enemy from './Enemy';
import Boss from './Boss';
import ReactDOM from 'react-dom';

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.findBoardsCoords = this.findBoardsCoords.bind(this);
		this.startGame = this.startGame.bind(this);
		this.makeGame = this.makeGame.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.attackEnemy = this.attackEnemy.bind(this);
	}

	componentWillMount() {
		this.startGame();
	}

	startGame() {
		this.game = setTimeout(this.makeGame, this.props.gameSpeed);
	}

	componentWillReceiveProps(nextProps) {
		const currentProps = this.props;
		if (currentProps.playerIndX !== nextProps.playerIndX || currentProps.playerIndY !== nextProps.playerIndY) {
			this.props.handleFog();

		}
	}

	componentDidMount() {
		this.props.handleFog();
		this.boardWrap = ReactDOM.findDOMNode(this.refs.gameboardWrap);
		this.board = ReactDOM.findDOMNode(this.refs.board);
		this.board.onwheel = function() {
			return false;
		}

	}

	handleBossTurn() {
		this.props.bossAction();
	}

	handleEnemiesTurn() {
		this.props.handleEnemiesTurn();
	}

	handleScroll() {
		this.boardWrap.scrollTop = this.props.playerYPos + 10 - this.boardWrap.clientHeight / 2;
		this.boardWrap.scrollLeft = this.props.playerXPos + 10 - this.boardWrap.clientWidth / 2;
	}


	makeGame() {
		this.props.handleEnemiesTurn();
		this.handleBossTurn();
		this.props.watchEnemy();
		this.props.preventBadMoves();		
		this.props.handlePlayerMoves();
		this.handleScroll();
		this.attackEnemy();
		if (this.props.isPlaying) {
			this.startGame();
		}
		
	}

	attackEnemy() {
		if (this.props.playerTarget !== null) {
			this.props.playerAttack(this.props.playerTarget.id);
		}
	}

	findBoardsCoords() {
		this.boardObj = ReactDOM.findDOMNode(this.refs.gameboard);
	}

	render() {
		return (
			<div className="board-wrap" ref="gameboardWrap">
				<div className="board" ref="board">
					{this.props.gameMap.map((row, index) => <BoardRow key={index} row={row} />)}
					<Player />
					{this.props.gameMap.map((row, y) => row.map((item, x) => {if (item === 2) return <Potion y={y} x={x} key ={y * row.length + x} />}))}
					{this.props.gameMap.map((row, y) =>{  return row.map((item, x) => {if (item === 3) {return <Item y={y} x={x} key={y * row.length + x} /> }})})}
					{this.props.gameMap.map((row, y) => row.map((item, x) => {if (item === 4) return <Enemy y={y} x={x} key={y * row.length + x} enemyId={y * row.length + x} /> }))}
					{this.props.gameMap.map((row, y) => row.map((item, x) => {if (item === 6) return <Boss y={y} x={x} key={y * row.length + x} /> }))}

					<Fog />
				</div>
			</div>

		);
	}
}

function mapStateToProps(state) {
	return {
		gameMap: state.map,
		playerXPos: state.player.xCoord,
		playerYPos: state.player.yCoord,
		gameSpeed: state.gameSpeed,
		playerIndX: state.player.x,
		playerIndY: state.player.y,
		fogMap: state.fogMap,
		playerTarget: state.player.target,
		artifacts: state.artifacts,
		bossXPos: state.boss.xCoord,
		bossYPos: state.boss.yCoord,
		isPlaying: state.playing
	};
}

const mapDispatchToProps = dispatch => ({
	getPlayerPosition: coords => dispatch(getPlayerInitialPos(coords)),
	handlePlayerMoves: () => dispatch(handlePlayerMoves()),
	preventBadMoves: () => dispatch(preventBadMoves()),
	handleFog: () => dispatch(handleFog()),
	handleEnemiesTurn: () => dispatch(handleEnemiesTurn()),
	watchEnemy: () => dispatch(watchEnemy()),
	playerAttack: id => dispatch(playerAttack(id)),
	bossAction: () => dispatch(bossAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);

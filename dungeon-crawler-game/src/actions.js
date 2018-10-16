const PLAYER_POSITION = 'PLAYER_POSITION';
const PLAYER_POS_CHANGE = 'PLAYER_POS_CHANGE';
const MOVE_PLAYER = 'MOVE_PLAYER';
const PLAYER_IS_MOVING = 'PLAYER_IS_MOVING';
const STOP_PLAYER = 'STOP_PLAYER';
const HANDLE_PLAYER_MOVES = 'HANDLE_PLAYER_MOVES';
const PREVENT_BAD_MOVES = 'PREVENT_BAD_MOVES';
const HANDLE_FOG = 'HANDLE_FOG';
const PUSH_ENEMY = 'PUSH_ENEMY';
const HANDLE_ENEMIES_TURN = 'HANDLE_ENEMIES_TURN';
const WATCH_ENEMY = 'WATCH_ENEMY';
const PLAYER_ATTACK = 'PLAYER_ATTACK';
const HANDLE_ITEMS = 'HANDLE_ITEMS';
const HANDLE_ARTIFACTS = 'HANDLE_ARTIFACTS';
const PUT_ON = 'PUT_ON';
const GIVE_DESCRIPTION = 'GIVE_DESCRIPTION';
const BOSS_ACTION = 'BOSS_ACTION';
const GAME_STATUS = 'GAME_STATUS';
const NEW_GAME = 'NEW_GAME';

export const actionTypes = {
	PLAYER_POSITION,
	PLAYER_POS_CHANGE,
	MOVE_PLAYER,
	PLAYER_IS_MOVING,
	STOP_PLAYER,
	HANDLE_PLAYER_MOVES,
	PREVENT_BAD_MOVES,
	HANDLE_FOG,
	PUSH_ENEMY,
	HANDLE_ENEMIES_TURN,
	WATCH_ENEMY,
	PLAYER_ATTACK,
	HANDLE_ITEMS,
	HANDLE_ARTIFACTS,
	PUT_ON,
	GIVE_DESCRIPTION,
	BOSS_ACTION,
	GAME_STATUS,
	NEW_GAME
};

export function startNewGame() {
	return {
		type: NEW_GAME
	}
}

export function handleGameStatus(str) {
	return {
		type: GAME_STATUS,
		gameStatus: str
	}
}

export function bossAction() {
	return {
		type: BOSS_ACTION
	}
}

export function giveDescription(art) {
	return {
		type: GIVE_DESCRIPTION,
		art
	}
}

export function putOn(itemObj) {
	return {
		type: PUT_ON,
		item: itemObj
	}
}

export function handleArtifacts(y, x) {
	return {
		type: HANDLE_ARTIFACTS,
		y, 
		x
	}
}

export function handleItems(y, x) {
	return {
		type: HANDLE_ITEMS,
		y,
		x
	}
}

export function playerAttack(id) {
	return {
		type: PLAYER_ATTACK,
		enemyId: id
	}
}

export function watchEnemy() {
	return {
		type: WATCH_ENEMY
	}
}

export function handleEnemiesTurn() {
	return {
		type: HANDLE_ENEMIES_TURN
	}
}

export function handleFog() {
	return {
		type: HANDLE_FOG
	}
}

export function preventBadMoves() {
	return {
		type: PREVENT_BAD_MOVES
	}
}

export function getPlayerInitialPos(initialPos) {
	return {
		type: PLAYER_POSITION,
		yCoord: initialPos[0],
		xCoord: initialPos[1]
	};
}

export function changePlayerPos(y, x) {
	return {
		type: PLAYER_POS_CHANGE,
		y,
		x
	};
}

export function movePlayer(direction) {
	return {
		type: MOVE_PLAYER,
		direction: direction
	};
}

export function makePlayerMove() {
	return {
		type: PLAYER_IS_MOVING
	};
}

export function stopPlayer(direction) {
	return {
		type: STOP_PLAYER,
		direction
	};
}

export function handlePlayerMoves() {
	return {
		type: HANDLE_PLAYER_MOVES
	};
}

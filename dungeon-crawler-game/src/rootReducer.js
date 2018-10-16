import { actionTypes } from './actions';
import { config } from './config';
import { letPlayerMove, handleFog, enemyTurn, closestEnemy, handleExpAndLevel, handleBoss, newGame } from './helpers';

export default function rootReducer(state, action) {
	switch (action.type) {

		//start new game
		case actionTypes.NEW_GAME:
			const newState = newGame();
			console.log(newState.player.lifes);
			return {
				...newState
			}

		//win loss
		case actionTypes.GAME_STATUS:
			console.log(action.gameStatus);
			if (action.gameStatus === 'loss') {
				console.log('game over finally');
				return {
					...state,
					playing: false,
					lose: true
				}
			}
			else if (action.gameStatus === 'win') {
				return {
					...state,
					playing: false,
					win: true
				}
			}
			else {
				return {
					...state
				}
			}
		//handle Boss Move
		case actionTypes.BOSS_ACTION:
			console.log(state);
			const stageResult = handleBoss(state.boss, state.player, state.messages, state.playing);
			const player = stageResult.player;
			const boss = stageResult.boss;
			const mesg = stageResult.messages;
			return {
				...state,
				player,
				boss,
				messages: mesg
			}

		//give info about artifact on hover in inventory
		case actionTypes.GIVE_DESCRIPTION:
			const ms = state.messages.slice();
			let art = action.art;
			ms.push(`${art.name}. ${art.type === 'weapon' ? 'Attack: ' + art.attack : 'Defense: ' + art.armor}. ${art.description}!!!`);
			return {
				...state,
				messages: ms
			}

		//put on artifact
		case actionTypes.PUT_ON:
			let item = action.item;
			let msgAboutNewStaff = state.messages.slice();
			msgAboutNewStaff.push(`Player put on ${item.name}`);
			if (item.type === 'weapon') {				
				return {
					...state,
					messages: msgAboutNewStaff,
					player: {
						...state.player,
						weapon: item
					}
				}
			}
			else if (item.type === 'armor') {
				return {
					...state,
					messages: msgAboutNewStaff,
					player: {
						...state.player,
						armor: item
					}
				}
			}
			else {
				return {
					...state
				}
			}

		//handle artifacts
		case actionTypes.HANDLE_ARTIFACTS:
			const artifacts = state.artifacts.slice();
			const m = state.map.slice();
			const artifact = artifacts.pop();
			console.log(artifact);
			m[action.y][action.x] = 1;
			const msg = state.messages.slice();
			msg.push(`Player found ${artifact.name}!`);
			var weapon, armor, inventory;
			if (artifact.type === 'weapon') {
				if (state.player.weapon === undefined) {
					weapon = artifact;
				} else {
					weapon = state.player.weapon;
				}
			}
			else if (artifact.type === 'armor') {
				if (state.player.armor === undefined) {
					armor  = artifact;
				} else {
					armor = state.player.armor;
				}
			}
			inventory = state.player.inventory.slice();
			inventory.push(artifact);
			console.log(`weapon: ${weapon} armor: ${armor} inventory: ${inventory}`);
			return {
				...state,
				map: m,
				messages: msg,
				artifacts,
				player: {
					...state.player,
					armor: armor || state.player.armor,
					weapon: weapon || state.player.weapon,
					inventory: inventory
				}
			}

		//handle sipping potions
		case actionTypes.HANDLE_ITEMS:
			const mapAfterChange = state.map.slice();
			const allMessages = state.messages.slice();
			allMessages.push('Player got health potion');
			mapAfterChange[action.y][action.x] = 1;
			let playerHealth = state.player.lifes + config.POTION_CAPACITY;
			if (playerHealth > state.player.baseLevelHealth[state.player.level]) {
				playerHealth = state.player.baseLevelHealth[state.player.level];
			}

			return {
				...state,
				map: mapAfterChange,
				messages: allMessages,
				player: {
					...state.player,
					lifes: playerHealth
				}
			}

		case actionTypes.PLAYER_ATTACK:
			const messages = state.messages.slice();
			const enemies = state.enemies.map((enemy) => {
				if (enemy.id === action.enemyId) {
					if (state.player.tick === 5) {
						let swordAttack = 0;
						if (state.player.weapon !== undefined) {
							swordAttack += state.player.weapon.attack;
						}
						messages.push(`Player attacked enemy for ${state.player.attack + swordAttack} damage` );
						enemy.health -= state.player.attack + swordAttack;
					}					
				}
				return enemy;
			});
			const deadEnemies = state.enemies.filter(enemy => {
				return enemy.health <= 0;
			})
			const aliveEnemies = state.enemies.filter(enemy => {
				return enemy.health > 0
			});
			let expGain = 0;
			const map = state.map;
			deadEnemies.forEach(enemy => {
				map[enemy.homeCell[0]][enemy.homeCell[1]] = 1;
				messages.push('Player killed monster');
				messages.push(`Player got ${state.monsterExp} experience`);
				expGain += state.monsterExp
			});
			const playerInfo = handleExpAndLevel(state.player.experience + expGain, state.player.level, state.levelsExp, state.player.baseLevelHealth);
			let lifes = playerInfo.lifes || state.player.lifes;
			if (playerInfo.lifes) {
				messages.push('Player got new LEVEL!');
			}

			return {
				...state,
				map: map,
				messages: messages,
				enemies: aliveEnemies,
				player: {
					...state.player,
					target: null,
					tick: state.player.tick > 4 ? 0 : ++state.player.tick,
					experience: playerInfo.exp,
					level: playerInfo.level,
					lifes: lifes
				}
			}

		case actionTypes.WATCH_ENEMY:
			const closestEnemiesObj = closestEnemy(state.enemies, state.player, state.boss);
			return {
				...state,
				player: {
					...state.player,
					closestEnemies: closestEnemiesObj
				}
			}
		
		case actionTypes.HANDLE_ENEMIES_TURN:
			const newInfoAfterTurn = enemyTurn(state.map, state.enemies, state.player, state.messages);
			const enemiesAfterTurn = newInfoAfterTurn.enemies;
			const messagesAfterTurn = newInfoAfterTurn.messages;
			const playerLifes = newInfoAfterTurn.lifes;

			return {
				...state,
				enemies: enemiesAfterTurn,
				messages: messagesAfterTurn,
				player: {
					...state.player,
					lifes: playerLifes
				}
			}

		case actionTypes.HANDLE_FOG:
			const newFogMap = handleFog(state.player.y, state.player.x, state.fogMap);
			return {
				...state,
				fogMap: newFogMap
			};

		case actionTypes.PLAYER_POSITION:
			return {
				...state,
				player: {
					...state.player,
					xCoord: action.xCoord,
					yCoord: action.yCoord
				}
			};
		case actionTypes.PLAYER_POS_CHANGE:
			return {
				...state,
				player: {
					...state.player,
					yCoord: action.y,
					xCoord: action.x
				}
			};
		case actionTypes.PLAYER_IS_MOVING:
			return {
				...state,
				player: {
					isMoving: !state.player.isMoving
				}
			};
		case actionTypes.STOP_PLAYER:
			switch (action.direction) {
				case 'left':
					return {
						...state,
						player: {
							...state.player,
							xSpeed: 0
						}
					};
				case 'right':
					return {
						...state,
						player: {
							...state.player,
							xSpeed: 0
						}
					};
				case 'up': {
					return {
						...state,
						player: {
							...state.player,
							ySpeed: 0
						}
					};
				}
				case 'down': {
					return {
						...state,
						player: {
							...state.player,
							ySpeed: 0
						}
					};
				}
				default: {
					return {
						...state
					};
				}
			}
		case actionTypes.PREVENT_BAD_MOVES:

			//prevent player move in boss
			let bossX = state.boss.xCoord;
			let bossY = state.boss.yCoord;
			let playerX = state.player.xCoord - 10;
			let playerY = state.player.yCoord - 10;
			if (Math.abs(bossX - playerX) <= 30 && Math.abs(bossY - playerY) <= 30) {
				console.log('boss is near');
				if (playerX - bossX > 25 && playerX - bossX < 29) {
					return {
						...state,
						player: {
							...state.player,
							xSpeed: state.player.xSpeed < 0 ? 0 : state.player.xSpeed
						}
					}
				}
				if (playerX - bossX < -25 && playerX - bossX > -29) {
					return {
						...state,
						player: {
							...state.player,
							xSpeed: state.player.xSpeed > 0 ? 0 : state.player.xSpeed
						}
					}
				}
				if (playerY - bossY > 25 && playerX - bossY < 29) {
					return {
						...state,
						player: {
							...state.player,
							ySpeed: state.player.ySpeed < 0 ? 0 : state.player.ySpeed
						}
					}
				}
				if (playerY - bossY < -25 && playerY - bossY > -29) {
					return {
						...state,
						player: {
							...state.player,
							ySpeed: state.player.ySpeed > 0 ? 0 : state.player.ySpeed
						}
					}
				}
			}
			//prevent player move in enemie
			if (state.player.closestEnemies.length > 0) {
				const enemies = closestEnemy(state.enemies, state.player, state.boss);
				const leftSide = enemies.filter(enemie => {
					if (state.player.xCoord - enemie.xCoord > 18 && state.player.xCoord - enemie.xCoord < 24 && Math.abs(state.player.yCoord - 10 - enemie.yCoord - 10  < 10)) {
						return enemie;
					}
				});
				const rightSide = enemies.filter(enemie => {
					if (state.player.xCoord - enemie.xCoord < -18 && state.player.xCoord - enemie.xCoord > -24 && Math.abs(state.player.yCoord - 10 - enemie.yCoord - 10 < 10)) {
						return enemie;
					}
				});
				const bottomSide = enemies.filter(enemie => {
					if (state.player.yCoord - enemie.yCoord < -18 && state.player.yCoord - enemie.yCoord > -24 && Math.abs(state.player.xCoord - 10 - enemie.xCoord - 10 < 10)) {
						return enemie;
					}
				});
				const topSide = enemies.filter(enemie => {
					if (state.player.yCoord - enemie.yCoord > 18 && state.player.yCoord - enemie.yCoord < 24 && Math.abs(state.player.xCoord - 10 - enemie.xCoord - 10 < 10)) {
						return enemie;
					}
				});

				if (leftSide.length > 0) {
					return {
						...state, 
						player: {
							...state.player,
							xSpeed: state.player.xSpeed < 0 ? 0 : state.player.xSpeed,
							target: leftSide[0]
						}
					}
				}
				if (rightSide.length > 0) {
					return {
						...state, 
						player: {
							...state.player,
							xSpeed: state.player.xSpeed > 0 ? 0 : state.player.xSpeed,
							target: rightSide[0]
						}
					}
				}
				if (bottomSide.length > 0) {
					return {
						...state, 
						player: {
							...state.player,
							ySpeed: state.player.ySpeed > 0 ? 0 : state.player.ySpeed,
							target: bottomSide[0]
						}
					}
				}
				if (topSide.length > 0) {
					return {
						...state, 
						player: {
							...state.player,
							ySpeed: state.player.ySpeed < 0 ? 0 : state.player.ySpeed,
							target: topSide[0]
						}
					}
				}
			}
			//prevent player move in walls
			if ((state.map[state.player.y][state.player.x + 1] === 0 && (state.player.x + 1) * config.CELL_SIZE - state.player.xCoord <= 20 && state.player.xSpeed > 0) ||
				(state.map[state.player.yBottom][state.player.x + 1] === 0 && (state.player.x + 1) * config.CELL_SIZE - state.player.xCoord <= 20 && state.player.xSpeed > 0)) {
				return {
								...state,
								player: {
									...state.player,
									xSpeed: 0
								}
							}
			}
			if ((state.map[state.player.y][state.player.x - 1] === 0 && state.player.xCoord - (state.player.x - 1) * config.CELL_SIZE  <= 40 && state.player.xSpeed < 0) ||
				(state.map[state.player.yBottom][state.player.x - 1] === 0 && state.player.xCoord - (state.player.x - 1) * config.CELL_SIZE  <= 40 && state.player.xSpeed < 0)) {
				return {
								...state,
								player: {
									...state.player,
									xSpeed: 0
								}
							}
			}
			if ((state.map[state.player.y - 1][state.player.x] === 0 && state.player.yCoord - (state.player.y - 1) * config.CELL_SIZE  <= 40 && state.player.ySpeed < 0) ||
				(state.map[state.player.y - 1][state.player.xRight] === 0 && state.player.yCoord - (state.player.y - 1) * config.CELL_SIZE  <= 40 && state.player.ySpeed < 0)) {
				return {
								...state,
								player: {
									...state.player,
									ySpeed: 0
								}
							}
			}
			if ((state.map[state.player.y + 1][state.player.x] === 0 && (state.player.y + 1) * config.CELL_SIZE - state.player.yCoord <= 20 && state.player.ySpeed > 0) ||
				(state.map[state.player.y + 1][state.player.xRight] === 0 && (state.player.y + 1) * config.CELL_SIZE - state.player.yCoord <= 20 && state.player.ySpeed > 0)) {
				return {
								...state,
								player: {
									...state.player,
									ySpeed: 0
								}
							}
			}
			else {
				return {
					...state,
					player: {
						...state.player,
						target: null
					}
				};
			}	
		case actionTypes.HANDLE_PLAYER_MOVES:
			return {
				...state,
				player: {
					...state.player,
					yCoord: state.player.yCoord + state.player.ySpeed,
					xCoord: state.player.xCoord + state.player.xSpeed,
					xCoordOtherSide: state.player.xCoordOtherSide + state.player.xSpeed,
					yCoordOtherSide: state.player.yCoordOtherSide + state.player.ySpeed,
					y: Math.floor((state.player.yCoord + state.player.ySpeed) / config.CELL_SIZE),
					x: Math.floor((state.player.xCoord + state.player.xSpeed) / config.CELL_SIZE),
					yBottom: Math.floor((state.player.yCoordOtherSide + state.player.ySpeed) / config.CELL_SIZE),
					xRight: Math.floor((state.player.xCoordOtherSide + state.player.xSpeed) / config.CELL_SIZE)
				}
			};
		case actionTypes.MOVE_PLAYER:
			
			if (
				letPlayerMove(
					state.map,
					state.player.y,
					state.player.x,
					state.player.yCoord,
					state.player.xCoord,
					action.direction,
					config.CELL_SIZE
				)
			) {
				switch (action.direction) {
					case 'left':
						if (state.map[state.player.y][state.player.x - 1] === 0) {
							if (state.player.xCoord - (state.player.x - 1) * config.CELL_SIZE <= 40) {
								return {
									...state,
									player: {
										...state.player,
										xCoord: (state.player.x) * config.CELL_SIZE,
										xSpeed: 0
									}
								}
							}
							return {
								...state,
								player: {
									...state.player,
									xSpeed: -state.player.speed,
									ySpeed: state.player.ySpeed
								}
							}
						}
						else {
							return {
								...state,
								player: {
									...state.player,
									xSpeed: -state.player.speed,
									ySpeed: state.player.ySpeed
								}
							};
						}
							
					case 'right': {
						
						if (state.map[state.player.y][state.player.x + 1] === 0) {
							if ((state.player.x + 1) * config.CELL_SIZE - state.player.xCoord <= 20) {
								return {
									...state,
									player: {
										...state.player,
										xCoord: (state.player.x + 1) * config.CELL_SIZE - 20,
										xSpeed: 0
									}
								}
							}
							return {
								...state,
								player: {
									...state.player,
									xSpeed: state.player.speed,
									ySpeed: state.player.ySpeed
								}
							}
						}
						 else {
							return {
							...state,
							player: {
								...state.player,
								xSpeed: state.player.speed,
								ySpeed: state.player.ySpeed
							}
						};
						}
						
					}
					case 'up': {
						return {
							...state,
							player: {
								...state.player,
								xSpeed: state.player.xSpeed,
								ySpeed: -state.player.speed
							}
						};
					}
					case 'down': {
						return {
							...state,
							player: {
								...state.player,
								xSpeed: state.player.xSpeed,
								ySpeed: state.player.speed
							}
						};
					}
					default: {
						return {
							...state,
							player: {
								...state.player,
								xSpeed: 0,
								ySpeed: 0
							}
						};
					}
				}
			} else {
				return {
					...state,
					player: {
						...state.player,
						xSpeed: 0,
						ySpeed: 0
					}
				};
			}

		default:
			return state;
	}
}

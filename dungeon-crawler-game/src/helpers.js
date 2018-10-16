import { config } from './config';

export function generateMap(
	height,
	width,
	maxRoomNumber,
	minRoomSize,
	maxRoomSize,
	numbOfPotions,
	numbOfGoodThings,
	numbOfEnemies
) {
	const map = makeMap(height, width);
	const result = makeRooms(map, maxRoomNumber, minRoomSize, maxRoomSize);
	const roomsObj = result.allRooms;
	const mapWithRooms = result.arr;
	let beginAndEndPlaces = makeAllPaths(mapWithRooms, roomsObj);
	const playerPlace = [beginAndEndPlaces.begin.centerY, beginAndEndPlaces.begin.centerX];
	const bossPlace = [beginAndEndPlaces.boss[0].centerY, beginAndEndPlaces.boss[0].centerX];
	mapWithRooms[playerPlace[0]][playerPlace[1]] = 5;
	mapWithRooms[bossPlace[0]][bossPlace[1]] = 6;
	pushThingsInMap(height, width, map, numbOfPotions, 2);
	pushThingsInMap(height, width, map, numbOfGoodThings, 3);
	pushSomethingNearObject(map, 3, numbOfEnemies, 4);
	return mapWithRooms;
}

export function newGame() {
	const map = generateMap(
		config.MAP_DEFAULT_HEIGHT,
		config.MAP_DEFAULT_WIDTH,
		config.DEFAULT_ROOMS_NUMBER,
		config.MIN_ROOM_SIZE,
		config.MAX_ROOM_SIZE,
		config.NUMBER_OF_POTIONS,
		config.NUMBER_OF_ITEMS,
		config.NUMBER_OF_ENEMIES
	);
	const playerIndexCoords = findPlayerIndex(map);
	const playerCoords = getCellPos(playerIndexCoords, config.MAP_DEFAULT_WIDTH);
	const fogMap = makeMap(config.MAP_DEFAULT_HEIGHT, config.MAP_DEFAULT_WIDTH);
	const enemies = makeEnemiesArray(map, config.MAP_DEFAULT_HEIGHT, config.ENEMY_ATTACK, config.ENEMY_SPEED, config.ENEMY_HEALTH);
	const artifacts = randomizeArr(config.ARTIFACTS);
	const boss = makeBoss(map, config.MAP_DEFAULT_HEIGHT, config.BOSS_ATTACK, config.BOSS_SPEED, config.BOSS_HEALTH);
	return {
		playing: true,
		win: false,
		lose: false,
		map: map,
		player: {
			xCoord: playerCoords[1] - config.PLAYER_SIZE / 2 - 2,
			xCoordOtherSide: playerCoords[1] - config.PLAYER_SIZE / 2 - 2 + config.PLAYER_SIZE - 2,
			yCoord: playerCoords[0] - config.PLAYER_SIZE / 2 - 2,
			yCoordOtherSide: playerCoords[0] - config.PLAYER_SIZE / 2 - 2 + config.PLAYER_SIZE - 2,
			xSpeed: 0,
			ySpeed: 0,
			speed: config.PLAYER_SPEED,
			size: config.PLAYER_SIZE,
			isMoving: false,
			y: playerIndexCoords[0],
			x: playerIndexCoords[1],
			yBottom: playerIndexCoords[0],
			xRight: playerIndexCoords[1],
			lifes: 100,
			experience: 0,
			level: 0,
			closestEnemies: {},
			target: null,
			attack: 5,
			tick: 0,
			baseLevelHealth: config.HEALTH_CAPS,
			weapon: undefined,
			armor: undefined,
			inventory: [],
			bossTarget: null
		},
		inventory: {},
		gameSpeed: config.GAME_SPEED,
		fogMap: fogMap,
		enemies: enemies,
		monsterExp: config.MONSTER_EXP,
		levelsExp: config.LEVELS_EXP,
		messages: [],
		artifacts,
		boss
	};
}

export function handleBoss(boss, player, messages, flag) {
	const msg = messages.slice();
	const playerObj = { ...player };
	const bossObj = { ...boss };
	if (Math.abs(player.xCoord - bossObj.xCoord) < 150 && Math.abs(player.yCoord - bossObj.yCoord) < 150 && flag)  {
		console.log(bossObj.health)
		if (bossObj.xCoord - player.xCoord <= -40) {
			bossObj.xCoord += bossObj.speed;
		}
		if (bossObj.xCoord - player.xCoord > 20) {
			bossObj.xCoord -= bossObj.speed;
		}
		if (bossObj.yCoord - player.yCoord < 30 && Math.abs(bossObj.xCoord - (player.xCoord - 10)) > 30) {
			bossObj.yCoord += bossObj.speed;
		}
		if (bossObj.yCoord - player.yCoord > 30 && Math.abs(bossObj.xCoord - (player.xCoord - 10)) > 0) {
			bossObj.yCoord -= bossObj.speed;
		}
		if (bossObj.yCoord - player.yCoord < -40 && Math.abs(bossObj.xCoord - (player.xCoord - 10)) <= 30) {
			bossObj.yCoord += bossObj.speed;
		}
		if (bossObj.yCoord - player.yCoord > 20 && Math.abs(bossObj.xCoord - (player.xCoord - 10)) <= 30) {
			bossObj.yCoord -= bossObj.speed;
		}
		if (Math.abs(bossObj.xCoord - (player.xCoord - 10)) <= 30 && Math.abs(bossObj.yCoord - (player.yCoord - 10)) <= 30) {
			
			if (bossObj.tick === 10) {
				let defence = 0;
				if (playerObj.armor) {
					defence = playerObj.armor.armor;
				}
				let damage = config.BOSS_ATTACK - defence;
				playerObj.lifes -= damage;
				bossObj.tick = 0;
				msg.push(`Boss attacked player for ${damage} damage!`);
			}
			if (player.target === null) {
				playerObj.bossTarget = bossObj;

				
				console.log('fight');
				if (playerObj.tick === 10) {
						playerObj.tick = 0;
						console.log('player attacked');
						let swordAttack = 0;
						if (playerObj.weapon !== undefined) {
							swordAttack += playerObj.weapon.attack;
						}
						msg.push(`Player attacked boss for ${playerObj.attack + swordAttack} damage` );
						bossObj.health = bossObj.health - (playerObj.attack + swordAttack);
					}	
			}
			bossObj.tick++;
			playerObj.tick++;
			console.log(bossObj.health);			
		}
		else {
			playerObj.bossTarget = null;
		}

	}
	return { player: playerObj, boss: bossObj, messages: msg };
}

export function randomizeArr(arr) {
	const randInd = arr => Math.floor(Math.random() * arr.length);
	const arrAfterRand = arr.slice();
	const swap = (arr, ind1, ind2) => {
		let tmp = arr[ind2];
		arr[ind2] = arr[ind1];
		arr[ind1] = tmp;
	}
	for (let i = 0; i < arrAfterRand.length; i++) {
		let index = randInd(arrAfterRand);
		swap(arrAfterRand, i, index);
	}
	return arrAfterRand;
}

export function closestEnemy(enemies, player, boss) {
	return enemies.filter((enemy) => {
		if (Math.abs(player.xCoord - enemy.xCoord) < 26 && Math.abs(player.yCoord - enemy.yCoord) < 26) {
		return enemy;
	}
	})
}
export function handleExpAndLevel(exp, level, levelCaps, lifeCaps) {
	if (exp >= levelCaps[level]) {
		let newExp = exp - levelCaps[level];
		let newLevel = level + 1;
		return {exp: newExp, level: newLevel, lifes: lifeCaps[newLevel]};
	} else {
		return {exp, level, lifes: undefined}
	}
}

export function playerPositionToItems(itemX, itemY, playerX, playerY) {
	if (Math.abs(playerX - itemX) <= 20 && Math.abs(playerY - itemY) <= 20) {
		return true;
	}
	return false;
}

function handlePlayerVsAi(player, enemy, damage, messages) {
	const allMessages = messages.slice();
	if (Math.abs(player.xCoord - enemy.xCoord) <= 25 && Math.abs(player.yCoord - enemy.yCoord) <= 25) {
		
		if (enemy.tick === 5) {
			let defence = 0;
			if (player.armor) {
				defence = player.armor.armor;
			}
			let dmg = randomDamage(damage) - defence;
			let lifes = player.lifes;
			lifes -= dmg;
			enemy.tick = 0;
			
			allMessages.push(`Enemy hits for ${dmg} damage`);
			return {messages: allMessages, lifes};
		}
		enemy.tick++;
	}

	return {messages: allMessages, lifes: player.lifes};
}

function randomDamage(damageArr) {
	let min = damageArr[0];
	let max = damageArr[1];
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function enemyTurn(map, enemiesObj, player, messages) {
	var allNewMessages = messages.slice();
	var playerLifes = player.lifes;
	const lifeEnemies = enemiesObj.filter(enemy => {
		if (enemy.health > 0) {
			return enemy;
		}
	})
	const enemiesAfterTurn = lifeEnemies.map((enemy) => {
		if ((enemy.xCoord - player.xCoord >= -100 && enemy.xCoord - player.xCoord <= 100) && 
			(enemy.yCoord - player.yCoord >= -100 && enemy.yCoord - player.yCoord <= 100)) {
						const damage = enemy.attack;
						const newInfo = handlePlayerVsAi(player, enemy, damage, messages);
						allNewMessages = newInfo.messages;
						playerLifes = newInfo.lifes;
						if (enemy.xCoord - player.xCoord <= -21) {
							if (map[Math.floor(enemy.yCoord / 40)][Math.floor(enemy.xCoord / 40) + 1] !== 0 &&
								map[Math.floor((enemy.yCoord + 20) / 40)][Math.floor(enemy.xCoord / 40) + 1] !== 0) {
								enemy.xCoord++;
							}
						}
						if (enemy.xCoord - player.xCoord >= 21) {
							if (map[Math.floor(enemy.yCoord / 40)][Math.floor((enemy.xCoord + 20) / 40) - 1] !== 0 &&
								map[Math.floor((enemy.yCoord + 20) / 40)][Math.floor((enemy.xCoord + 20) / 40) - 1] !== 0) {
								enemy.xCoord--;
							}
						}
					
					
						if (enemy.yCoord - player.yCoord < 0 && Math.abs(enemy.xCoord - player.xCoord) >= 21) {
							if (map[Math.floor(enemy.yCoord / 40) + 1][Math.floor(enemy.xCoord / 40)] !== 0 && 
								map[Math.floor(enemy.yCoord / 40) + 1][Math.floor((enemy.xCoord + 20) / 40)] !== 0) {
								enemy.yCoord++;
							}
						}
						if (enemy.yCoord - player.yCoord > 0 && Math.abs(enemy.xCoord - player.xCoord) >= 21) {
							if (map[Math.floor((enemy.yCoord + 20) / 40) - 1][Math.floor(enemy.xCoord / 40)] !== 0 &&
								map[Math.floor((enemy.yCoord + 20) / 40) - 1][Math.floor((enemy.xCoord + 20) / 40)] !== 0) {
								enemy.yCoord--;
							}
						}
						if (enemy.yCoord - player.yCoord < -20 && Math.abs(enemy.xCoord - player.xCoord) <= 21) {
							if (map[Math.floor(enemy.yCoord / 40) + 1][Math.floor(enemy.xCoord / 40)] !== 0 &&
								map[Math.floor(enemy.yCoord / 40) + 1][Math.floor((enemy.xCoord + 20) / 40)] !== 0) {
								enemy.yCoord++;
							}
						}
						if (enemy.yCoord - player.yCoord > 20 && Math.abs(enemy.xCoord - player.xCoord) <= 21) {
							if (map[Math.floor((enemy.yCoord + 20) / 40) - 1][Math.floor(enemy.xCoord / 40)] !== 0 &&
								map[Math.floor((enemy.yCoord + 20) / 40) - 1][Math.floor((enemy.xCoord + 20) / 40)] !== 0) {
								enemy.yCoord--;
							}
						}

					}

				return enemy;
	});
	return  {enemies: enemiesAfterTurn, messages: allNewMessages, lifes: playerLifes};
}

export function makeEnemiesArray(map, cellSize, attack, speed, health) {
	const enemiesObj = [];
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			if (map[i][j] === 4) {
				enemiesObj.push({
					id: i * map[i].length + j,
					y: i,
					x: j,
					xCoord: cellSize * j + 10,
					yCoord: cellSize * i + 10,
					attack: attack,
					speed: speed,
					health: health,
					attacking: false,
					homeCell: [i, j],
					tick: 0
				});
			}
		}
	}
	return enemiesObj;
}

export function makeBoss(map, cellSize, attack, speed, health) {
	let boss;
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			if (map[i][j] === 6) {
				boss = {
					id: i * map[i].length + j,
					y: i,
					x: j,
					xCoord: cellSize * j + 20,
					yCoord: cellSize * i + 20,
					attack,
					speed,
					health: 150,
					tick: 0
				}
			}
		}
	}
	return boss;
}

export function handleFog(playerY, playerX, fogMap) {
	const clearedFogMap = fogMap.slice();
	for (let i = playerY - 5; i < playerY + 6; i++) {
		for (let j = playerX - 5; j < playerX + 6; j++) {
			if (i >= 0 && j >= 0 && i < fogMap.length && j < fogMap[0].length) {
				if ((i > playerY - 4  && i < playerY + 4 && j > playerX - 4 && j < playerX + 4) &&
					(i === playerY - 3 || i === playerY + 3 || j === playerX - 3 || j === playerX + 3)) {
						if (fogMap[i][j] !== 2) {
							fogMap[i][j] = 1;
						}
				}
				if ((i === playerY - 4 && j > playerX - 2 && j < playerX + 2) ||
					(i === playerY + 4 && j > playerX - 2 && j < playerX + 2) ||
					(j === playerX - 4 && i > playerY - 2 && i < playerY + 2) ||
					(j === playerX + 4 && i > playerY - 2 && i < playerY + 2))  {
						if (fogMap[i][j] !== 2) {
							fogMap[i][j] = 1;
						}
				}
				if ((i === playerY - 5 && j === playerX) ||
					(i === playerY + 5 && j === playerX) ||
					(j === playerX - 5 && i === playerY) ||
					(j === playerX + 5 && i === playerY)) {
					if (fogMap[i][j] !== 2) {
							fogMap[i][j] = 1;
						}
				}
				else if (i >= playerY - 2 && i <= playerY + 2 && j >= playerX - 2 && j <= playerX + 2) {
					if (fogMap[i][j] !== 2) {
					fogMap[i][j] = 2;
					} 
				}
			}			
		}
	}
	return clearedFogMap;
}

export function getPlayerCoords(y, x, squareSize) {
	const mapCoords = [];
	mapCoords.push(Math.floor(y / squareSize));
	mapCoords.push(Math.floor(x / squareSize));
	return mapCoords;
}

export function letPlayerMove(map, y, x, yCoord, xCoord, direction, cellSize) {
	let n = map[y - 1][x];
	let s = map[y + 1][x];
	let e = map[y][x - 1];
	let w = map[y][x + 1];
	if (direction === 'right' && xCoord >= x * cellSize + cellSize && w === 0) {
		return false;
	}
	if (direction === 'left' && xCoord <= x * cellSize && e === 0) {
		return false;
	}
	if (direction === 'up' && yCoord <= y * cellSize && n === 0) {
		return false;
	}
	if (direction === 'down' && yCoord + 20 >= y * cellSize + cellSize && s === 0) {
		return false;
	}
	return true;
}

export function findPlayerIndex(map) {
	let coords = [];
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			if (map[i][j] === 5) {
				coords.push(i);
				coords.push(j);
			}
		}
	}
	return coords;
}

export function getCellPos(coordArr, cellSize) {
	let position = [];
	position.push(coordArr[0] * cellSize + cellSize / 2);
	position.push(coordArr[1] * cellSize + cellSize / 2);
	return position;
}

export function findNewPlayerIndexes(playerX, playerY, map, cellSize, oldXIndex, oldYIndex) {
	const playerXIndex = playerX / cellSize;
	const playerYIndex = playerY / cellSize;
	if (playerXIndex !== oldXIndex || playerYIndex !== oldYIndex) {
		const newMap = map.slice();
		newMap[playerYIndex][playerXIndex] = 5;
		newMap[oldYIndex][oldXIndex] = 1;
	}
}

function getObjPosition(arr, objToSearch) {
	let arrayOfCoords = [];
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			if (arr[i][j] === objToSearch) {
				if (arr[i - 1][j] === 1) {
					arrayOfCoords.push([i - 1, j]);
				}
				if (arr[i + 1][j] === 1) {
					arrayOfCoords.push([i + 1, j]);
				}
				if (arr[i][j + 1] === 1) {
					arrayOfCoords.push([i, j + 1]);
				}
				if (arr[i][j - 1] === 1) {
					arrayOfCoords.push([i, j - 1]);
				}
				if (arr[i + 1][j + 1] === 1) {
					arrayOfCoords.push([i + 1, j + 1]);
				}
				if (arr[i - 1][j + 1] === 1) {
					arrayOfCoords.push([i - 1, j + 1]);
				}
				if (arr[i - 1][j - 1] === 1) {
					arrayOfCoords.push([i - 1, j - 1]);
				}
				if (arr[i + 1][j - 1] === 1) {
					arrayOfCoords.push([i + 1, j - 1]);
				}
			}
		}
	}
	return arrayOfCoords;
}

function pushSomethingNearObject(arr, nearObject, numberOfThings, objToAdd) {
	let arrayOfCoords = getObjPosition(arr, nearObject);
	let arrLength = arrayOfCoords.length;
	for (let i = 0; i < numberOfThings; i++) {
		let randSpot = Math.floor(Math.random() * arrLength);
		let target = arrayOfCoords[randSpot];
		arr[target[0]][target[1]] = objToAdd;
	}
}

function getRandomNotWallCoords(height, width, arr) {
	let h = Math.floor(Math.random() * height);
	let w = Math.floor(Math.random() * width);
	while (arr[h][w] !== 1) {
		h = Math.floor(Math.random() * height);
		w = Math.floor(Math.random() * width);
	}
	return [h, w];
}

function pushThingsInMap(height, width, arr, numberOfThings = 5, index) {
	for (let i = 0; i < numberOfThings; i++) {
		let randomCoords = getRandomNotWallCoords(height, width, arr);
		arr[randomCoords[0]][randomCoords[1]] = index;
	}
}

export function makeMap(height, width) {
	const arr = [];
	for (let i = 0; i < height; i++) {
		arr[i] = [];
		for (let j = 0; j < width; j++) {
			arr[i].push(0);
		}
	}
	return arr;
}

function makeRect(arr, width, height, point) {
	for (let i = point[0]; i < point[0] + height; i++) {
		for (let j = point[1]; j < point[1] + width; j++) {
			arr[i][j] = 1;
		}
	}
	return arr;
}

function findPlaceForRect(arr, height, width) {
	for (let i = 1; i < arr.length - 1; i++) {
		for (let j = 1; j < arr[i].length - 1; j++) {
			if (i + height >= arr.length) {
				return false;
			}
			if (
				arr[i][j] === 0 &&
				arr[i - 1][j] === 0 &&
				arr[i + height][j] === 0 &&
				arr[i][j - 1] === 0 &&
				j + width < arr[i].length
			) {
				for (let y = i; y < i + height; y++) {
					for (let x = j; x < j + width; x++) {
						if (arr[y - 1][x] !== 0 || arr[y][x + 1] || arr[y - 1][x - 1]) {
							y = i + height;
							break;
						}
						if (y === i + height - 1 && x === j + width - 1) {
							return [i, j];
						}
					}
				}
			}
		}
	}
	return false;
}

function makeRooms(arr, maxRoomNumber = 30, minRoomSize = 5, maxRoomSize = 10) {
	let count = 0;
	var allRooms = [];
	while (count <= maxRoomNumber) {
		let randomWidth = Math.floor(minRoomSize + Math.random() * (maxRoomSize - minRoomSize));
		let randomHeight = Math.floor(minRoomSize + Math.random() * (maxRoomSize - minRoomSize));
		let point = findPlaceForRect(arr, randomHeight, randomWidth);
		if (!point) {
			return { arr, allRooms };
		}
		allRooms.push({
			xCoord: point[1],
			yCoord: point[0],
			width: randomWidth,
			height: randomHeight,
			connected: 0,
			centerY: Math.floor(point[0] + randomHeight / 2),
			centerX: Math.floor(point[1] + randomWidth / 2)
		});
		makeRect(arr, randomWidth, randomHeight, point);
		count++;
	}
	return { arr, allRooms };
}

function makeAllPaths(arr, allRooms, center, last = {}, boss = []) {
	center = center || allRooms[0];
	let path = lookingForClosestCenter(allRooms, arr, center);
	if (path) {
		let target = allRooms.filter(
			room => room.centerY === path[path.length - 1][0] && room.centerX === path[path.length - 1][1]
		)[0];
		for (let i = 0; i < path.length; i++) {
			arr[path[i][0]][path[i][1]] = 1;
		}
		makeAllPaths(arr, allRooms, target, target, boss);
	} else {
		boss.push(last);
		return;
	}
	return { boss, begin: center };
}

function lookingForClosestCenter(allRooms, arr, start) {
	start.connected = 1;
	const allPaths = [];
	allRooms.forEach((room, index) => {
		let path = [];
		if (room.connected === 0) {
			let coordX = start.centerX;
			let coordY = start.centerY;
			path.push([coordY, coordX]);
			while (coordX !== room.centerX || coordY !== room.centerY) {
				if (coordX < room.centerX && coordY === room.centerY) {
					path.push([coordY, coordX + 1]);
					coordX++;
				} else if (coordX > room.centerX && coordY === room.centerY) {
					path.push([coordY, coordX - 1]);
					coordX--;
				} else if (coordX === room.centerX && coordY < room.centerY) {
					path.push([coordY + 1, coordX]);
					coordY++;
				} else if (coordX === room.centerX && coordY > room.centerY) {
					path.push([coordY - 1, coordX]);
					coordY--;
				} else if (coordX < room.centerX && coordY < room.centerY) {
					path.push([coordY + 1, coordX]);
					coordY++;
					path.push([coordY, coordX + 1]);
					coordX++;
				} else if (coordX > room.centerX && coordY > room.centerY) {
					path.push([coordY - 1, coordX]);
					coordY--;
					path.push([coordY, coordX - 1]);
					coordX--;
				} else if (coordX > room.centerX && coordY < room.centerY) {
					path.push([coordY + 1, coordX]);
					coordY++;
					path.push([coordY, coordX - 1]);
					coordX--;
				} else if (coordX < room.centerX && coordY > room.centerY) {
					path.push([coordY - 1, coordX]);
					coordY--;
					path.push([coordY, coordX + 1]);
					coordX++;
				}
			}
			path.push([room.centerY, room.centerX]);
			if (path.length > 0) {
				allPaths.push(path);
			}
		}
	});
	if (allPaths.length > 0) {
		return allPaths.reduce(
			function(p, c) {
				return p.length > c.length ? c : p;
			},
			{ length: Infinity }
		);
	} else {
		return false;
	}
}

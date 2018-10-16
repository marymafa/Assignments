const MAP_DEFAULT_WIDTH = 40;
const MAP_DEFAULT_HEIGHT = 40;
const NUMBER_OF_POTIONS = 12;
const NUMBER_OF_ITEMS = 16;
const NUMBER_OF_ENEMIES = 20;
const DEFAULT_ROOMS_NUMBER = 20;
const MAX_ROOM_SIZE = 10;
const MIN_ROOM_SIZE = 5;
const PLAYER_SPEED = 4;
const PLAYER_SIZE = 20;
const MOVE_UP_BUTTON = 38;
const MOVE_DOWN_BUTTON = 40;
const MOVE_LEFT_BUTTON = 37;
const MOVE_RIGHT_BUTTON = 39;
const GAME_SPEED = 30;
const CELL_SIZE = 40;
const BOSS_SPEED = 2;
const BOSS_ATTACK = 15;
const BOSS_HEALTH = 150;
const ENEMY_HEALTH = 40;
const ENEMY_ATTACK = [5, 9];
const ENEMY_SPEED = 1;
const POTION_CAPACITY = 40;
const MONSTER_EXP = 50;
const LEVELS_EXP = [150, 250, 350, 9999];
const HEALTH_CAPS = [100, 120, 150, 200];
const ARTIFACTS = [{name: 'Simple Sword', type: 'weapon', description: 'Common sword, every weak creature in this world uses it', attack: 1, id: 0, image: 'https://photos-4.dropbox.com/t/2/AABt5IC_XNeSP5DgCMDfP6N6cUPqGzvnFXLairKDgbqPxA/12/602033425/png/32x32/1/_/1/2/simple_sword.png/ELLS3u0EGFMgAigC/TYgyewnPn0cnFDTqVZmaT1l20rLO5yTs4GNY0pvbPp4?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Simple Sword', type: 'weapon', description: 'Common sword, every weak creature in this world uses it', attack: 1, id: 2, image: 'https://photos-4.dropbox.com/t/2/AABt5IC_XNeSP5DgCMDfP6N6cUPqGzvnFXLairKDgbqPxA/12/602033425/png/32x32/1/_/1/2/simple_sword.png/ELLS3u0EGFMgAigC/TYgyewnPn0cnFDTqVZmaT1l20rLO5yTs4GNY0pvbPp4?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Simple Axe', type: 'weapon', description: 'Common axe, every weak creature in this world uses it', attack: 1, id: 3, image: 'https://photos-4.dropbox.com/t/2/AACkbhHqBZEogW8OPuSprZ2dzJOqeLcU5luOV73UYzCtPw/12/602033425/png/32x32/1/_/1/2/simple-axe.png/ELLS3u0EGFwgAigC/KhElQGdkEbm-LTMJe_rAta24FG8ySXctHlCYXUypVIk?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Simple Axe', type: 'weapon', description: 'Common Axe, every weak creature in this world uses it', attack: 1, id: 4, image: 'https://photos-4.dropbox.com/t/2/AACkbhHqBZEogW8OPuSprZ2dzJOqeLcU5luOV73UYzCtPw/12/602033425/png/32x32/1/_/1/2/simple-axe.png/ELLS3u0EGFwgAigC/KhElQGdkEbm-LTMJe_rAta24FG8ySXctHlCYXUypVIk?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Silver Sword', type: 'weapon', description: 'You are very lucky, if you find it', attack: 2, id: 5, image: 'https://photos-1.dropbox.com/t/2/AACn9pedQvq5KYa1YN9kTKCmJI_iYU1iWInZviZt0TmXzA/12/602033425/png/32x32/1/_/1/2/silver-sword.png/ELLS3u0EGFwgAigC/ni1uB7PjTcHDKBQPU7OpDzIeDlsWIMcpIEm-UlFrOq4?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Silver Sword', type: 'weapon', description: 'You are very lucky, if you find it', attack: 2, id: 6, image: 'https://photos-1.dropbox.com/t/2/AACn9pedQvq5KYa1YN9kTKCmJI_iYU1iWInZviZt0TmXzA/12/602033425/png/32x32/1/_/1/2/silver-sword.png/ELLS3u0EGFwgAigC/ni1uB7PjTcHDKBQPU7OpDzIeDlsWIMcpIEm-UlFrOq4?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Barbarian Axe', type: 'weapon', description: 'Only the strongest warriors can wield this axe', attack: 2, id: 7, image: 'https://photos-6.dropbox.com/t/2/AAD_JZAltBufmpmrNokKm5IvU9YcXz-Q3NGO6vDJSI0Uyw/12/602033425/png/32x32/1/_/1/2/barbarian-axe.png/ELLS3u0EGFwgAigC/7jtGh5FZPeg2ilbpgTozGfdHk07yOxnN-M84mzXNc7w?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Barbarian Axe', type: 'weapon', description: 'Only the strongest warriors can wield this axe', attack: 2, id: 8, image: 'https://photos-6.dropbox.com/t/2/AAD_JZAltBufmpmrNokKm5IvU9YcXz-Q3NGO6vDJSI0Uyw/12/602033425/png/32x32/1/_/1/2/barbarian-axe.png/ELLS3u0EGFwgAigC/7jtGh5FZPeg2ilbpgTozGfdHk07yOxnN-M84mzXNc7w?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Enemies Destroyer', type: 'weapon', description: 'With this sword even the weak warrior can deal with enemies', attack: 4, id: 9, image: 'https://photos-3.dropbox.com/t/2/AABKXAAC0NjmIbsPRgRXzuHt7U3PQp_slsOPlyvgsvHrcQ/12/602033425/png/32x32/1/_/1/2/enemies-destroyer.png/ELLS3u0EGFwgAigC/fa7l4COlC0j1o9zGAMAeo5DvJTLqVo057i11v9HBfDg?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Gods weapon', type: 'weapon', description: 'This thing kills everything', attack: 7, id: 10, image: 'https://photos-2.dropbox.com/t/2/AADzlBPyovgncRYOw-1NDYFtEQZ8NwCl0Bh7miQDgzlzQg/12/602033425/png/32x32/1/_/1/2/god-weapon.png/ELLS3u0EGFwgAigC/n5O6o6T-7NMu2ataQfJPwQqsaAi52CHMp_kRWGo23QM?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Old Armor', type: 'armor', description: 'Protects only against weak attacks', armor: 1, id: 11, image: 'https://photos-5.dropbox.com/t/2/AAAXaJfwh21VrKq6keTjHJCjgNg9o1ChfuZxuEnznZ1Ctw/12/602033425/png/32x32/1/_/1/2/old-armor.png/ELLS3u0EGFwgAigC/2YJWKAH52-qpDtjPs6lhYfnJJgMH0B74UAmENqwN8wE?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Old Armor', type: 'armor', description: 'Protects only against weak attacks', armor: 1, id: 12, image: 'https://photos-5.dropbox.com/t/2/AAAXaJfwh21VrKq6keTjHJCjgNg9o1ChfuZxuEnznZ1Ctw/12/602033425/png/32x32/1/_/1/2/old-armor.png/ELLS3u0EGFwgAigC/2YJWKAH52-qpDtjPs6lhYfnJJgMH0B74UAmENqwN8wE?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Old Armor', type: 'armor', description: 'Protects only against weak attacks', armor: 1, id: 13, image: 'https://photos-5.dropbox.com/t/2/AAAXaJfwh21VrKq6keTjHJCjgNg9o1ChfuZxuEnznZ1Ctw/12/602033425/png/32x32/1/_/1/2/old-armor.png/ELLS3u0EGFwgAigC/2YJWKAH52-qpDtjPs6lhYfnJJgMH0B74UAmENqwN8wE?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Silver Armor', type: 'armor', description: 'Medium protection', armor: 2, id: 14, image: 'https://photos-5.dropbox.com/t/2/AAAoF9KphbSdPQQnmwmRWCf1orFzc-gTqXmlLsUqk3stIw/12/602033425/png/32x32/1/_/1/2/silver-armor.png/ELLS3u0EGFwgAigC/uBAM3-EAYewhVIWloVWLSGihmN1aOWZr5NEVZ3pWiWc?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Silver Armor', type: 'armor', description: 'Medium protection', armor: 2, id: 15, image: 'https://photos-5.dropbox.com/t/2/AAAoF9KphbSdPQQnmwmRWCf1orFzc-gTqXmlLsUqk3stIw/12/602033425/png/32x32/1/_/1/2/silver-armor.png/ELLS3u0EGFwgAigC/uBAM3-EAYewhVIWloVWLSGihmN1aOWZr5NEVZ3pWiWc?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Silver Armor', type: 'armor', description: 'Medium protection', armor: 2, id: 16, image: 'https://photos-5.dropbox.com/t/2/AAAoF9KphbSdPQQnmwmRWCf1orFzc-gTqXmlLsUqk3stIw/12/602033425/png/32x32/1/_/1/2/silver-armor.png/ELLS3u0EGFwgAigC/uBAM3-EAYewhVIWloVWLSGihmN1aOWZr5NEVZ3pWiWc?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Gold Armor', type: 'armor', description: 'With this armor you can fight powerfull enemies without fear', armor: 3, id: 17, image: 'https://photos-1.dropbox.com/t/2/AAA0vnE5sNo9HYhmiVsdOtKdRS60Bf3RqA7_Mn-dMYO_WQ/12/602033425/png/32x32/1/_/1/2/gold-armor.png/ELLS3u0EGFwgAigC/Q0byInQJhepmUm5VVIzT7z7xMOLH2G6krgDyb6Sl-dk?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Gold Armor', type: 'armor', description: 'With this armor you can fight powerfull enemies without fear', armor: 3, id: 18, image: 'https://photos-1.dropbox.com/t/2/AAA0vnE5sNo9HYhmiVsdOtKdRS60Bf3RqA7_Mn-dMYO_WQ/12/602033425/png/32x32/1/_/1/2/gold-armor.png/ELLS3u0EGFwgAigC/Q0byInQJhepmUm5VVIzT7z7xMOLH2G6krgDyb6Sl-dk?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'Gold Armor', type: 'armor', description: 'With this armor you can fight powerfull enemies without fear', armor: 3, id: 19, image: 'https://photos-1.dropbox.com/t/2/AAA0vnE5sNo9HYhmiVsdOtKdRS60Bf3RqA7_Mn-dMYO_WQ/12/602033425/png/32x32/1/_/1/2/gold-armor.png/ELLS3u0EGFwgAigC/Q0byInQJhepmUm5VVIzT7z7xMOLH2G6krgDyb6Sl-dk?preserve_transparency=1&size=2048x1536&size_mode=3'},
				   {name: 'God Armor', type: 'armor', description: 'You are in god mode in this armor', armor: 5, id: 20, image: 'https://photos-4.dropbox.com/t/2/AAA8yoUmKDLPbm1HisThsKjHax1KxDzjhzmTFhgYGIBBag/12/602033425/png/32x32/1/_/1/2/god-armor.png/ELLS3u0EGFwgAigC/P_y-_ztRR-EQ8cfotCI6UURGFwFRyGuswCmdCL8FVkA?preserve_transparency=1&size=2048x1536&size_mode=3'}];

export const config = {
	MAP_DEFAULT_WIDTH,
	MAP_DEFAULT_HEIGHT,
	NUMBER_OF_POTIONS,
	NUMBER_OF_ITEMS,
	NUMBER_OF_ENEMIES,
	DEFAULT_ROOMS_NUMBER,
	MAX_ROOM_SIZE,
	MIN_ROOM_SIZE,
	PLAYER_SPEED,
	MOVE_UP_BUTTON,
	MOVE_DOWN_BUTTON,
	MOVE_LEFT_BUTTON,
	MOVE_RIGHT_BUTTON,
	GAME_SPEED,
	PLAYER_SIZE,
	CELL_SIZE,
	ENEMY_HEALTH,
	ENEMY_ATTACK,
	ENEMY_SPEED,
	POTION_CAPACITY,
	MONSTER_EXP,
	LEVELS_EXP,
	HEALTH_CAPS,
	ARTIFACTS,
	BOSS_SPEED,
	BOSS_ATTACK,
	BOSS_HEALTH
};

//游戏数据
let gameData = [
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
			[ 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
			[ 0, 0, 0, 1, 1, 1, 1, 1, 1, 0]
		];

import game from "./game.js"
import blockFactory from "./blockFactory.js"
//初始化现在的一个方块，并渲染
let blockMo = new blockFactory(Math.floor(Math.random()*4),Math.floor(Math.random()*7),gameData);
//初始化下一个方块
let blockMo1 = new blockFactory(Math.floor(Math.random()*4),Math.floor(Math.random()*7),gameData);
//更新视图
let gameMo = new game(gameData,blockMo1.currentData);
//更新
blockMo.upDate();

gameMo.refresh(gameData,"game",30,30);
document.onkeydown = (e)=>{
	if (e.key === "a") {
		blockMo.left();
		gameMo.refresh(gameData,"game",30,30);
		//console.log("left");
	}
	else if (e.key === "d") {
		blockMo.right();
		gameMo.refresh(gameData,"game",30,30);
		//console.log("right");
	}
	else if (e.key === "w") {
		blockMo.rotate();
		gameMo.refresh(gameData,"game",30,30);
		//console.log("rotate");
	}
	else if (e.key === "s") {
		console.log("down");
	}
}

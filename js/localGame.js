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
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
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
//分数初始化
window.localStorage.setItem("score",0);
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
		blockMo.down();
		gameMo.refresh(gameData,"game",30,30);
		//console.log("down");
	}
}
let timer = setInterval(()=>{
	if(blockMo.down()===1) {
		//clearInterval(timer);
		blockMo = blockMo1; 
		//初始化下一个方块
       	blockMo1 = new blockFactory(Math.floor(Math.random()*4),Math.floor(Math.random()*7),gameData);
		gameMo.refresh(blockMo1.currentData,"next",30,30);
		blockMo.upDate();
	}
	else if (blockMo.down()===0) {
		clearInterval(timer);
		document.onkeydown = null;
	}
	gameMo.refresh(gameData,"game",30,30);
},500)
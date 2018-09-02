import game from "./game.js"
import move from "./move.js"
import fangkuai from "./fangkuai.js"

//游戏的控制器
class local {
	constructor(m,g) {
		//游戏数组
		this.gameData =  [
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
			[ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[ 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
			[ 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
			[ 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
			[ 0, 0, 0, 1, 1, 1, 1, 1, 1, 0]
		];
		//现在的方块数组
		this.currentData = [
			[2, 2, 0, 0],
			[0, 2, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];
		this.nextindex = 0;
		this.currentIndex = 3;
		this.dir = 0;
		//下一个方块数组
		this.nextData = [
			[2, 0, 0, 0],
			[2, 0, 0, 0],
			[2, 0, 0, 0],
			[2, 0, 0, 0]
		];
		this.init(m,g);
	}
	//绑定事件监听,元素下落
	init (m,g) {
		document.onkeydown = (e)=>{
			//console.log(e.key);
			if (e.key === "a" || e.key === "ArrowLeft") {
				//左
				m.left(this.gameData,this.currentData,g);
			}
			else if (e.key === "d" || e.key === "ArrowRight") {
				//右
				m.right(this.gameData,this.currentData,g);
			}
			else if (e.key === "w") {
				//上
				this.dir = (this.dir+1)%4;
				console.log(this.dir);
				for (var i = 0; i < this.currentData.length; i++) {
					for (var j = 0; j < this.currentData[i].length; j++) {
						this.currentData[i][j] = fangkuai[this.currentIndex][this.dir][i][j];
					}
				}
			}
		}
		m.down(500,this.gameData,this.currentData,g,()=>{
			//判断如果第二行有元素，结束条件判断
			//创建新的方块(随机)
			this.currentIndex = this.nextindex;
			this.nextindex = Math.floor(Math.random()*7);
			this.dir = Math.floor(Math.random()*4);
			this.currentData = this.nextData;
			this.nextData = fangkuai[this.nextindex][this.dir];
			let m = new move(20,10);
			g.render(this.nextData,"next",30,30);
			document.onkeydown = null;
			this.init(m,g);
		});
	}
}


let g = new game();
let m = new move(20,10);
let l = new local(m,g);
g.initGame(l.gameData,l.nextData);




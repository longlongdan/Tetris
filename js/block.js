//放上方块的公共方法
export default class block {
	constructor(gameData) {
		this.gameData = gameData;
		this.currentData = [];
		this.origin = {
			x: 0,
			y: 4
		}
	}
	//旋转
	rotate() {
		let temp = this.blockData[(this.dir+1)%4];
		for (var i = 0; i < temp.length; i++) {
			for(let j=0;j<temp[i].length;j++){
				if (temp[i][j]!==0 && (this.gameData[this.origin.x+i][this.origin.y+j]===1|| this.origin.y+j<0 || this.origin.y+j>9)) {
					return;
				}
			}
		}
		this.dir = (this.dir+1)%4;
		this.currentData = this.blockData[this.dir];
		this.upDate();
	}
	//左移
	left() {
		this.origin.y --;
		for (var i = 0; i < this.currentData.length; i++) {
			for(let j=0;j<this.currentData[i].length;j++){
				if (this.currentData[i][j]!==0 && (this.origin.y+j<0 || this.gameData[this.origin.x+i][this.origin.y+j]===1)) {
					this.origin.y ++;
					return;
				}
			}
		}
		this.upDate();
	}
	//右移
	right() {
		this.origin.y ++;
		for (var i = 0; i < this.currentData.length; i++) {
			for(let j=0;j<this.currentData[i].length;j++){
				if (this.currentData[i][j]!==0 && (this.origin.y+j>9 || this.gameData[this.origin.x+i][this.origin.y+j]===1)) {
					this.origin.y --;
					return;
				}
			}
		}
		this.upDate();
	}
	//判断数组的封装
	//更新数组
	upDate() {
		for (var i = 0; i < this.gameData.length; i++) {
			for(let j=0;j<this.gameData[i].length;j++) {
				if (this.gameData[i][j]!==1) {
					this.gameData[i][j] =0;
				}
			}
		}
		for (var i = 0; i < this.currentData.length; i++) {
			for(let j = 0;j< this.currentData[i].length;j++) {
				if (this.currentData[i][j]===2) {
					this.gameData[i+this.origin.x][j+this.origin.y] = this.currentData[i][j];
				}
			}
		}
	}
	//下落 1：下落下一个方块 0：游戏结束
	down() {
		this.origin.x++;
		for (var i = 0; i < this.currentData.length; i++) {
			for(let j=0;j<this.currentData[i].length;j++){
				if (this.currentData[i][j]!==0 && (this.origin.x+i>19 || this.gameData[this.origin.x+i][this.origin.y+j]===1)) {
					this.origin.x --;
					if(this.completeDown()) return 0;
					return 1;
				}
			}
		}
		this.upDate();
	}
	//下落完成
	completeDown() {
		//将二变为一
		for (var i = 0; i < this.gameData.length; i++) {
			for(let j=0;j<this.gameData[i].length;j++){
				if (this.gameData[i][j]===2) {
					this.gameData[i][j]=1;
				}
			}
		}
		//判断有没有全为1的一行
		for (var i = this.gameData.length-1; i >=0; i--) {
			let clear = true;
			for (var j = 0; j < this.gameData[i].length; j++) {
				if(this.gameData[i][j]===0) {
					clear=false;
					break;
				}
			}if (clear) {
				//可以消除
				let score = parseInt(window.localStorage.getItem("score"));
				window.localStorage.setItem("score",++score);
				document.querySelector("#score").innerHTML = window.localStorage.getItem("score");
				for (var p = this.gameData.length - 1; p > 0; p--) {
					for (var q = 0; q < this.gameData[p].length; q++) {
						this.gameData[p][q] = this.gameData[p-1][q];
					}
				}
				for (var q = 0; q < this.gameData[0].length; q++) {
					this.gameData[0][q] = 0;
				}
				i++;
			}
		}
		//判断游戏是否结束
		for (var i = 0; i < this.gameData[0].length; i++) {
			if (this.gameData[0][i]!==0) {
				//游戏结束
				this.gameOver();
				return true;
			}
		}
	}
	//游戏结束逻辑
	gameOver() {
		//alert("游戏结束");
		document.querySelector("#gameOver").style.display = "block";
	}
}
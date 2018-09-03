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
				if (this.currentData[i][j]!==0 && (this.gameData[this.origin.x+i][this.origin.y+j]===1|| this.origin.y+j<0)) {
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
				if (this.currentData[i][j]!==0 && (this.gameData[this.origin.x+i][this.origin.y+j]===1|| this.origin.y+j>9)) {
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
	//下坠
	//下落
}
//方块的操作
export default class player {
	constructor(maxX,maxY) {
		this.maxX = maxX;
		this.maxY = maxY;
		this.origin = {
			x: 0,
			y: 0
		}
	}
	//左移
	left (divArr,currentData,g) {
		this.origin.y--;
		if (this.isValible(divArr,currentData) !== 1 && this.isValible(divArr,currentData) !==0 ) {
			this.changeData(divArr,currentData,g);
		}
		else this.origin.y++;
		
	}
	//右移
	right (divArr,currentData,g) {
		this.origin.y++;
		if (this.isValible(divArr,currentData) !==2 && this.isValible(divArr,currentData) !==0) {
			this.changeData(divArr,currentData,g);
		}
		else this.origin.y --;
	}
	//下落
	down (time,divArr,currentData,g,callback) {
		let timer = setInterval(()=>{
			//判断是否可以继续下落
			this.origin.x ++;
			if(this.isValible(divArr,currentData) !== 0) {
				this.changeData(divArr,currentData,g);
			}
			else {
				clearInterval(timer);
				//改变数组中的2为1，并且判断有没有一排全为1，下落消除，分数相加
				for (var i = 0; i < divArr.length; i++) {
					for(var j=0;j<divArr[i].length;j++){
						if (divArr[i][j]===2) {
							divArr[i][j] = 1;
						}
					}
				}
				this.clear(divArr);
				g.refresh(divArr,"game",30,30);
				callback();
			}
		},time)
	}
	//消行
	clear (divArr) {
		let canClear = true;
		//倒着判断最底层是否为全一
		for (var i = divArr.length-1; i >=0; i--) {
			for (var j = 0; j < divArr[i].length; j++) {
				if (divArr[i][j]===0) {
					canClear = false;
				}
			}
			if (canClear) {
				//代表第i行可以消除
				for (var q = divArr.length-1; q >0; q++) {
					for (var p = 0; p < divArr[q].length; p++) {
						divArr[q][p] = divArr[q-1][p];
					}
				}
				//第一排赋值为全0
				for (var k = 0; k < divArr[0].length; k++) {
					divArr[0][k] =0;
				}
				i++;
			}
			else break;
		}
	}
	//修改数组
	changeData(divArr,currentData,g) {
		//全部设置为0
		for (var i = 0; i < divArr.length; i++) {
			for (var j = 0; j < divArr[i].length; j++) {
				if (divArr[i][j] !== 1) 
					divArr[i][j] = 0;
			}
		}
		//遍历当前数组不为0的元素，改变位置
		for (var i = 0; i < currentData.length; i++) {
			for (var j = 0; j < currentData[i].length; j++) {
				if(currentData[i][j]!==0 )
					divArr[i+this.origin.x][j+this.origin.y] = currentData[i][j];
			}
		}
		g.refresh(divArr,"game",30,30);
	}
	//判断边界0：下面触碰 1：左面触碰 2：右面触碰 3：可以继续走
	isValible(divArr,currentData) {
		for (var i = 0; i < currentData.length; i++) {
			for (var j = 0; j < currentData[i].length; j++) {
				if(currentData[i][j]!==0){
					//垂直方向，下面有方块，或者超出最大限制，停止移动
					if (i+this.origin.x >=this.maxX || divArr[i+this.origin.x][j+this.origin.y] ===1) {
						return 0;
					}
					//向左不能超过最大以及不能挤压别的方块
					else if (j+this.origin.y <0 || divArr[i+this.origin.x][j+this.origin.y] ===1) {
						return 1;
					}
					//向右不能超过最大以及不能挤压别的方块
					else if (j+this.origin.y >=this.maxY || divArr[i+this.origin.x][j+this.origin.y] ===1) {
						return 2;
					}
					
					
				}
			}
		}
		return 3;
	}
	//下落的处理事件
}
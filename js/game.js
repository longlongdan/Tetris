//游戏的渲染
export default class game {
	constructor(gameData,nextData) {
		this.initGame(gameData,nextData);
	}
	//根据数组在页面渲染出方块
	render (arr,divName,width,height) {
		let parent = document.querySelector(`.${divName}`);
		for (let i = 0; i <arr.length; i++) {
			for(let j=0;j<arr[i].length; j++) {
				let tempDiv = document.createElement("div");
				tempDiv.style.top = `${i*height}px`;
				tempDiv.style.left = `${j*width}px`;
				if (arr[i][j]==0) {
					tempDiv.classList.add("none");
				}
				else if (arr[i][j]==1) {
					tempDiv.classList.add("before");
				}
				else if (arr[i][j]==2) {
					tempDiv.classList.add("current");
				}
				parent.appendChild(tempDiv);
			}
		}
	}
	//根据数组更新方块的类
	refresh(arr,divName,width,height) {
		let parent = document.querySelector(`.${divName}`);
		for (let i = 0; i <arr.length; i++) {
			for(let j=0;j<arr[i].length; j++) {
				if (arr[i][j]==0) {
					parent.children[arr[i].length*i+j].className = "none";
				}
				else if (arr[i][j]==1) {
					parent.children[arr[i].length*i+j].className = "before";
				}
				else if (arr[i][j]==2) {
					parent.children[arr[i].length*i+j].className ="current";
				}
			}
		}
	}
	//游戏初始化，渲染初始页面
	initGame(gameData,nextData) {
		if(document.querySelector(".game").innerHTML ==="")
		{
			this.render(gameData,"game",30,30);
			this.render(nextData,"next",30,30);
		}
	}
}

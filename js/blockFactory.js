import block from "./block.js"
import fangkuai from "./fangkuai.js"
export default class blockFactory extends block {
	//dir:旋转角度0-3 index:方块索引0-6
	constructor(dir,index,gameData) {
		super(gameData);
		this.dir = dir;
		this.blockData = fangkuai[index];
		this.currentData = this.blockData[dir];
	}
}
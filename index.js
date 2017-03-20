function init(){
	var level = new Object();
	var card = new Object();
	var cardArray = new Array();
	var Arraycard = new Array();
	cardArray.push([1, 16, 5, 32, 20, 8, 50]);//高牌
	cardArray.push([2, 7, 8, 14, 15, 11, 16]);//一对
	cardArray.push([2, 7, 21, 8, 15, 11, 16]);//两对
	cardArray.push([1, 15, 2, 28, 6, 43, 51]);//三条
	cardArray.push([3, 2, 19, 18, 17, 7, 8]);//顺子
	cardArray.push([3, 7, 9, 11, 12, 15, 50]);//同花
	cardArray.push([3, 16, 29, 2, 15, 11, 17]);//满堂红
	cardArray.push([1, 15, 2, 28, 41, 43, 51]);//四条
	cardArray.push([3, 2, 6, 5, 4, 7, 8]);//同花顺
	cardArray.push([1, 3, 2, 4, 6, 5, 51]);//同花大顺
	for(var i=0; i<cardArray.length; i++){
		quickSort(cardArray[i], 0, cardArray[i].length-1);
	}
	for(var i=0; i<cardArray.length; i++){
		Arraycard.push(oneRep(cardArray[i]));
	}
	//接下来就是根据牌来确定牌的等级
	for(var i=0; i <Arraycard.length ; i++){
		setLevel(Arraycard[i], cardArray[i]);
	}
	//返回card
	Arraycard = compare(Arraycard);
	console.log(Arraycard);
	//return card;
}
//将数组通过快排的方式排序
function quickSort(array, left, right){
	if(left < right){
		var  key = array[left];
		var  low = left;
		var  high = right;
		while(low < high){
			while(low < high && array[high]%13 >= key%13){
				high--;
			}
			array[low] = array[high];
			while(low < high && array[low]%13 <= key%13){
				low++;
			}
			array[high] = array[low];
		}
		array[low] = key;
		quickSort(array,left,low-1);
		quickSort(array,low+1,right);
	}
}
//判断一共有几对
function oneRep(cardvalue){
	var cardvaluecopy = cardvalue.copy();
	//复制一个数组;
	var temp = new Object();
	temp.addition = new Array();
	tempmax = 0;
	//单个数子重复出现的次数大于二的数量(也就是这副牌中一共有几对)
	var amount = 0;
	while(cardvaluecopy.length){
		var max = 0;
		var index = 0;
		var array = new Array();
		var card = cardvaluecopy[0];
		//如果这个数字已经被判断过,那么不用再判断成对的情况
		for(var x=0; x<cardvaluecopy.length; x++){
		//如果两个牌的大小相同
			var number = card;
			if(card%13 == cardvaluecopy[x]%13){
				max++;
				array[index++] = cardvaluecopy[x];
			}
		}
		
		//如果新的一个牌号出现的次数大于二，则可以判定又出现了新的对子
		if(max >= 2){
			//用一个牌出现的最多次数当作键，这个牌的牌号当作值
			amount++;
			if(!(String(max) in temp)){
				temp[String(max)] = new Array();
				for(var i=0; i<array.length; i++){
					temp[String(max)].push(array[i]);
				}
			}
			else{
				for(var i=0; i<array.length; i++){
					temp[String(max)].push(array[i]);
				}
			}
		}
		cardvaluecopy = cardvaluecopy.deleteSameCard(card);
	}
	if("4" in temp){
		var additionarray = new Array();
		for(var i=0; i<cardvalue.length; i++){
			var found = false;
			for(var x=0; x<temp["4"].length; x++){
				if(temp["4"][x] == cardvalue[i]){
					found = true;
					break;
				}
			}
			if(!found){
				additionarray.push(cardvalue[i]);
				break;
			}
		}
		temp.addition.push(additionarray[0]);
	}
	else if("2" in temp && temp["2"].length == 4){
		var additionarray = new Array();
		for(var i=0; i<cardvalue.length; i++){
			var found = false;
			for(var x=0; x<temp["2"].length; x++){
				if(temp["2"][x] == cardvalue[i]){
					found = true;
					break;
				}
			}
			if(!found){
				additionarray.push(cardvalue[i]);
				break;
			}
		}
		temp.addition.push(additionarray[0]);
	}
	else if("3" in temp && !("2" in temp)){
		var additionarray = new Array();
		for(var i=0; i<cardvalue.length; i++){
			var found = false;
			for(var x=0; x<temp["3"].length; x++){
				if(temp["3"][x] == cardvalue[i]){
					found = true;
					break;
				}
			}
			if(!found){
				additionarray.push(cardvalue[i]);
				if(additionarray.length == 2){
					break;
				}
			}
		}
		temp.addition.push(additionarray[0], additionarray[1]);
	}
	else if("2" in temp){
		var additionarray = new Array();
		for(var i=0; i<cardvalue.length; i++){
			var found = false;
			for(var x=0; x<temp["2"].length; x++){
				if(temp["2"][x] == cardvalue[i]){
					found = true;
					break;
				}
			}
			if(!found){
				additionarray.push(cardvalue[i]);
				if(additionarray.length == 3){
					break;
				}
			}
		}
		temp.addition.push(additionarray[0], additionarray[1], additionarray[2]);
	}
	temp.amount = amount;
	return temp;
}

function setLevel(card, cardvalue){
	card.level = 10;
	if(card.samecard(4)){
		if(card.level > 3)
			card.level = 3;
		return;
	}
	else if(card.samecard(3) && card.amount >= 2){
		if(card.level > 4)
			card.level = 4;
		return;
	}
	//在ifStraight()里面就把同花顺，同花大顺，顺子，同化给判定出来
	ifStraight(card, cardvalue);
	//我们是进行值比较所以如果已经是最大值那么就不用继续比较
	var samecolor = cardvalue.maxSameColor();
	if(samecolor.length == 5){
		if(card.level > 5){
			card.level = 5;
			card.straight = samecolor;
		}
		return;
	}
	if(card.level > 6){
		if(card.samecard(3) && card.amount == 1){
			card.level = 7;
			return;
		}
		else if(card.amount == 2){
			card.level = 8;
			return;
		}
		else if(card.amount == 1){
			card.level = 9;
			return;
		}
		else if(card.amount == 0){
			card.level = 10;
			card.straight = cardvalue.copy();
			return;
		}
	}
}
//判断是否为顺子以及顺子的类型
function ifStraight(card ,cardvalue){
	card.straight = new Array();
	card.straight[0] = 0;
	var array = cardvalue.copy();
	//先将数组去重
	array = array.deleteRepete();
	if(array.length < 5){
		return false;
	}
	for(var i = 0; i<array.length-4; i++){
		var maxstraight = new Array();
		var index = 0;
		var bool = 0;
		for(var x=i; x < i+4; x++){
			var bigger = array[x];
			var smaller = array[x+1];
			bool += smaller%13 - bigger%13;
			//通过maxstraight[]
			maxstraight[index++] = array[x];
		}
		maxstraight[index++] = array[x];
		if(maxstraight.maxSameColor().length == 5){
			//同花顺
			if(bool == 4){
				if(maxstraight[0] == 1){
					card.level = 1;
					card.straight = maxstraight.copy();
					card.addition = card.leaveaddition(array);
				}
				else if(card.level > 2){
					card.level = 2;
					card.straight = maxstraight.copy();
					card.addition = card.leaveaddition(array);
				}
				else if(card.level == 2 && maxstraight[0] < card.straight[0]){
					card.straight = maxstraight.copy();
					card.addition = card.leaveaddition(array);
				}
			}
			else{
				if(card.level > 5){
					card.level = 5;
					card.straight = maxstraight.copy();
					card.addition = card.leaveaddition(array);
				}
				else if(card.level == 5 && maxstraight[0] < card.straight[0]){
					card.straight = maxstraight.copy();
					card.addition = card.leaveaddition(array);
				}
			}
		}
		else{
			if(bool == 4){
				if(card.level > 6){
					card.level = 6;
					card.straight = maxstraight.copy();
					card.addition = card.leaveaddition(array);
				}
				else if(card.level == 6 && maxstraight[0] < card.straight[0]){
					card.straight = maxstraight.copy();
					card.addition = card.leaveaddition(array);
				}
			}
		}
	}
}
Object.prototype.leaveaddition = function(cardvalue){
	var array = new Array();
	for(var x=0; x < cardvalue.length; x++){
		var found = false;
		for(i in this.straight){
			if(this.straight[i] == cardvalue[x]){
				found = true;
				break;
			}
		}
		if(!found){
			array.push(cardvalue[x]);
		}
	}
	return array;
}
Array.prototype.deleteSameCard = function(number){
	var array = new Array();
	for(var i=0; i<this.length; i++){
		if(this[i]%13 != number%13){
			array.push(this[i]);
		}
	}
	return array;
}
//数组去重
Array.prototype.deleteRepete = function(){
	var temp = this[0]%13;
	var array = new Array();
	array[0] = temp;
	for(var i=0; i<this.length; i++){
		if(this[i]%13 != array[array.length-1]%13){
			array.push(this[i]);
		}
	}
	return array;
}
//定义数组获得最多相同颜色的方法
Array.prototype.maxSameColor = function(){
	var array = this.copy();
	var color = null;
	var samecolor = new Array();
	
	while(array.length){
		//定义一个临时变量的数组保存同样的花色
		var max = 0;
		//定义一个保存card数组长度的临时变量
		var card = new Array();
		var index = 0;
		var color = parseInt(array[0]/13);
		for(var x=0; x<array.length; x++){
			if(color == parseInt(array[x]/13)){
				max++;
				card[index++] = array[x];
			}
		}
		//如果判断有五张花色相同的卡牌
		if(max == 5){
			//总是优先保存最大的五张牌
			if(!samecolor.length || card[0] > samecolor[0]){
				samecolor = card.copy();
			}
		}
		//删除已经比较了的花色
		array = array.deleteColor(color);
	}
	return samecolor;
}
//数组复制
Array.prototype.copy = function(){
	temp = new Array();
	for(var i=0; i<this.length; i++){
		temp[i] = this[i];
	}
	return temp;
}
//删除指定颜色
Array.prototype.deleteColor = function(color){
	var array = new Array();
	for(var i=0; i<this.length; i++){
		if(parseInt(this[i]/13) != color){
			array.push(this[i]);
		}
	}
	return array;
}
Object.prototype.samecard = function(amount){
	for(var x in this){
		if(parseInt(x) == amount){
			return true;
		}
	}
	return false;
}


//之后的代码都是找到到底有几个最大牌
function compare(cardArray){
	//先将整个cardArray按照card.level排序
	levelQuickSort(cardArray, 0, cardArray.length-1);
	//如果只有一个level是最高的
	if(cardArray[0].level != cardArray[1].level){
		return cardArray[0];
	}
	//如果前几都是并列的
	else{
		cardArray = cardArray.leaveMax();
		//如果所有并列的都是同花大顺(虽然这基本不可能)
		if(cardArray[0].level == 2){
			cardArray.straightflush();
		}
		else if(cardArray[0].level == 3){
			cardArray.forth();
		}
		else if(cardArray[0].level == 4){
			cardArray.calabash();
		}
		else if(cardArray[0].level == 5){
			cardArray.flush();
		}
		else if(cardArray[0].level == 6){
			cardArray.flush();
		}
		else if(cardArray[0].level == 7){
			cardArray.third();
		}
		else if(cardArray[0].level == 8){
			cardArray.twopairs();
		}
		else if(cardArray[0].level == 9){
			cardArray.onepair();
		}
		else if(cardArray[0].level == 10){
			cardArray.high();
		}
		return cardArray;
	}
}
function levelQuickSort(array, left, right){
	if(left < right){
		var  key = array[left];
		var  low = left;
		var  high = right;
		while(low < high){
			while(low < high && array[high].level >= key.level){
				high--;
			}
			array[low] = array[high];
			while(low < high && array[low].level <= key.level){
				low++;
			}
			array[high] = array[low];
		}
		array[low] = key;
		levelQuickSort(array,left,low-1);
		levelQuickSort(array,low+1,right);
	}
}
Array.prototype.high = function(){
	var now = -1;
	var past = 0;
	while(now != past && now != 1){
		past = this.length;
		for(var i=0; i<5; i++){
			if(this[0].straight[i]%13 > this[1].straight[i]%13){
				this.deletecard(this[0]);
				break;
			}
			else if(this[0].straight[i]%13 < this[1].straight[i]%13){
				this.deletecard(this[1]);
				break;
			}
		}
		now = this.length;
	}
}
Array.prototype.onepair = function(){
	var now = -1;
	var past = 0;
	while(now != past && now != 1){
		past = this.length;
		if(this[0]["2"][0]%13 > this[1]["2"][0]%13){
			this.deletecard(this[0]);
		}
		else if(this[0]["2"][0]%13 < this[1]["2"][0]%13){
			this.deletecard(this[1]);
		}
		else{
			for(var i=0; i<3; i++){
				if(this[0].addition[i]%13 > this[1].addition[i]%13){
					this.deletecard(this[0]);
				}
				else if(this[0].addition[i]%13 < this[1].addition[i]%13){
					this.deletecard(this[1]);
				}
			}
		}
		now = this.length;
	}
}
Array.prototype.twopairs = function(){
	var now = -1;
	var past = 0;
	while(now != past && now != 1){
		past = this.length;
		if(this[0]["2"][0]%13 > this[1]["2"][0]%13){
			this.deletecard(this[0]);
		}
		else if(this[0]["2"][0]%13 < this[1]["2"][0]%13){
			this.deletecard(this[1]);
		}
		else {
			if(this[0]["2"][3]%13 > this[1]["2"][3]%13){
				this.deletecard(this[0]);
			}
			else if(this[0]["2"][3]%13 < this[1]["2"][3]%13){
				this.deletecard(this[1]);
			}
			else{
				if(this[0].addition[0] > this[1].addition[0]){
					this.deletecard(this[0]);
				}
				else if(this[0].addition[0] < this[1].addition[0]){
					this.deletecard(this[1]);
				}
			}
		}
		now = this.length;
	}
};
Array.prototype.third = function(){
	var now = -1;
	var past = 0;
	while(now != past && now != 1){
		past = this.length;
		if(this[0]["3"][0]%13 > this[1]["3"][0]%13){
			this.deletecard(this[0]);
		}
		else if(this[0]["3"][0]%13 < this[1]["3"][0]%13){
			this.deletecard(this[1]);
		}
		else{
			for(var x=0; x<2; x++){
				if(this[0].addition[x] > this[1].addition[x]){
					this.deletecard(this[0]);
					break;
				}
				else if(this[0].addition[x] < this[1].addition[x]){
					this.deletecard(this[1]);
					break;
				}
			}
		}
		now = this.length;
	}
};
Array.prototype.flush = function(){
	var now = -1;
	var past = 0;
	while(now != past && now != 1){
		past = this.length;
		for(var i=0; i<5; i++){
			if(this[0].straight[i] > this[1].straight[i]){
				this.deletecard(this[0]);
				break;
			}
			else if(this[0].straight[i] < this[1].straight[i]){
				this.deletecard(this[1]);
				break;
			}
		}
		now = this.length;
	}
};
Array.prototype.calabash = function(){
	var now = -1;
	var past = 0;
	while(now != past && now != 1){
		past = this.length;
		if(this[0]["3"][0]%13 > this[1]["3"][0]%13){
			this.deletecard(this[0]);
		}
		else if(this[0]["3"][0]%13 < this[1]["3"][0]%13){
			this.deletecard(this[1]);
		}
		else{
			if(this[0]["2"][0]%13 > this[1]["2"][0]%13){
				this.deletecard(this[0]);
			}
			else if(this[0]["2"][0]%13 < this[1]["2"][0]%13){
				this.deletecard(this[1]);
			}
		}
		now = this.length;
	}
}
Array.prototype.forth = function(){
	var now = -1;
	var past = 0;
	while(now != past && now!=1){
		past = this.length;
		if(this[0]["4"][0]%13 > this[1]["4"][0]%13){
			this.deletecard(this[0]);
		}
		else if(this[0]["4"][0]%13 < this[1]["4"][0]%13){
			this.deletecard(this[1]);
		}
		else{
			if(this[0].addition[0] > this[1].addition[0]){
				this.deletecard(this[0]);
			}
			else if(this[0].addition[0] < this[1].addition[0]){
				this.deletecard(this[1]);
			}
		}
		now = this.length;
	}
}
//如果并列第一的都是同花顺
Array.prototype.straightflush = function(){
	var now = -1;
	var past = 0;
	while(now != past && now != 1){
		past = this.length;
		if(this[0].straight[0] > this[1].straight[0]){
			this.deletecard(this[0]);
		}
		else if(this[0].straight[0] < this[1].straight[0]){
			this.deletecard(this[1]);
		}
		now = this.length;
	}
}

Array.prototype.deletecard = function(obj){
	var array = new Array();
	for(var i=0; i<this.length; i++){
		if(this[i] == obj){
			this.splice(i, 1);
		}
	}
};
function ifPair(array){
	if(array[0] == array[1]){
		return true;
	}
	else{
		return false;
	}
}
Array.prototype.leaveMax = function(){
	var max = this[0].level;
	var array = new Array();
	for(var i=0; i<this.length; i++){
		if(this[i].level == max){
			array.push(this[i]);
		}
		//只要出现不相等那么就意味着后面的都小于前面的就不用继续比较了
		else{
			return array;
		}
	}
	return array;
};
init();
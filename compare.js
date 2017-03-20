function compare(cardArray){
	//先将整个cardArray按照card.level排序
	quickSort(cardArray, 0, cardArray.length-1);
	//如果只有一个level是最高的
	if(cardArray[0].level != cardArray[1].level){
		return cardArray[0];
	}
	//如果前几都是并列的
	else{
		cardArray.leaveMax();
		//如果所有并列的都是同花大顺(虽然这基本不可能)
		else if(cardArray[0].level == 2){
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
	}
}
function quickSort(cardArray, left, right){
	if(left < right){
		var  key = cardArray[left];
		var  low = left;
		var  high = right;
		while(low < high){
			while(low < high && cardArray[high].level >= key.level){
				high--;
			}
			array[low] = array[high];
			while(low < high && cardArray[low].level <= key.level){
				low++;
			}
			array[high] = array[low];
		}
		cardArray[low] = key;
		quickSort(array,left,low-1);
		quickSort(array,low+1,right);
	}
}
Array.prototype.high = function(){
	var now = 0;
	var past = 0;
	while(now != high){
		past = this.length;
		for(var i=0; i<5; i++){
			if(this[0].straight[i]%13 > this[1].straight[i]%13){
				this.deletecard(this[1]);
			}
			else if(this[0].straight[i]%13 < this[1].straight[i]%13){
				this.deletecard(this[0]);
			}
		}
		now = this.length;
	}
}
Array.prototype.onepair = function(){
	var now = 0;
	var past = 0;
	while(now != past){
		past = this.length;
		if(this[0]["2"][0]%13 > this[1]["2"][0]%13){
			this.deletecard(this[1]);
		}
		else if(this[0]["2"][0]%13 < this[1]["2"][0]%13){
			this.deletecard(this[0]);
		}
		else{
			for(var i=0; i<3; i++){
				if(this[0].addition[i]%13 > this[1].addition[i]%13){
					this.deletecard(this[1]);
				}
				else if(this[0].addition[i]%13 < this[1].addition[i]%13){
					this.deletecard(this[0]);
				}
			}
		}
		now = this.length;
	}
}
Array.prototype.twopairs = function(){
	var now = 0;
	var past = 0;
	while(now != past){
		if(this[0]["2"][0]%13 > this[1]["2"][0]%13){
			this.deletecard(this[1]);
		}
		else if(this[0]["2"][0]%13 < this[1]["2"][0]%13){
			this.deletecard(this[0]);
		}
		else {
			if(this[0]["2"][3]%13 > this[1]["2"][3]%13){
				this.deletecard(this[1]);
			}
			else if(this[0]["2"][3]%13 < this[1]["2"][3]%13){
				this.deletecard(this[0]);
			}
			else{
				if(this[0].addition[0] > this[1].addition[0]){
					this.deletecard(this[1]);
				}
				else if(this[0].addition[0] < this[1].addition[0]){
					this.deletecard(this[0]);
				}
			}
		}
	}
};
Array.prototype.third = function(){
	var now = 0;
	var past = 0;
	while(now != past){
		past = this.length;
		if(this[0]["3"][0]%13 > this[1]["3"][0]%13){
			this.deletecard(this[1]);
		}
		else if(this[0]["3"][0]%13 < this[1]["3"][0]%13){
			this.deletecard(this[0]);
		}
		else{
			for(var x=0; x<2; x++){
				if(this[0].addition[x] > this[1].addition[x]){
					this.deletecard(this[1]);
				}
				else if(this[0].addition[x] < this[1].addition[x]){
					this.deletecard(this[0]);
				}
			}
		}
		now = this.length;
	}
};
Array.prototype.flush = function(){
	var now = 0;
	var past = 0;
	while(now != past){
		past = this.length;
		for(var i=0; i<5; i++){
			if(this[0].straight[i] > this[1].straight[i]){
				this.deletecard(this[1]);
			}
			else if(this[0].straight[i] < this[1].straight[i]){
				this.deletecard(this[0]);
			}
		}
		now = this.length;
	}
};
Array.prototype.calabash = function(){
	if(this[0]["3"][0]%13 > this[1]["3"]%13){
		this.deletecard(this[1]);
	}
	else if(this[0]["3"][0]%13 < this[1]["3"]%13){
		this.deletecard(this[0]);
	}
	else{
		if(this[0]["2"][0]%13 > this[1]["2"][0]%13){
			this.deletecard(this[1]);
		}
		else if(this[0]["2"][0]%13 < this[1]["2"][0]%13){
			this.deletecard(this[0]);
		}
	}
}
Array.prototype.forth = function(){
	if(this[0]["4"][1]%13 > this[1]["4"]%13){
		this.deletecard(this[1]);
	}
	else if(this[0]["4"]%13 < this[1]["4"]%13){
		this.deletecard(this[0]);
	}
	else{
		if(this[0].addition[0] > this[1].addition[1]){
			this.deletecard(this[1]);
		}
		else if(this[0].addition[0] < this[1].addition[1]){
			this.deletecard(this[0]);
		}
	}
}
//如果并列第一的都是同花顺
Array.prototype.straightflush = function(){
	while(this.length != 1){
		if(this[0].straight[0] > this[1].straight[0]){
			this.deletecard(this[1]);
		}
		else if(this[0].straight[0] < this[1].straight[0]){
			this.deletecard(this[0]);
		}
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
compare(cardArray);
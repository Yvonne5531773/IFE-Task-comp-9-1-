function compare(cardArray){
	//�Ƚ�����cardArray����card.level����
	quickSort(cardArray, 0, cardArray.length-1);
	//���ֻ��һ��level����ߵ�
	if(cardArray[0].level != cardArray[1].level){
		return cardArray[0];
	}
	//���ǰ�����ǲ��е�
	else{
		cardArray.leaveMax();
		//������в��еĶ���ͬ����˳(��Ȼ�����������)
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
//������е�һ�Ķ���ͬ��˳
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
		//ֻҪ���ֲ������ô����ζ�ź���Ķ�С��ǰ��ľͲ��ü����Ƚ���
		else{
			return array;
		}
	}
	return array;
};
compare(cardArray);
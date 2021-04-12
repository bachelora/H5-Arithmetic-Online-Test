
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 

function generateContent(number,maxNum,fangfa){
	var content = []

	for (var i=0;i<number;i++){ 
		var a = randomNum(1,maxNum)
		var b = randomNum(1,maxNum)
		//var c = randomNum(10,10000)
		var result = 0
		var str = ""
		switch(fangfa){
			case '1'://两数加法
			   result = a + b;
			   str = "" + a + "+" + b
			   break;
			case '2'://两数减法
			   result = a + b;
			   str = "" + result + "-" + a
			   result = result - a
			   break;
			 case '3'://两数加减
			    if (randomNum(0,1) == 1) {
			    	result = a + b;
			        str = "" + result + "-" + a
			        result = result - a

			    }else{
                     result = a + b;
		    	     str = "" + a + "+" + b
			    }
			   break;
			  case '4'://两数乘法
			   result = a * b;
			   str = "" + a + "x" + b
			   break;
			  case '5'://两数除法
			   result = a * b;
			   str = "" + result + "÷" + a
			   result = b
			   break;
			  case '6'://两数乘除
			    if (randomNum(0,1) == 1) {
			    	result = a * b;
			        str = "" + a + "x" + b

			    }else{
                    result = a * b;
			        str = "" + result + "÷" + a
			        result = b 
			    }

			  break;

			default:break;
		}

		var li = '<li style="width: 378px;">' + str + '＝ <input style="width:70px;" type="text" size="2" zqda="' + result + '" ><span class="daan_show"></span> <i class="s_jieguo">' +result +'</i></li>'
		content.push(li)
	}

	var neirong_ul = document.getElementById("neirong_ul")
	neirong_ul.innerHTML = content.join(' ')
}

var startDate = 0
var fenPenTi = 0

function js_tishu_onchange(){
	startDate = new Date()
	var timer = setInterval(function() {
		var currentDate = new Date()
		t = currentDate.getTime() - startDate.getTime()
		var min = Math.floor(t/1000/60)
		var sec = Math.round((t - min*60*1000)/1000)
		var jst_haoshi = document.getElementById("jst_haoshi")
		jst_haoshi.innerHTML = '' + min + "分" + sec + '秒'
	}, 1000)

	var sj_tishu=document.getElementById("sj_tishu");
	var index=sj_tishu.selectedIndex
	var value = sj_tishu.options[index].value

	var sj_fanwei = document.getElementById("sj_fanwei");
	var maxNum = sj_fanwei.options[sj_fanwei.selectedIndex].value

	var sj_fangfa= document.getElementById("sj_fangfa");
	var fangfa = sj_fangfa.options[sj_fangfa.selectedIndex].value

	generateContent(value,maxNum,fangfa)

	fenPenTi = 100/value
	var jst_dibu_tishi = document.getElementById("jst_dibu_tishi");
	jst_dibu_tishi.innerHTML = '※总分：100分， 共计：' + value +'道题， 每题：' + fenPenTi + '分。'
}

function shengchengjisuanti_2(){
	var list=document.getElementById("neirong_ul").getElementsByTagName("input");
	for(var i=0;i<list.length;i++){
		var value = list[i].value
		if (value == ''){
			alert("还没有写完")
			return
		}
	}

	total = 0
	for(var i=0;i<list.length;i++){
		var value = list[i].value
		var zqda = list[i].getAttribute("zqda")

		list[i].style['display'] = 'none'
		list[i].parentElement.style['color'] = 'rgb(102, 102, 102)'
		list[i].nextElementSibling.innerHTML = value

		var last = list[i].nextElementSibling.nextElementSibling
		last.style['display'] = 'inline'

		if (value == zqda){//相等，做对了
			last.innerHTML = '<h6>√</h6>'
			total += fenPenTi
		}else{
			last.innerHTML = '<h7>答案:' + zqda +  '</h7>'
		}
	}
	var jst_defen =  document.getElementById("jst_defen")
	jst_defen.innerHTML = '00' + total + '分'
}

function js_huanjuan(){
	js_tishu_onchange()
}

function js_fanwei_onchange(){
	js_tishu_onchange()
}
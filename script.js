var map1 =[],map2 =[];
var W = 54,H = 7;
var activemap1 = true;
var iter = 0;
var timeout = 100;

function run(TimeOut = 100)
{
	timeout = TimeOut;
	timer();	
}

function renderMap(){
	var tbl = document.getElementsByClassName("day");
	var _map1 = activemap1? map1:map2;
	for(var n = 0; n < tbl.length;n++)
	{
		var i = Math.floor(n/7);
		var j = n%7;
		if(_map1[j][i])
			tbl[n].setAttribute("fill","#7bc96f");
		else tbl[n].setAttribute("fill","#ebedf0");		
	}
}

function fillingMap()
{
	var tbl = document.getElementsByClassName("day");
	for (n = 1; n < tbl.length;n++)
	{
		var i = Math.floor(n/7);
		var j = n%7;
		map1[j][i] = tbl[n].attributes.fill.value != "#ebedf0";	
	}
}

function createmap(_map1){
	for (var i = 0; i < H; i++){
	   _map1[i] = [];
	    for (var j = 0; j < W; j++){
	        _map1[i][j] = false;
		}
	}
}

function CountNeighbors(y,x){
	var _map1 = activemap1? map1:map2;
	var res = 0;
	for (var i = - 1; i <= 1; i++)
	{
		for (var j = - 1; j <= 1; j++)
		{
			if (_map1[(y + i + H) % H][(x + j + W) % W])
				res++;
		}
	}
	if (_map1[y][x])
		res--;
	return res;
}

function nextGeneration()
{
	var _map1 = activemap1 ? map1 : map2;
	var _map2 = activemap1 ? map2 : map1;
	for(var i = 0;i<H;i++){
		for(var j = 0;j<W;j++){
			var n =  CountNeighbors(i,j);
			_map2[i][j] = (n == 3) || ((n == 2) && (_map1[i][j]));
		}
	}
	activemap1 = !activemap1;
	iter++;	
}

function timer() {
	nextGeneration();	
	renderMap();
	setTimeout(timer, timeout);
}

createmap(map1);
createmap(map2);
fillingMap();
renderMap();
run();
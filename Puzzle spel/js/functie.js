"use strict"

function startGame()
{
	moves = 0;
	window.moves = 0;

	var arr = new Array(14,2,10,6,12,13,9,7,15,8,5,11,4,1,3,16);
	var strClass = "";
	
	for(i=0; i<arr.length; i++)
	{
		if(i == (arr.length -1))
			strClass = " pointer";
			
		$("#image").append('<div id="pos' + (i +1) + '" class="sq' + arr[i] + strClass +'"></div>');
	}
	$("#counter span").html("0");
	$("#clock span").html("00:00");
	
	var index;
	window.index = 0;
	var obj
	window.obj = new Timer();
	window.obj.Interval = 1000
	window.obj.Tick = timer_tick;
	window.obj.Start();	
	
	movePiece();
}
function movePiece()
{
	$("#image div").on("click",function(){
		if(!$(this).hasClass("pointer"))
		{
			var $moveTo = $(this).attr("id").replace("pos","");
			var $pointer = $(".pointer").attr("id").replace("pos","");
			
			if(validMove($pointer,$moveTo))
			{
				// Swap classes
				var a = $(this);
				var b = $(".pointer");
				var aClass = a.attr("class");
				var bClass = b.attr("class");
				a.removeClass(aClass).addClass(bClass);
				b.removeClass(bClass).addClass(aClass);
				
				window.moves++;
				$("#counter span").html(window.moves);
				
				if(parseInt($moveTo) == 16)
					isGameOver();
			}
		}
	});	
}

function validMove(id,move)
{
	if(id == 1)
		var arr = new Array(2,5);
	else if(id == 2)
		var arr = new Array(1,3,6);
	else if(id == 3)
		var arr = new Array(2,4,7);
	else if(id == 4)
		var arr = new Array(3,8);
	else if(id == 5)
		var arr = new Array(1,6,9);
	else if(id == 6)
		var arr = new Array(2,5,7,10);
	else if(id == 7)
		var arr = new Array(3,6,8,11);
	else if(id == 8)
		var arr = new Array(4,7,12);
	else if(id == 9)
		var arr = new Array(5,10,13);
	else if(id == 10)
		var arr = new Array(6,9,11,14);
	else if(id == 11)
		var arr = new Array(7,10,12,15);
	else if(id == 12)
		var arr = new Array(8,11,16);
	else if(id == 13)
		var arr = new Array(9,14);
	else if(id == 14)
		var arr = new Array(10,13,15);
	else if(id == 15)
		var arr = new Array(11,14,16);
	else if(id == 16)
		var arr = new Array(12,15);

	if($.inArray(parseInt(move),arr) > -1)
		return true;
}

function isGameOver()
{
	for(i=1; i<=16; i++)
	{
		if(!$("#image #pos" + i).hasClass("sq" + i))
		{
			break;
		} else {
			if(i == 16)
			{
				$("#pos16").removeClass("pointer");
				$("#image div").off("click");
				window.obj.Stop();
			}				
		}
	}
}


var Timer = function()
{        

    this.Interval = 1000;
    
    this.Enable = new Boolean(false);
    

    this.Tick;

    var timerId = 0;

    var thisObject;
    
    this.Start = function()
    {
        this.Enable = new Boolean(true);

        thisObject = this;
        if (thisObject.Enable)
        {
            thisObject.timerId = setInterval(
            function()
            {
                thisObject.Tick(); 
            }, thisObject.Interval);
        }
    };
    
    this.Stop = function()
    {            
        thisObject.Enable = new Boolean(false);
        clearInterval(thisObject.timerId);
    };

};

function timer_tick()
{
	window.index = window.index + 1;
	$("#clock span").html(secondsTimeSpanToHMS(window.index));
}

function secondsTimeSpanToHMS(s)
{
    var h = Math.floor(s/3600); 
    s -= h*3600;
    var m = Math.floor(s/60);   
    s -= m*60;
	return (m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s);
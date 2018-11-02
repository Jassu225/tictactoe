var canvas = document.getElementById('play_area');
var ctx = canvas.getContext("2d");
ctx.font = "70px 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif";
var line_space;
// opactiy - text opacity, entry - flag for grid animation (shows grid animation at 1st time after pageload. It skips animation from next time)
var opacity,entry = true;

// requestID contains ID of last requested animation frame. Used to cancel animation frame
var requestID = null,increment;

// 'wh' implies width or height of canvas. takes min value. 'gap' implies difference between canvas width and height
var gap=0,wh=0;

//'fw' = flagWidth . 1 if canvas width is more than canvas height else 0
//'fh' = flagHeight. 1 if canvas width is more than canvas height else 0
// 'diff' = grid size

var fw=0,fh=0,diff=0;

// (x,y) = top-left corner, (x3,y) = top-right corner
// (x,y3) = bottom-left corner, (x3,y3) = bottom-right corner
// x1 = first inner vertical line , x2 = 2nd inner vertical line
// y1 = first inner horizontal line , y2 = 2nd inner horizontal line

var x=0,y=0,x1=0,y1=0,x2=0,y2=0,x3=0,y3=0;

var player_turn,player_first,cpu_first;
var filled = [];
var moveSequence;

function initializeGameVariables(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  opacity = 0;
  increment = 2;
  player_turn=true;
  player_first = true;
  cpu_first=false;
  fh=0;
  fw=0;
  moveSequence = "";
  for(var i=0;i<9;i++){
    filled[i] = false;
  }
  if(canvas.width<canvas.height){
    wh = canvas.width;
    gap = canvas.height - canvas.width;
    fh=1;
  } else {
    wh = canvas.height;
    gap = canvas.width - canvas.height;
    fw=1;
  }
  x1 = wh*2/5 + fw*gap/2;  //1st inner vertical line
  y1 = wh*2/5 + fh*gap/2;
  x2 = wh*3/5 + fw*gap/2;
  y2 = wh*3/5 + fh*gap/2;
  x3 = wh*4/5 + fw*gap/2;
  y3 = wh*4/5 + fh*gap/2;
  x = wh/5 + fw*gap/2;
  y = wh/5 + fh*gap/2;
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';
  if(wh<420){
    ctx.font = "30px 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif";
    line_space = 30;
  } else{
    ctx.font = "50px 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif";
    line_space = 50;
  }
  diff = Math.ceil(wh*3/5);
  diff = diff%2 ? (diff - 1):diff;
  if(entry)
    show(0,2);
  else
    showGrid();
}
// WELCOME 
var i,imax;
var text = ["Welcome","To Tic-Tac-Toe","Let's Play","Well Played.", "You Won.","Thank You.","Well tried.","I won.","Thank You","Well Played.", "Draw","Thank You"];
function show(n,max){
  opacity = 0;
  i = n;
  imax = max;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(wh<420){
    ctx.font = "40px 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif";
  } else
    ctx.font = "70px 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif";
  showText();
}
function showText(){
  requestID = window.requestAnimationFrame(showText);
  opacity += increment;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = `rgba(255,255,255,${opacity*0.01})`;
  ctx.textAlign = "center";
  ctx.fillText(text[i],canvas.width/2,canvas.height/2);
  if(opacity == 100){
    increment = -2;
  }else if(opacity == 0){
    increment = 2;
    if(i != imax)
      i++;
    else {
      window.cancelAnimationFrame(requestID);
      ctx.clearRect(0,0,canvas.width,canvas.height);
      if(wh<420){
        ctx.font = "30px 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif";
        line_space = 30;
      }else {
        ctx.font = "50px 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif";
        line_space = 50;
      }
      ctx.fillStyle = 'white';
      if(entry){
        animateGrid();
        entry = false;
      } else {
         askAgain();
      }
      return;
    }
  }
}
initializeGameVariables();
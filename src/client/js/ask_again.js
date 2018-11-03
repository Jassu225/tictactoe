function askAgain(){
  canvas.removeEventListener("click",playerMove);
  canvas.addEventListener("click", playAgain);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillText("Click anywhere",canvas.width/2,canvas.height/2);
  ctx.fillText("on canvas to play again",canvas.width/2,canvas.height/2+line_space);
  request("/resetGameState", function() {
    console.log("Game state reset successful");
  });
}

function playAgain(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  canvas.removeEventListener("click",playAgain);
  initializeGameVariables();
  console.log('called');
}
function showGrid(){
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x3,y);
  ctx.lineTo(x3,y3);
  ctx.lineTo(x,y3);
  ctx.lineTo(x,y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x1,y);
  ctx.lineTo(x1,y3);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x2,y);
  ctx.lineTo(x2,y3);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x,y1);
  ctx.lineTo(x3,y1);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x,y2);
  ctx.lineTo(x3,y2);
  ctx.stroke();
  initListener();
  ctx.textAlign = 'center';
  ctx.fillText("Your Turn",canvas.width/2,y3 + gap/8);
}
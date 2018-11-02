var length = 0;
function animateGrid(){
  length = 0;
  console.log(diff);
  ctx.lineWidth = 4;
  drawTopLeftBorders();
  console.log('hey');
}
function drawTopLeftBorders(){
    requestID = window.requestAnimationFrame(drawTopLeftBorders);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.moveTo(x + length,y);
    ctx.lineTo(x,y);
    ctx.lineTo(x, y + length);
    ctx.strokeStyle = 'white';
    ctx.stroke();
    if(length == diff){
       window.cancelAnimationFrame(requestID);
       length=0;
       drawBottomRightBorders();
       return;
    }
    length += increment;
}
function drawBottomRightBorders(){
    requestID = window.requestAnimationFrame(drawBottomRightBorders);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.moveTo(x + diff,y);
    ctx.lineTo(x,y);
    ctx.lineTo(x, y + diff);
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x3,y + length);
    ctx.lineTo(x3,y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + length,y3);
    ctx.lineTo(x, y3);
    ctx.stroke();
    if(length == diff){
       window.cancelAnimationFrame(requestID);
       length = 0;
       drawInnerLines();
       return;
    }
    length += increment;
}
function drawInnerLines(){
  requestID = window.requestAnimationFrame(drawInnerLines);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x3,y);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x, y3);
  ctx.lineTo(x,y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x1, y + length);
  ctx.lineTo(x1,y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2,y3 - length);
  ctx.lineTo(x2,y3);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + length,y1);
  ctx.lineTo(x,y1);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x3 - length,y2);
  ctx.lineTo(x3,y2);
  ctx.stroke();
  if(length == diff){
    window.cancelAnimationFrame(requestID);
    ctx.fillText("Your turn",canvas.width/2,y3 + gap/8);
    initListener();
    return;
  }
  length += increment;
}
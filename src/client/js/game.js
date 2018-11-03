let time = -1;
let thinkTime = 300; //ms

function initListener(){
  canvas.addEventListener("click",playerMove);
}
function playerMove(e){
  if(player_turn && moveSequence.length < 9){
    var pos = getMousePos(e); 
    if(pos.x <= x || pos.x >= x3 || pos.y <= y || pos.y >= y3){
       console.log("out of bounds " + player_turn);
       return;
    }
    player_turn = false;
    var center = getCenter(pos.x,pos.y);
    if(center){
      if(!filled[center.ind-1]){
        moveSequence += "" + (center.ind).toString();
        console.log(moveSequence);
        drawCircle(center.x,center.y,9*wh/100);
        filled[center.ind-1] = true;
        if(moveSequence.length >=5){
          if(checkPlayerWin(player_first)){
            //  show(3,5);
             window.setTimeout(show.bind(null,3,5), thinkTime);
            //  request("https://stream-me.000webhostapp.com/insertSequence.php",log);
             return;
          }
        }
        think();
      } else {
        player_turn = true;
      }
    }
  } else {
    ctx.clearRect(0,y3+5,canvas.width,canvas.height);
    ctx.fillText("Plz wait.It's my turn",canvas.width/2,y3 + gap/8);
  }
}
function drawCircle(x,y,r){
  ctx.beginPath();
  ctx.arc(x,y,r,0,2*Math.PI);
  ctx.stroke();
}
function fillCircle(x,y,r){
 ctx.beginPath();
 ctx.arc(x,y,r,0,2*Math.PI);
 ctx.fill();
}
function request(url,callback){
  //$.post(url,{sequence: moveSequence},callback);
  $.ajax({
      url: url,
      method: "POST",
      data: {sequence: moveSequence},
      dataType: "json",
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
          'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
      },
      success: callback
  });
}
function gameOver() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  show(9,11);
}
function think(){
  ctx.clearRect(0,y3+5,canvas.width,canvas.height);
  ctx.fillText("Thinking",canvas.width/2,y3 + gap/8);
  if(moveSequence.length==9){
    window.setTimeout(gameOver, thinkTime);
    return;
  }
  time = new Date().getTime();
  request("/getNextMove",myMove);
}
function log(result){
  console.log(result);
}
function myMove(data, status){
  if(new Date().getTime() - time < thinkTime) {
    window.setTimeout(myMove.bind(null, data, status), thinkTime);
    return;
  }
  console.log(data);
  // obj = JSON.parse(data);
  obj = data;
  if(moveSequence.length < 9){
    var center,rand;
      center = getCoOrdinates(obj.nextMove);
      rand = obj.nextMove;
    fillCircle(center.x,center.y,9*wh/100);
    filled[rand-1] = true;
    moveSequence += "" + rand.toString();
    if(moveSequence.length >=5){
      if(checkPlayerWin(cpu_first)){
        // show(6,8);
        window.setTimeout(show.bind(null,6,8), thinkTime);
        return;
      }
    }
    console.log(moveSequence);
    player_turn = true;
    ctx.clearRect(0,y3+5,canvas.width,canvas.height);
    ctx.fillText("Your turn",canvas.width/2,y3 + gap/8);
  }
}

function getMousePos(e) {

    // getBoundingClientRect is supported in most browsers and gives you
    // the absolute geometry of an element
    var rect = canvas.getBoundingClientRect();

    // as mouse event coords are relative to document you need to
    // subtract the element's left and top position:
    return {x: e.clientX - rect.left, y: e.clientY - rect.top};
}
function getCenter(cx,cy){
  var index;
  if(cx > x && cy > y && cx < x3 && cy < y3){
    if(cx <= x1){
      cx = (x + x1)/2; index = 1;
    } else if(cx <= x2){
      cx = (x1 + x2)/2; index = 2;
    } else {
      cx = (x2 + x3)/2; index = 3;
    }
    if(cy <= y1)
      cy = (y + y1)/2;
    else if(cy <= y2){
      cy = (y1 + y2)/2; index += 3;
    } else {
      cy = (y2 + y3)/2; index += 6;
    }
    console.log(index);
    return {x:cx,y:cy,ind:index};
  }
  return null;
}
function getCoOrdinates(move){
  switch(move){
    case 1: return {x:(x+x1)/2,y:(y+y1)/2};
    case 2: return {x:(x1+x2)/2,y:(y+y1)/2};
    case 3: return {x:(x2+x3)/2,y:(y+y1)/2};
    case 4: return {x:(x+x1)/2,y:(y1+y2)/2};
    case 5: return {x:(x1+x2)/2,y:(y1+y2)/2};
    case 6: return {x:(x2+x3)/2,y:(y1+y2)/2};
    case 7: return {x:(x+x1)/2,y:(y2+y3)/2};
    case 8: return {x:(x1+x2)/2,y:(y2+y3)/2};
    case 9: return {x:(x2+x3)/2,y:(y2+y3)/2};
  }
}
function checkPlayerWin(first){
  var count=0,i=1;
  var length = moveSequence.length;
  var n1,n2,n3;
  if(first){
    n1 = moveSequence.indexOf("1");
    n2 = moveSequence.indexOf("2");
    n3 = moveSequence.indexOf("3");
    if(n1%2==0 && n2%2==0 && n3%2==0) return true;
    n1 = moveSequence.indexOf("4");
    n2 = moveSequence.indexOf("5");
    n3 = moveSequence.indexOf("6");
    if(n1%2==0 && n2%2==0 && n3%2==0) return true;
    n1 = moveSequence.indexOf("7");
    n2 = moveSequence.indexOf("8");
    n3 = moveSequence.indexOf("9");
    if(n1%2==0 && n2%2==0 && n3%2==0) return true;
    n1 = moveSequence.indexOf("1");
    n2 = moveSequence.indexOf("4");
    n3 = moveSequence.indexOf("7");
    if(n1%2==0 && n2%2==0 && n3%2==0) return true;
    n1 = moveSequence.indexOf("1");
    n2 = moveSequence.indexOf("5");
    n3 = moveSequence.indexOf("9");
    if(n1%2==0 && n2%2==0 && n3%2==0) return true;
    n1 = moveSequence.indexOf("2");
    n2 = moveSequence.indexOf("5");
    n3 = moveSequence.indexOf("8");
    if(n1%2==0 && n2%2==0 && n3%2==0) return true;
    n1 = moveSequence.indexOf("3");
    n2 = moveSequence.indexOf("5");
    n3 = moveSequence.indexOf("7");
    if(n1%2==0 && n2%2==0 && n3%2==0) return true;
    n1 = moveSequence.indexOf("3");
    n2 = moveSequence.indexOf("6");
    n3 = moveSequence.indexOf("9");
    if(n1%2==0 && n2%2==0 && n3%2==0) return true;
  } else {
    n1 = moveSequence.indexOf("1");
    n2 = moveSequence.indexOf("2");
    n3 = moveSequence.indexOf("3");
    if(n1%2==1 && n2%2==1 && n3%2==1) return true;
    n1 = moveSequence.indexOf("4");
    n2 = moveSequence.indexOf("5");
    n3 = moveSequence.indexOf("6");
    if(n1%2==1 && n2%2==1 && n3%2==1) return true;
    n1 = moveSequence.indexOf("7");
    n2 = moveSequence.indexOf("8");
    n3 = moveSequence.indexOf("9");
    if(n1%2==1 && n2%2==1 && n3%2==1) return true;
    n1 = moveSequence.indexOf("1");
    n2 = moveSequence.indexOf("4");
    n3 = moveSequence.indexOf("7");
    if(n1%2==1 && n2%2==1 && n3%2==1) return true;
    n1 = moveSequence.indexOf("1");
    n2 = moveSequence.indexOf("5");
    n3 = moveSequence.indexOf("9");
    if(n1%2==1 && n2%2==1 && n3%2==1) return true;
    n1 = moveSequence.indexOf("2");
    n2 = moveSequence.indexOf("5");
    n3 = moveSequence.indexOf("8");
    if(n1%2==1 && n2%2==1 && n3%2==1) return true;
    n1 = moveSequence.indexOf("3");
    n2 = moveSequence.indexOf("5");
    n3 = moveSequence.indexOf("7");
    if(n1%2==1 && n2%2==1 && n3%2==1) return true;
    n1 = moveSequence.indexOf("3");
    n2 = moveSequence.indexOf("6");
    n3 = moveSequence.indexOf("9");
    if(n1%2==1 && n2%2==1 && n3%2==1) return true;
  }
}
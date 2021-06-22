function setBrdViewSpecs(){
  if (brdSetTyp == "N"){
    document.getElementById("boardset").style.gridTemplateColumns = "0.3vw 18.4vw 46vw 18.4vw auto";
    document.getElementById("boardset").style.gridTemplateRows = "0.3vw 18.4vw 9.2vw 18.4vw auto";
    document.getElementById("Sentehandbox").style.gridColumnStart = "4";
    document.getElementById("Sentehandbox").style.gridRowStart = "4";
    document.getElementById("Board").style.gridColumnStart = "3";
    document.getElementById("Board").style.gridRowStart = "2";
    document.getElementById("Board").style.gridRowStart = "5";
  }
  if (brdSetTyp == "S"){
    document.getElementById("boardset").style.gridTemplateColumns = "0.3vw 4vw 46vw 0.3vw auto";
    document.getElementById("boardset").style.gridTemplateRows = "0.3vw 21.5vw 0vw 21.5vw auto";
  }
}


function OcreateBoardSV(){

  document.write("<table id= 'BrdBk'>");
  
  for(y = 0; y < 11; y++){
     if(y == 0 || y == 10){
        document.write("<tr class = 'Brdtopbottom'>");
     }
     else{
        document.write("<tr class = 'Brdspace'>");
     }
     for(x = 0; x < 11; x++){
       if(x == 0){
          document.write("<td class = 'Brdleftright'></td>");
       }
       else if (x == 10) {
          document.write("<td class = 'Brdleftright'><center>"+RightNums[y]+"</center></td>");
       }
       else if (y == 0) {
          document.write("<td class = 'Brdtopbottom'><center>"+TopNums[x]+"</center></td>");
       }
       else if (y == 10) {
          document.write("<td class = 'Brdtopbottom'></td>");
       }
       else{
          var z = 10 - x
          document.write("<td class = 'Brdspace allcell' id = B"+z+y+" onclick='clickAns(this.id)'></td>");
       }
     }
     document.write("</tr>");
  }
  document.write("</table>");
  };

function possDropsP(side, state){
  var possDrops = []
  var test = []
  var p = side + "P"
  var ekf = findKingFront(sideSwap[side], state)
  var lim = piecelim[p]
  for (i in state){
    if (lim.includes(i) == false && state[i] == "E" && i != ekf){
      possDrops.push(i)
    } else if (lim.includes(i) == false && state[i] == "E" && i == ekf){
      console.log(ekf)
      console.log(state[i])
      var tstate = makeTState(state)
      tstate[i] = p
      var cmt = escCheckByBrdMv(tstate, sideSwap[side])
      var cm = 1
      for (j in cmt){
        if (cmt[j].length != 0){
          cm = 0
        }
      }
      if (cm == 0){
        //possDrops.push(i)
        test.push(i)
      }
    }
  }
  //return possDrops
  return test
};

var promozone = {
  S:[B11,B12,B13,B21,B22,B23,B31,B32,B33,B41,B42,B43,B51,B52,B53,B61,B62,B63,B71,B72,B73,B81,B82,B83,B91,B92,B93],
  G:[B17,B18,B19,B27,B28,B29,B37,B38,B39,B47,B48,B49,B57,B58,B59,B67,B68,B69,B77,B78,B79,B87,B88,B89,B97,B98,B99]
}

//checks for checkmate
function checkMateCheck(side){
  if (check[side] == 0){
    for (i in state){
      possMoves = []
      if (state[i].charAt(0) == side){
        piecemoves(i)
        for (j of possMoves){
          for (k in tstate){
            tstate[i] = state[i]
          }
          var temp = state[i]
          state[i] = "E"
          state[j] = temp
          checkcheck(tstate,side)
          if (check[side] == 0){
            alert(i+" "+j)
          }
        }
      }
    }
  }
}

function escCheckByBrdMv(state, side){
  var escMoves = {}
  for (i in state){
    if (state[i].charAt(0) == side){
      var pm = piecemoves(i, side)
      var tstate = makeTState(state)
      for (j of pm){
        var t = tstate[i]
        tstate[i] = "E"
        tstate[j] = t
        if (checkcheck(tstate, side) == 0){
          escMoves[state[i]] = j
        }
      }
    }
  }
  return escMoves
}


var blankstate = {
  11:"E",12:"E",13:"E",14:"E",15:"E",16:"E",17:"E",18:"E",19:"E",
  21:"E",22:"E",23:"E",24:"E",25:"E",26:"E",27:"E",28:"E",29:"E",
  31:"E",32:"E",33:"E",34:"E",35:"E",36:"E",37:"E",38:"E",39:"E",
  41:"E",42:"E",43:"E",44:"E",45:"E",46:"E",47:"E",48:"E",49:"E",
  51:"E",52:"E",53:"E",54:"E",55:"E",56:"E",57:"E",58:"E",59:"E",
  61:"E",62:"E",63:"E",64:"E",65:"E",66:"E",67:"E",68:"E",69:"E",
  71:"E",72:"E",73:"E",74:"E",75:"E",76:"E",77:"E",78:"E",79:"E",
  81:"E",82:"E",83:"E",84:"E",85:"E",86:"E",87:"E",88:"E",89:"E",
  91:"E",92:"E",93:"E",94:"E",95:"E",96:"E",97:"E",98:"E",99:"E"
};


//K:RB:GS:N:L:P
//  32  :   31  :   30  :   29  :   28  : 27
//1.185 : 1.148 : 1.111 : 1.074 : 1.037 : 1
//82.95 : 80.37 : 77.77 : 75.18 : 72.59 : 70

<td width = "80%" >
   <center>
      <script>
         createBoardt()
      </script>
   </center>
</td>

function primeT(id){
  if (highlight == 0){
    initS = id
    highlight = 1
    document.getElementById(id).style.backgroundColor = "#ffe272"
    //highlight square ffe272 ffdd56
  }
  else {
    finS = id
    highlight = 0
    //undo highlight
    document.getElementById(initS).style.backgroundColor = ""
    makemove(initS,finS)
  }
};

//poss move functions
function possGPMoves(id){
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var ny = y - 1
  var nm = "B"+String(x)+String(ny)
  if (nm in state){
    possMoves.push(nm)
  }
  possMovesHighlight()
};

function possSPMoves(id){
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var ny = y + 1
  var nm = "B"+String(x)+String(ny)
  if (nm in state && state[nm].charAt(0) != whoGo){
    possMoves.push(nm)
  }
  possMovesHighlight()
};

function possKMoves(id){
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = 0
  var ny = 0
  var nm = ""
  var cc = [[0,1],[1,1],[1,0],[0,-1],[-1,-1],[-1,0],[-1,1],[1,-1]]
  for (i of cc){
    nm = "B"+String(x+i[0])+String(y+i[1])
    if (nm in state && state[nm].charAt(0) != whoGo){
      possMoves.push(nm)
    }
  }
  possMovesHighlight()
};

function possGNMoves(id){
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = 0
  var ny = 0
  var nm = ""
  var cc = [[-1,-2],[1,-2]]
  for (i of cc){
    nm = "B"+String(x+i[0])+String(y+i[1])
    if (nm in state && state[nm].charAt(0) != whoGo){
      possMoves.push(nm)
    }
  }
  possMovesHighlight()
};

function possSNMoves(id){
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = 0
  var ny = 0
  var nm = ""
  var cc = [[-1,2],[1,2]]
  for (i of cc){
    nm = "B"+String(x+i[0])+String(y+i[1])
    if (nm in state && state[nm].charAt(0) != whoGo){
      possMoves.push(nm)
    }
  }
  possMovesHighlight()
};

function possGGMoves(id){
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = 0
  var ny = 0
  var nm = ""
  var cc = [[-1,-1],[0,-1],[1,-1],[0,1],[-1,0],[1,0]]
  for (i of cc){
    nm = "B"+String(x+i[0])+String(y+i[1])
    if (nm in state && state[nm].charAt(0) != whoGo){
      possMoves.push(nm)
    }
  }
  possMovesHighlight()
};

function possSGMoves(id){
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = 0
  var ny = 0
  var nm = ""
  var cc = [[-1,1],[0,1],[1,1],[0,-1],[-1,0],[1,0]]
  for (i of cc){
    nm = "B"+String(x+i[0])+String(y+i[1])
    if (nm in state && state[nm].charAt(0) != whoGo){
      possMoves.push(nm)
    }
  }
  possMovesHighlight()
};

function possSSMoves(id){
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = 0
  var ny = 0
  var nm = ""
  var cc = [[-1,-1],[0,-1],[1,-1],[-1,1],[1,1]]
  for (i of cc){
    nm = "B"+String(x+i[0])+String(y+i[1])
    if (nm in state && state[nm].charAt(0) != whoGo){
      possMoves.push(nm)
    }
  }
  possMovesHighlight()
};

function possGSMoves(id){
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = 0
  var ny = 0
  var nm = ""
  var cc = [[-1,1],[0,1],[1,1],[-1,-1],[1,-1]]
  for (i of cc){
    nm = "B"+String(x+i[0])+String(y+i[1])
    if (nm in state && state[nm].charAt(0) != whoGo){
      possMoves.push(nm)
    }
  }
  possMovesHighlight()
};

function possSLMoves(id){
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = x
  var ny = y
  var nm = ""
  var cc = [[0,-1]]
  var go = 1
  for (i of cc){
    while (go == 1){
      nx = nx+i[0]
      ny = ny+i[1]
      nm = "B"+String(nx)+String(ny)
      if (nm in state){
        if (state[nm].charAt(0) == whoGo){
          go = 0
        } else if (state[nm].charAt(0) == swg[whoGo]){
          go = 0
          possMoves.push(nm)
        } else{
          possMoves.push(nm)
        }
      } else {
        go = 0
      }
    }
  }
  possMovesHighlight()
};

function possGLMoves(id){
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = x
  var ny = y
  var nm = ""
  var cc = [[0,1]]
  var go = 1
  for (i of cc){
    while (go == 1){
      nx = nx+i[0]
      ny = ny+i[1]
      nm = "B"+String(nx)+String(ny)
      if (nm in state){
        if (state[nm].charAt(0) == whoGo){
          go = 0
        } else if (state[nm].charAt(0) == swg[whoGo]){
          go = 0
          possMoves.push(nm)
        } else{
          possMoves.push(nm)
        }
      } else {
        go = 0
      }
    }
  }
  possMovesHighlight()
};

function possRMoves(id){
  var cc = [[0,-1],[0,1],[1,0],[-1,0]]
  for (i of cc){
    var x = parseInt(id.charAt(1))
    var y = parseInt(id.charAt(2))
    var nx = x
    var ny = y
    var nm = ""
    var go = 1
    while (go == 1){
      nx = nx+i[0]
      ny = ny+i[1]
      nm = "B"+String(nx)+String(ny)
      if (nm in state){
        if (state[nm].charAt(0) == whoGo){
          go = 0
        } else if (state[nm].charAt(0) == swg[whoGo]){
          go = 0
          possMoves.push(nm)
        } else{
          possMoves.push(nm)
        }
      } else {
        go = 0
      }
    }
  }
  possMovesHighlight()
};

function possBMoves(id){
  var cc = [[1,-1],[1,1],[-1,-1],[-1,1]]
  for (i of cc){
    var x = parseInt(id.charAt(1))
    var y = parseInt(id.charAt(2))
    var nx = x
    var ny = y
    var nm = ""
    var go = 1
    while (go == 1){
      nx = nx+i[0]
      ny = ny+i[1]
      nm = "B"+String(nx)+String(ny)
      if (nm in state){
        if (state[nm].charAt(0) == whoGo){
          go = 0
        } else if (state[nm].charAt(0) == swg[whoGo]){
          go = 0
          possMoves.push(nm)
        } else{
          possMoves.push(nm)
        }
      } else {
        go = 0
      }
    }
  }
  possMovesHighlight()
};

function possRpMoves(id){
  var cc = [[0,-1],[0,1],[1,0],[-1,0]]
  for (i of cc){
    var x = parseInt(id.charAt(1))
    var y = parseInt(id.charAt(2))
    var nx = x
    var ny = y
    var nm = ""
    var go = 1
    while (go == 1){
      nx = nx+i[0]
      ny = ny+i[1]
      nm = "B"+String(nx)+String(ny)
      if (nm in state){
        if (state[nm].charAt(0) == whoGo){
          go = 0
        } else if (state[nm].charAt(0) == swg[whoGo]){
          go = 0
          possMoves.push(nm)
        } else{
          possMoves.push(nm)
        }
      } else {
        go = 0
      }
    }
  }
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = 0
  var ny = 0
  var nm = ""
  var cc = [[0,1],[1,1],[1,0],[0,-1],[-1,-1],[-1,0],[-1,1],[1,-1]]
  for (i of cc){
    nm = "B"+String(x+i[0])+String(y+i[1])
    if (nm in state && state[nm].charAt(0) != whoGo){
      possMoves.push(nm)
    }
  }
  possMovesHighlight()
};

function possBpMoves(id){
  var cc = [[1,-1],[1,1],[-1,-1],[-1,1]]
  for (i of cc){
    var x = parseInt(id.charAt(1))
    var y = parseInt(id.charAt(2))
    var nx = x
    var ny = y
    var nm = ""
    var go = 1
    while (go == 1){
      nx = nx+i[0]
      ny = ny+i[1]
      nm = "B"+String(nx)+String(ny)
      if (nm in state){
        if (state[nm].charAt(0) == whoGo){
          go = 0
        } else if (state[nm].charAt(0) == swg[whoGo]){
          go = 0
          possMoves.push(nm)
        } else{
          possMoves.push(nm)
        }
      } else {
        go = 0
      }
    }
  }
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = 0
  var ny = 0
  var nm = ""
  var cc = [[0,1],[1,1],[1,0],[0,-1],[-1,-1],[-1,0],[-1,1],[1,-1]]
  for (i of cc){
    nm = "B"+String(x+i[0])+String(y+i[1])
    if (nm in state && state[nm].charAt(0) != whoGo){
      possMoves.push(nm)
    }
  }
  possMovesHighlight()
};

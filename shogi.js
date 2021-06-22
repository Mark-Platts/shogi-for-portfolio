var menustatus = 0
var firstConstructCompleted = false

function navbutton() {
  if (menustatus == 1) {
    closeNav()
    menustatus = 0
  }
  else {
    openNav()
    menustatus = 1
  }
}

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "20vw";
}

/* Set the width of the side navigation to default */
function closeNav() {
    document.getElementById("mySidenav").style.width = "5vw";
}

//Game infobox stuff
function leftTabOp() {
  document.getElementById("leftTabPg").style.zIndex = "1";
  document.getElementById("rightTabPg").style.zIndex = "-1";
}

function rightTabOp() {
  document.getElementById("rightTabPg").style.zIndex = "1";
  document.getElementById("leftTabPg").style.zIndex = "-1";
}

// function confMoveOpen() {
//   document.getElementById("confMoveBox").style.zIndex = "4";
//   document.getElementById("confMoveB1").style.zIndex = "5";
//   document.getElementById("confMoveB2").style.zIndex = "-1";
// }
//Overlay stuff
//turn on and off the confMoveOpen
var confMoveBox = 0
var confMoveYN = 0
function changeConfMoveYN(){
  confMoveYN = document.getElementById("confMoveYN").value
}


function confMoveOnOff() {
  if (confMoveBox == 0){
    confMoveOpen()
  } else if (confMoveBox == 1){
    confMoveClose()
  }
}
function confMoveOpen() {
  document.getElementById("confMoveBox").style.display = "grid";
  document.getElementById("confMoveB1").style.display = "grid";
  document.getElementById("confMoveB2").style.display = "grid";
  confMoveBox = 1
}
function confMoveClose() {
  document.getElementById("confMoveBox").style.display = "none";
  document.getElementById("confMoveB1").style.display = "none";
  document.getElementById("confMoveB2").style.display = "none";
  confMoveBox = 0
}

//functions for confirm move accept or deny
function confMoveAccept(){
  confMoveClose()
  //send to server
}

function confMoveDeny(){
  confMoveClose()
  switchwhoGo()
  turnCounter -= 2
  for (i in state){
    state[i] = stateStore[turnCounter][i]
  }
  for (i in gstate){
    gstate[i] = gStore[turnCounter][i]
  }
  for (i in sstate){
    sstate[i] = sStore[turnCounter][i]
  }
  drawboard(state, gstate, sstate)
  check[whoGo] = checkcheck(state, whoGo)
  check[swg[whoGo]] = checkcheck(state, swg[whoGo])
  wrtToMoveSheet(moveStore)
  turnCounter += 1
  turnView = turnCounter - 1
  updateHLMoves(moveStore[turnView][0],moveStore[turnView][1])
}

//Overlay stuff
//turn on and off the promotion promotionoverlay
var promovsw = 0
function promovon() {
  document.getElementById("promotionoverlay").style.display = "grid";
  promovsw = 1
}

function promovoff() {
  document.getElementById("promotionoverlay").style.display = "none";
  promovsw = 0
}

//promotes a piece
function promoyes(){
  var op = forPro
  state[forPro] = state[op].charAt(0)+"p"+state[op].charAt(1)
  promovoff()
  drawboard(state,gstate,sstate)
}

//Turns on and off the settings screen.
var settshow = 0
function settingsonoff() {
  if (settshow == 0){
    document.getElementById("settingsoverlay").style.display = "grid";
    settshow = 1
  } else if (settshow == 1){
    document.getElementById("settingsoverlay").style.display = "none";
    settshow = 0
  }
}

//Dummy storage for player info
var gotPlayerInf = {
  "name" : "Feanaro",
  "rating" : 800,
  "picture" : "images/g.png",
  "flag" : "images/flags/Pi.png"
}
var senPlayerInf = {
  "name" : "Colin",
  "rating" : 2000,
  "picture" : "images/s.png",
  "flag" : "images/flags/UF.png"
}

//Function sends player info to html
function plInfToHTML(senPlayerInf, gotPlayerInf){
  document.getElementById("senteInfoBoxNm").innerHTML = '<p class = "playerInfFnt">'+senPlayerInf["name"]+'</p>'
  document.getElementById("goteInfoBoxNm").innerHTML = '<p class = "playerInfFnt">'+gotPlayerInf["name"]+'</p>'
  document.getElementById("senteInfoBoxNm2").innerHTML = '<p class = "playerInfFnt">'+'<img src='+senPlayerInf["flag"]+' class="plFlgs">'+'('+senPlayerInf["rating"]+')</p>'
  document.getElementById("goteInfoBoxNm2").innerHTML = '<p class = "playerInfFnt">'+'<img src='+gotPlayerInf["flag"]+' class="plFlgs">'+'('+gotPlayerInf["rating"]+')</p>'
  document.getElementById("senteInfoBoxPc").innerHTML = '<img src='+senPlayerInf["picture"]+' class="disPcSz">'
  document.getElementById("goteInfoBoxPc").innerHTML = '<img src='+gotPlayerInf["picture"]+' class="disPcSz">'
}


//label, piece type, whogo
//For labelling the sides of the Board
//Changing RightNums for TopNums for number labels.
var TopNums = ["","9","8","7","6","5","4","3","2","1"];
var RightNums = ["","一","二","三","四","五","六","七","八","九",""];
var RightNumsE = ["","a","b","c","d","e","f","g","h","i",""];
//For changing piece type. Can be N for normal or E for English
var piecelang = "N"
function changePieceType(){
  piecelang = document.getElementById("PieceLangChoose").value
  drawboard(state, gstate, sstate)
};
//For changing who's go it is for testing
var whoGo = "S"

function changewhoView(){
  whoView = document.getElementById("whoViewChoose").value
  createBoardSet()
  drawboard(state, gstate, sstate)
};

function whichBrdViewChoose(){
  brdSetTyp = document.getElementById("whichBrdViewChoose").value
  setBrdViewSpecs()
  drawboard(state, gstate, sstate)
};

//Game info box button functions
//Button 1 (Go all the way back)
function gibB1Fn(){
  for (i in state){
    state[i] = stateStore[0][i]
  }
  for (i in gstate){
    gstate[i] = gStore[0][i]
  }
  for (i in sstate){
    sstate[i] = sStore[0][i]
  }
  turnView = 0
  updateHLMoves(moveStore[turnView][0],moveStore[turnView][1])
  drawboard(state, gstate, sstate)
}
//Button 2 (Go back 1 move)
function gibB2Fn(){
  if (turnView > 0){
    turnView -= 1
  }
  for (i in state){
    state[i] = stateStore[turnView][i]
  }
  for (i in gstate){
    gstate[i] = gStore[turnView][i]
  }
  for (i in sstate){
    sstate[i] = sStore[turnView][i]
  }
  updateHLMoves(moveStore[turnView][0],moveStore[turnView][1])
  drawboard(state, gstate, sstate)
}
//Button 3 (Go forward 1 move)
function gibB3Fn(){
  if (turnView < (turnCounter - 1)){
    turnView += 1
  }
  for (i in state){
    state[i] = stateStore[turnView][i]
  }
  for (i in gstate){
    gstate[i] = gStore[turnView][i]
  }
  for (i in sstate){
    sstate[i] = sStore[turnView][i]
  }
  updateHLMoves(moveStore[turnView][0],moveStore[turnView][1])
  drawboard(state, gstate, sstate)
}
//Button 4 (Go all the way forward)
function gibB4Fn(){
  turnView = turnCounter - 1
  for (i in state){
    state[i] = stateStore[turnView][i]
  }
  for (i in gstate){
    gstate[i] = gStore[turnView][i]
  }
  for (i in sstate){
    sstate[i] = sStore[turnView][i]
  }
  updateHLMoves(moveStore[turnView][0],moveStore[turnView][1])
  drawboard(state, gstate, sstate)
}

//Takes stored moves and writes them to moves sheet
function wrtToMoveSheet(moveStore){
  var mS = '<p>'
  for (i in moveStore){
    if (i > 0 && i < turnCounter + 1){
      mS += i+': '+moveStore[i][0]+', '+moveStore[i][1]
      if (check[whoGo] == 1 && i == turnCounter-1){
        mS += '+'
      }
      mS += '</br>'
    }
  }
  mS += '</p>'
  document.getElementById("movesSheet").innerHTML = mS
}

brdSetTyp = "N"
//Makes the appropriate css changes upon boardstyle change
function setBrdViewSpecs(){
  if (brdSetTyp == "N"){
    document.getElementById("boardset").className = "bigViewGrid";
    document.getElementById("promotionoverlay").className = "bigViewGrid";
    document.getElementById("settingsoverlay").className = "bigViewGrid";
    document.getElementById("settingsbox").className = "bigSettingBoxLoc";
    document.getElementById("Board").className = "bigBoardLoc";
    document.getElementById("Sentehandbox").className = "bigSenteHLoc";
    document.getElementById("playerinfobox").className = "bigPlayerinfbxLoc";//
    document.getElementById("gameinfobox").className = "bigGameInfBxLoc";//
  }
  if (brdSetTyp == "S"){
    document.getElementById("boardset").className = "smlViewGrid";
    document.getElementById("promotionoverlay").className = "smlViewGrid";
    document.getElementById("settingsoverlay").className = "smlViewGrid";
    document.getElementById("settingsbox").className = "smlSettingBoxLoc";
    document.getElementById("Board").className = "smlBoardLoc";
    document.getElementById("Sentehandbox").className = "smlSenteHLoc";
    document.getElementById("playerinfobox").className = "smlPlayerinfbxLoc";//
    document.getElementById("gameinfobox").className = "smlGameInfBxLoc";//
  }
}


function squareheight(id) {
  var box = document.querySelector(id);
  var swidth = box.offsetWidth;
  document.getElementById(id).style.height = swidth;
}

//Board drawing stuff
function createBoard(){
  if (whoView == "S"){
    document.getElementById("Board").innerHTML = createBoardSV()
  } else if (whoView == "G"){
    document.getElementById("Board").innerHTML = createBoardGV()
  }
}

//Board sizing stuff
function boardSetSize(){
  var vw = window.innerWidth;
  var s1 = 0.003*vw
  var s2 = 0.184*vw
  var s3 = 0.46*vw
  var s4 = 0.092*vw
  document.getElementById("boardset").style.gridTemplateColumns = "0.3vw 18.4vw 46vw 18.4vw auto";
  document.getElementById("boardset").style.gridTemplateRows = "0.3vw 18.4vw 9.2vw 18.4vw auto";
}


//Creates the divs and then fills them for the whole board set. Uses identities to get the needed specs and placements
function createBoardSet(){
  brdSetStr = '<div id="Gotehandbox" class="bigGoteHLoc"></div><div id="Board" class="bigBoardLoc"></div><div id="Sentehandbox" class="bigSenteHLoc"></div>'
  if (firstConstructCompleted == true){
    var p = '<div id="playerinfobox" class="bigPlayerinfbxLoc">'
    p += document.getElementById("playerinfobox").innerHTML
    p += '</div>'
    p += '<div id="gameinfobox" class="bigGameInfBxLoc">'
    p += document.getElementById("gameinfobox").innerHTML
    p += '</div>'
  }
  brdSetStr += p
  document.getElementById("boardset").innerHTML = brdSetStr
  createGH()
  createBoard()
  createSH()
  firstConstructCompleted = true
}


//Creates the main board and gives ids to each square.
//Eventually want to make this one function with side boards
function createBoardSV(){
  brdstr = ""

  brdstr += "<table id= 'BrdBk'>";

for(y = 0; y < 11; y++){
   if(y == 0 || y == 10){
      brdstr += "<tr class = 'Brdtopbottom'>";
   }
   else{
      brdstr += "<tr class = 'Brdspace'>";
   }
   for(x = 0; x < 11; x++){
     if(x == 0){
        brdstr += "<td class = 'Brdleftright'></td>";
     }
     else if (x == 10) {
        brdstr += "<td class = 'Brdleftright'><center>"+RightNums[y]+"</center></td>";
     }
     else if (y == 0) {
        brdstr += "<td class = 'Brdtopbottom'><center>"+TopNums[x]+"</center></td>";
     }
     else if (y == 10) {
        brdstr += "<td class = 'Brdtopbottom'></td>";
     }
     else{
        var z = 10 - x
        brdstr += "<td class = 'Brdspace allcell' id = B"+z+y+" onclick='clickAns(this.id)'></td>";
     }
   }
   brdstr += "</tr>";
}
brdstr += "</table>";
return brdstr
};

//creates the board from Gote's pov
function createBoardGV(){
  brdstr = ""

  brdstr += "<table id= 'BrdBk'>";
  
  for(y = 0; y < 11; y++){
     if(y == 0 || y == 10){
        brdstr += "<tr class = 'Brdtopbottom'>";
     }
     else{
        brdstr += "<tr class = 'Brdspace'>";
     }
     for(x = 0; x < 11; x++){
       if(x == 0){
          brdstr += "<td class = 'Brdleftright'><center>"+RightNums[10-y]+"</center></td>";
       }
       else if (x == 10) {
          brdstr += "<td class = 'Brdleftright'></td>";
       }
       else if (y == 0) {
          brdstr += "<td class = 'Brdtopbottom'></td>";
       }
       else if (y == 10) {
          brdstr += "<td class = 'Brdtopbottom'><center>"+TopNums[10-x]+"</center></td>";
       }
       else{
          var z = 10 - y
          brdstr += "<td class = 'Brdspace allcell' id = B"+x+z+" onclick='clickAns(this.id)'></td>";
       }
     }
     brdstr += "</tr>";
  }
  brdstr += "</table>";
  return brdstr
  };


function createGH(){
  if (brdSetTyp == "N"){
    if (whoView == "S"){
      document.getElementById("Gotehandbox").innerHTML = createGHSV()
    } else if (whoView == "G"){
      document.getElementById("Sentehandbox").innerHTML = createGHSV()
    }
  } else if (brdSetTyp == "S"){
    if (whoView == "S"){
      document.getElementById("Gotehandbox").innerHTML = createGHSV()
    } else if (whoView == "G"){
      document.getElementById("SentehandboxSm").innerHTML = createGHSV()
    }
  }
}
//creates Gote side board with ids
function createGHSV(){
  ghstr = ""
  ghstr += "<table id = 'GHB'>";
//Add all cell to class to get lines back
for(y = 0; y<7; y++){
  if(y==0||y==2||y==4||y==6){
    ghstr += "<tr class = 'STSH'>";
  }
  else{
    ghstr += "<tr class = 'STBH'>";
  }
  for(x = 0; x < 7; x++){
    if(x==0||x==2||x==4||x==6){
      ghstr += "<td class = 'STSW' id = G"+x+y+"></td>";
    }
    else{
      ghstr += "<td class = 'STBW' id = G"+x+y+" onclick='clickAns(this.id)'></td>";
    }
  }
  ghstr += "</tr>";
}
ghstr += "</table>";
return ghstr
};

function createSH(){
  if (brdSetTyp == "N"){
    if (whoView == "S"){
      document.getElementById("Sentehandbox").innerHTML = createSHSV()
    } else if (whoView == "G"){
      document.getElementById("Gotehandbox").innerHTML = createSHSV()
    }
  } else if (brdSetTyp == "S"){
    if (whoView == "S"){
      document.getElementById("SentehandboxSm").innerHTML = createSHSV()
    } else if (whoView == "G"){
      document.getElementById("Gotehandbox").innerHTML = createSHSV()
    }
  }
}

function createSHSV(){
  shstr = ""
  shstr += "<table id = 'SHB'>";
//Add all cell to class to get lines back
for(y = 0; y<7; y++){
  if(y==0||y==2||y==4||y==6){
    shstr += "<tr class = 'STSH'>";
  }
  else{
    shstr += "<tr class = 'STBH'>";
  }
  for(x = 0; x < 7; x++){
    if(x==0||x==2||x==4||x==6){
      shstr += "<td class = 'STSW' id = S"+x+y+"></td>";
    }
    else{
      shstr += "<td class = 'STBW' id = S"+x+y+" onclick='clickAns(this.id)'></td>";
    }
  }
  shstr += "</tr>";
}
shstr += "</table>";
return shstr
};

//ATTEMPT creates Sente side board with ids
function T1createSH(){
document.write("<table id = 'SHB'>");
//Add all cell to class to get lines back
for(y = 0; y<7; y++){
  if(y==0||y==2||y==4||y==6){
    document.write("<tr class = 'STSH'>");
  }
  else{
    document.write("<tr class = 'STBH'>");
  }
  for(x = 0; x < 7; x++){
    if(x==0||x==2||x==4||x==6){
      document.write("<td class = 'STSW' id = S"+x+y+"></td>");
    }
    else{
      document.write("<td class = 'STBW' id = S"+x+y+" onclick='clickAns(this.id)'></td>");
    }
  }
  document.write("</tr>");
}

document.write("</table>");
};


//old attempt at side table
function TcreateSH(){
document.write("<table id = 'GHB'>");
document.write("<tr>");
document.write("<td>");
document.write("</td>");
document.write("</tr>");
document.write("</table>");
};

//Used with onclick to tell what the code has named something
function prime(id){
  alert(id)
};

function AddImage(id){
  document.getElementById(id).innerHTML = "<img src='images/Pieces/SK.png' style='display:block;' width='100%' height='auto'>";
};

//functions for moving pieces around
var bhighlight = 0
var ghighlight = 0
var shighlight = 0
var highlighted = 00
var initS = 00
var finS = 00
var forPro = 00

//Changes whose go it is
function switchwhoGo(){
  if (whoGo == "S"){
    whoGo = "G"
    setwhoGoTab()
  } else if (whoGo == "G"){
    whoGo = "S"
    setwhoGoTab()
  }
};
function setwhoGoTab(){
  var p = "("+String(turnCounter)+","+String(turnView)+")"
  document.getElementById("whoGoTab").innerHTML = p
}

//These functions prime the piece ready for movement or cancel the priming
function primeB(id){
  if (state[id].charAt(0) == whoGo){
    //alert(id)
    bhighlight = 1
    initS = id
    var t = state[initS]
    document.getElementById(id).style.backgroundColor = "#ffe272"
    possMoves = mvIfInChk(state, whoGo, initS)
    possMovesHighlight()
  }
};
function OprimeB(id){
  if (state[id] != "E"){
    //alert(id)
    bhighlight = 1
    initS = id
    document.getElementById(id).style.backgroundColor = "#ffe272"
  }
};
function primeG(id){
  if (gstate[gntsc[id]] != 0){
    ghighlight = 1
    initS = id
    highlighted = id
    removeBHighlights()
    document.getElementById(id).style.backgroundColor = "#ffe272"
    //possDrops = possDropsA(gntsc[id], whoGo, state)
    possDrops = drpIfInChk(state, sstate, gstate ,whoGo, gntsc[id])
    possDropsHighlight()
  }
};
function primeS(id){
  if (sstate[sntsc[id]] != 0){
    shighlight = 1
    initS = id
    highlighted = id
    removeBHighlights()
    document.getElementById(id).style.backgroundColor = "#ffe272"
    //possDrops = possDropsA(sntsc[id], whoGo, state)
    possDrops = drpIfInChk(state, sstate, gstate ,whoGo, sntsc[id])
    possDropsHighlight()
  }
};
function primeCancel(){
  document.getElementById(initS).style.backgroundColor = ""
  bhighlight = 0
  ghighlight = 0
  shighlight = 0
  highlighted = 00
  initS = 00
  removeBHighlights()
};

// sorts out what happens after a succesful Move
function afterTurn(){
  switchwhoGo()
  check[whoGo] = checkcheck(state, whoGo)
  check[swg[whoGo]] = checkcheck(state, swg[whoGo])
  if (check[whoGo] == 1){
    var cm = chkForChkMt(state, sstate, gstate, whoGo)
  }
  if (cm == 1){
    alert("Check Mate")
  }
  storeState(state, gStore, sStore)
  turnCounter += 1
  turnView = turnCounter - 1
  wrtToMoveSheet(moveStore)
  updateHLMoves(moveStore[turnView][0],moveStore[turnView][1])
  if (confMoveYN == 1){
    confMoveOnOff()
  }
  //runAI()
}

//These functions check for a valid move path and then enact it
function btbMove(initS,id){
  var p1 = initS
  var p2 = id
  var pieceName = state[id]
  var pieceType = state[id].charAt(0)
  if (pieceType != whoGo){
    var t = state[initS]
    state[initS] = "E"
    state[id] = t
    primeCancel()
    if (pieceName.charAt(1) == "p"){
      pieceName = pieceName.replace('p','')
    }
    if (pieceName in gstate) {
      var nn = "S"+pieceName.charAt(1)+pieceName.charAt(2)
      sstate[nn] = sstate[nn] + 1
    } else if (pieceName in sstate) {
      var nn = "G"+pieceName.charAt(1)+pieceName.charAt(2)
      gstate[nn] = gstate[nn] + 1
    }
  } else {
    primeCancel()
  }
  drawboard(state, gstate, sstate)
  if ((promozone[whoGo].includes(p1) || promozone[whoGo].includes(p2)) && (t.charAt(1) != "p")){
    forPro = p2
    if (state[p2] in piecelim && piecelim[state[p2]].includes(p2)){
      promoyes()
    } else{
      promovon()
    }
  }
  storeMove(p1,p2)
  afterTurn()
};
function gtbMove(initS,id){
  if (possDrops.includes(id)){
    state[id] = gntsc[initS]
    gstate[gntsc[initS]] = gstate[gntsc[initS]] - 1
    ghighlight = 0
    document.getElementById(initS).style.backgroundColor = ""
    storeMove(initS,id)
    initS = 00
    highlighted = 00
    ghighlight = 0
    drawboard(state, gstate, sstate)
    primeCancel()
    afterTurn()
  }
};
function OgtbMove(initS,id){
  if (state[id] == "E"){
    state[id] = gntsc[initS]
    gstate[gntsc[initS]] = gstate[gntsc[initS]] - 1
    ghighlight = 0
    document.getElementById(initS).style.backgroundColor = ""
    initS = 00
    highlighted = 00
    ghighlight = 0
    drawboard(state, gstate, sstate)
    primeCancel()
    switchwhoGo()
  }
};
function stbMove(initS,id){
  if (possDrops.includes(id)){
    state[id] = sntsc[initS]
    sstate[sntsc[initS]] = sstate[sntsc[initS]] - 1
    shighlight = 0
    document.getElementById(initS).style.backgroundColor = ""
    storeMove(initS,id)
    initS = 00
    highlighted = 00
    shighlight = 0
    drawboard(state, gstate, sstate)
    primeCancel()
    afterTurn()
  }
};
function OstbMove(initS,id){
  if (state[id] == "E"){
    state[id] = sntsc[initS]
    sstate[sntsc[initS]] = sstate[sntsc[initS]] - 1
    shighlight = 0
    document.getElementById(initS).style.backgroundColor = ""
    initS = 00
    highlighted = 00
    shighlight = 0
    drawboard(state, gstate, sstate)
    primeCancel()
    switchwhoGo()
  }
};
//These functions resolve depending on which board was clicked state[id].charAt(0) != whoGo
function resolveB(id){
  if (bhighlight == 1 && possMoves.includes(id)){
    btbMove(initS,id)
    removeBHighlights()
  } else if ((bhighlight == 1 && state[id].charAt(0) == whoGo)){
    primeCancel()
    removeBHighlights()
    primeB(id)
  }else if (ghighlight == 1 && state[id] == "E"){
    gtbMove(initS,id)
  } else if (ghighlight == 1 && state[id] != "E"){
    primeCancel()
    primeB(id)
  } else if (shighlight == 1 && state[id] == "E"){
    stbMove(initS,id)
  } else if (shighlight == 1 && state[id] != "E"){
    primeCancel()
    primeB(id)
  } else if (bhighlight == 0 && state[id].charAt(0) == whoGo){
    primeB(id)
  }
};


function resolveG(id){
  if (id.charAt(0) == whoGo){
    if (bhighlight == 1 || ghighlight == 1 || shighlight == 1){
      primeCancel()
      primeG(id)
    } else {
      primeG(id)
    }
  }
};

function resolveS(id){
  if (id.charAt(0) == whoGo){
    if (bhighlight == 1 || ghighlight == 1 || shighlight == 1){
      primeCancel()
      primeS(id)
    } else {
      primeS(id)
    }
  }
};

//Overall function for board clicks that brings primes and moves together
function clickAns(id){
  if (confMoveBox == 1){
    confMoveDeny()
  }
  if ((turnCounter - 1) == turnView){
    if (id == initS){
      primeCancel()
      removeBHighlights()
    } else if (id in state){
      resolveB(id)
    } else if (id in gntsc){
      resolveG(id)
    } else if (id in sntsc){
      resolveS(id)
    }
  }
};




//states stuff
var blankstate = {
  B11:"E",B12:"E",B13:"E",B14:"E",B15:"E",B16:"E",B17:"E",B18:"E",B19:"E",
  B21:"E",B22:"E",B23:"E",B24:"E",B25:"E",B26:"E",B27:"E",B28:"E",B29:"E",
  B31:"E",B32:"E",B33:"E",B34:"E",B35:"E",B36:"E",B37:"E",B38:"E",B39:"E",
  B41:"E",B42:"E",B43:"E",B44:"E",B45:"E",B46:"E",B47:"E",B48:"E",B49:"E",
  B51:"E",B52:"E",B53:"E",B54:"E",B55:"E",B56:"E",B57:"E",B58:"E",B59:"E",
  B61:"E",B62:"E",B63:"E",B64:"E",B65:"E",B66:"E",B67:"E",B68:"E",B69:"E",
  B71:"E",B72:"E",B73:"E",B74:"E",B75:"E",B76:"E",B77:"E",B78:"E",B79:"E",
  B81:"E",B82:"E",B83:"E",B84:"E",B85:"E",B86:"E",B87:"E",B88:"E",B89:"E",
  B91:"E",B92:"E",B93:"E",B94:"E",B95:"E",B96:"E",B97:"E",B98:"E",B99:"E"
};


var initstate = {
  B11:"GL",B12:"E",B13:"GP",B14:"E",B15:"E",B16:"E",B17:"SP",B18:"E",B19:"SL",
  B21:"GN",B22:"GB",B23:"GP",B24:"E",B25:"E",B26:"E",B27:"SP",B28:"SR",B29:"SN",
  B31:"GS",B32:"E",B33:"GP",B34:"E",B35:"E",B36:"E",B37:"SP",B38:"E",B39:"SS",
  B41:"GG",B42:"E",B43:"GP",B44:"E",B45:"E",B46:"E",B47:"SP",B48:"E",B49:"SG",
  B51:"GJ",B52:"E",B53:"GP",B54:"E",B55:"E",B56:"E",B57:"SP",B58:"E",B59:"SK",
  B61:"GG",B62:"E",B63:"GP",B64:"E",B65:"E",B66:"E",B67:"SP",B68:"E",B69:"SG",
  B71:"GS",B72:"E",B73:"GP",B74:"E",B75:"E",B76:"E",B77:"SP",B78:"E",B79:"SS",
  B81:"GN",B82:"GR",B83:"GP",B84:"E",B85:"E",B86:"E",B87:"SP",B88:"SB",B89:"SN",
  B91:"GL",B92:"E",B93:"GP",B94:"E",B95:"E",B96:"E",B97:"SP",B98:"E",B99:"SL"
};

var state = {
  B11:"GL",B12:"E",B13:"GP",B14:"E",B15:"E",B16:"E",B17:"SP",B18:"E",B19:"SL",
  B21:"GN",B22:"GB",B23:"GP",B24:"E",B25:"E",B26:"E",B27:"SP",B28:"SR",B29:"SN",
  B31:"GS",B32:"E",B33:"GP",B34:"E",B35:"E",B36:"E",B37:"SP",B38:"E",B39:"SS",
  B41:"GG",B42:"E",B43:"GP",B44:"E",B45:"E",B46:"E",B47:"SP",B48:"E",B49:"SG",
  B51:"GJ",B52:"E",B53:"GP",B54:"E",B55:"E",B56:"E",B57:"SP",B58:"E",B59:"SK",
  B61:"GG",B62:"E",B63:"GP",B64:"E",B65:"E",B66:"E",B67:"SP",B68:"E",B69:"SG",
  B71:"GS",B72:"E",B73:"GP",B74:"E",B75:"E",B76:"E",B77:"SP",B78:"E",B79:"SS",
  B81:"GN",B82:"GR",B83:"GP",B84:"E",B85:"E",B86:"E",B87:"SP",B88:"SB",B89:"SN",
  B91:"GL",B92:"E",B93:"GP",B94:"E",B95:"E",B96:"E",B97:"SP",B98:"E",B99:"SL"
};

//Gote state
var gstate = {
  GP:1, GL:1, GN:1, GS:1, GG:1, GB:1, GR:1
};
//gote state to piece name
var gstp = {
  GP:"GP", GL:"GL", GN:"GN", GS:"GS", GG:"GG", GB:"GB", GR:"GR"
};
//gote state to location id
var gstnc = {
  GP:"G11", GL:"G31", GN:"G51", GS:"G13", GG:"G33", GB:"G53", GR:"G15"
};
//gote location id to states
var gntsc =  {
  G11:"GP", G31:"GL", G51:"GN", G13:"GS", G33:"GG", G53:"GB", G15:"GR"
};
//gote state to location of counter id
var gstcnc = {
  GP:"G21", GL:"G41", GN:"G61", GS:"G23", GG:"G43", GB:"G63", GR:"G25"
};

//Sente state
var sstate = {
  SP:1, SL:1, SN:1, SS:1, SG:1, SB:0, SR:0
};
//gote state to piece name
var sstp = {
  SP:"SP", SL:"SL", SN:"SN", SS:"SS", SG:"SG", SB:"SB", SR:"SR"
};
//gote state to location id
var sstnc = {
  SP:"S11", SL:"S31", SN:"S51", SS:"S13", SG:"S33", SB:"S53", SR:"S15"
};
//gote location id to states
var sntsc =  {
  S11:"SP", S31:"SL", S51:"SN", S13:"SS", S33:"SG", S53:"SB", S15:"SR"
};
//gote state to location of counter id
var sstcnc = {
  SP:"S21", SL:"S41", SN:"S61", SS:"S23", SG:"S43", SB:"S63", SR:"S25"
};

//Small sideboard notation
var smaSidNot = {
  P:"歩", L:"香", N:"桂", S:"銀", G:"金", B:"角", R:"飛",
}

//Storage of states
var stateStore = {}
var gStore = {}
var sStore = {}

var moveStore = {0:["",""]}

var turnCounter = 0
var turnView = 0

//function for storing state
function storeState(state, gStore, sStore){
  stateStore[turnCounter] = {}
  gStore[turnCounter] = {}
  sStore[turnCounter] = {}
  for (i in state){
    stateStore[turnCounter][i] = state[i]
  }
  for (i in gstate){
    gStore[turnCounter][i] = gstate[i]
  }
  for (i in sstate){
    sStore[turnCounter][i] = sstate[i]
  }
}

function storeMove(init, fin){
  var ms = ["",""]
  ms[0] = init
  ms[1] = fin
  moveStore[turnCounter] = ms
}


//Creates a blank state and redraws
function blankGame(){
  for (i in state){
    state[i] = blankstate[i]
  }
  for (i in gstate){
    gstate[i] = 0
  }
  for (i in sstate){
    sstate[i] = 0
  }
  drawboard(state, gstate, sstate)
}

//Creates an initState and redraws
function setupGame(){
  for (i in state){
    state[i] = initstate[i]
  }
  for (i in gstate){
    gstate[i] = 0
  }
  for (i in sstate){
    sstate[i] = 0
  }
  turnCounter = 0
  stateStore = {}
  storeState(state, gStore, sStore)
  turnCounter = 1
  turnView = 0
  drawboard(state, gstate, sstate)
}

//uses whoGo to get opponent
var swg = {
  G:"S", S:"G"
}

//promotion zones for each sides
var promozone = {
  S:["B11","B12","B13","B21","B22","B23","B31","B32","B33","B41","B42","B43","B51","B52","B53","B61","B62","B63","B71","B72","B73","B81","B82","B83","B91","B92","B93"],
  G:["B17","B18","B19","B27","B28","B29","B37","B38","B39","B47","B48","B49","B57","B58","B59","B67","B68","B69","B77","B78","B79","B87","B88","B89","B97","B98","B99"]
}

//Holds which squares a piece can't be dropped in and must promote in
var piecelim = {
  SP: ["B91","B81","B71","B61","B51","B41","B31","B21","B11"],
  SL: ["B91","B81","B71","B61","B51","B41","B31","B21","B11"],
  SN: ["B91","B81","B71","B61","B51","B41","B31","B21","B11","B92","B82","B72","B62","B52","B42","B32","B22","B12"],
  GP: ["B99","B89","B79","B69","B59","B49","B39","B29","B19"],
  GL: ["B99","B89","B79","B69","B59","B49","B39","B29","B19"],
  GN: ["B99","B89","B79","B69","B59","B49","B39","B29","B19","B98","B88","B78","B68","B58","B48","B38","B28","B18"]
}

var initstateT = {
  51:"GP",
  59:"SK",
  61:"E"
};

var SenHanstate = {1:0}

//Switches a piece to it's opponent's equivalent
function switchPiece(piece){
  var e = piece.slice(1)
  var s = piece.charAt(0)
  if (s == "S"){
    var s = "G"+ e
    return s
  } else if (s == "G"){
    var s = "S"+ e
    return s
  } else if (piece == "E"){
    return "E"
  }
}


//Tracks who's side the board should be viewed from
var whoView = "S"

//draw state to table stuff
function drawboard(state, gstate, sstate){
  if (whoView == "G"){
    for (i in state){
      document.getElementById(i).innerHTML = "<img src='images/"+piecelang+"Pieces/"+switchPiece(state[i])+".png' style='display:block;' width='99%' height='auto'>"
    }
    for (i in gstate){
      if (gstate[i] != 0){
        document.getElementById(gstnc[i]).innerHTML = "<img src='images/"+piecelang+"Pieces/"+switchPiece(gstp[i])+".png' style='display:block;' width='99%' height='auto'>"
        document.getElementById(gstcnc[i]).innerHTML = gstate[i]
      } else {
        document.getElementById(gstnc[i]).innerHTML = "<img src='images/"+piecelang+"Pieces/E.png' style='display:block;' width='99%' height='auto'>"
        document.getElementById(gstcnc[i]).innerHTML = ""
      }
    }
    for (i in sstate){
      if (sstate[i] != 0){
        document.getElementById(sstnc[i]).innerHTML = "<img src='images/"+piecelang+"Pieces/"+switchPiece(sstp[i])+".png' style='display:block;' width='99%' height='auto'>"
        document.getElementById(sstcnc[i]).innerHTML = sstate[i]
      } else {
        document.getElementById(sstnc[i]).innerHTML = "<img src='images/"+piecelang+"Pieces/E.png' style='display:block;' width='99%' height='auto'>"
        document.getElementById(sstcnc[i]).innerHTML = ""
      }
    }
  } else {
    for (i in state){
      document.getElementById(i).innerHTML = "<img src='images/"+piecelang+"Pieces/"+state[i]+".png' style='display:block;' width='99%' height='auto'>"
    }
    for (i in gstate){
      if (gstate[i] != 0){
        document.getElementById(gstnc[i]).innerHTML = "<img src='images/"+piecelang+"Pieces/"+gstp[i]+".png' style='display:block;' width='99%' height='auto'>"
        document.getElementById(gstcnc[i]).innerHTML = gstate[i]
      } else {
        document.getElementById(gstnc[i]).innerHTML = "<img src='images/"+piecelang+"Pieces/E.png' style='display:block;' width='99%' height='auto'>"
        document.getElementById(gstcnc[i]).innerHTML = ""
      }
    }
    for (i in sstate){
      if (sstate[i] != 0){
        document.getElementById(sstnc[i]).innerHTML = "<img src='images/"+piecelang+"Pieces/"+sstp[i]+".png' style='display:block;' width='99%' height='auto'>"
        document.getElementById(sstcnc[i]).innerHTML = sstate[i]
      } else {
        document.getElementById(sstnc[i]).innerHTML = "<img src='images/"+piecelang+"Pieces/E.png' style='display:block;' width='99%' height='auto'>"
        document.getElementById(sstcnc[i]).innerHTML = ""
      }
    }
  }
};



//possible moves and highlight stuff
var possMoves = []
var possMovesHighlights = 0
var possDrops = []
var possDropsHighlights = 0
var shwMvHL = 1
var crntHLMoves = ["",""]

function removeBHighlights(){
  for (i in state){
    document.getElementById(i).style.backgroundColor = ""
  }
  possMoves = []
  possDrops = []
  updateHLMoves(crntHLMoves[0],crntHLMoves[1])
};

function updateHLMoves(bf,af){
  if (crntHLMoves[0] in state){
    document.getElementById(crntHLMoves[0]).style.backgroundColor = ""
  }
  if (crntHLMoves[1] in state){
    document.getElementById(crntHLMoves[1]).style.backgroundColor = ""
  }
  if (shwMvHL == 1 && turnView != 0){
    if (bf in state){
      document.getElementById(bf).style.backgroundColor = "rgb(80, 0, 0, 0.2)"
      crntHLMoves[0] = bf
    }
    if (af in state){
      document.getElementById(af).style.backgroundColor = "rgb(80, 0, 0, 0.2)"
      crntHLMoves[1] = af
    }
  }
};

function possMovesHighlight(){
  if (possMovesHighlights == 1){
    for (i of possMoves){
      document.getElementById(i).style.backgroundColor = "#ffe272"
    }
  }
};
function possDropsHighlight(){
  if (possMovesHighlights == 1){
    for (i of possDrops){
      document.getElementById(i).style.backgroundColor = "#ffe272"
    }
  }
};

function changepossMovesHighlights(){
  possMovesHighlights = document.getElementById("possMovesHighlights").value
}

function possSPMoves(id, side, state){
  var possMoves = []
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var ny = y - 1
  var nm = "B"+String(x)+String(ny)
  if (nm in state && state[nm].charAt(0) != side){
    possMoves.push(nm)
  }
  return possMoves
};

function possGPMoves(id, side, state){
  var possMoves = []
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var ny = y + 1
  var nm = "B"+String(x)+String(ny)
  if (nm in state && state[nm].charAt(0) != side){
    possMoves.push(nm)
  }
  return possMoves
};

function possKMoves(id, side, state){
  var possMoves = []
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = 0
  var ny = 0
  var nm = ""
  var cc = [[0,1],[1,1],[1,0],[0,-1],[-1,-1],[-1,0],[-1,1],[1,-1]]
  for (i of cc){
    nm = "B"+String(x+i[0])+String(y+i[1])
    if (nm in state && state[nm].charAt(0) != side){
      possMoves.push(nm)
    }
  }
  return possMoves
};

function possSNMoves(id, side, state){
  var possMoves = []
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = 0
  var ny = 0
  var nm = ""
  var cc = [[-1,-2],[1,-2]]
  for (i of cc){
    nm = "B"+String(x+i[0])+String(y+i[1])
    if (nm in state && state[nm].charAt(0) != side){
      possMoves.push(nm)
    }
  }
  return possMoves
};

function possGNMoves(id, side, state){
  var possMoves = []
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = 0
  var ny = 0
  var nm = ""
  var cc = [[-1,2],[1,2]]
  for (i of cc){
    nm = "B"+String(x+i[0])+String(y+i[1])
    if (nm in state && state[nm].charAt(0) != side){
      possMoves.push(nm)
    }
  }
  return possMoves
};

function possSGMoves(id, side, state){
  var possMoves = []
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = 0
  var ny = 0
  var nm = ""
  var cc = [[-1,-1],[0,-1],[1,-1],[0,1],[-1,0],[1,0]]
  for (i of cc){
    nm = "B"+String(x+i[0])+String(y+i[1])
    if (nm in state && state[nm].charAt(0) != side){
      possMoves.push(nm)
    }
  }
  return possMoves
};

function possGGMoves(id, side, state){
  var possMoves = []
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = 0
  var ny = 0
  var nm = ""
  var cc = [[-1,1],[0,1],[1,1],[0,-1],[-1,0],[1,0]]
  for (i of cc){
    nm = "B"+String(x+i[0])+String(y+i[1])
    if (nm in state && state[nm].charAt(0) != side){
      possMoves.push(nm)
    }
  }
  return possMoves
};

function possSSMoves(id, side, state){
  var possMoves = []
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = 0
  var ny = 0
  var nm = ""
  var cc = [[-1,-1],[0,-1],[1,-1],[-1,1],[1,1]]
  for (i of cc){
    nm = "B"+String(x+i[0])+String(y+i[1])
    if (nm in state && state[nm].charAt(0) != side){
      possMoves.push(nm)
    }
  }
  return possMoves
};

function possGSMoves(id, side, state){
  var possMoves = []
  var x = parseInt(id.charAt(1))
  var y = parseInt(id.charAt(2))
  var nx = 0
  var ny = 0
  var nm = ""
  var cc = [[-1,1],[0,1],[1,1],[-1,-1],[1,-1]]
  for (i of cc){
    nm = "B"+String(x+i[0])+String(y+i[1])
    if (nm in state && state[nm].charAt(0) != side){
      possMoves.push(nm)
    }
  }
  return possMoves
};

function possSLMoves(id, side, state){
  var possMoves = []
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
        if (state[nm].charAt(0) == side){
          go = 0
        } else if (state[nm].charAt(0) == swg[side]){
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
  return possMoves
};

function possGLMoves(id, side, state){
  var possMoves = []
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
        if (state[nm].charAt(0) == side){
          go = 0
        } else if (state[nm].charAt(0) == swg[side]){
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
  return possMoves
};

function possRMoves(id, side, state){
  var possMoves = []
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
        if (state[nm].charAt(0) == side){
          go = 0
        } else if (state[nm].charAt(0) == swg[side]){
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
  return possMoves
};

function possBMoves(id, side, state){
  var possMoves = []
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
        if (state[nm].charAt(0) == side){
          go = 0
        } else if (state[nm].charAt(0) == swg[side]){
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
  return possMoves
};

function posspRMoves(id, side, state){
  var possMoves = []
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
        if (state[nm].charAt(0) == side){
          go = 0
        } else if (state[nm].charAt(0) == swg[side]){
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
    if (nm in state && state[nm].charAt(0) != side){
      possMoves.push(nm)
    }
  }
  return possMoves
};

function posspBMoves(id, side, state){
  var possMoves = []
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
        if (state[nm].charAt(0) == side){
          go = 0
        } else if (state[nm].charAt(0) == swg[side]){
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
    if (nm in state && state[nm].charAt(0) != side){
      possMoves.push(nm)
    }
  }
  return possMoves
};

//Given id, updates possMoves for all moves piece at id can make
function piecemoves(id, side, state){
  var possMoves = []
  if (state[id] == "GP"){
    possMoves = possGPMoves(id, side, state)
  } else if (state[id] == "SP"){
    possMoves = possSPMoves(id, side, state)
  } else if (state[id] == "GN"){
    possMoves = possGNMoves(id, side, state)
  } else if (state[id] == "SN"){
    possMoves = possSNMoves(id, side, state)
  } else if (state[id] == "GS"){
    possMoves = possGSMoves(id, side, state)
  } else if (state[id] == "SS"){
    possMoves = possSSMoves(id, side, state)
  } else if (state[id] == "GG"){
    possMoves = possGGMoves(id, side, state)
  } else if (state[id] == "SG"){
    possMoves = possSGMoves(id, side, state)
  } else if (state[id] == "GK" || state[id] == "SK" || state[id] == "GJ" || state[id] == "SJ"){
    possMoves = possKMoves(id, side, state)
  } else if (state[id] == "GR" || state[id] == "SR"){
    possMoves = possRMoves(id, side, state)
  } else if (state[id] == "GB" || state[id] == "SB"){
    possMoves = possBMoves(id, side, state)
  } else if (state[id] == "GL"){
    possMoves = possGLMoves(id, side, state)
  } else if (state[id] == "SL"){
    possMoves = possSLMoves(id, side, state)
  } else if (state[id] == "GpB" || state[id] == "SpB"){
    possMoves = posspBMoves(id, side, state)
  } else if (state[id] == "GpR" || state[id] == "SpR"){
    possMoves = posspRMoves(id, side, state)
  } else if (state[id] == "GpP" || state[id] == "GpL" || state[id] == "GpN" || state[id] == "GpS"){
    possMoves = possGGMoves(id, side, state)
  } else if (state[id] == "SpP" || state[id] == "SpL" || state[id] == "SpN" || state[id] == "SpS"){
    possMoves = possSGMoves(id, side, state)
  }
  return possMoves
}


var allPossMoves = []
//Given "S" or "G" finds all possible squares that can be attacked by that side.
//Returns an array of all possible landing squares
//Used to check for check
function allPossMovesGet(state, side){
  var tAllMoves = []
  for (i in state){
    possMoves = []
    if (state[i].charAt(0) == side){
      possMoves = piecemoves(i, side, state)
    }
    for (i of possMoves){
      tAllMoves.push(i)
    }
    possMoves = []
  }
  return tAllMoves
};

//Looks at piece and sends to correct functions
function possDropsA(piece, side, state){
  var p = piece.charAt(1)
  var poss = []
  if (p == "P"){
    poss = possDropsP(side, state)
  } else {
    poss = possDropsNP(piece, side, state)
  }
  return poss
}
//Given non-pawn piece, finds what drops are allowed
function possDropsNP(piece, side, state){
  var possDrops = []
  var lim = []
  if (piece in piecelim){
    lim = piecelim[piece]
  }
  for (i in state){
    if (lim.includes(i) == false && state[i] == "E"){
      possDrops.push(i)
    }
  }
  return possDrops
};

var cols_for_pns = {
  1 : ["B11","B12","B13","B14","B15","B16","B17","B18","B19"],
  2 : ["B21","B22","B23","B24","B25","B26","B27","B28","B29"],
  3 : ["B31","B32","B33","B34","B35","B36","B37","B38","B39"],
  4 : ["B41","B42","B43","B44","B45","B46","B47","B48","B49"],
  5 : ["B51","B52","B53","B54","B55","B56","B57","B58","B59"],
  6 : ["B61","B62","B63","B64","B65","B66","B67","B68","B69"],
  7 : ["B71","B72","B73","B74","B75","B76","B77","B78","B79"],
  8 : ["B81","B82","B83","B84","B85","B86","B87","B88","B89"],
  9 : ["B91","B92","B93","B94","B95","B96","B97","B98","B99"]
}


//Given pawn, finds allowed drops
function possDropsP(side, state){
  var testDrops = []
  var possDrops = []
  var p = side + "P"
  for (i in cols_for_pns){
    var ct = 0
    var col = cols_for_pns[i]
    for (j of col){
      if (state[j] == p){
        ct = 1
      }
    }
    if (ct == 0){
      for (k of col){
        testDrops.push(k)
      }
    }
  }
  var ekf = findKingFront(sideSwap[side], state)
  var lim = piecelim[p]
  for (l of testDrops){
    if (lim.includes(l) == false && state[l] == "E" && i != ekf){
      possDrops.push(l)
    }
  }
  if (testDrops.includes(ekf)){
    var tstate = makeTState(state)
    tstate[ekf] = p
    var cmt = escCheckByBrdMv(tstate, sideSwap[side])
    var cm = 1
    for (m in cmt){
      if (cmt[m].length != 0){
        cm = 0
      }
    }
    if (cm == 0){
      possDrops.push(ekf)
    }
  }
  return possDrops
};

function OpossDropsP(side, state){
  var possDrops = []
  var test = []
  var p = side + "P"
  var ekf = findKingFront(sideSwap[side], state)
  var lim = piecelim[p]
  for (i in state){
    if (lim.includes(i) == false && state[i] == "E" && i != ekf){
      possDrops.push(i)
    }
  }
  var tstate = makeTState(state)
  tstate[ekf] = p
  var cmt = escCheckByBrdMv(tstate, sideSwap[side])
  var cm = 1
  for (j in cmt){
    if (cmt[j].length != 0){
      cm = 0
    }
  }
  if (cm == 0){
    possDrops.push(ekf)
    //test.push(ekf)
  }
  return possDrops
  //return test
};


//Given side, finds king and return square in front of king
function findKingFront(side, state){
  var sideadd = {S:-1,G:1}
  var kingFront = 00
  var whereking = 00
  var k = side + "K"
  var j = side + "J"
  for (i in state){
    if (state[i] == k || state[i] == j){
      whereking = i
    }
  }
  var x = parseInt(whereking.charAt(1))
  var y = parseInt(whereking.charAt(2))
  y = y + sideadd[side]
  kingfront = "B" + String(x) + String(y)
  return kingfront
}

var sideSwap = {G:"S",S:"G"}

//check and checkmate stuff
var check = {S:0,G:0}


//checks if a side is in check by seeing if king is in allPossMoves for other sides
function checkcheck(stat, side){
  var whereking = 00
  var r = 0
  for (i in stat){
    if (stat[i] == side+"K" || stat[i] == side+"J"){
      whereking = i
    }
  }
  possMoves = []
  var tOppMoves = allPossMovesGet(stat, sideSwap[side])
  if (tOppMoves.includes(whereking)){
    r = 1
  } else {
    r = 0
  }
  return r
};

function makeTState(state){
  var tstate = {}
  var tsk = []
  var tsv = []
  for (i in state){
    tsk.push(i)
    tsv.push(state[i])
  }
  for (i = 0; i < tsk.length; i++){
    tstate[tsk[i]]=tsv[i]
  }
  return tstate
};



function tesc(state, side){
  var totesc = []
  var escMoves = {}
  var test = []
  for (i in state){
    if (state[i].charAt(0) == side){
      totesc.push(i)
    }
  };
  for (j of totesc){
    var pm = piecemoves(j,side, state)
    var tstate = makeTState(state)
    escMoves[j] = pm;
    test.push(pm)
  }
  return escMoves
};

var ftpo = {}

function mvIfInChk(state, side, init){
  em = []
  var pm = piecemoves(init, side, state)
  for (k of pm){
    tstate = makeTState(state)
    var t = tstate[init]
    tstate[init] = "E"
    tstate[k] = t
    var tc = checkcheck(tstate, side)
    if (tc == 0){
      em.push(k)
    }
  }
  return em
}

function escCheckByBrdMv(stat, side){
  var totesc = []
  var escMoves = {}
  var test = []
  for (i in stat){
    if (stat[i].charAt(0) == side){
      totesc.push(i)
    }
  };
  for (j of totesc){
    var cm = 1
    var pm = piecemoves(j, side, state)
    var tstate = makeTState(stat)
    var em = []
    for (k of pm){
      tstate = makeTState(stat)
      var t = tstate[j]
      tstate[j] = "E"
      tstate[k] = t
      var tc = checkcheck(tstate, side)
      if (tc == 0){
        em.push(k)
      }
    }
    escMoves[j] = em
  }
  return escMoves
};

function drpIfInChk(state, sstate, gstate ,side, init){
  var pd = possDropsA(init, side, state)
  var ed = []
  for (j of pd){
    var tstate = makeTState(state)
    tstate[j] = String(init)
    var tc = checkcheck(tstate, side)
    if (tc == 0){
      ed.push(j)
    }
  }
  return ed
}

function escCheckByDrop(state, sstate, gstate ,side){
  var totesc = []
  var pd = []
  var escDrops = {}
  if (side == "S"){
    for (k in sstate){
      if (sstate[k] != 0){
        totesc.push(k)
      }
    }
  };
  if (side == "G"){
    for (k in gstate){
      if (gstate[k] != 0){
        totesc.push(k)
      }
    }
  };
  for (l of totesc){
    var pd = possDropsA(l, side, state)
    var ed = []
    for (j of pd){
      var tstate = makeTState(state)
      tstate[j] = String(l)
      var tc = checkcheck(tstate, side)
      if (tc == 0){
        ed.push(j)
      }
    }
    escDrops[l] = ed
  }
  return escDrops
};

function timeEsc(){
  var a = performance.now();
  allPossMovesGet(state, "S")
  var b = performance.now();
  alert('It took ' + (b - a) + ' ms.');
}

//checks for checkmate
function chkForChkMt(state, sstate, gstate, side){
  var ebm = escCheckByBrdMv(state, side)
  var ebd = escCheckByDrop(state, sstate, gstate ,side)
  var cm = 1
  for (i in ebm){
    if (ebm[i].length != 0){
      cm = 0
    }
  }
  for (i in ebd){
    if (ebd[i].length != 0){
      cm = 0
    }
  }
  return cm
};


//Random A.I. stuff
function randAIG(state, gstate){
  var chsFrm = []
  var ebm = escCheckByBrdMv(state, "G")
  var ebd = escCheckByDrop(state, sstate, gstate ,"G")
  if (chkForChkMt(state, sstate, gstate, "S") != 1){
    for (i in ebm){
      if (ebm[i].length != 0){
        chsFrm.push(i)
      }
    }
    for (i in ebd){
      if (ebd[i].length != 0){
        chsFrm.push(i)
      }
    }
    var rndMveI = chsFrm[Math.floor(Math.random()*chsFrm.length)]
    if (rndMveI.charAt(0) == "B"){
      var fmc = ebm[rndMveI]
      var rndMveF = fmc[Math.floor(Math.random()*fmc.length)]
      var p1 = rndMveI
      var p2 = rndMveF
      var pieceName = state[p2]
      var pieceType = state[p2].charAt(0)
      if (pieceType != whoGo){
        var t = state[p1]
        state[p1] = "E"
        state[p2] = t
        if (pieceName.charAt(1) == "p"){
          pieceName = pieceName.replace('p','')
        }
        if (pieceName in gstate) {
          var nn = "S"+pieceName.charAt(1)+pieceName.charAt(2)
          sstate[nn] = sstate[nn] + 1
        } else if (pieceName in sstate) {
          var nn = "G"+pieceName.charAt(1)+pieceName.charAt(2)
          gstate[nn] = gstate[nn] + 1
        }
      }
    }
    if (rndMveI.charAt(0) == "G"){
      var fmc = ebd[rndMveI]
      var rndMveF = fmc[Math.floor(Math.random()*fmc.length)]
      state[rndMveF] = gntsc[rndMveI]
      gstate[gntsc[rndMveI]] = gstate[gntsc[rndMveI]] - 1
    }
  }
  drawboard(state, gstate, sstate)
};


var gai = 0
var sai = 0
function runAI(){
  if (gai == 1 && whoGo == "G"){
    randAIG(state, gstate)
    afterTurn()
  }
}

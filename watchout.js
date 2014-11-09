var gameOptions={
  height: 450,
  width: 700,
  nEnemies: 30,
}

var scoreBoard = {
  currentScore: 0,
  highScore: 0,
  numCollisions: 0
}


var gameBoard = d3.select('.container').append('svg:svg')
  .attr("class", "board")
  .attr('height', gameOptions.height)
  .attr('width', gameOptions.width);

var svg = d3.select('svg'); //our svg game board element

var numPlayers = ["player"]; //cursor

createEnemies = function() {
  var enemyData = [];
  var enemyColors = ['#3FBF7F', '#3FBFBF','#3F7FBF']
  for(var i=0; i<gameOptions.nEnemies; i++){
    enemyData.push({
      id: i,
      x: Math.random() * gameOptions.width,
      y: Math.random() * gameOptions.height,
      r: Math.random() * (5-2) + 2,
      c: enemyColors[Math.floor(Math.random()*enemyColors.length)]
    });
  }

  return enemyData;
};
var enemies = svg.selectAll(".enemy") ///inject variable;
  .data(createEnemies())
  .enter()
  .append("circle")
  .attr("cx", function(d){return d.x;})
  .attr("cy", function(d){return d.y;})
  .attr("id", function(d){return d.id;})
  .attr("r", function(d){return d.r;})
  .attr("fill", function(d){return d.c;})
  .attr("class", "enemy");

var randW = Math.random() * gameOptions.width;
var randH = Math.random() * gameOptions.height;

var moveEnemies = function(){
  svg.selectAll(".enemy")
  .data(createEnemies(), function(d){ return d.id;})
  .transition()
  .ease('elastic')
  .duration(1000)
  .attr("cx", function(d){return d.x;})
  .attr("cy", function(d){return d.y;})
  .attr("r", function(d){return d.r;})
  .attr("fill", function(d){return d.c;})
  .attr("class", "enemy");
};

var drag = d3.behavior.drag()
  .on('drag', function(){
    player.attr('cx', d3.event.x).attr('cy', d3.event.y);
  })

var player = svg.selectAll("player") ///inject variable;
  .data(numPlayers)
  .enter()
  .append("circle")
  .attr("cx", "50%")
  .attr("cy", "50%")
  .attr("r", "5")
  .attr("fill", "silver")
  .call(drag);

var prevEnemy;

var detectCollisions = function () {
  var playerX = player[0][0].cx.animVal.value;
  var playerY = player[0][0].cy.animVal.value;
  var playerR = player[0][0].r.animVal.value;
  // Check for collisions on all enemies
  for (var i = 0; i < enemies[0].length; i++) {
    var enemy = enemies[0][i];
    var x = enemy.cx.animVal.value;
    var y = enemy.cy.animVal.value;
    var r = enemy.r.animVal.value;
    // Calculcate the distance between x,y and playerX, playerY
    var distance = Math.pow((playerX - x), 2) + Math.pow((playerY - y), 2)
    var rSquared = Math.pow((playerR + r), 2)
    if(distance < rSquared) {
      if (enemy.id !== prevEnemy) {
        prevEnemy = enemy.id;
        scoreBoard.currentScore = 0;
        scoreBoard.numCollisions++;
        player.attr("fill", "#B0F852");
        player.attr("r", "8")
        setTimeout(function(){return player.attr("fill", "white").attr("r", "5")}, 200);
      }
    }
  }
};

var setScore = function(){
  scoreBoard.currentScore++;

  if(scoreBoard.highScore < scoreBoard.currentScore){
    scoreBoard.highScore = scoreBoard.currentScore;
  }

  d3.select('.current').selectAll('span')
    .text(scoreBoard.currentScore);
  d3.select('.high').selectAll('span')
    .text(scoreBoard.highScore);
  d3.select('.collisions').selectAll('span')
    .text(scoreBoard.numCollisions);
};

setInterval(moveEnemies, 1000);
setInterval(setScore, 100);
d3.timer(detectCollisions);

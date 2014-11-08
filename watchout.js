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
  .attr("fill", "black")
  .attr("class", "enemy");

var randW = Math.random() * gameOptions.width;
var randH = Math.random() * gameOptions.height;

var moveEnemies = function(){
  svg.selectAll(".enemy")
  .data(createEnemies(), function(d){ return d.id;})
  .transition().duration(1000)
  .attr("cx", function(d){return d.x;})
  .attr("cy", function(d){return d.y;})
  .attr("r", function(d){return d.r;})
  .attr("fill", function(d){return d.c;})
  .attr("class", "enemy");
};

var drag = d3.behavior.drag()
  .on('dragstart', function() { player.style('fill', '#267226'); })
  .on('drag', function(){
    player.attr('cx', d3.event.x).attr('cy', d3.event.y);
  })
  .on('dragend', function(){
    player.style('fill', '#264C72');
  });

var player = svg.selectAll("player") ///inject variable;
  .data(numPlayers)
  .enter()
  .append("circle")
  .attr("cx", "50%")
  .attr("cy", "50%")
  .attr("r", "10")
  .attr("fill", "#267226")
  .call(drag);

//for player, if the absolute value any enemy's x or y value
//minus player's x or y value is less than player's radius plus enemy's
//radius, there is a collisions
var allEnemies = svg.selectAll('.enemy');
  //cx value +- 5 from player



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
      scoreBoard.currentScore = 0;
      scoreBoard.numCollisions++;
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
setInterval(detectCollisions, 50);

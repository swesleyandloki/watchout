var gameOptions={
  height: 450,
  width: 700,
  nEnemies: 30,
}

var scoreBoard = {
  currentScore: 0,
  highScore: 0,

}

var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
}

var gameBoard = d3.select('.container').append('svg:svg')
  .attr("class", "board")
  .attr('height', gameOptions.height)
  .attr('width', gameOptions.width);

var svg = d3.select('svg'); //our svg game board element

var numPlayers = ["player"]; //cursor

createEnemies = function() {
  var enemyData = [];
  for(var i=0; i<gameOptions.nEnemies; i++){
    enemyData.push({
      id: i,
      x: Math.random() * gameOptions.width,
      y: Math.random() * gameOptions.height
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
  .attr("r", "10")
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
  .attr("r", "10")
  .attr("fill", "black")
  .attr("class", "enemy");
};

var drag = d3.behavior.drag()
  .on('dragstart', function() { player.style('fill', 'red'); })
  .on('drag', function(){
    player.attr('cx', d3.event.x).attr('cy', d3.event.y);
  })
  .on('dragend', function(){
    player.style('fill', 'blue');
  });

var player = svg.selectAll("player") ///inject variable;
  .data(numPlayers)
  .enter()
  .append("circle")
  .attr("cx", "50%")
  .attr("cy", "50%")
  .attr("r", "15")
  .attr("fill", "blue")
  .call(drag);

//for player, if the absolute value any enemy's x or y value
//minus player's x or y value is less than player's radius plus enemy's
//radius, there is a collisions

var setScore = function(){
  var collision = false
  var numCollisions = 0;

  if (collision === true) {
    scoreBoard.currentScore = 0;
    numCollisions++;
  }

  if(scoreBoard.highScore<scoreBoard.currentScore){
    scoreBoard.highScore = scoreBoard.currentScore;
  }
  scoreBoard.currentScore++;
  d3.select('.current').selectAll('span')
    .text(scoreBoard.currentScore);
  d3.select('.high').selectAll('span')
    .text(scoreBoard.highScore);
  d3.select('.collisions').selectAll('span')
    .text(numCollisions);
}

setInterval(moveEnemies, 1000);
setInterval(setScore, 50);

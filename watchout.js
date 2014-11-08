

var gameOptions={
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
}


var scoreBoard = {
  currentScore: 0,
  highScore: 0
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


  // console.log(createEnemies());

var player = svg.selectAll("player") ///inject variable;
  .data(numPlayers)
  .enter()
  .append("circle")
  .attr("cx", "50%")
  .attr("cy", "50%")
  .attr("r", "15")
  .attr("fill", "blue");

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

setInterval(moveEnemies, 1000);


var render = function(enemy_data){
  //put them in new spots
  //check collision
  //on collision
  //tween collision
}
// setInterval(function(){console.log('interval');return moveEnemies;}, 1000);

//
//
//player();
//enemies();

// //checkCollision
// //onCollision set current score
// //if current score ever exceeds high score then current score is high score
// //
// //add elements to the SVG file


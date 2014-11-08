

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
        x: Math.random() * 100,
        y: Math.random() * 100

    });
  }
  return enemyData;
};


  console.log(createEnemies());

var player = svg.selectAll("player") ///inject variable;
  .data(numPlayers)
  .enter()
  .append("circle")
  .attr("cx", "25")
  .attr("cy", "25")
  .attr("r", "10")
  .attr("fill", "blue");

var enemies = svg.selectAll("enemies") ///inject variable;
  .data(createEnemies())
  .enter()
  .append("circle")
  .attr("cx", '10')
  .attr("cy", '10')
  .attr("r", "5")
  .attr("fill", "black");
//
player();
enemies();

// //checkCollision
// //onCollision set current score
// //if current score ever exceeds high score then current score is high score
// //
// //add elements to the SVG file



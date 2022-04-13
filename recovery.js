//Game Logic


const CELL_SIZE = 64;

const FOV = toRadians(90);

//render size (must be the same as html canvas)

var screen_x = window.innerWidth;
var screen_y = window.innerHeight;

console.log(screen_x);
console.log(screen_y);

var canvas_size_x = screen_x;
var canvas_size_y = screen_y;

console.log(canvas_size_x);
console.log(canvas_size_y);

function set_res(){
  document.getElementById("x").setAttribute('value',canvas_size_x);
  document.getElementById("y").setAttribute('value',canvas_size_y);
}

function SetRes() {
  canvas_size_x = document.getElementById("x").value;
  canvas_size_y = document.getElementById("y").value;
  screen_x = document.getElementById("x").value;
  screen_y = document.getElementById("y").value;}

  
var delta = 2;

//maps

var map = [
[1, 1, 1, 1,  1, 1, 1, 1,  1, 1, 1],
[1, 0, 0, 0,  0, 0, 0, 0,  0, 0, 1],
[1, 0, 0, 0,  0, 0, 0, 0,  0, 0, 1],
[1, "#af8665", 0, 2,  0, 0, 0, 3,  0, 0, 1],
[1, 0, 0, 0,  0, 0, 0, 0,  0, 0, 1],
[1, "#6f8a9c", 0, 4,  0, 0, 0, 5,  0, 0, 1],
[1, 0, 0, 0,  0, 0, 0, 0,  0, 0, 1],
[1, "#123456", 0, 6,  0, 0, 0, 7,  0, 0, 1],
[1, 0, 0, 0,  0, 0, 0, 0,  0, 0, 1],
[1, "#aabbff", 0, 8,  0, 0, 0, 9,  0, 0, 1],
[1, 0, 0, 0,  0, 0, 0, 0,  0, 0, 1],
[1, "#a1b2c3", 0, 10, 0, 0, 0, 11, 0, 0, 1],
[1, 0, 0, 0,  0, 0, 0, 0,  0, 0, 1],
[1, 0, 0, 0,  0, 0, 0, 0,  0, 0, 1],
[1, 1, 1, 1,  1, 1, 1, 1,  1, 1, 1],
];

const lvl = [
  [11, 11, 11, 11,  11, 11, 11, 11,  11, 11, 11],
  [11, 0, 0, 0,  0, 0, 0, 0,  0, 0, 11],
  [11, 0, 3, 3,  3, 3, 3, 0,  0, 0, 11],
  [11, 0, 3, 0,  0, 0, 3, 0,  0, 0, 11],
  [11, 0, 3, 0,  0, 0, 3, 0,  0, 0, 11],
  [11, 0, 3, 0,  0, 0, 3, 0,  0, 0, 11],
  [11, 0, 3, 3,  0, 3, 3, 0,  0, 0, 11],
  [11, 0, 0, 0,  0, 0, 0, 0,  0, 0, 11],
  [11, 0, 0, 0,  0, 0, 0, 0,  0, 0, 11],
  [11, 0, 0, 0,  0, 0, 0, 0,  0, 0, 11],
  [11, 0, 0, 0,  0, 0, 0, 0,  0, 0, 11],
  [11, 0, 7, 7,  0, 0, 0, 9,  9, 9, 11],
  [11, 0, 7, 7,  0, 0, 0, 0,  0, 0, 9],
  [11, 0, 0, 0,  0, 0, 0, 9,  0, 0, 9],
  [11, 11, 11, 11,  11, 11, 11, 9,  9, 9, 11],
  ];

//random map variable

var inf = new Array(2048);

for (var i = 0; i < inf.length; i++) {
  inf[i] = new Array(2048);
}

// blocks for random blocks func

var blocks = [2,3,4,5,6,7,8,9,10,11]

function render_inf_map(){

  //random tiles

  for (var i = 0; i < 2048; i++){
    for (var j = 0; j < 2048; j++){
      if( j == 0 || i == 0){
        inf[i][j] = 1;
      }else if( j >= 2047 || i >= 2047){
        inf[i][j] = 1;
      }else{
        if (Math.random() <= 0.05){
        inf[i][j] = Math.floor(Math.random() * blocks.length + 2);
        }else{
          inf[i][j]=0;
        }
      }
    }
    inf[Math.floor((player.x / CELL_SIZE))][Math.floor((player.y / CELL_SIZE))]=0;
  }

  //spawn save zone

  inf[1][1] = 0;
  inf[2][2] = 0;
  inf[2][1] = 0;
  inf[1][2] = 0;
}

//player

const player = {
    x: CELL_SIZE * 1.5,
    y: CELL_SIZE * 1.5,
    angle: toRadians(90),
    speed: 0,
    right_speed: 0,
}

function movePlayer(){
    player.x += Math.cos(player.angle) * player.speed / delta;
    player.y += Math.sin(player.angle) * player.speed / delta;
    player.x += Math.cos(player.angle + toRadians(90)) * player.right_speed / delta;
    player.y += Math.sin(player.angle + toRadians(90)) * player.right_speed / delta;
}

function toRadians(deg) {
    return (deg * Math.PI) / 180;
}

function toDegres(rad) {
    return (rad / Math.PI) * 180;
}

function PrintPlayrInfo() {
  if (toDegres(player.angle) > 360){
    player.angle = 0;
  }
  if (toDegres(player.angle) < 0){
    player.angle = toRadians(360);
  }
    //document.getElementById("player_x").innerHTML = "Player X : " + player.x;
    //document.getElementById("player_y").innerHTML = "Player Y : " + player.y;
    //document.getElementById("angle").innerHTML = "Camera angle : " + Math.floor(toDegres(player.angle));
    //document.getElementById("speed").innerHTML = "Player front speed : " + player.speed;
    //document.getElementById("r_speed").innerHTML = "Player right speed : " + player.right_speed;
    //document.getElementById("g_speed").innerHTML = "Speed vector lenght : " + (Math.sqrt(Math.pow(Math.abs(player.right_speed),2) + Math.pow(Math.abs(player.speed),2)));
}

function out_of_bounds(x, y) {
    return x < 0 || x >= map[0].length || y < 0 || y >= map.length;
}


function distance_to(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

//colisions (copied from render ray casting but instead of rendering we stop player)

function callVCollision(angle) {
  const right = Math.abs(Math.floor((angle - Math.PI / 2) / Math.PI) % 2);

  const firstX = right
    ? Math.floor(player.x / CELL_SIZE) * CELL_SIZE + CELL_SIZE
    : Math.floor(player.x / CELL_SIZE) * CELL_SIZE;

  const firstY = player.y + (firstX - player.x) * Math.tan(angle);

  const xA = right ? CELL_SIZE : -CELL_SIZE;
  const yA = xA * Math.tan(angle);

  let wall;
  let nextX = firstX;
  let nextY = firstY;
  while (!wall) {
    const cellX = right
      ? Math.floor(nextX / CELL_SIZE)
      : Math.floor(nextX / CELL_SIZE) - 1;
    const cellY = Math.floor(nextY / CELL_SIZE);

    if (out_of_bounds(cellX, cellY)) {
      break;
    }
    wall = map[cellY][cellX];
    if (!wall) {
      nextX += xA;
      nextY += yA;
    } else{

    }
  }
  return distance_to(player.x, player.y, nextX, nextY);
}

function callHCollision(angle) {
  const up = Math.abs(Math.floor(angle / Math.PI) % 2);
  const firstY = up
    ? Math.floor(player.y / CELL_SIZE) * CELL_SIZE
    : Math.floor(player.y / CELL_SIZE) * CELL_SIZE + CELL_SIZE;
  const firstX = player.x + (firstY - player.y) / Math.tan(angle);

  const yA = up ? -CELL_SIZE : CELL_SIZE;
  const xA = yA / Math.tan(angle);

  let wall;
  let nextX = firstX;
  let nextY = firstY;
  while (!wall) {
    const cellX = Math.floor(nextX / CELL_SIZE);
    const cellY = up
      ? Math.floor(nextY / CELL_SIZE) - 1
      : Math.floor(nextY / CELL_SIZE);

    if (out_of_bounds(cellX, cellY)) {
      break;
    }

    wall = map[cellY][cellX];
    if (!wall) {
      nextX += xA;
      nextY += yA;
    } else{

    }
  }
  return distance_to(player.x, player.y, nextX, nextY);
}

var last_valid_cords_x;
var last_valid_cords_y;

function cast_col_ray(angle) {
  const vCollision = callVCollision(angle);
  const hCollision = callHCollision(angle);
  var i=0;

  if(vCollision < 10 || hCollision < 10 ){
    player.x = last_valid_cords_x;
    player.y = last_valid_cords_y;
    player.x += Math.cos(player.angle) * player.speed * -1  / delta;
    player.y += Math.sin(player.angle) * player.speed * -1  / delta;
    player.x += Math.cos(player.angle + toRadians(90)) * player.right_speed * -1  / delta;
    player.y += Math.sin(player.angle + toRadians(90)) * player.right_speed * -1  / delta;
    i = 1;
  }else{
    last_valid_cords_x = player.x;
    last_valid_cords_y = player.y;
  }

  return i;
}

function calculate_colision_rays() {
  const initialAngle = player.angle - toRadians(360) / 2;
  const numberOfRays = 128;
  const angleStep = toRadians(360) / numberOfRays;
  return Array.from({ length: numberOfRays }, (_, i) => {
    const angle = initialAngle + i * angleStep;
    const ray = cast_col_ray(angle);
    return ray;
  });
}

// Render stuff

function ShadeColor(color) {
  var output = "#ffffff";
  var output = color;
  output = output.replace(/b/g, "d");
  output = output.replace(/a/g, "c");
  output = output.replace(/9/g, "b");
  output = output.replace(/8/g, "a");
  output = output.replace(/7/g, "8");
  output = output.replace(/6/g, "7");
  output = output.replace(/5/g, "6");
  output = output.replace(/4/g, "5");
  output = output.replace(/3/g, "4");
  output = output.replace(/2/g, "3");
  output = output.replace(/1/g, "2");
  output = output.replace(/0/g, "2");
  output = output.replace(/d/g, "c");
  output = output.replace(/e/g, "d");
  output = output.replace(/f/g, "e");
  return output;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

// predefined colors for render (you can use your own when creating map)

const COLORS = {
    red: "#ff0000",
    red_v: "#ff3333",
    green: "#00ff00",
    green_v: "#33ff33",
    blue: "#0000ff",
    blue_v: "#3333ff",
    yellow: "#eeee00",
    yellow_v: "#ffff44",
    orange: "#ff8800",
    orange_v: "#ffaa33",
    cyan: "#00eeee",
    cyan_v: "#44ffff",
    magenta: "#ff00ff",
    magenta_v: "#ff33ff",
    white: "#ffffff",
    white_v: "#dddddd",
    grey: "#888888",
    grey_v: "#aaaaaa",
    dark: "#333333",
    very_dark: "#222222",
    void: "#111111",
    black: "#000000",
    black_v: "#060606",
  };

  function CreateCanvas() {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", canvas_size_x);
    canvas.setAttribute("height", canvas_size_y);
    canvas.setAttribute("id", "canvas");
    canvas.setAttribute("style", "text-align: center; margin: 0px; padding: 0px; margin-top: -2%;");
    document.body.appendChild(canvas);
    document.getElementById('x').parentNode.removeChild(document.getElementById('x'));
    document.getElementById('y').parentNode.removeChild(document.getElementById('y'));
    document.getElementById('a').parentNode.removeChild(document.getElementById('a'));
    document.getElementById('b').parentNode.removeChild(document.getElementById('b'));
    document.getElementById('c').parentNode.removeChild(document.getElementById('c'));
    document.getElementById('d').parentNode.removeChild(document.getElementById('d'));
  }

  function getVCollision(angle) {
    var wall_color = COLORS.red;
    const right = Math.abs(Math.floor((angle - Math.PI / 2) / Math.PI) % 2);
  
    const firstX = right
      ? Math.floor(player.x / CELL_SIZE) * CELL_SIZE + CELL_SIZE
      : Math.floor(player.x / CELL_SIZE) * CELL_SIZE;
  
    const firstY = player.y + (firstX - player.x) * Math.tan(angle);
  
    const xA = right ? CELL_SIZE : -CELL_SIZE;
    const yA = xA * Math.tan(angle);
  
    let wall;
    let nextX = firstX;
    let nextY = firstY;
    while (!wall) {
      const cellX = right
        ? Math.floor(nextX / CELL_SIZE)
        : Math.floor(nextX / CELL_SIZE) - 1;
      const cellY = Math.floor(nextY / CELL_SIZE);
  
      if (out_of_bounds(cellX, cellY)) {
        break;
      }
      wall = map[cellY][cellX];
      if (!wall) {
        nextX += xA;
        nextY += yA;
      } else if(wall == 1) {
        wall_color = getRandomColor();
      } else if(wall == 2) {
        wall_color = COLORS.red;
      } else if(wall == 3) {
        wall_color = COLORS.green;
      } else if(wall == 4) {
        wall_color = COLORS.blue;
      } else if(wall == 5) {
        wall_color = COLORS.yellow;
      } else if(wall == 6) {
        wall_color = COLORS.orange;
      } else if(wall == 7) {
        wall_color = COLORS.cyan;
      } else if(wall == 8) {
        wall_color = COLORS.magenta;
      } else if(wall == 9) {
        wall_color = COLORS.white;
      } else if(wall == 10) {
        wall_color = COLORS.grey;
      } else if(wall == 11) {
        wall_color = COLORS.black;
      } else{
        wall_color = wall;
      }
    }
    return {
      angle,
      distance: distance_to(player.x, player.y, nextX, nextY),
      vertical: true,
      color: wall_color,
    };
  }
  
  function getHCollision(angle) {
    var wall_color = COLORS.red;
    const up = Math.abs(Math.floor(angle / Math.PI) % 2);
    const firstY = up
      ? Math.floor(player.y / CELL_SIZE) * CELL_SIZE
      : Math.floor(player.y / CELL_SIZE) * CELL_SIZE + CELL_SIZE;
    const firstX = player.x + (firstY - player.y) / Math.tan(angle);
  
    const yA = up ? -CELL_SIZE : CELL_SIZE;
    const xA = yA / Math.tan(angle);
  
    let wall;
    let nextX = firstX;
    let nextY = firstY;
    while (!wall) {
      const cellX = Math.floor(nextX / CELL_SIZE);
      const cellY = up
        ? Math.floor(nextY / CELL_SIZE) - 1
        : Math.floor(nextY / CELL_SIZE);
  
      if (out_of_bounds(cellX, cellY)) {
        break;
      }
  
      wall = map[cellY][cellX];
      if (!wall) {
        nextX += xA;
        nextY += yA;
      } else if(wall == 1) {
        wall_color = getRandomColor();
      } else if(wall == 2) {
        wall_color = ShadeColor(COLORS.red);
      } else if(wall == 3) {
        wall_color = ShadeColor(COLORS.green);
      } else if(wall == 4) {
        wall_color = ShadeColor(COLORS.blue);
      } else if(wall == 5) {
        wall_color = ShadeColor(COLORS.yellow);
      } else if(wall == 6) {
        wall_color = ShadeColor(COLORS.orange);
      } else if(wall == 7) {
        wall_color = ShadeColor(COLORS.cyan);
      } else if(wall == 8) {
        wall_color = ShadeColor(COLORS.magenta);
      } else if(wall == 9) {
        wall_color = ShadeColor(COLORS.white);
      } else if(wall == 10) {
        wall_color = ShadeColor(COLORS.grey);
      } else if(wall == 11) {
        wall_color = ShadeColor(COLORS.black);
      } else{
        wall_color = ShadeColor(wall);
      }
    }
    return {
      angle,
      distance: distance_to(player.x, player.y, nextX, nextY),
      vertical: false,
      color: wall_color,
    };
  }

  function castRay(angle) {
    const vCollision = getVCollision(angle);
    const hCollision = getHCollision(angle);

  
    return hCollision.distance >= vCollision.distance ? vCollision : hCollision;
  }

  function getRays() {
    const initialAngle = player.angle - FOV / 2;
    const numberOfRays = canvas_size_x;
    const angleStep = FOV / numberOfRays;
    return Array.from({ length: numberOfRays }, (_, i) => {
      const angle = initialAngle + i * angleStep;
      const ray = castRay(angle);
      return ray;
    });
  }

//render to screen function

var lastLoop = new Date();

function draw() {

  var thisLoop = new Date();
  var fps = 1000 / (thisLoop - lastLoop);
  lastLoop = thisLoop;
  delta = fps / 60;

  document.getElementById("fps").innerHTML = fps;

    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const rays = getRays();

    rays.forEach((ray, i) => {
      const distance = ray.distance;
      const wallHeight = ((CELL_SIZE * ( 3 * canvas_size_x / 1280)) / distance) * 256;
      context.fillStyle = ray.vertical ? ray.color : ray.color;
      context.fillRect(i, canvas_size_y / 2 - wallHeight / 2, 1, wallHeight);
      context.fillStyle = COLORS.void;
      context.fillRect(
        i,
        canvas_size_y / 2 + wallHeight / 2,
        1,
        canvas_size_y / 2 - wallHeight / 2
      );

      context.fillStyle = COLORS.void;
      context.fillRect(i, 0, 1, canvas_size_y / 2 - wallHeight / 2);

      var circle = new Path2D();
      circle.arc( (canvas_size_x/2) , (canvas_size_y/2), 3, 0, 2 * Math.PI);
      
      context.fillStyle = 'white';
      //context.fill(circle); //corsair to use with fps games
    });
}

function Tick() {  
    draw();  
    PrintPlayrInfo();
    movePlayer();
    calculate_colision_rays();
}

function refresher(level) {
    CreateCanvas();

      //map selector

    if(!level){

    }else if(level == 1){
      map = lvl;
    }else if(level == 2){
      player.x = (Math.random() * CELL_SIZE * 2047)
      player.y = (Math.random() * CELL_SIZE * 2047)
      render_inf_map()
      map = inf;
    }
      document.getElementById('b1').parentNode.removeChild(document.getElementById('b1'));
      document.getElementById('b2').parentNode.removeChild(document.getElementById('b2'));
      document.getElementById('b3').parentNode.removeChild(document.getElementById('b3'));

      var DrawFrame = setInterval(Tick, 1);
}

// inputs

document.addEventListener("keydown", (e) => {
    if(e.key == "w"){
        player.speed = 2 ;
    }
    if(e.key == "s"){
        player.speed = -2 ;
    }
    if(e.key == "d"){
        player.right_speed = 2 ;
    }
    if(e.key == "a"){
        player.right_speed = -2;
    }
})

document.addEventListener("keyup", (e) => {
    if(e.key == "w" || e.key == "s"){
        player.speed = 0;
    }
    if(e.key == "a" || e.key == "d"){
        player.right_speed = 0;
    }
})

document.addEventListener("mousemove", (e) => {
    player.angle += toRadians(e.movementX / delta );
})


// Todo 

// texture render

// sprites

// better colisions

// better camera controll

// simple game to show capabilities of engine

// conf file

// user map loader

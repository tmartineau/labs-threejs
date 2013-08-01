// Set the scene size
var WIDTH = 640,
	HEIGHT = 360;

// Set some camera attributes
var VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 10000;

var fieldWidth = 400, fieldHeight = 200;

// Create a WebGL renderer, camera and a scene
var renderer = new THREE.WebGLRenderer();

// Start the renderer
renderer.setSize(WIDTH, HEIGHT);

// Attach the render-supplied DOM element (the gameCanvas)
var c = document.getElementById("gameCanvas");
c.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(
	VIEW_ANGLE,
	ASPECT,
	NEAR,
	FAR
);

var scene = new THREE.Scene();

// add the camera to the scene
scene.add(camera);

// set a default position for the camera
// not doing this somehow messes up shadow rendering
camera.position.z = 320;


// set up the sphere vars
// lower 'segment' and 'ring' values will increase performance
var radius = 5,
	segments = 10,
	rings = 10;

// create the sphere's material
var sphereMaterial = new THREE.MeshLambertMaterial(
	{
		color: 0xD43001
	}
);

// Create a ball with sphere geometry
var ball = new THREE.Mesh(
	new THREE.SphereGeometry(
		radius,
		segments,
		rings
	),
	sphereMaterial
);

// add the sphere to the scene
scene.add(ball);


// // create a point light
var pointLight = new THREE.PointLight(0xF8D898);

// set its position
pointLight.position.x = -1000;
pointLight.position.y = 0;
pointLight.position.z = 1000;
pointLight.intensity = 2.9;
pointLight.distance = 10000;

// add to the scene
scene.add(pointLight);


// create the plane's material
var planeMaterial = new THREE.MeshLambertMaterial(
	{
		color: 0x4BD121
	}
);

// create the playing surface plane
var plane = new THREE.Mesh(
	new THREE.PlaneGeometry(
		fieldWidth * 0.95,	// 95% of table width, since we want to show where the ball goes out-of-bounds
		fieldHeight,
		10,
		10
	),
	planeMaterial
);

scene.add(plane);


// set up the paddle vars
paddleWidth = 10;
paddleHeight = 30;
paddleDepth = 10;
paddleQuality = 1;

// create the paddle1's material
var paddle1Material =
	new THREE.MeshLambertMaterial(
		{
			color: 0x1B32C0
		});
// create the paddle2's material
var paddle2Material =
	new THREE.MeshLambertMaterial(
		{
			color: 0xFF4045
		});

// set up paddle 1
paddle1 = new THREE.Mesh(
	new THREE.CubeGeometry(
		paddleWidth,
		paddleHeight,
		paddleDepth,
		paddleQuality,
		paddleQuality,
		paddleQuality),
	paddle1Material);

// add the paddle to the scene
scene.add(paddle1);

// Set up the second paddle
paddle2 = new THREE.Mesh(
	new THREE.CubeGeometry(
		paddleWidth,
		paddleHeight,
		paddleDepth,
		paddleQuality,
		paddleQuality,
		paddleQuality),
	paddle2Material);

// Add the second paddle to the scene
scene.add(paddle2);

// set paddles on each side of the table
paddle1.position.x = -fieldWidth/2 + paddleWidth;
paddle2.position.x = fieldWidth/2 - paddleWidth;

// lift paddles over playing surface
paddle1.position.z = paddleDepth;
paddle2.position.z = paddleDepth;

var ballSpeed = 2;
var ballDirY = -1;
var ballDirX = -1;

function setup() {
	draw();
}

function draw() {
	// Draw THREE.JS scene
	renderer.render(scene, camera);

	// Loop the draw() function
	requestAnimationFrame(draw);

	// Process game logic
	// limit ball's y-speed to 2x the x-speed
// this is so the ball doesn't speed from left to right super fast
// keeps game playable for humans
	if (ballDirY > ballSpeed * 2) {
		ballDirY = ballSpeed * 2;
	}
	else if (ballDirY < -ballSpeed * 2) {
		ballDirY = -ballSpeed * 2;
	}

	// if ball goes off the top side (side of table)
	if (ball.position.y <= -fieldHeight/2) {
		ballDirY = -ballDirY;
	}

// if ball goes off the bottom side (side of table)
	if (ball.position.y >= fieldHeight/2) {
		ballDirY = -ballDirY;
	}

	// update ball position over time
	ball.position.x += ballDirX * ballSpeed;
	ball.position.y += ballDirY * ballSpeed;

	// move left
	if (Key.isDown(Key.A))
	{
		// if paddle is not touching the side of table
		// we move
		if (paddle1.position.y < fieldHeight * 0.45)
		{
			paddle1DirY = paddleSpeed * 0.5;
		}
		// else we don't move and stretch the paddle
		// to indicate we can't move
		else
		{
			paddle1DirY = 0;
			paddle1.scale.z += (10 - paddle1.scale.z) * 0.2;
		}
	}
}
(function ($) {

	// Set the scene size
	var WIDTH = 400,
		HEIGHT = 300

	// Set some camera attributes
	var	VIEW_ANGLE = 45,
		ASPECT = WIDTH / HEIGHT,
		NEAR = 0.1,
		FAR = 10000;

	// Get the DOM element to attach to
	var $container = $('#container');

	// Create a WebGL renderer, camera and a scene
	var renderer = new THREE.WebGLRenderer(),
		camera = new THREE.PerspectiveCamera(
			VIEW_ANGLE,
			ASPECT,
			NEAR,
			FAR
		),
		scene = new THREE.Scene();

	// Add the camera to the scene
	scene.add(camera);

	// The camera starts at 0,0,0 so pull it back
	camera.position.z = 300;

	// Start the renderer
	renderer.setSize(WIDTH, HEIGHT);

	// Attach the render-supplied DOM element
	$container.append(renderer.domElement);
})(jQuery);
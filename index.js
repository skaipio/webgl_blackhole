function setCameraZeroToEdge(camera, fov, renderWidth, renderHeight) {
  var y = renderWidth / 2;
  var angle = fov / 360 * Math.PI; // multiplying by 2 is countered by dividing by 2
  var z = y / Math.tan(angle);
  camera.position.z = z;
  camera.position.x = y;
  camera.position.y = renderHeight / 2;
}

function App() {
  const particleParamElem = $('#particle-param');
  const renderWidth = 720, renderHeight = 576;
  const fov = 75;
  const backgroundColor = new THREE.Color(0x141225);
  this.scene = new THREE.Scene();
  this.scene.background = backgroundColor;
  this.camera = new THREE.PerspectiveCamera( fov, renderWidth / renderHeight, 0.1, 1000 );
  this.renderer = new THREE.WebGLRenderer();

  var scene = this.scene,
      camera = this.camera,
      renderer = this.renderer;

  renderer.setSize( renderWidth, renderHeight );
  document.getElementById('stage').appendChild( renderer.domElement );

  const visualiser = new Visualiser(renderWidth, renderHeight);
  var particleSystem = visualiser.createParticles();
  this.scene.add(particleSystem);

  var geometry = new THREE.CircleGeometry( 10, 32 );
  var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
  var circle = new THREE.Mesh( geometry, material );
  circle.position.x = renderWidth / 2;
  circle.position.y = renderHeight / 2;
  scene.add( circle );

  setCameraZeroToEdge(camera, fov, renderWidth, renderHeight);
  console.log(this.camera.position);

  var self = this;

  const limitValue = (elem, min, val) => {
    if (val < min) {
      val = min;
      elem.val(val);
    }
    return val;
  }

  particleParamElem.change(() => {
    var newParticleCount = parseInt(particleParamElem.val());
    newParticleCount = limitValue(particleParamElem, 1, newParticleCount);
    visualiser.newParticleCount = newParticleCount;
  });

  function render() {
  	requestAnimationFrame( render );
  	renderer.render( scene, camera );
    visualiser.update();
  }

  render();
}

function startApp() {
  // Start clock app
  const app = new App();
}

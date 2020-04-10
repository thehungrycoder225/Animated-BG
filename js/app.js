// Variables

let container;
let camer;
let renderer;
let scene;
let tree;

function init() {
  container = document.querySelector(".scene");

  // Create Scene
  scene = new THREE.Scene();
  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 500;

  // Camera Setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 2.5, 10);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(10, 10, 10);
  scene.add(light);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //   Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("../3D/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
    tree = gltf.scene.children[0];
  });
}

function animate() {
  requestAnimationFrame(animate);
  tree.rotation.z += 0.005;
  renderer.render(scene, camera);
}
init();
animate();
function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(contaier.clientWidth, container.clientHeight);
}

window.addEventListener("onWindowResize");

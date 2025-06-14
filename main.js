import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFF5DD);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const light = new THREE.AmbientLight( 0x404040, 5 ); // soft white light
scene.add( light );

const mainLight = new THREE.DirectionalLight(0xCCCCCC, 5);
mainLight.position.set(10, 10, 10);
scene.add(mainLight);

const renderer = new THREE.WebGLRenderer({antialiasing:true});
renderer.setPixelRatio( window.devicePixelRatio * 1.5 );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

window.addEventListener( 'resize', onWindowResize, false );

const controls = new OrbitControls( camera, renderer.domElement );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function getRandomColor() {
  const colors = [0xFF698F, 0x4B0082, 0x2032B0, 0x27867E, 0xA0BCAC, 0xEBD800, 0xCA1F08];

  const random = Math.floor(Math.random() * colors.length);
  return  colors[random];
}

const group = new THREE.Group();
const loader = new GLTFLoader();

// This work is based on "LEGO Legs" (https://sketchfab.com/3d-models/lego-legs-f8859bddc7664c4b952b8377e8075ad6) by DoksterCat (https://sketchfab.com/dokstercat) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
loader.load('./lego_legs.glb', function (gltf) {

  var mesh = gltf.scene;
  mesh.scale.set(.035, .035, .035);

  // Change origin of rotation
  var box = new THREE.Box3().setFromObject( mesh );
  box.getCenter( mesh.position );
  mesh.position.multiplyScalar( - 1 );

  // Material
  const material = new THREE.MeshPhongMaterial();
  material.color.setHex(getRandomColor());
  material.flatShading = true;
  material.side = THREE.DoubleSide;

  mesh.traverse((o) => {
    if (o.isMesh) o.material = material;
  });

  scene.add( group );
  group.add( mesh );

}, undefined, function (error) {
  console.error(error);
});

function animate() {
  group.rotation.y += 0.0075;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);


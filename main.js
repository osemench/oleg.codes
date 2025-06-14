import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xff0000);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const group = new THREE.Group();
const loader = new GLTFLoader();

// This work is based on "LEGO Legs" (https://sketchfab.com/3d-models/lego-legs-f8859bddc7664c4b952b8377e8075ad6) by DoksterCat (https://sketchfab.com/dokstercat) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
loader.load('./lego_legs.glb', function (gltf) {

  var mesh = gltf.scene;
  mesh.scale.set(.035, .035, .035);
  mesh.position.set(0, -0.75, 0);
  mesh.rotation.set(0, 0, 0);

  // Change origin of rotation
  var box = new THREE.Box3().setFromObject( mesh );
  box.getCenter( mesh.position );
  mesh.position.multiplyScalar( - 1 );

  scene.add( group );
  group.add( mesh );

}, undefined, function (error) {
  console.error(error);
});

function animate() {
  group.rotation.y += 0.01;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);


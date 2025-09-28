// Three.js Setup for 3D Diya Model Animation

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.153.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('threejs-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2e094e);

// Camera setup
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
camera.position.set(0, 2, 5);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x000000, 0);
container.appendChild(renderer.domElement);

// Controls for 3D interaction (optional, disabled for invitation)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 3;
controls.maxDistance = 7;
controls.maxPolarAngle = Math.PI / 1.6;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffcc66, 1, 15, Math.PI / 6, 0.25);
spotLight.position.set(2, 3, 2);
spotLight.castShadow = true;
scene.add(spotLight);

// Diya base geometry (bowl shape)
const bowlGeometry = new THREE.CylinderGeometry(1.3, 1.3, 0.6, 64, 1, false, 0, Math.PI * 2);
const bowlMaterial = new THREE.MeshStandardMaterial({
  color: 0xd68b1e,
  metalness: 0.3,
  roughness: 0.4,
  emissive: 0x642d00,
  emissiveIntensity: 0.15,
});
const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial);
bowl.rotation.x = Math.PI;
bowl.position.y = -0.3;
scene.add(bowl);

// Flame geometry with two overlapping cones for flickering effect
const flameGroup = new THREE.Group();

const flameMaterialOuter = new THREE.MeshBasicMaterial({
  color: 0xffdb57,
  transparent: true,
  opacity: 0.75,
  side: THREE.DoubleSide,
});

const flameMaterialInner = new THREE.MeshBasicMaterial({
  color: 0xff6600,
  transparent: true,
  opacity: 0.9,
  side: THREE.DoubleSide,
});

const flameOuter = new THREE.ConeGeometry(0.3, 1, 32);
const flameInner = new THREE.ConeGeometry(0.15, 0.6, 32);

const flameOuterMesh = new THREE.Mesh(flameOuter, flameMaterialOuter);
const flameInnerMesh = new THREE.Mesh(flameInner, flameMaterialInner);

flameOuterMesh.position.y = 0.75;
flameInnerMesh.position.y = 0.75;

flameGroup.add(flameOuterMesh);
flameGroup.add(flameInnerMesh);
scene.add(flameGroup);

// Position flame above bowl
flameGroup.position.y = 0.1;

// Animation loop for flickering flame
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();

  // Flicker outer flame opacity and scale
  flameOuterMesh.scale.y = 1 + 0.1 * Math.sin(time * 12);
  flameOuterMesh.material.opacity = 0.7 + 0.3 * Math.sin(time * 15);

  // Flicker inner flame opacity and scale
  flameInnerMesh.scale.y = 1 + 0.15 * Math.cos(time * 14);
  flameInnerMesh.material.opacity = 0.6 + 0.4 * Math.cos(time * 11);

  // Slight float animation for bowl and flame group
  bowl.position.y = -0.3 + 0.05 * Math.sin(time * 2);
  flameGroup.position.y = 0.1 + 0.1 * Math.sin(time * 2);

  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle resize for responsiveness
window.addEventListener('resize', () => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});
  
// RSVP form alert
document.getElementById('rsvp-form').onsubmit = function (e) {
  e.preventDefault();
  alert('Thank you for confirming your RSVP! Wishing you a spectacular Diwali Dhoom 🎇');
};

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg') });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;

// Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Add Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Animation
function animate() {
  requestAnimationFrame(animate);
  camera.rotation.x += 0.0002;
  camera.rotation.y += 0.0002;
  renderer.render(scene, camera);
}

animate();

// Responsive
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

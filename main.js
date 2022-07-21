import { FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as THREE from './src/three'
import './src/Sky'
import './src/Water'

import expo from './public/img/expo.jpg'
import back from './public/img/back.png'
import logo from './public/fbx/test.fbx'
import waternormals from './public/img/waternormals.jpg'
import floorImg from './public/img/floor1.jpg'

let scene
let camera
let renderer
let floor 
let fbxLogo 
let controls 
let sunLight
let water
let sky  
let framesPerSecond=40;

function buildScene() {
  const scene = new THREE.Scene();
  return scene;
}

function buildCamera() {
	const camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 10000 );
	camera.position.set ( 105, 10, 60 );
	scene.add(camera);
	return camera;
}

function buildRenderer() {
	const renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;		

	const canvas = document.querySelector("#canvasWrap")
	canvas.appendChild(renderer.domElement); 
	document.body.appendChild(renderer.domElement);

	return renderer
}

function buildFloor(){
	const textureLoader = new THREE.TextureLoader();
	const floor = new THREE.Mesh(
		new THREE.BoxGeometry(10, 10, 10)
	);
	textureLoader.load(
		floorImg, 
		function ( texture ) {
			floor.material = new THREE.MeshStandardMaterial({map: texture});
			floor.material.map.repeat.x=3;
			floor.material.map.repeat.y=3;
			floor.material.map.wrapS=THREE.RepeatWrapping;
			floor.material.map.wrapT=THREE.RepeatWrapping;
		}
	);
	floor.position.set(0, -100, 0);
	floor.receiveShadow=true;
	scene.add(floor);
	return floor 
}

function buildLogo(){
	const fbxLoder = new FBXLoader();
	fbxLoder.load( 
		logo,
		(object) => {
			object.position.x = -10.5
			object.position.y = 0	
			object.position.z = -10

			object.rotation.x =  0
			object.rotation.y = -11.5
			object.rotation.z = 0

			object.scale.set(0.1,0.1,0.1)
			scene.add(object)

			fbxLogo = object;
		}
	)
	return fbxLogo
}

function setOrbitControls() {
	const controls = new OrbitControls (camera, renderer.domElement);
	controls.enablePan = false;
	controls.minPolarAngle = Math.PI / -2;
	controls.maxPolarAngle = Math.PI / 2.1;
	controls.autoRotate = true; 
	controls.autoRotateSpeed = 5.5; 
	return controls
}

function setEntireLight(){
	const entireLight = new THREE.AmbientLight( 0xf0f0f0 ); // soft white light
	scene.add( entireLight );
}

function setSunLight(){
	const sunLight = new THREE.DirectionalLight ( 0x808080, 5.0 );
	scene.add( sunLight );
	var shadowBlur=10;
	sunLight.castShadow=true;
	sunLight.shadow.camera.left=-shadowBlur;
	sunLight.shadow.camera.right=shadowBlur;
	sunLight.shadow.camera.top=shadowBlur;
	sunLight.shadow.camera.bottom=-shadowBlur;
	return sunLight
}

function buildWater(){
	const waterGeometry = new THREE.PlaneBufferGeometry( 100000, 100000 );
	const water = new THREE.Water(
		waterGeometry,
		{
			textureWidth: 512,
			textureHeight: 512,
			waterNormals: new THREE.TextureLoader().load(waternormals, function ( texture ) {
				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			} ),
			alpha: 0.1,
			sunDirection: sunLight.position.clone().normalize(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			distortionScale:1.7,
			fog: scene.fog !== undefined
		}
	);

	water.position.set(0,-300,0); // 바다 위치 조정
	water.rotation.x = - Math.PI / 2;
	scene.add( water );
	return water
}

function buildSky(){
	const sky = new THREE.Sky();
	sky.scale.setScalar(10000);

	sky.material.uniforms['turbidity'].value=0.3;
	sky.material.uniforms['rayleigh'].value=0.09;
	sky.material.uniforms['luminance'].value=0.1; 
	sky.material.uniforms['mieCoefficient'].value=0.005;
	sky.material.uniforms['mieDirectionalG'].value=0.1; 
	scene.add( sky )
	return sky 
}

function setCubCamera(){
	const parameters = {
		distance: 900,
		inclination: 0.1,
		azimuth: 0.05
	};
	const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512, {
		generateMipmaps: true,
		minFilter: THREE.LinearMipmapLinearFilter,
	})
	const cubeCamera = new THREE.CubeCamera( 0.1, 1, cubeRenderTarget );
	scene.background = cubeCamera.renderTarget; 
	
	const theta = Math.PI * ( parameters.inclination - 0.5 );
	const phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );
	
	sunLight.position.x = parameters.distance * Math.cos( phi );
	sunLight.position.y = parameters.distance * Math.sin( phi ) * Math.sin( theta );
	sunLight.position.z = parameters.distance * Math.sin( phi ) * Math.cos( theta );
	
	sky.material.uniforms['sunPosition'].value = sunLight.position.copy( sunLight.position );
	water.material.uniforms['sunDirection'].value.copy( sunLight.position ).normalize();
	
	cubeCamera.update( renderer, sky );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  if(water) water.material.uniforms[ 'time' ].value += 0.7 / 60.0;
	if(fbxLogo) fbxLogo.rotation.z += 0.005; // FBX Loader 가 로드되는 시간이 있기 때문에(비동기) fbxLogo 값이 null 이 아닐때 프로퍼티 접근

	renderer.render( scene, camera );
	requestAnimationFrame(animate); 
}


scene = buildScene()
camera = buildCamera()
renderer = buildRenderer()
floor = buildFloor()
fbxLogo = buildLogo()
controls = setOrbitControls()
setEntireLight()
sunLight = setSunLight()
water = buildWater()
sky = buildSky()
setCubCamera()

animate() // 애니메이션 시작 
window.addEventListener('resize', onWindowResize); // 화면 반응형 적용
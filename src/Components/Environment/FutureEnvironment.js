import React, { Component } from "react";
import * as THREE from "three";
import { connect } from "react-redux";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "../../Utility/Loaders/GLTFLoader.js";
import LoadingBar from "../LoadingBar/LoadingBar.js";
import styled from "styled-components";
import { Colours } from "../Global/global.styles.js";
import { EnvironmentFilter } from "../../Utility/Misc.js";
import { loading, hasLoaded, isLoading } from "../../Store/action.js";
import Text from '../../Assets/Models/proposal-text.glb'
import Buildings from '../../Assets/Models/proposal-context.glb'
import { EnvironmentNavbarWrapper } from "./NowEnvironment.js";
import TopNavbar from "../TopNavbar/TopNavbar.js";
const style = {
    height: '100%'
}
const ProposalEnvironmentWrapper = styled.div`
  display: ${props => (props.show ? "inherit" : "none")};
  overflow: hidden;
  height: 100%;
`;

// let Text = 'https://dt8c09yje207j.cloudfront.net/proposaltext.glb'
// let Buildings = 'https://dt8c09yje207j.cloudfront.net/proposalscenefinaljoinmat.glb'
class FutureEnvironment extends Component {
  state = {
    has_loaded: false,
    loaded: 0.0,
    total: 1.0
  };
  camPosIndex = 0;
  mouse = new THREE.Vector2();
  windowHalf = new THREE.Vector2();
  target = new THREE.Vector2();
  numOfPoints = 700;
  lastTouchPosition = 0;
  touchEndPosition = 1;
  componentDidMount() {
    this.init();
    this.startAnimationLoop();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.show_future_stories !== this.props.show_future_stories) {
      this.toggleObjectVisibility(EnvironmentFilter.FUTURE_STORIES)
    }
  }

  componentWillUnmount() {
    this.removeEventListeners();
    window.cancelAnimationFrame(this.requestID);
    if(this.controls) {
        this.controls.dispose();
    }
  }



  init = () => {
    this.setupScene();
    this.setupLights();
    this.setupLoadingManager();
    // this.setupMicrobes(); 
    this.setupBuildings();

    this.setupText();
    this.setupCameraCurve();
    this.setupMouse();
    this.addEventListeners();
  };

  setupMouse = () => {
    this.mouse = new THREE.Vector2();
    this.windowHalf = new THREE.Vector2(this.mount.clientWidth, this.mount.clientHeight);
  }

  updateMouse = () => {
    this.target.x = ( 1 - this.mouse.x ) * 0.0000001;
    this.target.y = ( 1 - this.mouse.y ) * 0.0000001;

    this.camera.rotation.x += 0.0000001 * ( this.target.y - this.camera.rotation.x );
    this.camera.rotation.y += 0.0000001 * ( this.target.x - this.camera.rotation.y );
  }

  setupScene = () => {
    // get container dimensions and use them for scene sizing
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xBABAB8, 30, 40);
    this.setupCamera();
    // this.setupControl();
    this.setupRenderer();
  };

  setupRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      premultipliedAlpha: true
    });
    this.renderer.setClearColor(Colours.background);
    this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    this.mount.appendChild(this.renderer.domElement); // mount using React ref
  };

  setupControl = () => {
    this.controls = new OrbitControls(this.camera, this.mount);
  };

  setupCamera = () => {
    this.camera = new THREE.PerspectiveCamera(
      20, // fov = field of view
      this.mount.clientWidth / this.mount.clientHeight, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.camera.position.x = 0.5;
    this.camera.position.y = -1;
    this.camera.position.z = 10;
    // this.camera.position.z = 20; // is used here to set some distance from a cube that is located at z = 0
  };

  setupLights = () => {
    let light = new THREE.AmbientLight (0xFFFFFF, 1);
    this.scene.add(light);

    let light2 = new THREE.PointLight (0xFFFFFF, 0);
    this.scene.add(light2);
    
    let light3 = new THREE.DirectionalLight (0xFFffff, 0);
    light3.position.z = 10;
    light3.position.x = 10;
    light3.position.y = 10;
    this.scene.add(light3);

    const width = 0.15;
    const height = 0.15;
    const intensity = 5000;
    const rectLight = new THREE.RectAreaLight( 0xfbffd4, intensity,  width, height );
    rectLight.position.set( 0, 10, -10);

    rectLight.lookAt(0, 0, -10 );
    this.scene.add( rectLight );

    const width1 = 0.15;
    const height1 = 0.15;
    const intensity1 = 5000;
    const rectLight1 = new THREE.RectAreaLight( 0xfbffd4, intensity1,  width1, height1 );
    rectLight1.position.set( -10, 10, 7 );

    rectLight1.lookAt(-10, 0, 7);
    this.scene.add( rectLight1 );

    const width2 = 0.15;
    const height2 = 0.15;
    const intensity2 = 5000;
    const rectLight2 = new THREE.RectAreaLight( 0xfbffd4, intensity2,  width2, height2 );
    rectLight2.position.set( -20, 10, 122 );

    rectLight2.lookAt(-20, 0, 122);
    this.scene.add( rectLight2 );

    const width3 = 0.15;
    const height3 = 0.15;
    const intensity3 = 5000;
    const rectLight3 = new THREE.RectAreaLight( 0xfbffd4, intensity3,  width3, height3 );
    rectLight3.position.set( -38, 10, 190 );

    rectLight3.lookAt(-38, 0, 190);
    this.scene.add( rectLight3 );
  };

  setupLoadingManager = () => {
    this.manager = new THREE.LoadingManager();
    this.manager.onStart = this.loadStart;
    this.manager.onProgress = this.loadProgressing;
    this.manager.onLoad = this.loadFinished;
  };

  loadStart = (url, itemsLoaded, itemsTotal) => {
    this.props.isLoading();
    this.props.loading(itemsLoaded, itemsTotal);
  };

  loadProgressing = (url, itemsLoaded, itemsTotal) => {
    this.props.loading(itemsLoaded, itemsTotal);
  };

  loadFinished = () => {
    this.props.hasLoaded();
    this.onWindowResize();
  };

  setupText = () => {
    const loader = new GLTFLoader(this.manager);
    let mesh = new THREE.Object3D();

    loader.load(Text, gltf => {
      mesh = gltf.scene;
      mesh.name = EnvironmentFilter.FUTURE_STORIES;
      this.scene.add(mesh);
      mesh.position.z = 0;
    });

    mesh.visible = true;
  };

  setupBuildings = () => {
    const loader = new GLTFLoader(this.manager);
    let mesh = new THREE.Object3D();

    loader.load(Buildings, gltf => {
      mesh = gltf.scene;
      // mesh.name = EnvironmentFilter.CONTEXT;
      this.scene.add(mesh);
      mesh.position.z = 0;
    });


    mesh.visible = true;


  };

  setupCameraCurve = () => {
    this.spline = new THREE.CatmullRomCurve3([

      new THREE.Vector3(-0.5,-1,7), 
      new THREE.Vector3(-0.5,-1,6),   
      new THREE.Vector3(-2.2,-1,3),  
      new THREE.Vector3(-5.5,-1,4.2),   
      new THREE.Vector3(-8,-1,4.5),     
      new THREE.Vector3(-15,-1,6),
      new THREE.Vector3(-25,-0.5,8),
      new THREE.Vector3(-25,-0.5,15),
      new THREE.Vector3(-20,-0.5,80),
      new THREE.Vector3(-20,-0.5,100),
      new THREE.Vector3(-21,-1,118),
      new THREE.Vector3(-25,-1,160),
      new THREE.Vector3(-32,-0.5,182),
      new THREE.Vector3(-34,-0.5,184),
      new THREE.Vector3(-40,-0.3,185),
    ], false);

    const points = this.spline.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

    // Create the final object to add to the scene
    // const curveObject = new THREE.Line( geometry, material );
    // this.scene.add(curveObject)
  };

  toggleObjectVisibility = (filter) => {
    let object = this.scene.getObjectByName(filter);
    if(object) {
      object.visible = !object.visible;
    }
  }

  startAnimationLoop = () => {
    this.updateMouse();
    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  addEventListeners = () => {
    // document.addEventListener("touchstart", this.onDocumentTouchStart, false);
    // document.addEventListener("keydown", this.onKeyDown, false)
    // document.addEventListener("dblclick", this.onDocumentDoubleClick, false);
    // document.addEventListener("mouseup", this.onDocumentMouseUp, false);
    // document.addEventListener("mousedown", this.onDocumentMouseDown, false);
    // document.addEventListener("mousemove", this.onDocumentMouseMove, false);
    window.addEventListener("resize", this.onWindowResize, false);
    window.addEventListener("wheel", this.onMouseWheel, false);
    window.addEventListener("mousemove", this.onMouseMove, false);
    window.addEventListener("touchstart", this.onTouchStart, false);
    window.addEventListener("touchend", this.onTouchEnd, false);
    window.addEventListener("touchmove", this.onTouchMove, false);

  };

  removeEventListeners = () => {
    window.removeEventListener("resize", this.onWindowResize);
    window.removeEventListener("wheel", this.onMouseWheel);
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("touchstart", this.onTouchStart);
    window.removeEventListener("touchend", this.onTouchEnd);
    window.removeEventListener("touchmove", this.onTouchMove);

    // document.removeEventListener("dblclick", this.onDocumentDoubleClick);
    // document.removeEventListener("mouseup", this.onDocumentMouseUp);
    // document.removeEventListener("mousedown", this.onDocumentMouseDown);
    // document.removeEventListener("keydown", this.onKeyDown)
    // document.removeEventListener("mousemove", this.onDocumentMouseMove);
    // document.removeEventListener(
    //   "touchstart",
    //   this.onDocumentTouchStart,
    //   false
    // );
  };
  onWindowResize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  onMouseMove = event => {
    this.mouse.x = ( event.clientX - this.windowHalf.x );
    this.mouse.y = ( event.clientY - this.windowHalf.x );
  }

  onTouchStart = event => {
    // console.log('onTouchStart', event.touches[0])
  }

  onTouchEnd = event => {
    // console.log('onTouchEnd', event.changedTouches[0])
  }

  onTouchMove = event => {
    console.log('onTouchMove', )
    let position = event.changedTouches[0].clientY;
    let threshold = 1;
    if((position >= this.lastTouchPosition + threshold ) && this.camPosIndex > 0) {
      console.log()
      this.moveBack()
    } else if((position + threshold < this.lastTouchPosition) && this.camPosIndex < this.numOfPoints - 1) {
      this.moveForward()
    }
    this.lastTouchPosition = position;

  }
  onMouseWheel = event => {
    // let numOfPoints = 700;
    if (event.deltaY < 0 && this.camPosIndex < this.numOfPoints - 1) {
      this.moveForward()
    } else if (event.deltaY > 0 && this.camPosIndex > 0) {
      this.moveBack();
    }
  };

  moveForward = () => {
    this.camPosIndex++;
    this.move();
  }

  moveBack = () => {
    this.camPosIndex--;
    this.move();
  }
 
  move = () => {
    let camPos = this.spline.getPoint(this.camPosIndex / this.numOfPoints);
    let camRot = this.spline.getTangent(this.camPosIndex);

    this.camera.position.x = camPos.x;
    this.camera.position.y = camPos.y;
    this.camera.position.z = camPos.z;

    this.camera.rotation.x = camRot.x;
    this.camera.rotation.y = camRot.y;
    this.camera.rotation.z = camRot.z;

    this.camera.lookAt(this.spline.getPoint((this.camPosIndex + 1) / this.numOfPoints));
  }

  render() {
    return (
      <>
        <ProposalEnvironmentWrapper
          show={this.props.has_loaded}
          style={style}
          ref={ref => (this.mount = ref)}
        />
        <EnvironmentNavbarWrapper>
          <TopNavbar isOnLoadingPage={false} />
        </EnvironmentNavbarWrapper>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    show_data: state.show_data,
    show_future_stories: state.show_future_stories,
    has_loaded: state.has_loaded,
    loaded:  state.loaded,
    total: state.total
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loading: (loaded, total) => dispatch(loading(loaded, total)),
    hasLoaded: () => dispatch(hasLoaded()),
    isLoading: () => dispatch(isLoading())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FutureEnvironment);

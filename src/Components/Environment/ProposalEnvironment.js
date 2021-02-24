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

const style = {
    height: '100%'
}
const ProposalEnvironmentWrapper = styled.div`
  display: ${props => (props.show ? "inherit" : "none")};
  overflow: hidden;
  height: 100
`;

let Microbes = 'https://dt8c09yje207j.cloudfront.net/Microbes.glb'
let Text = 'https://dt8c09yje207j.cloudfront.net/Text.glb'
let Buildings = 'https://dt8c09yje207j.cloudfront.net/Buildings.glb'
class ProposalEnvironment extends Component {
  state = {
    has_loaded: false,
    loaded: 0.0,
    total: 1.0
  };
  camPosIndex = 0;
  componentDidMount() {
    this.init();
    this.startAnimationLoop();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.show_annotations !== this.props.show_annotations) {
      this.toggleObjectVisibility(EnvironmentFilter.ANNOTATIONS)
    }

    if(prevProps.show_context !== this.props.show_context) {
      this.toggleObjectVisibility(EnvironmentFilter.CONTEXT)
    }

    if(prevProps.show_data !== this.props.show_data) {
      this.toggleObjectVisibility(EnvironmentFilter.DATA)
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
    this.setupMicrobes();
    this.setupText();
    this.setupBuildings();
    this.setupCameraCurve();
    this.addEventListeners();
  };

  setupScene = () => {
    // get container dimensions and use them for scene sizing
    this.scene = new THREE.Scene();
    this.setupCamera();
    // this.setupControl();
    this.setupRenderer();
  };

  setupRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      premultipliedAlpha: true
    });
    this.renderer.setClearColor(Colours.grey);
    this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    this.mount.appendChild(this.renderer.domElement); // mount using React ref
  };

  setupControl = () => {
    this.controls = new OrbitControls(this.camera, this.mount);
  };

  setupCamera = () => {
    this.camera = new THREE.PerspectiveCamera(
      50, // fov = field of view
      this.mount.clientWidth / this.mount.clientHeight, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.camera.position.z = 20; // is used here to set some distance from a cube that is located at z = 0
  };

  setupLights = () => {
    let light = new THREE.AmbientLight(0xffffff, 10);
    this.scene.add(light);

    let light2 = new THREE.PointLight(0xffffff, 10);
    this.scene.add(light2);

    let light3 = new THREE.DirectionalLight(0xffffff, 1);
    light3.position.z = 10;
    light3.position.x = 10;
    light3.position.y = 10;
    this.scene.add(light3);
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
    console.log('LOADED: ' + itemsLoaded + ", TOTAL: " + itemsTotal )
    this.props.loading(itemsLoaded, itemsTotal);
  };

  loadFinished = () => {
    this.props.hasLoaded();
    this.onWindowResize();
  };

  setupMicrobes = () => {
    const loader = new GLTFLoader(this.manager);
    let mesh = new THREE.Object3D();

    loader.load(Microbes, gltf => {
      mesh = gltf.scene;
      mesh.name = EnvironmentFilter.DATA;
      this.scene.add(mesh);
      mesh.position.z = 0;
    });

    mesh.visible = true;
  };

  setupText = () => {
    const loader = new GLTFLoader(this.manager);
    let mesh = new THREE.Object3D();

    loader.load(Text, gltf => {
      mesh = gltf.scene;
      mesh.name = EnvironmentFilter.ANNOTATIONS;
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
      mesh.name = EnvironmentFilter.CONTEXT;
      this.scene.add(mesh);
      mesh.position.z = 0;
    });

    mesh.visible = true;
  };

  setupCameraCurve = () => {
    this.spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 20),
      new THREE.Vector3(0, 0, 10),
      new THREE.Vector3(0, 5, 5)
      //    new THREE.Vector3(5,0,39)
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
  };

  removeEventListeners = () => {
    window.removeEventListener("resize", this.onWindowResize);
    window.addEventListener("wheel", this.onMouseWheel);

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

  onMouseWheel = event => {
    if (event.deltaY < 0 && this.camPosIndex < 99) {
      this.camPosIndex++;

      let camPos = this.spline.getPoint(this.camPosIndex / 100);
      let camRot = this.spline.getTangent(this.camPosIndex);

      this.camera.position.x = camPos.x;
      this.camera.position.y = camPos.y;
      this.camera.position.z = camPos.z;

      this.camera.rotation.x = camRot.x;
      this.camera.rotation.y = camRot.y;
      this.camera.rotation.z = camRot.z;

      this.camera.lookAt(this.spline.getPoint((this.camPosIndex + 1) / 100));
    } else if (event.deltaY > 0 && this.camPosIndex > 0) {
      this.camPosIndex--;
      let camPos = this.spline.getPoint(this.camPosIndex / 100);
      let camRot = this.spline.getTangent(this.camPosIndex);

      this.camera.position.x = camPos.x;
      this.camera.position.y = camPos.y;
      this.camera.position.z = camPos.z;

      this.camera.rotation.x = camRot.x;
      this.camera.rotation.y = camRot.y;
      this.camera.rotation.z = camRot.z;

      this.camera.lookAt(this.spline.getPoint((this.camPosIndex + 1) / 100));
    }

    //   camera.position.z += event.deltaY * 0.01;
  };

  render() {
    return (
      <>
        <ProposalEnvironmentWrapper
          show={this.props.has_loaded}
          style={style}
          ref={ref => (this.mount = ref)}
        />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    show_annotations: state.show_annotations,
    show_context: state.show_context,
    show_data: state.show_data,
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
)(ProposalEnvironment);

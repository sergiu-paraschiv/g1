import * as React from 'react';
import * as THREE from 'three';
import * as _ from 'lodash';


type Props = {
    onFrame: () => void;
}

export default class Scene extends React.PureComponent<Props> {
    static childContextTypes = {
        attachCamera: () => null,
        detachCamera: () => null,
        attachMesh: () => null,
        detachMesh: () => null
    };

    private listeners: {
        [key: string]: any;
    } = {};

    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera?: THREE.Camera;

    getChildContext() {
        return {
            attachCamera: this.attachCamera,
            detachCamera: this.detachCamera,
            attachMesh: this.attachMesh,
            detachMesh: this.detachMesh
        };
    }

    constructor(props: Props) {
        super(props);

        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
    }

    componentDidMount() {
        (this.refs.scene as any).appendChild(
            this.renderer.domElement
        );

        window.addEventListener('resize', this.handleResize, true);

        this.handleResize();
        this.animate();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize, true);
    }

    render() {
        return (
            <div className="t3d-scene" ref="scene">
                {this.props.children}
            </div>
        );
    }

    private handleResize = () => {
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    private animate = () => {
        if (this.camera) {
            requestAnimationFrame(this.animate);

            this.props.onFrame();

            _.each(this.listeners, listener => {
                if (listener) {
                    listener.sceneChanged();
                }
            });

            this.camera.lookAt(this.scene.position);

            this.renderer.render(this.scene, this.camera);
        }
    }

    private attachCamera = (camera: THREE.Camera) => {
        if (this.camera) {
            throw new Error('A Camera is already attached.');
        }

        this.camera = camera;
        this.listeners.camera = camera;

        this.animate();
    }

    private detachCamera = () => {
        if (!this.camera) {
            throw new Error('No Camera is attached.');
        }

        this.camera = undefined;
        delete this.listeners.camera;
    }

    private attachMesh = (mesh: THREE.Mesh) => {
        this.scene.add(mesh);

        this.listeners[(mesh as any).index.toString()] = mesh;
    }

    private detachMesh = (mesh: THREE.Mesh) => {
        mesh;

        delete this.listeners[(mesh as any).index.toString()];

        throw new Error('not implemented'); // TODO
    }
}
import * as React from 'react';
import * as THREE from 'three';
import { Object3D } from './Object3D';


export default class Camera extends Object3D<any> {
    static contextTypes  = {
        attachCamera: () => null,
        detachCamera: () => null
    };

    constructor(props: any) {
        super(props);

        this.object = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
    }

    componentDidMount() {
        super.componentDidMount();

        this.context.attachCamera(this.object);
    }

    componentWillUnmount() {
        this.context.detachCamera(this.object);
    }

    render() {
        return (
            <div className="t3d-camera">
                {this.props.children}
            </div>
        );
    }
}
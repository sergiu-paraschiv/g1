import * as React from 'react';
import * as THREE from 'three';
import { Object3D } from './Object3D';


type Props = {
    material: THREE.Material;
    geometry: THREE.Geometry;
}

export default class Mesh extends Object3D<Props> {
    static contextTypes  = {
        attachMesh: () => null,
        detachMesh: () => null
    };

    componentDidMount() {
        this.object = new THREE.Mesh(
            this.props.geometry,
            this.props.material
        );

        super.componentDidMount();

        this.context.attachMesh(this.object);
    }

    componentWillUnmount() {
        if (this.object) {
            this.context.detachMesh(this.object);
        }
    }

    render() {
        return (
            <div className="t3d-mesh">
                {this.props.children}
            </div>
        );
    }
}
import * as React from 'react';
import * as THREE from 'three';


export type Object3DProps = {
    rotation?: {
        x: number;
        y: number;
        z: number;
    };

    position?: {
        x: number;
        y: number;
        z: number;
    };
}

export abstract class Object3D<P> extends React.Component<Object3DProps & P> {
    protected object: THREE.Object3D;
    private static index: number = 0;

    componentDidMount() {
        (this.object as any).index = ++Object3D.index;
        (this.object as any).sceneChanged = this.refresh;

        this.refresh();
    }

    componentWillReceiveProps(newProps: Object3DProps) {
        this.refresh(newProps);
    }

    shouldComponentUpdate() {
        return false;
    }

    protected refresh = (props?: Object3DProps) => {
        this.refreshRotation(props || this.props);
        this.refreshPosition(props || this.props);
    }

    protected refreshRotation = (props: Object3DProps) => {
        if (!this.object) {
            return;
        }

        let { rotation } = props;
        let vec: THREE.Vector3;

        if (!rotation) {
            vec = new THREE.Vector3(0, 0, 0);
        }
        else {
            vec = new THREE.Vector3(
                rotation.x,
                rotation.y,
                rotation.z
            );
        }

        if (
            vec
            && !this.object.rotation.toVector3().equals(vec)
        ) {
            this.object.rotation.setFromVector3(vec);
        }
    }

    protected refreshPosition = (props: Object3DProps) => {
        if (!this.object) {
            return;
        }

        let { position } = props;
        let vec: THREE.Vector3;

        if (!position) {
            vec = new THREE.Vector3(0, 0, 0);
        }
        else {
            vec = new THREE.Vector3(
                position.x,
                position.y,
                position.z
            );
        }

        if (
            vec
            && !this.object.position.equals(vec)
        ) {
            this.object.position.copy(vec);
        }
    }
}
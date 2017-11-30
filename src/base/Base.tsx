import * as React from 'react';
import * as THREE from 'three';
import * as _ from 'lodash';
import { Scene, Camera, Mesh } from 't3d';


type Vector =  {
    x: number
    y: number
    z: number
}

type Box = {
    r: Vector
    p: Vector
}

type SceneState = {
    boxes: Box[]
    camera: {
        r: Vector
        p: Vector
    }
}

export default class Base extends React.PureComponent {
    private sceneState: SceneState = {
        boxes: _.map(
            _.range(0, 2000),
            () => {
                return {
                    r: {
                        x: Math.random(),
                        y: Math.random(),
                        z: Math.random()
                    },
                    p: {
                        x: Math.random() * 6 - 3,
                        y: Math.random() * 6 - 3,
                        z: Math.random() * 6 - 3
                    }
                };
            }
        ),
        camera: {
            r: {
                x: 0,
                y: 0,
                z: 0
            },
            p: {
                x: 0,
                y: 0,
                z: 50
            }
        }
    };

    render() {
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const { camera, boxes } = this.sceneState;

        return (
            <div className="app-root">
                <Scene
                    onFrame={this.animate}
                >
                    <Camera
                        position={camera.p}
                        rotation={camera.r}
                    />

                    {_.map(boxes, (box: Box, index: number) => {
                        return (
                            <Mesh
                                key={index}
                                geometry={geometry}
                                material={material}
                                position={box.p}
                                rotation={box.r}
                            />
                        );
                    })}
                    
                </Scene>
            </div>
        );
    }

    private animate = () => {
        let { boxes, camera } = this.sceneState;

        _.each(boxes, (box: Box) => {
            box.p.x += Math.random() * 1 - 0.5;
            box.p.y += Math.random() * 1 - 0.5;
            box.p.z += Math.random() * 1 - 0.5;

            box.r.x += Math.random() * 2;
        });

        camera.p.x = camera.p.x * Math.cos(0.02) + camera.p.z * Math.sin(0.02);
        camera.p.z = camera.p.z * Math.cos(0.02) - camera.p.x * Math.sin(0.02);
    };
}
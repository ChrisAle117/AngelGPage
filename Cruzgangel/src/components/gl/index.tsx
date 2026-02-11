import { extend } from "@react-three/fiber";
import { Effects } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import { useControls } from "leva";
import { ShaderPass } from "three-stdlib";
import { Particles } from "./particles";
import { VignetteShader } from "./shaders/vignetteShader";

extend({ ShaderPass });

export const GL = ({ hovering, darkMode }: { hovering: boolean; darkMode: boolean }) => {
    // Hardcoded values for debugging
    const speed = 1.0;
    const focus = 3.8;
    const aperture = 1.79;
    const size = 512;
    const noiseScale = 0.6;
    const noiseIntensity = 0.52;
    const timeScale = 1.0;
    const pointSize = 10.0;
    const opacity = 0.8;
    const planeScale = 10.0;

    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{
                    position: [
                        1.26, 2.66, -1.81,
                    ],
                    fov: 50,
                    near: 0.01,
                    far: 300,
                }}
            >
                <color attach="background" args={[darkMode ? "#000" : "#F5F5F5"]} />
                <Particles
                    speed={speed}
                    aperture={aperture}
                    focus={focus}
                    size={size}
                    noiseScale={noiseScale}
                    noiseIntensity={noiseIntensity}
                    timeScale={timeScale}
                    pointSize={pointSize}
                    opacity={opacity}
                    planeScale={planeScale}
                    useManualTime={false}
                    manualTime={0}
                    introspect={hovering}
                    darkMode={darkMode}
                />
            </Canvas>
        </div>
    );
};

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Grid, Sparkles, Stars } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const easeOutExpo = (value) => (value === 1 ? 1 : 1 - Math.pow(2, -10 * value));

function useStageQuality() {
  const [quality, setQuality] = useState(() => {
    if (typeof window === 'undefined') return { particleCount: 280, dpr: [1, 1.45] };
    const tablet = window.matchMedia('(max-width: 900px)').matches;
    return {
      particleCount: tablet ? 170 : 320,
      dpr: tablet ? [1, 1.25] : [1, 1.55],
    };
  });

  useEffect(() => {
    const updateQuality = () => {
      const tablet = window.matchMedia('(max-width: 900px)').matches;
      setQuality({
        particleCount: tablet ? 170 : 320,
        dpr: tablet ? [1, 1.25] : [1, 1.55],
      });
    };

    updateQuality();
    window.addEventListener('resize', updateQuality);

    return () => window.removeEventListener('resize', updateQuality);
  }, []);

  return quality;
}

function CameraIntro({ reducedMotion }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(reducedMotion ? 0 : 0.8, reducedMotion ? 0.18 : 0.55, reducedMotion ? 6.2 : 8.4);

    if (reducedMotion) return undefined;

    const timeline = gsap.timeline();
    timeline.to(camera.position, {
      x: 0,
      y: 0.18,
      z: 6.2,
      duration: 2.25,
      ease: 'expo.out',
    });

    return () => timeline.kill();
  }, [camera, reducedMotion]);

  useFrame(() => {
    camera.lookAt(0, -0.02, 0);
  });

  return null;
}

function FormationParticles({ count, introProgress, reducedMotion }) {
  const pointsRef = useRef(null);
  const geometryRef = useRef(null);

  const particleData = useMemo(() => {
    const start = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const i3 = index * 3;
      const theta = index * 0.73;
      const phi = Math.acos(2 * ((index + 0.5) / count) - 1);
      const radius = 0.88 + (index % 9) * 0.028;
      const cloudRadius = 2.7 + (index % 13) * 0.075;

      target[i3] = Math.cos(theta) * Math.sin(phi) * radius;
      target[i3 + 1] = Math.sin(theta * 1.17) * Math.sin(phi) * radius;
      target[i3 + 2] = Math.cos(phi) * radius;

      start[i3] = Math.cos(theta * 1.6) * cloudRadius;
      start[i3 + 1] = Math.sin(theta * 0.9) * (cloudRadius * 0.62);
      start[i3 + 2] = Math.sin(theta * 1.25) * cloudRadius - 0.4;
    }

    return { start, target };
  }, [count]);

  useFrame(({ clock }) => {
    const geometry = geometryRef.current;
    if (!geometry) return;

    const position = geometry.attributes.position;
    const progress = reducedMotion ? 1 : easeOutExpo(introProgress.current.value);
    const drift = reducedMotion ? 0 : Math.sin(clock.getElapsedTime() * 0.75) * 0.018;

    for (let index = 0; index < count; index += 1) {
      const i3 = index * 3;
      position.array[i3] = THREE.MathUtils.lerp(particleData.start[i3], particleData.target[i3], progress) + drift;
      position.array[i3 + 1] = THREE.MathUtils.lerp(particleData.start[i3 + 1], particleData.target[i3 + 1], progress) - drift * 0.6;
      position.array[i3 + 2] = THREE.MathUtils.lerp(particleData.start[i3 + 2], particleData.target[i3 + 2], progress);
    }

    position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          array={particleData.start}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7ef8ff"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.82}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CodePanel({ position, rotation, accent = '#7ef8ff' }) {
  const lines = [
    { x: -0.18, y: 0.18, width: 0.52, opacity: 0.75 },
    { x: 0.12, y: 0.04, width: 0.78, opacity: 0.5 },
    { x: -0.08, y: -0.1, width: 0.6, opacity: 0.65 },
    { x: 0.22, y: -0.24, width: 0.34, opacity: 0.42 },
  ];

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[1.16, 0.72, 0.018]} />
        <meshBasicMaterial color="#06111f" transparent opacity={0.5} />
      </mesh>
      <mesh position={[-0.44, 0.26, 0.016]}>
        <boxGeometry args={[0.08, 0.08, 0.02]} />
        <meshBasicMaterial color={accent} transparent opacity={0.75} />
      </mesh>
      {lines.map((line) => (
        <mesh key={`${line.x}-${line.y}`} position={[line.x, line.y, 0.02]}>
          <boxGeometry args={[line.width, 0.025, 0.02]} />
          <meshBasicMaterial color={accent} transparent opacity={line.opacity} />
        </mesh>
      ))}
    </group>
  );
}

function OrbitRing({ color, rotation, scale = 1 }) {
  return (
    <mesh rotation={rotation} scale={scale}>
      <torusGeometry args={[1.84, 0.01, 8, 112]} />
      <meshBasicMaterial color={color} transparent opacity={0.72} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function DeveloperStage({ particleCount, reducedMotion }) {
  const stageRef = useRef(null);
  const cubeRef = useRef(null);
  const coreRef = useRef(null);
  const introProgress = useRef({ value: reducedMotion ? 1 : 0 });
  const pointer = useRef({ x: 0, y: 0 });
  const introComplete = useRef(reducedMotion);

  useEffect(() => {
    if (reducedMotion || !stageRef.current) return undefined;

    const timeline = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => {
        introComplete.current = true;
      },
    });

    stageRef.current.scale.set(0.16, 0.16, 0.16);
    stageRef.current.rotation.set(-0.55, -1.05, 0.28);
    stageRef.current.position.set(0.16, -0.2, -1.1);

    timeline
      .to(introProgress.current, { value: 1, duration: 1.85, ease: 'expo.inOut' }, 0)
      .to(stageRef.current.scale, { x: 1, y: 1, z: 1, duration: 1.72 }, 0.62)
      .to(stageRef.current.rotation, { x: 0, y: 0, z: 0, duration: 1.8 }, 0.62)
      .to(stageRef.current.position, { x: 0, y: 0, z: 0, duration: 1.8 }, 0.62);

    return () => timeline.kill();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const handlePointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [reducedMotion]);

  useFrame(({ clock }) => {
    if (reducedMotion) return;

    const elapsed = clock.getElapsedTime();

    if (stageRef.current && introComplete.current) {
      stageRef.current.rotation.x = THREE.MathUtils.lerp(stageRef.current.rotation.x, -pointer.current.y * 0.16, 0.055);
      stageRef.current.rotation.y = THREE.MathUtils.lerp(stageRef.current.rotation.y, pointer.current.x * 0.28 + elapsed * 0.08, 0.05);
      stageRef.current.position.y = Math.sin(elapsed * 0.7) * 0.15;
    }

    if (cubeRef.current) {
      cubeRef.current.rotation.x = elapsed * 0.16;
      cubeRef.current.rotation.y = elapsed * 0.22;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = -elapsed * 0.32;
      coreRef.current.scale.setScalar(1 + Math.sin(elapsed * 1.4) * 0.035);
    }
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 0.92}
      rotationIntensity={reducedMotion ? 0 : 0.18}
      floatIntensity={reducedMotion ? 0 : 0.26}
    >
      <group ref={stageRef}>
        <FormationParticles count={particleCount} introProgress={introProgress} reducedMotion={reducedMotion} />

        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.72, 1]} />
          <meshStandardMaterial
            color="#0b1324"
            emissive="#7c5cff"
            emissiveIntensity={0.45}
            metalness={0.72}
            roughness={0.2}
            transparent
            opacity={0.82}
          />
        </mesh>

        <mesh ref={cubeRef}>
          <boxGeometry args={[1.34, 1.34, 1.34, 3, 3, 3]} />
          <meshStandardMaterial
            color="#78f1ff"
            emissive="#24ddff"
            emissiveIntensity={0.38}
            metalness={0.45}
            roughness={0.22}
            transparent
            opacity={0.35}
            wireframe
          />
        </mesh>

        <OrbitRing color="#24ddff" rotation={[Math.PI / 2.4, 0.2, 0.1]} />
        <OrbitRing color="#8f6cff" rotation={[0.2, Math.PI / 2.5, 0.45]} scale={0.88} />
        <OrbitRing color="#f2ca50" rotation={[0.55, 0.35, Math.PI / 2.1]} scale={1.08} />

        <CodePanel position={[-1.72, 0.46, -0.2]} rotation={[0.12, 0.45, -0.08]} />
        <CodePanel position={[1.78, -0.34, 0.02]} rotation={[-0.08, -0.52, 0.1]} accent="#f2ca50" />
      </group>
    </Float>
  );
}

export default function Hero3DStage() {
  const reducedMotion = usePrefersReducedMotion();
  const { particleCount, dpr } = useStageQuality();

  return (
    <Canvas
      className="hero-3d-canvas"
      dpr={dpr}
      frameloop={reducedMotion ? 'demand' : 'always'}
      camera={{ position: [0, 0.18, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      performance={{ min: 0.55 }}
    >
      <CameraIntro reducedMotion={reducedMotion} />
      <ambientLight intensity={0.58} />
      <pointLight position={[3.4, 2.8, 3.8]} color="#78f1ff" intensity={36} distance={10} />
      <pointLight position={[-2.6, -1.8, 2.4]} color="#8f6cff" intensity={18} distance={9} />
      <Stars radius={18} depth={18} count={particleCount} factor={2.2} saturation={0} fade speed={reducedMotion ? 0 : 0.18} />
      <Sparkles count={Math.round(particleCount / 7)} scale={[5.5, 3.3, 2.4]} size={1.2} speed={reducedMotion ? 0 : 0.2} color="#78f1ff" opacity={0.42} />
      <DeveloperStage particleCount={particleCount} reducedMotion={reducedMotion} />
      <Grid
        position={[0, -2.15, 0]}
        args={[7.5, 7.5]}
        cellSize={0.36}
        sectionSize={1.44}
        cellThickness={0.35}
        sectionThickness={0.75}
        cellColor="#29384f"
        sectionColor="#24ddff"
        fadeDistance={6.5}
        fadeStrength={1.8}
        infiniteGrid={false}
      />
    </Canvas>
  );
}

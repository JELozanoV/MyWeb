import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { MathUtils, type Group, type Mesh } from 'three';

/**
 * Objeto 3D del hero. Este archivo arrastra three.js, así que SOLO debe
 * importarse con `next/dynamic` y `ssr: false` (ver Hero.tsx).
 */

function Shape() {
  const group = useRef<Group>(null);
  const shell = useRef<Mesh>(null);
  // Posición del puntero normalizada a [-1, 1] respecto a toda la ventana
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((_, delta) => {
    const target = group.current;
    if (!target) return;

    // Gira suavemente hacia el cursor
    target.rotation.x = MathUtils.lerp(target.rotation.x, pointer.current.y * 0.35, 0.05);
    target.rotation.y = MathUtils.lerp(target.rotation.y, pointer.current.x * 0.55, 0.05);

    // Al hacer scroll sube y se encoge un poco
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    target.position.y = scroll * 0.9;
    target.scale.setScalar(1 - scroll * 0.25);

    if (shell.current) {
      shell.current.rotation.y += delta * 0.16;
      shell.current.rotation.x += delta * 0.07;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh>
          <icosahedronGeometry args={[1.2, 24]} />
          <MeshDistortMaterial
            color="#6f4dff"
            emissive="#1c1470"
            emissiveIntensity={0.5}
            roughness={0.18}
            metalness={0.35}
            distort={0.42}
            speed={1.8}
          />
        </mesh>
      </Float>
      {/* Malla exterior en alambre */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.95, 1]} />
        <meshBasicMaterial color="#8b7bff" wireframe transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

interface HeroSceneProps {
  /** Se llama cuando el canvas ya está listo para ocultar el orbe de respaldo */
  onReady?: () => void;
}

export default function HeroScene({ onReady }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  // Pausa el render cuando el hero no se ve: fuera de pantalla o pestaña oculta
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(container);

    const handleVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={inView && tabVisible ? 'always' : 'never'}
        onCreated={() => onReady?.()}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[4, 4, 4]} intensity={70} color="#8b6dff" />
        <pointLight position={[-4, -2, 3]} intensity={60} color="#3b82f6" />
        <pointLight position={[0, 3, -3]} intensity={40} color="#22d3ee" />
        <Shape />
        <Sparkles count={70} scale={5.5} size={2.4} speed={0.4} color="#a996ff" opacity={0.8} />
      </Canvas>
    </div>
  );
}

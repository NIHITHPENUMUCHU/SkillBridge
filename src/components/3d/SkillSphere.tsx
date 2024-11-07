import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  'React', 'Node.js', 'Python', 'AI', 'Data', 'Cloud',
  'Design', 'DevOps', 'Mobile', 'Security', 'ML', 'Web3'
];

export default function SkillSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const textRefs = useRef<THREE.Group[]>([]);

  // Create particles for a dynamic effect
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.random() * Math.PI;
      const r = 1.5;
      const x = r * Math.sin(p) * Math.cos(t);
      const y = r * Math.sin(p) * Math.sin(t);
      const z = r * Math.cos(p);
      temp.push({ pos: [x, y, z], size: Math.random() * 0.05 + 0.02 });
    }
    return temp;
  }, []);

  // Animate the sphere and particles
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.005;
      sphereRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    // Animate skill texts
    textRefs.current.forEach((text, i) => {
      if (text) {
        const angle = (i / skills.length) * Math.PI * 2;
        const radius = 1.2;
        text.position.x = Math.cos(angle + state.clock.elapsedTime * 0.3) * radius;
        text.position.z = Math.sin(angle + state.clock.elapsedTime * 0.3) * radius;
        text.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.2;
        text.lookAt(0, 0, 0);
      }
    });
  });

  return (
    <group>
      {/* Main sphere */}
      <Sphere ref={sphereRef} args={[1, 64, 64]}>
        <meshPhongMaterial
          color="#4f46e5"
          emissive="#2d2b7c"
          specular="#ffffff"
          shininess={50}
          transparent
          opacity={0.9}
          wireframe
        />
      </Sphere>

      {/* Inner glowing sphere */}
      <Sphere args={[0.95, 32, 32]}>
        <meshPhongMaterial
          color="#818cf8"
          emissive="#4f46e5"
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Floating skill texts */}
      {skills.map((skill, i) => (
        <group
          key={skill}
          ref={(el) => (textRefs.current[i] = el as THREE.Group)}
          position={[
            Math.cos((i / skills.length) * Math.PI * 2) * 1.2,
            0,
            Math.sin((i / skills.length) * Math.PI * 2) * 1.2,
          ]}
        >
          <Text
            color="#ffffff"
            fontSize={0.15}
            maxWidth={1}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign="center"
            font="https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBBSSJLm2E.woff"
          >
            {skill}
          </Text>
        </group>
      ))}

      {/* Particle system */}
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.pos as [number, number, number]}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial
            color="#818cf8"
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
import { useEffect, useId, useRef } from 'react';
import { motion, useAnimate, useMotionValue, useSpring } from 'motion/react';
import type { AnimationSequence } from 'motion/react';
import { useContent } from '../src/hooks/useContent';
import { useMediaQuery } from '../src/hooks/useMediaQuery';

// Trazos del logo JL (mismos de public/logo.svg). El viewBox de los <svg> va
// recortado al contorno real de las letras para que el logo llene su espacio.
const LOGO_TRANSFORM = 'skewX(-10) translate(20, 10)';
const PATH_J = 'M65 15 L65 75 Q65 95 40 95 L15 95 L20 75 L35 75 Q45 75 45 68 L45 15 L65 15 Z';
const PATH_L = 'M75 15 L75 95 L135 95 L140 75 L95 75 L95 15 L75 15 Z';
// Facetas claras que dan el "corte" a cada letra
const FACET_J = 'M45 25 L65 15 L65 25 L45 35 Z';
const FACET_L = 'M120 75 L140 75 L135 85 L115 85 Z';

// Colores de marca fijos: el logo se ve igual en tema claro y oscuro
const BRAND_FROM = '#8b6dff';
const BRAND_TO = '#3b82f6';
const BRAND_GLOW = 'rgb(124 92 255 / 0.4)';

// Copias del contorno detrás del logo: al inclinarse forman la profundidad
const DEPTH_LAYERS = 7;
const LAYER_GAP = 13; // px entre capas en el eje Z

const svgClass = 'absolute inset-0 m-auto w-[82%] overflow-visible';

/*
 * "Compilación" al hacer clic: las letras se parten en 8 franjas horizontales,
 * cada franja sale volando y en su lugar se teclea una línea de código del
 * stack; al final el código se compacta y las franjas vuelven a formar el JL.
 * Las franjas son copias del logo recortadas con un clipPath (vector).
 */
// Alto de cada franja en unidades del logo: las letras van de y=15 a y=95
const BAND_TOP = 15;
const BAND_HEIGHT = 10;
// Desplazamiento de cada franja al partirse: dispar a propósito, no uniforme
const SPLIT_OFFSETS = [-9, 12, -6, 14, -11, 7, -13, 10];
// Código que aparece en cada franja (React/Next, Node, Python/FastAPI, SQL, IA)
const CODE_LINES = [
  "import { Hero } from './ui';",
  'const app = express();',
  "app.get('/api/projects', list);",
  '@app.post("/ai/chat")',
  'async def chat(msg: Prompt):',
  'SELECT * FROM projects;',
  'await openai.chat(prompt);',
  'export default function JL() {}',
];
const KEYWORDS = /(\b(?:import|from|const|async|await|def|SELECT|FROM|export|default|function)\b)/;
const CODE_X = 24; // donde empieza el código (los números de línea van antes)
const TYPE_WIDTH = 140; // ancho que alcanza la máscara de tecleo
// La entrada (trazo, relleno y capas) termina hacia 2.6 s; antes de eso el clic se ignora
const ENTRANCE_MS = 2600;
// Curva ease-out del proyecto (la misma de fade-up y word-rise)
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const bandIndexes = CODE_LINES.map((_, index) => index);
// Línea base del texto de la franja i, en coordenadas del viewBox (logo + 10)
const lineBaseline = (index: number) => BAND_TOP + 10 + index * BAND_HEIGHT + BAND_HEIGHT / 2 + 2;

/*
 * Cada tramo lleva su valor de partida explícito ([desde, hasta]): en una
 * secuencia de Motion, si un mismo elemento se anima en dos tramos separados,
 * el hueco entre ellos se interpola. Con el mismo valor a ambos lados del hueco,
 * el elemento queda quieto hasta su siguiente tramo.
 */
/** Secuencia completa (~3.2 s): partir, teclear código, compactar y rearmar. */
function buildSequence(): AnimationSequence {
  // Las capas de profundidad se apagan mientras el logo está desarmado
  const sequence: AnimationSequence = [['.jl-depth', { opacity: [1, 0] }, { duration: 0.3, at: 0 }]];

  bandIndexes.forEach((index) => {
    const offset = SPLIT_OFFSETS[index];
    const flyAt = 0.5 + index * 0.06;
    const returnAt = 2.0 + index * 0.035;
    sequence.push(
      // 1. Las letras se parten: cada franja se corre a un lado
      [`.jl-strip-${index}`, { x: [0, offset] }, { duration: 0.45, ease: EASE_OUT, at: index * 0.03 }],
      // 2. Cada franja sale volando y en su lugar se teclea una línea de código
      [`.jl-strip-${index}`, { x: [offset, 70], opacity: [1, 0] }, { duration: 0.45, ease: EASE_OUT, at: flyAt }],
      [`.jl-code-${index}`, { opacity: [0, 1] }, { duration: 0.15, at: flyAt + 0.05 }],
      [`.jl-type-${index}`, { width: [0, TYPE_WIDTH] }, { duration: 0.5, ease: 'linear', at: flyAt + 0.05 }],
      // 3. El código se compacta y las franjas vuelven a su sitio con un leve rebote
      [`.jl-code-${index}`, { scaleX: [1, 0.15], opacity: [1, 0] }, { duration: 0.35, ease: EASE_OUT, at: returnAt }],
      [
        `.jl-strip-${index}`,
        { x: [70, 0], opacity: [0, 1] },
        { type: 'spring', duration: 0.55, bounce: 0.2, at: returnAt + 0.08 },
      ],
    );
  });

  sequence.push(
    // 4. Destello de facetas y vuelve la profundidad: el logo quedó "compilado"
    ['.jl-strip-facet', { opacity: [0.35, 0.95, 0.35] }, { duration: 0.5, at: 2.65 }],
    ['.jl-depth', { opacity: [0, 1] }, { duration: 0.3, at: 2.65 }],
  );
  return sequence;
}

/** Versión con "reducir movimiento": un fundido al código y de vuelta, sin desplazamientos. */
const REDUCED_SEQUENCE: AnimationSequence = [
  ['.jl-type', { width: [TYPE_WIDTH, TYPE_WIDTH] }, { duration: 0, at: 0 }],
  ['.jl-real', { opacity: [1, 0] }, { duration: 0.3, at: 0 }],
  ['.jl-depth', { opacity: [1, 0] }, { duration: 0.3, at: 0 }],
  ['.jl-code', { opacity: [0, 1] }, { duration: 0.3, at: 0 }],
  ['.jl-code', { opacity: [1, 0] }, { duration: 0.3, at: 1.8 }],
  ['.jl-real', { opacity: [0, 1] }, { duration: 0.3, at: 1.8 }],
  ['.jl-depth', { opacity: [0, 1] }, { duration: 0.3, at: 1.8 }],
];

/** Deja el código oculto y las máscaras de tecleo cerradas para el próximo clic. */
const RESET_SEQUENCE: AnimationSequence = [
  ['.jl-code', { scaleX: 1, opacity: 0 }, { duration: 0, at: 0 }],
  ['.jl-type', { width: 0 }, { duration: 0, at: 0 }],
];

/** Colorea las palabras clave de una línea de código. */
function CodeTokens({ line }: { line: string }) {
  return (
    <>
      {line.split(KEYWORDS).map((part, index) =>
        KEYWORDS.test(part) ? (
          <tspan key={index} style={{ fill: 'rgb(var(--accent-fg))' }}>
            {part}
          </tspan>
        ) : (
          part
        ),
      )}
    </>
  );
}

/**
 * Pieza visual del hero: el logo JL se dibuja trazo a trazo, se rellena con el
 * degradado de marca y queda flotando con profundidad. Se inclina hacia el
 * cursor y lo rodean dos órbitas. Es SVG + CSS 3D (sin WebGL).
 * Es un botón: al hacer clic (o Enter) se "compila", se desarma en líneas de
 * código y se vuelve a armar.
 */
export default function HeroLogo() {
  const { labels } = useContent();
  const gradientId = useId();
  const clipId = useId();
  const baseId = useId();
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const canHover = useMediaQuery('(hover: hover)');
  const [scope, animate] = useAnimate();
  // Mientras corre la secuencia (o la entrada) se ignoran los clics
  const busy = useRef(false);
  const ready = useRef(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(pointerX, { stiffness: 70, damping: 16 });
  const rotateX = useSpring(pointerY, { stiffness: 70, damping: 16 });
  // Al pasar el mouse el logo se adelanta un poco: pista de que se puede clicar
  const scale = useSpring(1, { stiffness: 260, damping: 20 });

  // Inclinación hacia el cursor (solo con mouse y sin "reducir movimiento")
  useEffect(() => {
    if (prefersReducedMotion || !canHover) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(((event.clientX / window.innerWidth) * 2 - 1) * 22);
      pointerY.set(-((event.clientY / window.innerHeight) * 2 - 1) * 16);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [prefersReducedMotion, canHover, pointerX, pointerY]);

  // El clic se habilita cuando termina la entrada del logo
  useEffect(() => {
    const timer = window.setTimeout(() => {
      ready.current = true;
    }, prefersReducedMotion ? 0 : ENTRANCE_MS);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  const handleBuild = async () => {
    const root = scope.current as HTMLElement | null;
    if (busy.current || !ready.current || !root) return;
    busy.current = true;
    const real = root.querySelector<SVGGElement>('.jl-real');
    const strips = root.querySelector<SVGGElement>('.jl-strips');
    try {
      if (prefersReducedMotion) {
        await animate(REDUCED_SEQUENCE);
      } else {
        // Se cambia el logo real por las franjas (idénticas en reposo) y al final al revés
        if (real) real.style.opacity = '0';
        if (strips) strips.style.opacity = '1';
        await animate(buildSequence());
      }
    } finally {
      if (real) real.style.opacity = '1';
      if (strips) strips.style.opacity = '0';
      await animate(RESET_SEQUENCE);
      busy.current = false;
    }
  };

  const handleHover = (hovering: boolean) => {
    if (canHover && !prefersReducedMotion) scale.set(hovering ? 1.04 : 1);
  };

  const fill = `url(#${gradientId})`;

  return (
    <button
      ref={scope}
      type="button"
      onClick={handleBuild}
      onPointerEnter={() => handleHover(true)}
      onPointerLeave={() => handleHover(false)}
      aria-label={labels.heroLogo}
      className="relative block aspect-square w-full cursor-pointer rounded-3xl"
      style={{ perspective: 1100 }}
    >
      {/* Halo */}
      <div
        aria-hidden
        className="absolute inset-[12%] rounded-full"
        style={{ background: `radial-gradient(closest-side, ${BRAND_GLOW}, transparent)` }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{ rotateX, rotateY, scale }}
      >
        {/* Órbitas con un punto que las recorre */}
        <div className="absolute inset-[4%] [transform-style:preserve-3d]" style={{ transform: 'rotateX(74deg)' }}>
          <div className="orbit-ring h-full w-full animate-orbit">
            <span className="orbit-dot" />
          </div>
        </div>
        <div
          className="absolute inset-[14%] [transform-style:preserve-3d]"
          style={{ transform: 'rotateX(68deg) rotateY(38deg)' }}
        >
          <div className="orbit-ring h-full w-full animate-orbit [animation-direction:reverse] [animation-duration:16s]">
            <span className="orbit-dot" />
          </div>
        </div>

        {/* Logo flotando */}
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Capas de profundidad (se apagan durante la "compilación") */}
          <div className="jl-depth absolute inset-0 [transform-style:preserve-3d]">
            {Array.from({ length: DEPTH_LAYERS }, (_, index) => (
              <motion.svg
                key={index}
                viewBox="8 14 158 102"
                className={svgClass}
                style={{ transform: `translateZ(${-(index + 1) * LAYER_GAP}px)` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 - index * 0.06 }}
                transition={{ duration: 0.6, delay: 1.5 + index * 0.07 }}
              >
                <g
                  transform={LOGO_TRANSFORM}
                  fill={BRAND_FROM}
                  fillOpacity="0.12"
                  stroke={BRAND_FROM}
                  strokeWidth="1"
                  strokeLinejoin="round"
                >
                  <path d={PATH_J} />
                  <path d={PATH_L} />
                </g>
              </motion.svg>
            ))}
          </div>

          {/* Cara frontal: se dibuja el contorno y luego aparece el relleno */}
          <svg viewBox="8 14 158 102" className={svgClass} style={{ transform: 'translateZ(28px)' }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={BRAND_FROM} />
                <stop offset="100%" stopColor={BRAND_TO} />
              </linearGradient>
              <clipPath id={clipId}>
                <path d={PATH_J} />
                <path d={PATH_L} />
              </clipPath>
              {/* Franjas horizontales del logo (en coordenadas del logo, antes del skew) */}
              {bandIndexes.map((index) => (
                <clipPath key={index} id={`${baseId}-band-${index}`}>
                  <rect x={-40} y={BAND_TOP + index * BAND_HEIGHT - 0.25} width={240} height={BAND_HEIGHT + 0.5} />
                </clipPath>
              ))}
              {/* Máscaras de tecleo: cada línea de código se revela de izquierda a derecha */}
              {bandIndexes.map((index) => (
                <mask
                  key={index}
                  id={`${baseId}-type-${index}`}
                  maskUnits="userSpaceOnUse"
                  x="8"
                  y="14"
                  width="158"
                  height="102"
                >
                  <rect
                    className={`jl-type jl-type-${index}`}
                    x={CODE_X}
                    y={lineBaseline(index) - 7}
                    width={0}
                    height={10}
                    fill="#fff"
                  />
                </mask>
              ))}
            </defs>

            {/* Logo real (con su entrada: trazo, relleno, facetas y destello) */}
            <g className="jl-real">
              <g transform={LOGO_TRANSFORM}>
                {[PATH_J, PATH_L].map((d, index) => (
                  <motion.path
                    key={d}
                    d={d}
                    fill={fill}
                    stroke={BRAND_FROM}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, fillOpacity: 0 }}
                    animate={{ pathLength: 1, fillOpacity: 1 }}
                    transition={{
                      pathLength: { duration: 1.4, delay: 0.3 + index * 0.25, ease: 'easeInOut' },
                      fillOpacity: { duration: 0.8, delay: 1.4 + index * 0.2 },
                    }}
                  />
                ))}

                {[FACET_J, FACET_L].map((d) => (
                  <motion.path
                    key={d}
                    d={d}
                    fill="#fff"
                    initial={{ fillOpacity: 0 }}
                    animate={{ fillOpacity: 0.35 }}
                    transition={{ duration: 0.6, delay: 2 }}
                  />
                ))}

                {/* Destello que cruza el logo cada pocos segundos */}
                <g clipPath={`url(#${clipId})`}>
                  <motion.rect
                    y="0"
                    width="34"
                    height="120"
                    fill="#fff"
                    fillOpacity="0.45"
                    transform="skewX(-20)"
                    initial={{ x: -60 }}
                    animate={{ x: 240 }}
                    transition={{ duration: 1.3, delay: 2.6, repeat: Infinity, repeatDelay: 4.5, ease: 'easeInOut' }}
                  />
                </g>
              </g>
            </g>

            {/* Franjas para la "compilación": ocultas hasta el clic */}
            <g className="jl-strips" style={{ opacity: 0 }}>
              <g transform={LOGO_TRANSFORM}>
                {bandIndexes.map((index) => (
                  <g key={index} className={`jl-strip-${index}`}>
                    <g clipPath={`url(#${baseId}-band-${index})`}>
                      <path d={PATH_J} fill={fill} stroke={BRAND_FROM} strokeWidth="1.5" strokeLinejoin="round" />
                      <path d={PATH_L} fill={fill} stroke={BRAND_FROM} strokeWidth="1.5" strokeLinejoin="round" />
                      <path className="jl-strip-facet" d={FACET_J} fill="#fff" opacity={0.35} />
                      <path className="jl-strip-facet" d={FACET_L} fill="#fff" opacity={0.35} />
                    </g>
                  </g>
                ))}
              </g>
            </g>

            {/* Código que reemplaza a cada franja */}
            <g className="font-mono" fontSize={5.6}>
              {CODE_LINES.map((line, index) => (
                <g
                  key={index}
                  className={`jl-code jl-code-${index}`}
                  style={{ opacity: 0, transformBox: 'fill-box', transformOrigin: 'center' }}
                >
                  <text x={CODE_X - 4} y={lineBaseline(index)} textAnchor="end" style={{ fill: 'rgb(var(--muted))' }}>
                    {index + 1}
                  </text>
                  <text
                    x={CODE_X}
                    y={lineBaseline(index)}
                    mask={`url(#${baseId}-type-${index})`}
                    style={{ fill: 'rgb(var(--fg))' }}
                  >
                    <CodeTokens line={line} />
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </motion.div>
      </motion.div>
    </button>
  );
}

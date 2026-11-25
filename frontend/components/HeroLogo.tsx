import { useEffect, useId, useRef } from 'react';
import { motion, useAnimate, useMotionValue, useSpring } from 'motion/react';
import type { AnimationSequence } from 'motion/react';
import { useContent } from '../src/hooks/useContent';
import { useMediaQuery } from '../src/hooks/useMediaQuery';

import { FACET_J, FACET_L, LOGO_TRANSFORM, PATH_J, PATH_L } from './ui/LogoMark';

// viewBox con margen alrededor de las letras: el SVG recorta lo que queda fuera,
// así la pasada entra desde el borde del marco y no cruza sobre el titular.
const VIEW_BOX = '0 4 174 122';

// Momento de entrada (ms) de cada letra; la L sigue a la J como en una pasada
const LETTERS = [
  { key: 'j', d: PATH_J, facet: FACET_J, delay: 150 },
  { key: 'l', d: PATH_L, facet: FACET_L, delay: 270 },
];
// Copias fantasma detrás de cada letra (la estela)
const GHOSTS = [1, 2, 3];
// Líneas de velocidad que cruzan detrás: altura (y), largo y retraso (ms)
const SPEED_LINES = [
  { y: 30, width: 70, delay: 60 },
  { y: 48, width: 110, delay: 0 },
  { y: 66, width: 90, delay: 110 },
  { y: 84, width: 60, delay: 40 },
  { y: 100, width: 80, delay: 150 },
];

/*
 * "Compilación" al hacer clic: las letras se parten en 8 franjas horizontales,
 * cada franja sale volando y en su lugar se teclea una línea de código del
 * stack; al final el código se compacta y las franjas vuelven a formar el JL.
 * Las franjas son copias del logo recortadas con un clipPath, así que todo
 * sigue siendo vector (nítido).
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
// La entrada (pasada) termina hacia 1.5 s; antes de eso el clic se ignora
const ENTRANCE_MS = 1500;
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
  const sequence: AnimationSequence = [['.jl-strip-shadow', { opacity: [1, 0] }, { duration: 0.3, at: 0 }]];

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
    // 4. Destello de facetas y la sombra vuelve: el logo quedó "compilado"
    ['.jl-strip-facet', { opacity: [0.35, 0.95, 0.35] }, { duration: 0.5, at: 2.65 }],
    ['.jl-strip-shadow', { opacity: [0, 1] }, { duration: 0.3, at: 2.65 }],
  );
  return sequence;
}

/** Versión con "reducir movimiento": un fundido al código y de vuelta, sin desplazamientos. */
const REDUCED_SEQUENCE: AnimationSequence = [
  ['.jl-type', { width: [TYPE_WIDTH, TYPE_WIDTH] }, { duration: 0, at: 0 }],
  ['.jl-real', { opacity: [1, 0] }, { duration: 0.3, at: 0 }],
  ['.jl-code', { opacity: [0, 1] }, { duration: 0.3, at: 0 }],
  ['.jl-code', { opacity: [1, 0] }, { duration: 0.3, at: 1.8 }],
  ['.jl-real', { opacity: [0, 1] }, { duration: 0.3, at: 1.8 }],
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
 * Pieza visual del hero: el logo JL entra como una moto en una pasada (la J y
 * luego la L, con estela y líneas de velocidad), frena con un leve rebote y las
 * facetas destellan. La entrada es CSS (`.logo-*` en globals.css), así que se
 * pinta antes de hidratar; después el logo queda quieto y solo se desplaza un
 * poco hacia el cursor. Al hacer clic (o Enter) se "compila": se desarma en
 * líneas de código y se vuelve a armar. Los colores salen de `--logo-from` /
 * `--logo-to`.
 *
 * Todo el movimiento ocurre dentro del SVG y en 2D: una inclinación 3D (CSS
 * perspective/rotateX) o una mask-image de CSS hacen que Chrome rasterice el
 * SVG como textura y los bordes diagonales se ven pixelados.
 */
export default function HeroLogo() {
  const { labels } = useContent();
  const baseId = useId();
  const gradientId = `${baseId}-gradient`;
  const fadeId = `${baseId}-fade`;
  const maskId = `${baseId}-mask`;
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const [scope, animate] = useAnimate();
  // Mientras corre la secuencia (o la entrada) se ignoran los clics
  const busy = useRef(false);
  const ready = useRef(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 70, damping: 16 });
  const y = useSpring(pointerY, { stiffness: 70, damping: 16 });
  // Un leve giro acompaña al desplazamiento horizontal
  const rotate = useSpring(useMotionValue(0), { stiffness: 70, damping: 16 });
  // Al pasar el mouse el logo se adelanta un poco: pista de que se puede clicar
  const scale = useSpring(1, { stiffness: 260, damping: 20 });

  // Desplazamiento hacia el cursor (solo con mouse y sin "reducir movimiento")
  useEffect(() => {
    if (prefersReducedMotion || !canHover) return;

    const handlePointerMove = (event: PointerEvent) => {
      const dx = (event.clientX / window.innerWidth) * 2 - 1;
      const dy = (event.clientY / window.innerHeight) * 2 - 1;
      // Unidades del viewBox (174 de ancho): unos pocos px en pantalla
      pointerX.set(dx * 5);
      pointerY.set(dy * 3);
      rotate.set(dx * 1.5);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [prefersReducedMotion, canHover, pointerX, pointerY, rotate]);

  // El clic se habilita cuando termina la pasada de entrada
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
      className="relative block aspect-[174/122] w-full cursor-pointer rounded-3xl"
    >
      <svg viewBox={VIEW_BOX} aria-hidden className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: 'var(--logo-from)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--logo-to)' }} />
          </linearGradient>
          {/* Borde izquierdo difuminado: la pasada entra desde el marco sin un corte seco */}
          <linearGradient id={fadeId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#000" />
            <stop offset="0.08" stopColor="#fff" />
          </linearGradient>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="4" width="174" height="122">
            <rect x="0" y="4" width="174" height="122" fill={`url(#${fadeId})`} />
          </mask>
          {/* Franjas horizontales del logo (en coordenadas del logo, antes del skew) */}
          {bandIndexes.map((index) => (
            <clipPath key={index} id={`${baseId}-band-${index}`}>
              <rect x={-40} y={BAND_TOP + index * BAND_HEIGHT - 0.25} width={240} height={BAND_HEIGHT + 0.5} />
            </clipPath>
          ))}
          {/* Máscaras de tecleo: cada línea de código se revela de izquierda a derecha */}
          {bandIndexes.map((index) => (
            <mask key={index} id={`${baseId}-type-${index}`} maskUnits="userSpaceOnUse" x="0" y="4" width="174" height="122">
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

        <g mask={`url(#${maskId})`}>
          {/* Líneas de velocidad detrás del logo */}
          {SPEED_LINES.map((line) => (
            <rect
              key={line.y}
              className="logo-speed-line"
              x={-10}
              y={line.y}
              width={line.width}
              height={1.6}
              rx={0.8}
              style={{ animationDelay: `${line.delay}ms` }}
            />
          ))}

          {/* Respuesta al cursor, con origen fijo en el centro del logo */}
          <motion.g style={{ x, y, rotate, scale, transformBox: 'view-box', transformOrigin: '87px 65px' }}>
            {/* Logo real (con la pasada de entrada) */}
            <g className="jl-real">
              <g transform={LOGO_TRANSFORM}>
                {/* Sombra desplazada: aparece cuando el logo ya frenó */}
                <g className="logo-shadow" transform="translate(5 5)">
                  <path d={PATH_J} />
                  <path d={PATH_L} />
                </g>

                {LETTERS.map((letter) => (
                  <g key={letter.key}>
                    {/* Estela: copias que llegan con retraso y se recogen en la letra */}
                    {GHOSTS.map((ghost) => (
                      <g
                        key={ghost}
                        className="logo-ghost"
                        style={{
                          animationDelay: `${letter.delay + ghost * 45}ms`,
                          ['--ghost-opacity' as string]: 0.5 - ghost * 0.12,
                        }}
                      >
                        <path d={letter.d} fill={fill} />
                      </g>
                    ))}

                    <g className="logo-letter" style={{ animationDelay: `${letter.delay}ms` }}>
                      <path d={letter.d} fill={fill} />
                      <path
                        className="logo-facet"
                        d={letter.facet}
                        fill="#fff"
                        style={{ animationDelay: `${letter.delay + 820}ms` }}
                      />
                    </g>
                  </g>
                ))}
              </g>
            </g>

            {/* Franjas para la "compilación": ocultas hasta el clic */}
            <g className="jl-strips" style={{ opacity: 0 }}>
              <g transform={LOGO_TRANSFORM}>
                <g className="jl-strip-shadow" transform="translate(5 5)" style={{ fill: 'rgb(var(--accent))', opacity: 1 }}>
                  <g opacity={0.3}>
                    <path d={PATH_J} />
                    <path d={PATH_L} />
                  </g>
                </g>
                {bandIndexes.map((index) => (
                  <g key={index} className={`jl-strip-${index}`}>
                    <g clipPath={`url(#${baseId}-band-${index})`}>
                      <path d={PATH_J} fill={fill} />
                      <path d={PATH_L} fill={fill} />
                      <path className="jl-strip-facet" d={FACET_J} fill="#fff" opacity={0.35} />
                      <path className="jl-strip-facet" d={FACET_L} fill="#fff" opacity={0.35} />
                    </g>
                  </g>
                ))}
              </g>
            </g>
          </motion.g>
        </g>

        {/* Código que reemplaza a cada franja (fuera de la máscara del borde) */}
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
    </button>
  );
}

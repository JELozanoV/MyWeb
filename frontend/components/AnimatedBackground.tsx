// Fondo fijo del sitio: rejilla tenue y dos halos de color. Es solo CSS
// (ver `.site-bg-*` en globals.css), así que no cuesta JS ni re-renders.
export default function AnimatedBackground() {
  return (
    <div aria-hidden className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-bg">
      <div className="absolute inset-0 site-bg-grid" />
      <div
        className="site-bg-halo animate-drift -top-[20%] -left-[10%] h-[70vmax] w-[70vmax]"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--accent)), transparent)' }}
      />
      <div
        className="site-bg-halo animate-drift top-[30%] -right-[20%] h-[60vmax] w-[60vmax]"
        style={{
          background: 'radial-gradient(closest-side, rgb(var(--accent-2)), transparent)',
          animationDelay: '-9s',
        }}
      />
    </div>
  );
}

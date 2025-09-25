import app from './app';

const DEFAULT_PORT = Number(process.env.PORT) || 5000;

function startServer(port: number, attemptsLeft = 5): void {
  const server = app
    .listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
    .on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE' && attemptsLeft > 0) {
        const nextPort = port + 1;
        console.warn(`Port ${port} is in use. Trying ${nextPort}...`);
        setTimeout(() => startServer(nextPort, attemptsLeft - 1), 100);
      } else {
        console.error('Failed to start server:', err);
        process.exit(1);
      }
    });
}

startServer(DEFAULT_PORT);
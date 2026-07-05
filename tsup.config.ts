import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // Peers + anything the consumer supplies. CSS/tokens ship as source (styles.css).
  external: ['react', 'react-dom', 'react/jsx-runtime', 'tailwindcss'],
});

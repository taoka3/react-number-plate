import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/NumberPlate.tsx', 'src/index.ts'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/main.tsx', 'src/App.tsx', 'src/App.css'],
      outDir: 'dist',
      insertTypesEntry: true,
      copyDtsFiles: true,
      staticImport: true,
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactNumberPlate',
      formats: ['es', 'umd'],
      fileName: (format) => `react-number-plate.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'style.css';
          }
          if (assetInfo.name && assetInfo.name.endsWith('.ttf')) {
            return 'assets/[name][extname]';
          }
          return assetInfo.name || '';
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true,
    copyPublicDir: false,
  }
})

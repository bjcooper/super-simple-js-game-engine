import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      formats: ['cjs'],
      entry: path.resolve(__dirname, 'index.ts'),
      fileName: (format) => 'index.js'
    }
  },
  plugins: [
    AutoImport({
      dts: 'index.ts',
      include: [
        /\.ts$/
      ],
      dirs: [
        'src',
        'src/composition',
      ]
    })
  ],
  optimizeDeps: {
    disabled: true
  }
})
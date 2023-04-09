import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  optimizeDeps: {
    disabled: true
  },
  plugins: [
    AutoImport({
      dts: 'src/index.d.ts',
      exclude: [
        'src/index.d.ts'
      ],
      dirs: [
        './src/**',
      ]
    })
  ],
})
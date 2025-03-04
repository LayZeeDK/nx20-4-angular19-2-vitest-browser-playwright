/// <reference types='vitest' />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

const isCi = !!process.env['CI'];

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/angular-app',
  plugins: [angular(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  test: {
    watch: false,
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['src/test-setup.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/angular-app',
      provider: 'v8',
    },
    ui: true,
    api: {
      host: 'localhost',
      port: 3000,
      strictPort: true,
    },
    browser: {
      provider: 'playwright',
      enabled: true,
      name: 'chromium',
      headless: isCi,
      api: {
        host: 'localhost',
        port: 3030,
        strictPort: true,
      },
    },
  },
});

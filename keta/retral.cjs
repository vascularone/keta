const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

esbuild.build({
  entryPoints: ['apps/retral/src/main.ts'],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  outfile: 'dist/retral/main.cjs',
  sourcemap: true,
  plugins: [nodeExternalsPlugin()]
}).then(() => console.log('done compiling')).catch(() => process.exit(1))

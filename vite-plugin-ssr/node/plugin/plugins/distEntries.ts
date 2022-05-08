export { distEntriesPlugin }

import type { Plugin } from 'vite'
import { distImporter } from 'vite-plugin-dist-importer'
import { assert, assertPosixPath, assertUsage, isSSR_config, projectInfo, toPosixPath, unique } from '../utils'
import path from 'path'
import fs from 'fs'
//import resolve from 'resolve'
import { getGlobRoots } from './generateImportGlobs/getGlobRoots'
import { assertViteConfig } from './config/assertConfig'

const importerCode = [
  `const { __internals: { setDistEntries } } = require('${require.resolve('vite-plugin-ssr')}');`,
  //"const { __internals: { setDistEntries } } = require('vite-plugin-ssr');",
  'setDistEntries({',
  "  pageFiles: () => import('./pageFiles.js'),",
  "  clientManifest: () => require('../client/manifest.json'),",
  "  pluginManifest: () => require('../client/vite-plugin-ssr.json'),",
  '});',
  '',
].join('\n')

function distEntriesPlugin(): Plugin[] {
  return [
    distImporter({
      importerCode,
      projectName: projectInfo.projectName,
    }),
    // _createNodeModulesSymlink(),
  ]
}

function _createNodeModulesSymlink(): Plugin {
  let ssr: boolean
  let root: string
  let providerPaths: string[]
  return {
    name: 'vite-plugin-ssr:ensure_node_modules_link',
    async configResolved(config) {
      assertViteConfig(config)
      providerPaths = await getGlobRoots(config)
      root = toPosixPath(config.root)
      ssr = isSSR_config(config)
    },
    async generateBundle() {
      assert(typeof ssr === 'boolean')
      assertPosixPath(root)
      if (!ssr) return
      await generateSymlink()
    },
  }

  async function generateSymlink() {
    let target = path.posix.join(root, 'node_modules', 'vite-plugin-ssr')
    if (!fs.existsSync(target)) {
      const roots = unique([root, toPosixPath(process.cwd()), ...providerPaths])
      let success = false
      /*
      roots.forEach((p) => {
        const source = path.posix.dirname(resolve.sync('vite-plugin-ssr/package.json'))
      })
      */
      assertUsage(
        success,
        'Could not find the npm package `vite-plugin-ssr`. Reach out to the vite-plugin-ssr maintainer on GitHub or Discord. Searched in following paths:\n' +
          roots.join('\n'),
      )
    }
  }
}

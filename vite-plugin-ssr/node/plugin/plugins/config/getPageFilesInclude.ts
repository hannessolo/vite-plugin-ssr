import { toPosixPath } from '../../utils'
import type { ConfigVitePluginSsr } from './types'

export { getPageFilesInclude }

function getPageFilesInclude(config: ConfigVitePluginSsr): string[] {
  const { pageFiles } = config.vitePluginSsr
  const pageFilesInclude: string[] = []
  if (pageFiles?.include) {
    pageFilesInclude.push(...pageFiles.include.map(normalizeIncludePaths))
  }
  return pageFilesInclude
}

function normalizeIncludePaths(includePath: string): string {
  includePath = toPosixPath(includePath)
  if (includePath.endsWith('/')) {
    includePath = includePath.slice(0, -1)
  }
  return includePath
}

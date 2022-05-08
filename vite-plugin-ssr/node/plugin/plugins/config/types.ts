export type { VpsConfig }
export type { ConfigVitePluginSsr }

type ConfigVitePluginSsr = { vitePluginSsr: VpsConfig }

type VpsConfig = {
  pageFiles?: { include?: string[] }
  prerender?:
    | boolean
    | {
        partial?: boolean
        noExtraDir?: boolean
        parallel?: number
      }
  disableBuildChaining?: boolean
}

import { assign } from '../utils'

export interface MiniProgramConfig {
  webUrlToMiniProgramUrl?: (url: string) => string
}

const miniProgramConfig: MiniProgramConfig = {}

export function getMiniProgramConfig(): Readonly<MiniProgramConfig> {
  return miniProgramConfig
}

export function setMiniProgramConfig(
  config: Partial<MiniProgramConfig>,
): Readonly<MiniProgramConfig> {
  assign(miniProgramConfig, config)
  return miniProgramConfig
}

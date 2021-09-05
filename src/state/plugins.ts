import type { Plugin } from 'vue'
import { router } from './router'
// @ts-ignore
import { plugin as prose } from '@baleada/vue-prose'
import { createApp } from 'vue'

export const plugins: [plugin: Plugin, ...rest: any[]][] = [
  [router],
  [prose],
]

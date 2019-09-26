import { getRuntimeVM } from './runtime'

export default function useNuxtMarkdownit () {
  const vm = getRuntimeVM(),
        md = vm.$md
  return md
}

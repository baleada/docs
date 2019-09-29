import { getRuntimeVM } from './runtime'

export default function useNuxtMarkdownit () {
  const vm = getRuntimeVM(),
        md = vm.$md

  console.log(md)
  return md
}

/* Adapted from https://github.com/u3u/vue-hooks */
const runtime = {}

function getRuntimeVM () {
  if (runtime.vm) return runtime.vm
  throw new ReferenceError('[runtime] Did not find vue instance.')
}

function setRuntimeVM (vue) {
  const vm = this || vue
  if (typeof vm.$options.setup === 'function') {
    runtime.vm = vm
  }
}

export {
  getRuntimeVM,
  setRuntimeVM,
}

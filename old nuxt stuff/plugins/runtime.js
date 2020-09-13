import Vue from 'vue'
import { setRuntimeVM } from '~/assets/js/runtime'

Vue.mixin({ beforeCreate: setRuntimeVM })

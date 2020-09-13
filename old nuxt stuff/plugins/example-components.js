import Vue from 'vue'
import UseDelayable from '~/components/example/UseDelayable.vue'

Vue.component('UseDelayable', (resolve, reject) => resolve(UseDelayable))

import Vue from 'vue'
import BaleadaLogo from '~/components/global/BaleadaLogo.vue'
import CompositionArticle from '~/components/global/CompositionArticle.vue'
import IconArticle from '~/components/global/IconArticle.vue'
import LibraryArticle from '~/components/global/LibraryArticle.vue'
import NiftyArticle from '~/components/global/NiftyArticle.vue'
import NiftyAside from '~/components/global/NiftyAside.vue'
import NiftyCodeblock from '~/components/global/NiftyCodeblock.vue'
import NiftyHeading from '~/components/global/NiftyHeading.vue'
import NiftyTable from '~/components/global/NiftyTable.vue'
import SubclassArticle from '~/components/global/SubclassArticle.vue'
import UpdatedAt from '~/components/global/UpdatedAt.vue'

Vue.component('BaleadaLogo', (resolve, reject) => resolve(BaleadaLogo))
Vue.component('CompositionArticle', (resolve, reject) => resolve(CompositionArticle))
Vue.component('IconArticle', (resolve, reject) => resolve(IconArticle))
Vue.component('LibraryArticle', (resolve, reject) => resolve(LibraryArticle))
Vue.component('NiftyArticle', (resolve, reject) => resolve(NiftyArticle))
Vue.component('NiftyAside', (resolve, reject) => resolve(NiftyAside))
Vue.component('NiftyCodeblock', (resolve, reject) => resolve(NiftyCodeblock))
Vue.component('NiftyHeading', (resolve, reject) => resolve(NiftyHeading))
Vue.component('NiftyTable', (resolve, reject) => resolve(NiftyTable))
Vue.component('SubclassArticle', (resolve, reject) => resolve(SubclassArticle))
Vue.component('UpdatedAt', (resolve, reject) => resolve(UpdatedAt))

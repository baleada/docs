import Vue from 'vue'
import BaleadaLogo from '~/components/global/BaleadaLogo.vue'
import CompositionArticle from '~/components/global/CompositionArticle.vue'
import IconArticle from '~/components/global/IconArticle.vue'
import LibraryArticle from '~/components/global/LibraryArticle.vue'
import ProseArticle from '~/components/global/ProseArticle.vue'
import ProseAside from '~/components/global/ProseAside.vue'
import ProseCodeblock from '~/components/global/ProseCodeblock.vue'
import ProseHeading from '~/components/global/ProseHeading.vue'
import ProseTable from '~/components/global/ProseTable.vue'
import SubclassArticle from '~/components/global/SubclassArticle.vue'
import UpdatedAt from '~/components/global/UpdatedAt.vue'

Vue.component('BaleadaLogo', (resolve, reject) => resolve(BaleadaLogo))
Vue.component('CompositionArticle', (resolve, reject) => resolve(CompositionArticle))
Vue.component('IconArticle', (resolve, reject) => resolve(IconArticle))
Vue.component('LibraryArticle', (resolve, reject) => resolve(LibraryArticle))
Vue.component('ProseArticle', (resolve, reject) => resolve(ProseArticle))
Vue.component('ProseAside', (resolve, reject) => resolve(ProseAside))
Vue.component('ProseCodeblock', (resolve, reject) => resolve(ProseCodeblock))
Vue.component('ProseHeading', (resolve, reject) => resolve(ProseHeading))
Vue.component('ProseTable', (resolve, reject) => resolve(ProseTable))
Vue.component('SubclassArticle', (resolve, reject) => resolve(SubclassArticle))
Vue.component('UpdatedAt', (resolve, reject) => resolve(UpdatedAt))

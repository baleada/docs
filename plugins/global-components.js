import Vue from 'vue'
import BaleadaLogo from '~/components/global/BaleadaLogo.vue'
import CompositionArticle from '~/components/global/CompositionArticle.vue'
import DocsAdjacentArticleLinks from '~/components/global/DocsAdjacentArticleLinks.vue'
import DocsArticleEdit from '~/components/global/DocsArticleEdit.vue'
import DocsArticleStats from '~/components/global/DocsArticleStats.vue'
import DocsMeta from '~/components/global/DocsMeta.vue'
import IconArticle from '~/components/global/IconArticle.vue'
import LibraryArticle from '~/components/global/LibraryArticle.vue'
import SubclassArticle from '~/components/global/SubclassArticle.vue'

Vue.component('BaleadaLogo', (resolve, reject) => resolve(BaleadaLogo))
Vue.component('CompositionArticle', (resolve, reject) => resolve(CompositionArticle))
Vue.component('DocsAdjacentArticleLinks', (resolve, reject) => resolve(DocsAdjacentArticleLinks))
Vue.component('DocsArticleEdit', (resolve, reject) => resolve(DocsArticleEdit))
Vue.component('DocsArticleStats', (resolve, reject) => resolve(DocsArticleStats))
Vue.component('DocsMeta', (resolve, reject) => resolve(DocsMeta))
Vue.component('IconArticle', (resolve, reject) => resolve(IconArticle))
Vue.component('LibraryArticle', (resolve, reject) => resolve(LibraryArticle))
Vue.component('SubclassArticle', (resolve, reject) => resolve(SubclassArticle))

import type { Component } from 'vue'
import BrandApiDesignSpecCheckmark from '../components/BrandApiDesignSpecCheckmark.vue'
import BrandLogo from '../components/BrandLogo.vue'
import BrandRectangleGradient from '../components/BrandRectangleGradient.vue'
import ExampleBind from '../components/ExampleBind.vue'
import ExampleDelayable from '../components/ExampleDelayable.vue'
import ExampleGridAccessible from '../components/ExampleGridAccessible.vue'
import ExampleListboxAccessible from '../components/ExampleListboxAccessible.vue'
import ExampleModel from '../components/ExampleModel.vue'
import ExampleShow from '../components/ExampleShow.vue'
import ExampleUseClosingCompletion from '../components/ExampleUseClosingCompletion.vue'
import ExampleUseDescription from '../components/ExampleUseDescription.vue'
import ExampleUseDetails from '../components/ExampleUseDetails.vue'
import ExampleUseErrorMessage from '../components/ExampleUseErrorMessage.vue'
import ExampleUseFocus from '../components/ExampleUseFocus.vue'
import ExampleUseHover from '../components/ExampleUseHover.vue'
import ExampleUseLabel from '../components/ExampleUseLabel.vue'
import ExampleUseListboxMulti from '../components/ExampleUseListboxMulti.vue'
import ExampleUseListboxSingle from '../components/ExampleUseListboxSingle.vue'
import ExampleUseMarkdownCompletion from '../components/ExampleUseMarkdownCompletion.vue'
import ExampleUsePress from '../components/ExampleUsePress.vue'
import ExampleUseTablist from '../components/ExampleUseTablist.vue'
import ExampleUseTextbox from '../components/ExampleUseTextbox.vue'
import LayoutAdjacentArticleLinks from '../components/LayoutAdjacentArticleLinks.vue'
import LayoutArticleEdit from '../components/LayoutArticleEdit.vue'
import LayoutArticleLinks from '../components/LayoutArticleLinks.vue'
import LayoutArticleLog from '../components/LayoutArticleLog.vue'
import LayoutExample from '../components/LayoutExample.vue'
import LayoutFooter from '../components/LayoutFooter.vue'
import LayoutNav from '../components/LayoutNav.vue'
import LayoutPackageSummaries from '../components/LayoutPackageSummaries.vue'
import LayoutSearch from '../components/LayoutSearch.vue'
import LayoutTableOfContents from '../components/LayoutTableOfContents.vue'
import LayoutThreeColumn from '../components/LayoutThreeColumn.vue'
import NotFound from '../components/NotFound.md'
import PageIndex from '../components/PageIndex.vue'

export const globalComponents: Component[] = Object.values({
  BrandApiDesignSpecCheckmark,
  BrandLogo,
  BrandRectangleGradient,
  ExampleBind,
  ExampleDelayable,
  ExampleGridAccessible,
  ExampleListboxAccessible,
  ExampleModel,
  ExampleShow,
  ExampleUseClosingCompletion,
  ExampleUseDescription,
  ExampleUseDetails,
  ExampleUseErrorMessage,
  ExampleUseFocus,
  ExampleUseHover,
  ExampleUseLabel,
  ExampleUseListboxMulti,
  ExampleUseListboxSingle,
  ExampleUseMarkdownCompletion,
  ExampleUsePress,
  ExampleUseTablist,
  ExampleUseTextbox,
  LayoutAdjacentArticleLinks,
  LayoutArticleEdit,
  LayoutArticleLinks,
  LayoutArticleLog,
  LayoutExample,
  LayoutFooter,
  LayoutNav,
  LayoutPackageSummaries,
  LayoutSearch,
  LayoutTableOfContents,
  LayoutThreeColumn,
  NotFound,
  PageIndex,
// @ts-expect-error
}).filter(({ name, __name }) => name || __name)

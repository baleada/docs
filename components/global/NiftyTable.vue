<template lang="html">
  <section class="nifty-table w-full sm:w-auto sm:min-w-2 swiper-no-swiping">
    <div v-if="isTypeToFilterable">
      <input
        class="inp w-full bg-gray-100 -shadow"
        placeholder="Type to filter..."
        name="Type to filter"
        type="text"
        :value="filterQuery"
        @input="handleFilterQuery"
      />
      <div class="mt-2 flex items-center">
        <input class="" type="checkbox" :checked="reactiveFilterQueryIsCaseSensitive" @change="handleCaseSensitiveChange" />
        <label class="flex-1 ml-2 text-1 font-500 text-gray-600">Filter is case sensitive</label>
      </div>
    </div>
    <div
      ref="nifty"
      class="scrollable p-2px"
      :class="[
        hasMaxH ? 'max-h-2/3-screen' : '',
        isTypeToFilterable ? 'mt-4' : '',
      ]"
      tabindex="0"
      :aria-label="ariaLabel"
      @keydown="handleKeydown"
    >
      <slot />
    </div>
  </section>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import { useGrid } from '~/assets/js/keyboardAccessibility'

export default {
  name: 'NiftyTable',
  props: {
    hasMaxH: {
      type: Boolean,
      default: false,
    },
    isTypeToFilterable: {
      type: Boolean,
      default: false,
    },
    filterQueryIsCaseSensitive: {
      type: Boolean,
      default: false,
    },
    ariaLabel: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const nifty = ref(null),
          getRows = grid => {
            const body = grid.querySelector('[role="rowgroup"]:last-child'),
                  nodes = body.querySelectorAll('[role="row"]'),
                  rows = []
            nodes.forEach(node => rows.push({ node, text: getRowText(node) }))
            return rows
          },
          getRowText = node => {
            const cells = node.querySelectorAll('[role="gridcell"]')
            let text = ''
            cells.forEach(cell => text += cell.textContent)
            return text
          },
          rows = computed(() => {
            return nifty.value
              ? getRows(nifty.value.querySelector('[role="grid"]'))
              : []
          }),
          reactiveFilterQueryIsCaseSensitive = ref(props.filterQueryIsCaseSensitive),
          filterQuery = ref('')


    function handleCaseSensitiveChange () {
      reactiveFilterQueryIsCaseSensitive.value = !reactiveFilterQueryIsCaseSensitive.value
      handleFilterQuery()
    }

    // TODO: Create dedicated components for each row and cell, and use props to filter, with enter/leave transitions included
    function handleFilterQuery (evt) {
      if (evt) {
        filterQuery.value = evt.target.value
      }

      if (!filterQuery.value) {
        rows.value.forEach(({ node }) => node.style.display = 'table-row')
      } else {
        rows.value
          .filter(({ text }) => {
            return reactiveFilterQueryIsCaseSensitive.value
              ? !text.includes(filterQuery.value)
              : !text.toLowerCase().includes(filterQuery.value.toLowerCase())
          })
          .forEach(({ node }) => node.style.display = 'none')

        rows.value
          .filter(({ text }) => {
            return reactiveFilterQueryIsCaseSensitive.value
              ? text.includes(filterQuery.value)
              : text.toLowerCase().includes(filterQuery.value.toLowerCase())
          })
          .forEach(({ node }) => node.style.display = 'table-row')
      }
    }

    // TODO: use props/refs instead of DOM traversal to apply focus, so that filtered elements are not focusable
    const handleKeydown = useGrid(() => nifty.value)

    return {
      nifty,
      filterQuery,
      handleFilterQuery,
      reactiveFilterQueryIsCaseSensitive,
      handleCaseSensitiveChange,
      handleKeydown,
    }
  },
}
</script>

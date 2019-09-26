<template lang="html">
  <section class="nifty-table">
    <input v-if="isTypeToFilterable" type="text" @change="handleFilterQuery" />
    <div
      ref="nifty"
      class="scrollable"
      :class="[
        hasMaxH ? 'max-h-2/3-screen' : ''
      ]"
      tabindex="0"

    >
      <slot />
    </div>
  </section>
</template>

<script>
import useNifty from '~/assets/js/useNifty'
import toGrid from '~/assets/js/toGrid'

export default {
  props: {
    hasMaxH: {
      type: Boolean,
      default: false,
    },
    isTypeToFilterable: {
      type: Boolean,
      default: false,
    }
  },
  setup() {
    const nifty = useNifty({ postMd: toGrid })

    function handleFilterQuery ({ target: { value } }) {
      // filter based on value
    }

    /* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Grid_Role */
    const keydownDictionary = {
      arrowright: ({ evt: { target } }) => {
        // → 	Moves focus one cell to the right. If focus is on the right-most cell in the row, focus does not move.
        if (target.nextSibling !== null) {
          target.nextSibling.focus()
        }
      },
      arrowleft: ({ evt: { target } }) => {
        // ← 	Moves focus one cell to the left. If focus is on the left-most cell in the row, focus does not move.
        if (target.previousSibling !== null) {
          target.previousSibling.focus()
        }
      },
      arrowdown: ({ evt: { target } }) => {
        // ↓ 	Moves focus one cell down. If focus is on the bottom cell in the column, focus does not move.
        const currentRow = target.parentNode,
              nextRow = currentRow.nextSibling

        if (nextRow !== null) {
          let i, nodeIndex
          while (nodeIndex === undefined) {
            if (currentRow.childNodes[i].isSameNode(target)) {
              nodeIndex = i
            }
            i++
          }

          nextRow.childNodes[i].focus()
        }
      },
      arrowup: ({ evt: { target } }) => {
        // ↑ 	Moves focus one cell up. If focus is on the top cell in the column, focus does not move.
        const currentRow = target.parentNode,
              previousRow = currentRow.previousSibling

        if (previous !== null) {
          let i, nodeIndex
          while (nodeIndex === undefined) {
            if (currentRow.childNodes[i].isSameNode(target)) {
              nodeIndex = i
            }
            i++
          }

          previousRow.childNodes[i].focus()
        }
      },
      home: ({ evt: { target } }) => {
        // Home 	Moves focus to the first cell in the row that contains focus.
        const currentRow = target.parentNode
        currentRow.childNodes[0].focus()
      },
      end: ({ evt: { target } }) => {
        // End 	Moves focus to the last cell in the row that contains focus.
        const currentRow = target.parentNode,
              cells = currentRow.childNodes,
              lastCell = cells.length - 1

        cells[lastCell].focus()
      },
      'meta+home': ({ evt: { target } }) => {
        // ctrl + Home 	Moves focus to the first cell in the first row.
        const currentRow = target.parentNode,
              firstRow = currentRow.parentNode.childNodes[0]

        firstRow.childNodes[0].focus()
      },
      'meta+end': ({ evt: { target } }) => {
        // ctrl + End 	Moves focus to the last cell in the last row.
        const currentRow = target.parentNode,
              firstRow = currentRow.parentNode.childNodes[0],
              cells = firstRow.childNodes,
              lastCell = cells.length - 1

        cells[lastCell].focus()
      },
    }
    // Page Down 	Moves focus down an author-determined number of rows, typically scrolling so the bottom row in the currently visible set of rows becomes one of the first visible rows. If focus is in the last row of the grid, focus does not move.
    // Page Up 	Moves focus up an author-determined number of rows, typically scrolling so the top row in the currently visible set of rows becomes one of the last visible rows. If focus is in the first row of the grid, focus does not move.

    function handleKeydown (evt) {
      console.log(evt.target)
      const key = evt.key.toLowerCase()
      if (evt.ctrlKey || evt.metaKey) {
        if (keydownDictionary.hasOwnProperty(`meta+${key}`)) {
          keydownDictionary[`meta+${key}`](evt)
        }
      } else if (!evt.getModifierState()) {
        if (keydownDictionary.hasOwnProperty(jey)) {
          keydownDictionary[key](evt)
        }
      }
    }


    return {
      nifty,
      handleFilterQuery,
      handleKeydown,
    }
  },
}
</script>

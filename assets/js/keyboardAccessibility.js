function useGrid (gridContainerGetter) {
  /* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Grid_Role */
  const handlers = {
    arrowright: evt => {
      // → Moves focus one cell to the right. If focus is on the right-most cell in the row, focus does not move.
      if (evt.target.nextElementSibling !== null) {
        evt.target.nextElementSibling.focus()
      }
    },
    arrowleft: evt => {
      // ← Moves focus one cell to the left. If focus is on the left-most cell in the row, focus does not move.
      if (evt.target.previousElementSibling !== null) {
        evt.target.previousElementSibling.focus()
      }
    },
    arrowdown: evt => {
      // ↓ Moves focus one cell down. If focus is on the bottom cell in the column, focus does not move.
      const currentRow = evt.target.parentNode,
            currentRowIsHeader = evt.target.matches('[role="columnheader"]'),
            nextRow = currentRowIsHeader ? currentRow.parentNode.nextElementSibling.children[0] : currentRow.nextElementSibling

      if (nextRow !== null) {
        let i = 0, targetIndex
        while (targetIndex === undefined) {
          if (currentRow.children[i].isSameNode(evt.target)) {
            targetIndex = i
          }
          i++
        }

        nextRow.children[targetIndex].focus()
      }
    },
    arrowup: evt => {
      // ↑ Moves focus one cell up. If focus is on the top cell in the column, focus does not move.
      const currentRowIsHeader = evt.target.matches('[role="columnheader"]')

      if (!currentRowIsHeader) {
        const currentRow = evt.target.parentNode,
              currentRowIsFirst = currentRow.matches(':first-child'),
              previousRow = currentRowIsFirst ? currentRow.parentNode.previousElementSibling.children[0] : currentRow.previousElementSibling

        let i = 0, targetIndex
        while (targetIndex === undefined) {
          if (currentRow.children[i].isSameNode(evt.target)) {
            targetIndex = i
          }
          i++
        }

        previousRow.children[targetIndex].focus()
      }
    },
    home: evt => {
      // Home Moves focus to the first cell in the row that contains focus.
      const currentRow = evt.target.parentNode
      currentRow.children[0].focus()
    },
    end: evt => {
      // End Moves focus to the last cell in the row that contains focus.
      const currentRow = evt.target.parentNode,
            cells = currentRow.children,
            lastCell = cells.length - 1

      cells[lastCell].focus()
    },
    'meta+arrowleft': function(evt) {
      this.home(evt)
    },
    'meta+arrowright': function(evt) {
      this.end(evt)
    },
    'meta+arrowup': function(evt) {
      const currentRowIsHeader = evt.target.matches('[role="columnheader"]')

      if (!currentRowIsHeader) {
        const currentRow = evt.target.parentNode,
              header = currentRow.parentNode.previousElementSibling.children[0]

        let i = 0, targetIndex
        while (targetIndex === undefined) {
          if (currentRow.children[i].isSameNode(evt.target)) {
            targetIndex = i
          }
          i++
        }

        header.children[targetIndex].focus()
      }
    },
    'meta+arrowdown': evt => {
      const currentRow = evt.target.parentNode,
            currentRowIsHeader = evt.target.matches('[role="columnheader"]'),
            rows = currentRowIsHeader ? currentRow.parentNode.nextElementSibling.children : currentRow.parentNode.children,
            lastRowIndex = rows.length - 1,
            cells = rows[lastRowIndex].children

      if (!currentRow.isSameNode(rows[lastRowIndex])) {
        let i = 0, targetIndex
        while (targetIndex === undefined) {
          if (currentRow.children[i].isSameNode(evt.target)) {
            targetIndex = i
          }
          i++
        }

        cells[targetIndex].focus()
      }
    },
    'meta+home': evt => {
      // ctrl + Home Moves focus to the first cell in the first row.
      const currentRow = evt.target.parentNode,
            firstRow = currentRow.parentNode.children[0]

      firstRow.children[0].focus()
    },
    'meta+end': evt => {
      // ctrl + End Moves focus to the last cell in the last row.
      const currentRow = evt.target.parentNode,
            rows = currentRow.parentNode.children,
            lastRowIndex = rows.length - 1,
            cells = rows[lastRowIndex].children,
            lastCellIndex = cells.length - 1

      cells[lastCellIndex].focus()
    },
  }
  // Page Down Moves focus down an author-determined number of rows, typically scrolling so the bottom row in the currently visible set of rows becomes one of the first visible rows. If focus is in the last row of the grid, focus does not move.
  // Page Up Moves focus up an author-determined number of rows, typically scrolling so the top row in the currently visible set of rows becomes one of the last visible rows. If focus is in the first row of the grid, focus does not move.

  function handler (evt) {
    const key = evt.key.toLowerCase()

    if (gridContainerGetter().isSameNode(document.activeElement)) {
      if (handlers.hasOwnProperty(key)) {
        evt.preventDefault()
        gridContainerGetter().querySelector('[role="columnheader"]').focus()
      }
    } else if (evt.ctrlKey || evt.metaKey) {
      if (handlers.hasOwnProperty(`meta+${key}`)) {
        evt.preventDefault()
        handlers[`meta+${key}`](evt)
      }
    } else if (handlers.hasOwnProperty(key)) {
      evt.preventDefault()
      handlers[key](evt)
    }
  }

  return handler
}

export {
  useGrid
}

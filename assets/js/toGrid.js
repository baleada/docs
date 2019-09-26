const replacers = [
  {
    regexp: /<table>/g,
    replacement: '<div role="grid">',
  },
  {
    regexp: /<(?:thead|tbody)>/g,
    replacement: '<div role="rowgroup">',
  },
  {
    regexp: /<tr>/g,
    replacement: '<div role="row">',
  },
  {
    regexp: /<th>/g,
    replacement: '<div role="columnheader" tabindex="-1">',
  },
  {
    regexp: /<td>/g,
    replacement: '<div role="gridcell" tabindex="-1">',
  },
  {
    regexp: /<\/(?:table|thead|tbody|tr|th|td)>/g,
    replacement: '</div>',
  },
]

export default function toGrid (tableMarkup) {
  const withRoles = replacers.reduce((withRoles, { regexp, replacement }) => withRoles.replace(regexp, replacement), tableMarkup)

  return withRoles
}

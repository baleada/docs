import simpleSlugify from './simpleSlugify.js'

function isAnchored (route) {
  return /#[\w-]+$/.test(route)
}

export default function scrollToHeader (fullPath, options) {
  options = {
    container: document,
    scrollIntoView: { behavior: 'auto', block: 'start' },
    ...options
  }

  if (!isAnchored(fullPath)) {
    options.container.scrollTop = 0
  } else {
    const anchor = fullPath.split('#')[1].split('.')[0].toLowerCase(),
          heading = Array.from(options.container.querySelectorAll('h1, h2, h3, h4, h5, h6'))
            .find(heading => simpleSlugify(heading.textContent) === anchor)

    if (heading !== undefined) heading.scrollIntoView(options.scrollIntoView)
  }
}

export default function wrapElements (options) {
  options = {
    container: document,
    classes: '',
    selector: '',
    wrapper: 'div',
    ...options
  }

  const elements = options.container.querySelectorAll(options.selector)

  elements.forEach(el => {
    const parent = el.parentNode
    let wrapper = document.createElement(options.wrapper)

    if (typeof options.classes === 'string') wrapper.classList.add(options.classes)
    else options.classes.forEach(c => wrapper.classList.add(c))

    wrapper = parent.insertBefore(wrapper, el)
    wrapper.appendChild(el)
  })
}

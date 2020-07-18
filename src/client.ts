import App from './App.svelte'

document.querySelectorAll('#svelte-widget').forEach((element: HTMLElement) => {
  if (!element.hasChildNodes()) {
    // eslint-disable-next-line no-new
    new App({
      target: element,
    })
  }
})

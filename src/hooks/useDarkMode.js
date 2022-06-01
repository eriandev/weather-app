import { onMount } from 'svelte'

export default function useDarkMode() {
  /** @type {HTMLHtmlElement | null} */
  let htmlRef = null
  onMount(() => htmlRef = document.querySelector('html'))

  /**
   * @param {boolean} activator
  */
  const activatesDarkMode = (activator) => {
    if(!htmlRef) return
    htmlRef.classList.toggle('dark', activator)
  }

  return { activatesDarkMode }
}

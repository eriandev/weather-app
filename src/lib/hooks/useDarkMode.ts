import { onMount } from 'svelte'

export function useDarkMode() {
  let htmlRef: HTMLHtmlElement | null = null

  onMount(() => {
    htmlRef = document.querySelector('html')
  })

  const activatesDarkMode = (activator: boolean) => {
    if (!htmlRef) return
    htmlRef.classList.toggle('dark', activator)
  }

  return { activatesDarkMode }
}

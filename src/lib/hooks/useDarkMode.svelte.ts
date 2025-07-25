export function useDarkMode() {
  let htmlRef = $derived<HTMLHtmlElement | null>(null)

  $effect(() => {
    htmlRef = document.querySelector('html')
  })

  const toggle = (setDarkMode?: boolean) => {
    htmlRef?.classList.toggle('dark', setDarkMode)
  }

  return { toggle }
}

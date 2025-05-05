export function debounce(callBack: () => void, delay = 1000) {
  // eslint-disable-next-line prefer-const
  let timeoutRef: NodeJS.Timeout | undefined
  clearTimeout(timeoutRef)
  timeoutRef = setTimeout(callBack, delay)
}

/**
 * @param {() => void} callBack
 * @param {number=} delay
 */
export function debounce(callBack, delay = 1000) {
  /** @type {NodeJS.Timeout | undefined} */
  /* eslint-disable-next-line */
  let timeoutRef
  clearTimeout(timeoutRef)
  timeoutRef = setTimeout(callBack, delay)
}

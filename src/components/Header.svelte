<script>
  /** @type {string} */
  export let title
  /** @type {string=} */
  export let date
</script>

<header>
  <section class="grid gap-2">
    <span class="text-lg text-gray-500 dark:text-gray-400">{date}</span>
    <h1 class="text-5xl font-extrabold dark:text-white">{title}</h1>
  </section>
</header>

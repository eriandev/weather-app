<script>
  import Icon from '@/components/Icon.svelte'

  /** @type {string} */
  export let title
  /** @type {string} */
  export let date
</script>

<header class="grid grid-cols-[auto_fit-content(100%)] items-center">
  <section class="grid gap-2">
    <span class="text-lg text-gray-500">{date}</span>
    <h1 class="text-5xl font-extrabold">{title}</h1>
  </section>

  <Icon name="location" color="#4B5563" />
</header>

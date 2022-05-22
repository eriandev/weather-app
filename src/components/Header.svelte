<script>
  import Icon from '@/components/Icon.svelte'

  /** @type {string} */
  export let title
  /** @type {string} */
  export let date
</script>

<header class="header">
  <section>
    <span>{date}</span>
    <h1>{title}</h1>
  </section>

  <Icon name="location" color="#4B5563" />
</header>

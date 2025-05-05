<script>
  import { page } from '$app/state'
  import Picture from '@/components/Picture.svelte'
</script>

<section
  class="grid h-full grid-flow-row auto-rows-min content-center items-center gap-y-6 self-center text-center font-montserrat text-gray-800 dark:text-white"
>
  <Picture name="angry-cloud" />
  <h1 class="text-3xl font-extralight uppercase">You have been <strong class="font-semibold">struck</strong> by</h1>
  <article>
    <h2 class="text-8xl font-black">{page.status}</h2>
    <div
      class="mx-auto inline-block w-max rotate-3 overflow-hidden bg-gray-800 px-4 py-2 text-transparent dark:bg-white"
    >
      <h3 class="text-4xl font-semibold uppercase text-white dark:text-gray-800">Error</h3>
    </div>
  </article>
</section>

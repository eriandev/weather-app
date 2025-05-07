<script>
  import LocationModal from '@/components/LocationModal.svelte'
  import '@/app.css'
</script>

<main
  class="relative grid h-full w-full bg-gradient-to-t from-white via-gray-50 to-[rgb(243,244,246,0.95)] p-6 text-center after:bg-gradient-to-t after:from-white after:via-gray-50 after:to-[rgb(243,244,246,0.95)] after:content-none after:[background:radial-gradient(circle,rgba(255,177,51,1)_0%,rgba(255,177,51,1)_50%,rgba(255,142,39,1)_100%)] md:h-auto md:min-h-[796px] md:w-[420px] md:rounded-4xl md:border-8 md:border-gray-50 md:p-10 md:pt-14 md:after:absolute md:after:-top-[80px] md:after:-left-[88px] md:after:-z-[1] md:after:h-[176px] md:after:w-[176px] md:after:rounded-full md:after:content-[''] dark:border-gray-800 dark:from-[rgb(17,24,39,0.75)] dark:via-gray-800 dark:to-gray-900 dark:after:bg-gradient-to-t dark:after:from-white dark:after:via-gray-50 dark:after:to-[rgb(243,244,246,0.95)] dark:after:[background:radial-gradient(circle,rgba(147,152,219,1)_0%,rgba(147,152,219,1)_50%,rgba(110,114,201,1)_100%)] md:dark:after:top-auto md:dark:after:-right-[60px] md:dark:after:-bottom-[40px] md:dark:after:left-auto md:dark:after:h-[128px] md:dark:after:w-[128px]"
>
  <LocationModal />
  <slot />
</main>

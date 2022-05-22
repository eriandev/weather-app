<script>
  import Header from '@/components/Header.svelte'
  import Picture from '@/components/Picture.svelte'
  import Temperature from '@/components/Temperature.svelte'

  const temp = {
    number: 26,
    text: 'sunny',
  }
</script>

<Header title="Kraków" date="September 10, 2021" />
<Picture animated class="mt-12" name="day-sun" alt="Day Sun" />
<Temperature {temp} />

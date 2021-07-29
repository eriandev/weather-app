<script>
    import Header from './components/Header.svelte'
    import Card from './components/Card.svelte'
    import Next5Days from './components/Next-5-Days.svelte'
</script>

<Header />

<Card />

<Next5Days />

<style global>
  @tailwind base;
  @tailwind components;

  body {
    transition: all 1s ease;
  }

  body.dark {
    background-color: #2D3748;
    color: white;
  }

  .flare {
    background: #F12711;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #F5AF19, #F12711);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #F5AF19, #F12711); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .blooker-20{
    background: #E65C00;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #F9D423, #E65C00);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #F9D423, #E65C00); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .blue-sky {
    background: #56CCF2;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #2F80ED, #56CCF2);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #2F80ED, #56CCF2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .cool-sky {
    background: #2980B9;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #FFFFFF, #6DD5FA, #2980B9);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #FFFFFF, #6DD5FA, #2980B9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .moonlit-asteroid {
    background: #0F2027;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>

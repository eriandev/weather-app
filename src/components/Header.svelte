<script>
    import { title } from '../store.js';

    function toggleTheme() { document.body.classList.toggle('dark') }
</script>

<header>
    <section>

        <h1>{$title}</h1>

        <div>
            <svg class="w-8 h-8 mx-auto cursor-pointer fill-current" viewBox="0 0 24 24" on:click={toggleTheme}>
                <path fill="none" d="M24 0H0v24h24z"></path>
                <path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"></path>
            </svg>
        </div>

    </section>
</header>

<style>
    header {
        @apply pt-1 xl:py-4;
    }

    section {
        @apply container flex flex-wrap items-center;
    }

    h1 {
        @apply w-full text-xl font-bold text-center;
    }

    div {
        @apply w-full pt-2;
    }
</style>

<script>
    import Result from './Result.svelte';
    export let displayData = [];
</script>

<h2>Treffer</h2>

{#if displayData}
{#each displayData as item }
  <Result title={item.title} markup={item.body}></Result>
{/each}
{:else}
    <h5>No Results</h5>
{/if}


<style>
    h2 {
        color: #30cb00;
        text-transform: uppercase;
        font-size: 2rem;
        font-weight: 100;
    }
</style>
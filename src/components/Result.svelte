<script>
    export let title;
    export let markup;
</script>


<article>
    <h3>{title}</h3>
  {@html markup}
</article>

<style>
    article {
        border-radius: 5px;
        border: 1px solid rgba(204, 204, 204, 0.8);
        border-left: 4px solid #30cb00;
        box-shadow: 1px 1px 2px rgba(75, 75, 75, 0.2);
        padding: 1rem;
        text-align: left;
        margin-bottom: 2rem;
        color: #999;
        font-weight: 300;
        line-height: 1.5;
    }

    h3 {
        text-transform: uppercase;
        font-weight: 300;
        font-size: 1.75rem;
        color: rgba(27, 27, 141, 1);
        margin-top: 0;
        margin-bottom: 0.5rem;
    }
</style>
<script>
    import { searchUrl } from '../lib/store.js';
    import { get } from 'svelte/store';
    import { createEventDispatcher } from 'svelte';
    import urlParser from 'url-parse';


    export let facetConfig = [];
    const dispatch = createEventDispatcher();
    let offer = 'unchecked';
    let checkboxWidget;

    const handleFacet = (url) => {
      searchUrl.set(url);
    };

    const handleCheckbox = (widget) => {
        let stateUrl = [];
        offer = offer === 'unchecked' ? 'checked' : 'unchecked';
        let call = '';
        if (widget.length == 2 ) {
            for (let option of widget) {
                if (option.values.value == '1') {
                    stateUrl['1'] = option.url;
                }
                if (option.values.value == '0') {
                    stateUrl['0'] = option.url;
                }
            }
           call = offer === 'checked' ? stateUrl['1'] : stateUrl['0'];
        }
        else {
            call = widget[0].url;
        }
        searchUrl.set(call);
    };

    const handleReset = () => {
        let parsed = new urlParser(get(searchUrl));
        let queryList = decodeURI(parsed.query).replace(/^\?/g, '').split('&');
        let slug = '';
        for (let i = 0; i < queryList.length; i++) {
            if (queryList[i].match(/search_api_fulltext/)) {
                slug = queryList[i]
            }
        }
        const url = encodeURI(parsed.origin + parsed.pathname + '?' + slug)
        offer = 'unchecked';
        searchUrl.set(url);
        dispatch('resetFacets');
    }
</script>

<h2>Filter</h2>
<div class="facet-wrapper">
    {#each facetConfig as widget }
        {#if widget[0].name}
        <h4>Tags</h4>
            {#each widget[0].name as tag}
                <span on:click={handleFacet(tag.url)} class="{tag.values.active ? 'active' : ''}">{tag.values.value} ({tag.values.count})</span>
            {/each}
        {/if}

        {#if widget[0].field_offer}
        <h4>Sonderangebote</h4>
            <span class="checkbox {offer}" on:click={handleCheckbox(widget[0].field_offer)}> Aktion</span>
        {/if}
    {/each}
    {#if facetConfig.length > 0}
        <button class="reset" on:click={handleReset}>Reset Filter</button>
    {/if}
</div>

<style>
    h2 {
        color: #30cb00;
        text-transform: uppercase;
        font-size: 2rem;
        font-weight: 100;
    }

    .facet-wrapper {
        border-bottom: 4px solid #30cb00;
        background: #f5f5f5;
        padding: 0.5rem 1rem 2rem 1rem;
        box-shadow: 1px 1px 2px rgba(75, 75, 75, 0.2);
    }

    h4 {
        font-weight: 500;
    }

    span {
        margin-bottom: 0.5rem;
        cursor: pointer;
        color: #717171;
        display: block;
    }

    span.active {
        text-decoration: underline;
    }

    span:hover {
        color: #000;
    }

    label {
        cursor: pointer;
        color: #717171;
    }

    .checkbox {
        position: relative;
        display: inline-block;
    }

    .checkbox:before {
        content: '';
        width: 1rem;
        height: 1rem;
        border: 1px solid #717171;
        margin-right: 0.5rem;
        position: absolute;
        left: -1.5rem;
        margin-right: 2px;
        border-radius: 5px;
    }

    .checkbox.checked:before {
        color: #30cb00;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='width:24px;height:24px' viewBox='0 0 24 24'%3E%3Cpath fill='%2330cb00' d='M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z' /%3E%3C/svg%3E");
    }

    .reset {
        margin-top: 2rem;
    }
</style>
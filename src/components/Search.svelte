<script>
    import { searchUrl } from '../lib/store.js';
    import { get } from 'svelte/store';
    import urlParser from 'url-parse';

    let searchString = '';

    const handleInput = () => {

        let parsed = new urlParser(get(searchUrl));
        let queryList = decodeURI(parsed.query).replace(/^\?/g, '').split('&');
        let replace = false;
        for (let i = 0; i < queryList.length; i++) {
            if (queryList[i].match(/search_api_fulltext/)) {
                queryList[i] = 'search_api_fulltext=' + searchString;
                replace = true;
            }
        }
        let url = '';
        if (replace === true) {
            url = encodeURI(parsed.origin + parsed.pathname + '?' + queryList.join('&'));
        }
        else {
            url = encodeURI(parsed.origin + parsed.pathname + '?search_api_fulltext=' + searchString + '&' + queryList.join('&'));
        }
        searchUrl.set(url);
    };

    const handleEnter = (event) => {
        if (event.keyCode === 13) {
            handleInput();
        }
    };
</script>

<div class="search-wrapper">
    <input type="text" placeholder="Suchbegriff eingeben" on:keyup={handleEnter} bind:value={searchString} on:resetFacets={handleInput} />
    <button on:click={handleInput}>Finden</button>
</div>

<style>
    .search-wrapper {
        background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(241,241,241,0.9) 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 3rem;
        border-radius: 50%;
    }

    input[type="text"] {
        width: 80%;
        max-width: 380px;
        margin: 0.5rem 0.2rem;
        font-weight: 300;
    }

    button {
        margin: 0.5rem 0.2rem;
        background: transparent;
        color: #ff3e00;
        border: 2px solid #ff3e00;
        cursor: pointer;
        transition: all 200ms ease-in-out;
        text-transform: uppercase;
    }

    button:hover, button:active, button:focus {
        border: 2px solid #ff7700;
        box-shadow: 0 0 4px rgba(27, 27, 141, 0.35);
    }
</style>
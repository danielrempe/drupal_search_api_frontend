<script>
	import { onMount } from 'svelte';
	import ResultList from './components/ResultList.svelte';
	import Facets from './components/Facets.svelte';
	import Search from './components/Search.svelte';
	import { searchUrl } from './lib/store.js';
	import { requestURL } from './config.js';

	let data = [];

	onMount(async () => {
		const searchResponse = await fetch(requestURL, {cache: "no-cache"});
		data = await searchResponse.json();
	});

	searchUrl.subscribe(async value => {
		const searchResponse = await fetch(value, {cache: "no-cache"});
		data = await searchResponse.json();
	});

</script>

<svelte:head>
	<title>Search API Frontend mit Svelte</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="de" />
</svelte:head>

<main>
	<h1>Suche</h1>
	<Search></Search>
	<div class="wrapper">
		<div class="content">
			<ResultList displayData={data.search_results}></ResultList>
		</div>
		<aside class="sidebar">
			<Facets facetConfig={data.facets}></Facets>
		</aside>
	</div>
</main>

<footer class="footer">
	<span>Svelte Search API Demo</span><br>
	<a href="https://rempeweb.net" title="RempeWeb">&copy; 2020 RempeWeb</a>
</footer>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		max-width: 1200px;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 100;
	}

	.wrapper {
		display: grid;
		grid-template-columns: 100%;
		grid-gap: 10px;

	}
	@media all and (min-width: 640px) {
		.wrapper {
			grid-template-columns: 4fr 1fr;
		}
	}
	footer {
		border-top: 2px solid rgba(27, 27, 141, 1);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem 2rem;
	}

	footer a {
		color: rgba(27, 27, 141, 1);
		font-weight: 100;
	}
</style>
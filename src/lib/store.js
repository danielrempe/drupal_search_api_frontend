import { writable } from 'svelte/store'
import { requestURL } from '../config.js';

export const searchUrl = writable(requestURL);


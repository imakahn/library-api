import { openDb } from './db.js';
// ^ node ES modules can't import directories by default (yet)
// see https://nodejs.org/api/esm.html#esm_experimental_loaders

export default openDb;

// TODO should run opendb here, within try catch, and export the result

// actually shouldn't export that result - should only be exporting book and user entities

// may want to remove this file and just access the entities directly. 

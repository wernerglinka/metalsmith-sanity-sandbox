require('es6-promise/auto');
const sanityClient = require('@sanity/client');
const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const imageUrl = require('@sanity/image-url');
const queries = require('./queries');
const getSerializers = require('./get-serializers');

const getPosts = require('./get-posts');
const getPages = require('./get-pages');

/**
 * @typedef Options
 * @property {String} key
 */

/** @type {Options} */
const defaults = {
  projectId: '',             // required
  dataset: 'production',  
  apiVersion: '2022-10-19',  // use a UTC date string
  token: '',                 // required
  useCdn: false,
};

/**
 * Normalize plugin options
 * @param {Options} [options]
 * @returns {Object}
 */
function normalizeOptions(options) {
  return Object.assign({}, defaults, options);
}

/**
 * A Metalsmith plugin to fetch content from Sanity.io
 *
 * @param {Options} options
 * @returns {import('metalsmith').Plugin}
 */
function initMetalsmithSourceSanity(options) {
  options = normalizeOptions(options);

  return async function metalsmithSourceSanity(files, metalsmith, done) {
    const debug = metalsmith.debug('metalsmith-source-sanity');
    debug('Running with options: %O', options);

    // initialize Sanity client
    const client = sanityClient(options);
    
    // get all posts from Sanity
    const pendingPosts = getPosts(client, files);
    const allPosts = await pendingPosts;
    // merge posts into files object
    Object.assign(files, allPosts);
    debug('Sanity posts: %O', allPosts);

    // get all pages from Sanity
    const pendingPages = getPages(client, files);
    const allPages = await pendingPages;
    // merge pages into files object
    Object.assign(files, allPages);
    debug('Sanity pages: %O', allPages);

    console.log(metalsmith);

    /*
    // get the site navigation from Sanity
    const pendingNav = getNavigation(client, files);
    const siteNav = await pendingNav;
    // merge site navigation into files object
    Object.assign(files, siteNav);
    debug('Sanity site navigation: %O', siteNav);
    */

    const metadata = metalsmith.metadata();
    metadata['newNav'] = siteNav;

    // update metadata
    metalsmith.metadata(metadata);

    done();
  }
}

module.exports =  initMetalsmithSourceSanity;
require('es6-promise/auto');
const sanityClient = require('@sanity/client');
const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const imageUrl = require('@sanity/image-url');
const queries = require('./queries');
const getSerializers = require('./get-serializers');

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
  options = normalizeOptions(options)

  return function metalsmithSourceSanity(files, metalsmith, done) {
    const debug = metalsmith.debug('metalsmith-source-sanity')
    debug('Running with options: %O', options)

    // initialize Sanity client
    const client = sanityClient(options);

    // custom serializers for sanity blocks
    // read more: https://www.sanity.io/docs/presenting-block-text
    const serializers = getSerializers(client);

    // fetch all blogposts from Sanity
    // get rawPosts in Portable Text format
    client.fetch(queries.posts).then(allRawPosts => {
      // turn rawPosts into markdown
      // read more: https://github.com/sanity-io/block-content-to-markdown
      allRawPosts.map(post => {
        // key for the files array
        const slug = BlocksToMarkdown(post.slug, { serializers, ...client});
        const fileName = `blog/${slug}.md`;
        // value for the files array
        const page = {
          layout: 'blog-post.njk',
          bodyClass: 'blog-post',
          seo: {
            title: post.title,
            description: 'Etiam porta sem malesuada magna mollis euismod.',
            socialImage: 'https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png',
            canonicalOverwrite: ''
          },
          blogTitle: post.title,
          date: post.publishedAt,
          author: post.authorName,
          image: imageUrl(client).image(post.mainImage).url(),
          featuredBlogpost: true,
          featuredBlogpostOrder: 1,
          excerpt: '',
          contents: Buffer.from(BlocksToMarkdown(post.body, { serializers, ...client})),
          mode: '0644',
          stats: {}
        }

        // add page to metalsmith object
        files[fileName] = page; 
      });

      done()

    }).catch(err => console.error(err));
  }
}

module.exports =  initMetalsmithSourceSanity;
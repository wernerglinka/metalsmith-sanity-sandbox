require('es6-promise/auto');
const sanityClient = require('@sanity/client');
const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const imageUrl = require('@sanity/image-url');
const {buildImageUrl} = require('@sanity/asset-utils');
const queries = require('./queries');
const getSerializers = require('./get-serializers');

// renderers
const renderBlock = require('./block-renderers');

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
    client.fetch(queries.pages).then(allRawPages => {
      // turn rawPosts into markdown
      // read more: https://github.com/sanity-io/block-content-to-markdown

      let pageContent = {};
        
      allRawPages.map( page => {
        // key for the files array
        const slug = BlocksToMarkdown(page.slug, { serializers, ...client});
        const fileName = `${slug}.md`;

        // build the json representation of the page, starting with layout. The page 
        // content is composed with sections, which are composed of blocks.
        pageContent = {
          layout: 'blocks.njk',
          bodyClasses: '',
          seo: {
            title: page.title,
            description: page.description,
            socialImage: page.image,
            canonicalOverwrite: page.canonicalUrl,
          },
          sections: [],
          contents: Buffer.from(''),
          mode: '0644',
          stats: {}
        };

        let sectionContent = {};
        page.content.map( (section, i) => {

          //console.log(JSON.stringify(section, null, 4));

          // common section fields
          sectionContent = {
            container: 'section',
            description: '',
            containerFields: {
              disabled: section.disabled || false,
              containerId: section.containerId || '',
              containerClass: section.containerClass || '',
              inContainer: section.inContainer || false,
              margin: {
                top:  !!section.margin && section.margin.hasOwnProperty('top') ? section.margin.top  : false,
                bottom: !!section.margin && section.margin.hasOwnProperty('bottom') ? section.margin.bottom : false,
              },
              padding: {
                top: !!section.padding && section.padding.hasOwnProperty('top') ? section.padding.top : false,
                bottom: !!section.padding && section.padding.hasOwnProperty('bottom') ? section.padding.bottom : false,
              },
              background: {
                color: !!section.background && section.background.hasOwnProperty('color') ? section.background.color : '',
                image: !!section.background && section.background.hasOwnProperty('image') ? section.background.image : '',
                isDark: !!section.background && section.background.hasOwnProperty('isDark') ? section.background.isDark : false,
              }
            },
            columns: [],
          }

          // loop over individual section blocks
          section.sectionBlocks.map( block => {
            // get the blocktype and create the block object
            const type = block._type;
            // call the render function by type reference
            const blockObject = renderBlock[type](block, client);

            // add the block data to the columns array
            sectionContent.columns.push(blockObject);
          });

          // add the sections data into the sections array
          pageContent.sections.push(sectionContent);
        }); 
        
        //console.log(JSON.stringify(pageContent.sections, null, 4));

        // add page to metalsmith object
        files[fileName] = pageContent; 

      });
      done()
    }).catch(err => console.error(err));
  }
}

module.exports =  initMetalsmithSourceSanity;
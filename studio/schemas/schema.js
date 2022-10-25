// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
import blogContent from './objects/blogContent';
import category from './documents/category';
import post from './documents/post';
import page from './documents/page';
import author from './documents/author';

import cta from './objects/cta'
import link from './objects/link';
import simpleBlockContent from './objects/simpleBlockContent';


import textBlock from './sectionBlocks/textBlock';
import imageBlock from './sectionBlocks/imageBlock';

// import all page sections
import * as pageSections from './pageSections'
import pageSectionDefaultFields from './pageSections/_pageSectionsDefaultFields'
const allPageSections = Object.values(pageSections).map((section) => {
  return { ...section, fields: pageSectionDefaultFields.concat(section.fields) }
})

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // add custom types
  types: schemaTypes.concat([
    page,
    post,
    author,
    category,
    blogContent,
    link,
    cta,
    simpleBlockContent,
    textBlock,
    imageBlock
  ])
  .concat(allPageSections),
})

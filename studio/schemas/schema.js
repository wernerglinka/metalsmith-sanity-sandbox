// First, import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Then import all native schema types

// import all content types
import * as contentTypes from './contentTypes'
const allContentTypes = Object.values(contentTypes).map((contentType) => {
  return contentType;
});

// import all page sections
import * as pageSections from './pageSections'
import pageSectionDefaultFields from './pageSections/_pageSectionsDefaultFields'
const allPageSections = Object.values(pageSections).map((section) => {
  // add the default fields to each section
  return { ...section, fields: pageSectionDefaultFields.concat(section.fields) }
});

// import all section blocks
import * as sectionBlocks from './sectionBlocks'
const allSectionBlocks = Object.values(sectionBlocks).map((block) => {
  return block;
});

// import all elements
import * as elements from './elements'
const allElements = Object.values(elements).map((element) => {
  return element;
});

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // add custom types
  types: schemaTypes
    .concat(allElements)
    .concat(allContentTypes)
    .concat(allPageSections)
    .concat(allSectionBlocks)
})

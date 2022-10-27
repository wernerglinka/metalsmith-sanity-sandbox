const groq = require('groq');

// queries for all content/page types
// read more: https://www.sanity.io/docs/data-store/how-queries-work
// for navigation query read: https://www.sanity.io/schemas/nested-navigation-structure-757f39ee
const queries = {
  posts: groq`*[_type == 'post']{ _id, publishedAt, title, slug, mainImage, 'authorName': author->name, body[] }`,
  pages: groq`*[_type == 'page']{ _id, title, slug, content[] }`,
  nav: groq`*[_type == 'navigation'][0] { ..., sections[]{ ..., target->{title, slug, _id}, links[]{ ..., target->{title, slug, _id}, children[]{ ..., target->{title, slug, _id}}}}} `,
}

module.exports = queries;


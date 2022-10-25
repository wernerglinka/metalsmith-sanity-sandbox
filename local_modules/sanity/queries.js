const groq = require('groq');

// queries for all content/page types
// read more: https://www.sanity.io/docs/data-store/how-queries-work
const queries = {
  posts: groq`*[_type == 'post']{ _id, publishedAt, title, slug, mainImage, 'authorName': author->name, body[] }`,
  pages: groq`*[_type == 'page']{ _id, title, slug, content[] }`,
}

module.exports = queries;


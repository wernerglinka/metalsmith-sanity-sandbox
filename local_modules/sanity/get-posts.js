const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const imageUrl = require('@sanity/image-url');
const queries = require('./queries');
const getSerializers = require('./get-serializers');

async function getPosts(client) {
  // custom serializers for sanity blocks
  // read more: https://www.sanity.io/docs/presenting-block-text
  const serializers = getSerializers(client);

  const allPosts = {};

  // fetch all blogposts from Sanity
  // get rawPosts in Portable Text format
  const allRawPosts = client.fetch(queries.posts);

  let posts = await allRawPosts;
  
  // turn rawPosts into markdown
  // read more: https://github.com/sanity-io/block-content-to-markdown
  posts.map(post => {
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
    // add page to allPosts object
    allPosts[fileName] = page;
  })
  return allPosts; 
}

module.exports = getPosts;
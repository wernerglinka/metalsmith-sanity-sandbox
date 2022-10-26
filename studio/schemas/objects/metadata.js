export default {
  name: 'metadata',
  title: 'Metadata',
  type: 'object',
  fieldsets: [
    {
      name: 'metadata',
      title: 'Metadata',
      options: {
        collapsible: true,
        collapsed: true
      }
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Page Description',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Page Image',
      description: 'This image will be used when sharing the page on social media',
    },
    {
      name: 'canonicalUrl',
      type: 'url',
      title: 'Canonical URL',
      description: 'The canonical URL of the page',
    },
  ],
}



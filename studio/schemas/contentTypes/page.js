export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fieldsets: [
    { 
      name: 'metadata', 
      title: 'Page Meta Data',
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
      fieldset: 'metadata',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Page Description',
      fieldset: 'metadata',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Page Image',
      description: 'This image will be used when sharing the page on social media',
      fieldset: 'metadata',
    },
    {
      name: 'canonicalUrl',
      type: 'url',
      title: 'Canonical URL',
      description: 'The canonical URL of the page',
      fieldset: 'metadata',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'content',
      type: 'array',
      title: 'Page sections',
      description: 'Add, edit, and reorder sections',
      of: [
        { type: 'section' },
      ],
    },
  ],
}

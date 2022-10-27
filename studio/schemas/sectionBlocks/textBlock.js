export default {
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    { name: 'titlePrefix', 
      type: 'string', 
      title: 'Title Prefix' 
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      name: 'subTitle',
      type: 'string',
      title: 'Subtitle',
    },
    {
      name: 'Body',
      type: 'simpleBlockContent',
      title: 'Body',
    },
    {
      name: 'cta',
      type: 'cta',
      title: 'CTA',
    },
  ],
}
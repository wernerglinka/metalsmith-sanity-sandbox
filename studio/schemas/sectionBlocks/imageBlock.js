export default {
  name: 'imageBlock',
  title: 'Image Block',
  type: 'image',
  fields: [
    { name: 'alt', 
      type: 'string', 
      title: 'Alt Text' 
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string'
    },
    {
      name: 'credits',
      type: 'string',
      title: 'Credits',
    },
  ],
}
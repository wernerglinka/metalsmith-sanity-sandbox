export default {
  name: 'section',
  title: 'Section',
  type: 'object',
  fields: [
    {
      name: 'sectionBlocks',
      type: 'array',
      title: 'Sections Blocks',
      description: 'Add, edit, and reorder section blocks',
      of: [
        { type: 'textBlock' },
        { type: 'imageBlock' },
      ],
    },
  ],
}



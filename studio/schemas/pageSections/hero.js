export default {
  type: 'object',
  name: 'hero',
  title: 'Hero',
  fields: [
    {
      name: 'label',
      type: 'string'
    },
    {
      name: 'heading',
      type: 'string',
      title: 'Heading'
    },
    {
      name: 'subheading',
      type: 'string',
      title: 'Subheading'
    },
    {
      name: 'cta',
      type: 'cta'
    },
    {
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image'
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'label',
      disabled: 'disabled'
    },
    prepare({ title, disabled }) {
      return {
        title: `Hero: ${disabled ? 'DISABLED' : title}`
      }
    }
  }
}

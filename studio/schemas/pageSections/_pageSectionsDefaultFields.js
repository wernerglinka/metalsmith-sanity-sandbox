export default [
  {
    name: 'sectionName',
    type: 'string',
    title: 'Section Name',
    description: 'This is used for internal reference only',
  },
  {
    title: 'Disabled',
    name: 'disabled',
    type: 'boolean'
  },
  {
    title: 'Container ID',
    name: 'containerId',
    type: 'string'
  },
  {
    title: 'Container Class',
    name: 'containerClass',
    type: 'string'
  },
  {
    title: 'In Container',
    name: 'inContainer',
    type: 'boolean'
  },
  { 
    title: 'Add Spacing',
    name: 'addSpacing',
    type: 'boolean'
  },
  {
    title: 'Margin',
    name: 'margin',
    type: 'object',
    fields: [
      {
        title: 'Top',
        name: 'top',
        type: 'boolean'
      },
      {
        title: 'Bottom',
        name: 'bottom',
        type: 'boolean'
      }
    ],
    hidden: ({ parent }) => !parent?.addSpacing
  },
  {
    title: 'Padding',
    name: 'padding',
    type: 'object',
    fields: [
      {
        title: 'Top',
        name: 'top',
        type: 'boolean'
      },
      {
        title: 'Bottom',
        name: 'bottom',
        type: 'boolean'
      }
    ],
    hidden: ({ parent }) => !parent?.addSpacing
  },
  {
    title: 'Has Background',
    name: 'hasBackground',
    type: 'boolean'   
  },
  {
    title: 'Background',
    name: 'background',
    type: 'object',
    fields: [
      {
        title: 'Color',
        name: 'color',
        type: 'string'
      },
      {
        title: 'Image',
        name: 'image',
        type: 'image'
      },
      {
        title: 'Is Dark',
        name: 'isDark',
        type: 'boolean'
      }
    ],
    hidden: ({ parent }) => !parent.hasBackground
  },
  // {
  //   name: 'background',
  //   type: 'object',
  //   fields: [{
  //     name: 'inverted',
  //     type: 'boolean'
  //   }]
  // }
  // {
  //   title: 'Plug padding',
  //   description: 'Will give the plug padding according to root font size. (rem)',
  //   name: 'padding',
  //   type: 'object',
  //   fields: [
  //     {
  //       title: 'top',
  //       name: 'top',
  //       type: 'number'
  //     },
  //     {
  //       title: 'bottom',
  //       name: 'bottom',
  //       type: 'number'
  //     }
  //   ]
  // }
]

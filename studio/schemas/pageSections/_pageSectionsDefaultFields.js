export default [
  {
    name: "sectionType",
    title: "Section Type",
    type: "string",
    description: 'This is used to select the proper section styles',
    options: {
      list: [
        { title: "Banner", value: "banner" },
        { title: "Media", value: "media" },
        { title: "Text", value: "text" },
      ],
    }
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

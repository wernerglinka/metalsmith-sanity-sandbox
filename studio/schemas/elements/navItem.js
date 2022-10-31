export default {
  name: 'navigationItem',
  type: 'object',
  title: 'Navigation Item',
  fields: [
    {
      title: "Link Icon",
      name: "linkIcon",
      type: "iconPicker",
      options: {
          providers: ["fi"]
      }
    },
    {
      name: "text",
      type: "string",
      title: "Navigation Text"
    },
    {
      name: "navigationItemUrl",
      type: "link", 
      title: "Navigation Item URL"
    }
  ]
}
const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const getSerializers = require('../get-serializers');

module.exports = function renderTextBlock(block, client) {
  // custom serializers for sanity blocks
  // read more: https://www.sanity.io/docs/presenting-block-text
  const serializers = getSerializers(client);

  return {
    name: 'text',
    titlePrefix: block.titlePrefix ? block.titlePrefix : '',
    title: block.title ? block.title : '',
    headerType: block.headerType ? block.headerType : '',
    subTitle: block.subTitle ? block.subTitle : '',
    body: block.Body ? BlocksToMarkdown(block.Body, { serializers, ...client}) : '',
    cta: {
      label: block.cta.title ? block.cta.title : '',
      url: block.cta.link ? block.cta.link : '',
      kind: block.cta.kind ? block.cta.kind : '',
      type: block.cta.linkType ? block.cta.linkType : '',
    }
  };
};
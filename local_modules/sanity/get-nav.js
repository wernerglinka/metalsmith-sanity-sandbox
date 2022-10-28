const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const imageUrl = require('@sanity/image-url');
const queries = require('./queries');
const getSerializers = require('./get-serializers');

async function getNav(client) {

  const navigation= {
    menu: []
  };

  // fetch the navigation from Sanity
  const rawNav = client.fetch(queries.nav);

  let nav = await rawNav;
  
  // turn rawPosts into markdown
  // read more: https://github.com/sanity-io/block-content-to-markdown
  nav.sections.map(section => {
    // by convention, the first item in the object is a link if the section has no submenu
    // and just a span if it has  a submenu
    if (!section.hasChildren)  {
      navigation.menu.push({
        title: section.title,
        url: section.target.slug.current,
        class: section.linkClass,
      });
    } else {
      navigation.menu.push({
        title: section.title,
        url: '',
        class: section.linkClass,
        submenu: []
      });
      // loop oveer the links in the submenu
      section.links.map(link => {
        navigation.menu[navigation.menu.length-1].submenu.push({
          title: link.title,
          url: link.target.slug.current,
          class: link.linkClass,
        });
      });
    }
  });
  return navigation; 
}

module.exports = getNav;
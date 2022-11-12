const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const imageUrl = require('@sanity/image-url');
const queries = require('./queries');
const getSerializers = require('./get-serializers');

// renderers
const renderBlock = require('./block-renderers');

async function getCities(client) {
  // custom serializers for sanity blocks
  // read more: https://www.sanity.io/docs/presenting-block-text
  const serializers = getSerializers(client);

  const allCities = [];
  
  // fetch all pages from Sanity
  // get rawPages in Portable Text format
  const allRawCities = client.fetch(queries.cities);
  let cities = await allRawCities;
   
  let cityContent = {};
    
  cities.map( city => {
    // build the city data object
    cityContent = {
      name: city.name,
      description: city.description,
      size: city.size,
      image: city.image,
      logo: city.logo,
      wappen: city.wappen,
      websitelink: city.websitelink,
      wikiLink: city.wikiLink,
    };

    // merge cityContent into the allCities array
    allCities.push(cityContent);
  });

  return {cities: allCities};
}

module.exports = getCities;
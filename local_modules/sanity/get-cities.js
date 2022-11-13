const queries = require('./queries');

async function getCities(client) {
  const allCities = [];
  
  // fetch all pages from Sanity
  // get rawPages in Portable Text format
  const allRawCities = client.fetch(queries.cities);
  let cities = await allRawCities;
   
  let cityContent = {};
    
  cities.map( city => {
    // build the city data object
    cityContent = {
      id: city._id,
      name: city.name,
      size: city.size,
      image: city.image,
      logo: city.logo,
      wappen: city.wappen,
      websitelink: city.websitelink,
    };

    // merge cityContent into the allCities array
    allCities.push(cityContent);
  });

  return {cities: allCities};
}

module.exports = getCities;
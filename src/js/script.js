const form = document.querySelector('form');
const output = document.querySelector('.output');

async function executeQuery(e) {
  e.preventDefault();

  const queryText = form.search.value;
  const queryOptions = {
    "action": "query",
    "format": "json",
    "formatversion": "2",
    "prop": "extracts",
    "exlimit": "max",
    "explaintext": "1",
    "exsentences": "1",
    "exintro": "1",
    "generator": "search",
    "gsrnamespace": "0",
    "gsrlimit": "10",
    "gsrsearch": `${queryText}`
  };

  // Build up the query URL using the options above
  const cors = 'https://cors-anywhere.herokuapp.com/';
  let endpoint = `${cors}https://en.wikipedia.org/w/api.php?`;
  Object.keys(queryOptions).forEach(key => endpoint += `&${key}=${queryOptions[key]}`);

  // Get the data, then process it into a nice usable array of objects.
  const response = await fetch(endpoint);
  const json = await response.json();
  const results = json.query.pages;

  addToDOM(results);
}

function addToDOM(results) {
  const url = 'https://en.wikipedia.org/?curid=';

  const toAppend = results.reduce((a, b) => {
    return a + `<div class="result"><h2><a href="${url + b.pageid}" target="_blank">${b.title}</a></h2><p>${b.extract}</p></div>`;
  }, '');

  output.innerHTML = toAppend;
}

form.addEventListener('submit', executeQuery);
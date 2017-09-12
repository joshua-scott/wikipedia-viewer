const form = document.querySelector('form');

async function executeQuery(e) {
  e.preventDefault();

  // Build the URL to make the query
  const query = form.search.value;
  const cors = 'https://cors-anywhere.herokuapp.com/';
  const endpoint = `${cors}https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=10&namespace=0&search=${query}`;

  // Get the data, then process it into a usable array of objects.
  const response = await fetch(endpoint);
  const json = await response.json();
  const results = parseData(json);

  // Process further until it can be added to the DOM
  const domElements = processResults(results);
}

function parseData(json) {
  const results = [];
  for (let i = 0; i < json[1].length; i++) {
    const currentResult = {};
    currentResult.title = json[1][i];
    currentResult.body = json[2][i];
    currentResult.url = json[3][i];

    results.push(currentResult);
  }
  return results;
}

function processResults(results) {

}

form.addEventListener('submit', executeQuery);
const form = document.querySelector('form');
const output = document.querySelector('.output');

async function executeQuery(e) {
  e.preventDefault();

  // Build the URL to make the query
  const query = form.search.value;
  const cors = 'https://cors-anywhere.herokuapp.com/';
  const endpoint = `${cors}https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=10&namespace=0&search=${query}`;

  // Get the data, then process it into a usable array of objects.
  const response = await fetch(endpoint);
  const json = await response.json();
  const resultsArr = parseData(json);

  // Process further until it can be added to the DOM
  // const domElements = processResults(results);
  console.dir(resultsArr);
  processResults(resultsArr);
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

function processResults(resultsArr) {
  const toAppend = resultsArr.reduce((a, b) => {
    return a + `<a href="${b.url}" target="_blank">${b.title}</a><p>${b.body}</p>`;
  }, '');

  console.log(toAppend);
  output.innerHTML = toAppend;
}

form.addEventListener('submit', executeQuery);
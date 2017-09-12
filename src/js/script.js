const form = document.querySelector('form');

async function executeQuery(e) {
  e.preventDefault();

  const query = form.search.value;
  const cors = 'https://cors-anywhere.herokuapp.com/';
  const endpoint = `${cors}https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=10&namespace=0&search=${query}`;

  const response = await fetch(endpoint);
  const data = await response.json();

  console.dir(data);
}

form.addEventListener('submit', executeQuery);
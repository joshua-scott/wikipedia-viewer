const form = document.querySelector('form');

function executeQuery(e) {
  e.preventDefault();

  const query = form.search.value;
  const cors = 'https://cors-anywhere.herokuapp.com/';
  const endpoint = `${cors}https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${query}`;
  fetch(endpoint)
    .then(blob => blob.json())
    .then(data => {
      data.query.search.forEach(result => {
        console.log(result.title);
      })
    });
}

form.addEventListener('submit', executeQuery);
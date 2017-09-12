const form = document.querySelector('form');

// function executeQuery(e) {
//   e.preventDefault();

//   const query = form.search.value;
//   const cors = 'https://cors-anywhere.herokuapp.com/';
//   const endpoint = `${cors}https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${query}`;
//   fetch(endpoint)
//     .then(blob => blob.json())
//     .then(data => {
//       data.query.search.forEach(result => {
//         console.log(result.title);
//       })
//     });
// }

function executeQuery(e) {
  e.preventDefault();

  const query = form.search.value;
  const cors = 'https://cors-anywhere.herokuapp.com/';
  const endpoint = `${cors}https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=10&namespace=0&search=${query}`;
  fetch(endpoint)
    .then(blob => blob.json())
    .then(data => {
      console.log('Search term = ', data[0]);
      console.log(data[1][1]);
      console.log(data[2][1]);
      console.log(data[3][1]);
    });
}

form.addEventListener('submit', executeQuery);
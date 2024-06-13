function getData(url) {
    fetch(url)
    .then(res => res.json())
    .then(console.log)}
getData('https://api.fbi.gov/wanted/v1/list')
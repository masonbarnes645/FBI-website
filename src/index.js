function getData(url) {
    fetch(url)
    .then(res => res.json())
    .then(people => people.forEach(extractInfo))
    .catch(err => console.log(err))
}
getData('https://api.fbi.gov/wanted/v1/list')

console.log("Hello World!")
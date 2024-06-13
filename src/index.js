function getData(url) {
    fetch(url)
    .then(res => res.json())
    .then(people => people.items.forEach(extractInfo))
    .catch(err => console.log(err))
}
getData('https://api.fbi.gov/wanted/v1/list')

function extractInfo(wantedObj) {
    const name = wantedObj.title;
    const image = wantedObj.images[0].large;
    const description = wantedObj.description;
    const path = wantedObj.path

    createWantedDiv(name, image, description, path)
}


function createWantedDiv (name, image, description, path) {
    const wantedList = document.querySelector("#wanted-list")

    const div = document.createElement("div")
    const h3 = document.createElement("h3")
    const img = document.createElement("img")
    
    const pDescription = document.createElement("p")
    const pPath = document.createElement("p")

    div.id = name.split(' ').join("-").split(",").join('')

    img.src = image
    img.alt = name

    h3.textContent = name

    pDescription.textContent = description
    pPath.textContent = path

    div.append(h3, img, pDescription, pPath)

    wantedList.appendChild(div)

    

}
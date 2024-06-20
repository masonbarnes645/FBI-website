# FBI's Most Wanted List
This app pulls data from the FBI's most wanted API to show the most wanted criminals in America. Users can choose to display criminals and missing persons, just criminals, or just missing persons and can also fill out a form to add a friend to the most wanted list! Friend postings are handled through a POST request using json-server and a db.json file, so POST requests are persistent. 

![FBI most wanted website screenshot](https://github.com/masonbarnes645/FBI-website/blob/main/media/Screenshot%202024-06-19%20at%208.20.07%E2%80%AFPM.png)

## Key Features
Our app contains a few key features:

- Displays all criminals and missing persons from the FBI's most wanted API
- Allows users to sort between criminals and missing persons
- Allows users to search criminals and missing persons with an included search bar
- Provides users with additional information like warnings and reward messages on mouseover
- Allows users to add new criminals to the list with a form submission

### Event Listeners
Our app includes a couple JS event listeners:

- click: reveal form, filter criminals and missing persons, and clear all filters
- submit: submit the form to add a new criminal
- input: search criminals and missing persons
- mouseover/mouse leave: expand and retract the cards to provide more information about warnings and rewards

## Credits
- Mason Barnes [GITHUB](https://github.com/masonbarnes645)
- Connor Page [GITHUB](https://github.com/connorpage1/)
- [FBI Most Wanted API](https://api.fbi.gov/wanted/v1/list)

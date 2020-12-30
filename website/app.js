/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'b955c36aeb8584a2bb25ff5a783e8a6e';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Adding event listener to button
document.getElementById('generate').addEventListener('click', performAction);

// Callback function to be executed on click
function performAction(e){
  let zip = document.getElementById('zip').value;
  // Check for valid zip code entry
  if (!validZip(zip)) {
    console.log('help!!!')
    if(document.getElementById('warning') == null) {
      const warning = document.createElement('div');
      warning.setAttribute('id', 'warning');
      warning.textContent = 'Not a valid Zip code!';
      document.getElementById('zipContainer').appendChild(warning);
      const span = document.createElement('span');
      span.innerHTML = `&times;`;
      span.setAttribute('class', 'closebtn');
      document.getElementById('warning').appendChild(span);
      document.getElementById('warning').addEventListener('click',
        removeWarnDiv);
    }
  }
  let user_comment = document.getElementById('feelings').value;
  getApiData(baseUrl, zip, apiKey)
  .then(function(data) {
    postData('/addData', {temp: data.main.temp, date: newDate,
      comment: user_comment});
    updateUI();
  });
}

// Function to retrieve data from Open Weather Map API
const getApiData = async (base, zip, key) => {
  const res = await fetch(`${base}${zip},us&units=imperial&appid=${key}`);
  try {
    const newData = await res.json();
    return newData;
  } catch(error){
    console.log('error', error);
  }
}

// Client-side POST function
const postData = async (url='', data={}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  try {
    const newData = await res.json();
    return newData;
  } catch(error){
      console.log('error', error);
  }
}

// Update UI function (using GET route)
const updateUI = async () => {
  const req = await fetch('/data');
  try {
    const allData = await req.json();
    // Update function only uses latest entry
    const latestKey = Object.keys(allData).sort(function(a, b){return b-a})[0];
    const latestObject = allData[latestKey];
    // Updating UI with latest data entry retrieved from server
    document.getElementById('date').innerHTML = `Date: ${latestObject.date}`;
    document.getElementById('temp').innerHTML = `Local temperature (at time of entry): ${latestObject.temp}°F`;
    document.getElementById('content').innerHTML = `Latest reflection on feelings: ${latestObject.comment}`;
    document.getElementById('feelings').value = '';
    document.getElementById('zip').value = '';
  } catch(error) {
    console.log("error", error);
  }
}

// Test function to check for valid Zip codes
function validZip(str) {
  regexp = /(^\d{5}$)/;
  if (regexp.test(str)){
    return true;
  } else {
    return false;
  }
}

function removeWarnDiv(){
  const el = document.getElementById('warning');
  el.remove();
  document.getElementById('feelings').value = '';
  document.getElementById('zip').value = '';
}

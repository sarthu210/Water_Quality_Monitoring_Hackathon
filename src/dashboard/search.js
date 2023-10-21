document.addEventListener('DOMContentLoaded', function () {
  const dataList = document.getElementById('data-list');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const locationAutoSuggest = document.getElementById('location-suggestions');
  const riverPhInput = document.getElementById('river-ph');
  const otherParameterInput = document.getElementById('other-parameter');
  const suggestionsContainer = document.getElementById('suggestions');
  const dateFilterContainer = document.getElementById('dateFilter');
  const dateFilterDataContainer = document.getElementById('dateFilterData');

  // Initialize waterQualityData with an empty array
  let waterQualityData = [];

  // Function to display data
  function displayData(data, containerId) {
    const dataContainer = document.getElementById(containerId);
    dataContainer.innerHTML = '';

    data.forEach(item => {
      const dataItem = document.createElement('div');
      dataItem.classList.add('data-item');
      dataItem.innerHTML = `
          <h2>${item.location}</br></h2>
          <p>State: ${item.State}</p>
          <p>Color: ${item.color}</p>
          <p>date: ${item.date}</p>
      `;
      dataContainer.appendChild(dataItem);
    });
  }

  function displayData1(data, containerId) {
    const dataContainer = document.getElementById(containerId);
    dataContainer.innerHTML = '';

    data.forEach(item => {
      let options = {
      delay: '.2s',
      textDuration: '.1s',
      chartDuration: '2s',
      easing: 'ease-in',
      data: {
          percent: item.ph,
          actual: 10,
          unit: "ph"
      },
      direction: "cw"
    }

    var chart = new PercentChart("container", options);
      
  });
}

  function displayData2(data, containerId) {
    const dataContainer = document.getElementById(containerId);
    dataContainer.innerHTML = '';

    data.forEach(item => {
      let options1 = {
      delay: '.2s',
      textDuration: '.1s',
      chartDuration: '2s',
      easing: 'ease-in',
      data: {
        percent: item.temperature,
        actual: 100,
        unit: "Temp"
      },
      direction: "cw"
    }
    var chart1 = new PercentChart("container1", options1);  
  });
}

  function displayData3(data, containerId) {
    const dataContainer = document.getElementById(containerId);
    dataContainer.innerHTML = '';

    data.forEach(item => {
      let options1 = {
      delay: '.2s',
      textDuration: '.1s',
      chartDuration: '2s',
      easing: 'ease-in',
      data: {
        percent: item.debris,
        actual: 100,
        unit: "Debris"
      },
      direction: "cw"
    }

    var chart1 = new PercentChart("container2", options1);
  });
}

function displayData4(data, containerId) {
  const dataContainer = document.getElementById(containerId);
  dataContainer.innerHTML = '';

data.forEach(item => {
    let options1 = {
    delay: '.2s',
    textDuration: '.1s',
    chartDuration: '2s',
    easing: 'ease-in',
    data: {
        percent: item.turbidity,
        actual: 100,
        unit: "Turbidity"
    },
    direction: "cw"
}

var chart1 = new PercentChart("container3", options1);
    
});
}

function displayData5(data, containerId) {
  const dataContainer = document.getElementById(containerId);
  dataContainer.innerHTML = '';

  data.forEach(item => {
    let options = {
    delay: '.2s',
    textDuration: '.1s',
    chartDuration: '2s',
    easing: 'ease-in',
    data: {
        percent: item.ph,
        actual: 10,
        unit: "ph"
    },
    direction: "cw"
  }

  var chart = new PercentChart("container4", options);
    
});
}

function displayData6(data, containerId) {
  const dataContainer = document.getElementById(containerId);
  dataContainer.innerHTML = '';

  data.forEach(item => {
    let options1 = {
    delay: '.2s',
    textDuration: '.1s',
    chartDuration: '2s',
    easing: 'ease-in',
    data: {
      percent: item.temperature,
      actual: 100,
      unit: "Temp"
    },
    direction: "cw"
  }
  var chart1 = new PercentChart("container5", options1);  
});
}

function displayData7(data, containerId) {
  const dataContainer = document.getElementById(containerId);
  dataContainer.innerHTML = '';

  data.forEach(item => {
    let options1 = {
    delay: '.2s',
    textDuration: '.1s',
    chartDuration: '2s',
    easing: 'ease-in',
    data: {
      percent: item.debris,
      actual: 100,
      unit: "Debris"
    },
    direction: "cw"
  }

  var chart1 = new PercentChart("container6", options1);
});
}

function displayData8(data, containerId) {
const dataContainer = document.getElementById(containerId);
dataContainer.innerHTML = '';

data.forEach(item => {
  let options1 = {
  delay: '.2s',
  textDuration: '.1s',
  chartDuration: '2s',
  easing: 'ease-in',
  data: {
      percent: item.turbidity,
      actual: 100,
      unit: "Turbidity"
  },
  direction: "cw"
}

var chart1 = new PercentChart("container7", options1);
  
});
}


  // Function to reset date filter and display all data
  function resetDateFilter() {
    // Show the search results container
    dataList.style.display = '';
    // Clear the date filter input
    document.getElementById('dateSelector').value = '';
    // Display all data
    displayData(waterQualityData, 'data-list');
  }

  // Event listener for form submission
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const location = searchInput.value.trim();
    fetchData(location);
    // Reset the date filter when a new location search is performed
    resetDateFilter();
  });
  

  // Function to fetch data based on location
  async function fetchData(location) {
    try {
      const response = await fetch(`http://localhost:3000/api/location-data?input=${location}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

        // Filter the data to display only today's data
        const todayData = filterDataForToday(data);

        // Update waterQualityData with the filtered data
        waterQualityData = todayData

      // Display the fetched data in the data-list container
      displayData(todayData, 'data-list');
      displayData5(todayData, 'container4');
      displayData6(todayData, 'container5');
      displayData7(todayData, 'container6');
      displayData8(todayData, 'container7');
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



  function filterDataForToday(data) {
    // Get today's date in the "dd-mm-yyyy" format
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const formattedToday = dd + '-' + mm + '-' + yyyy;

    // Filter the data to keep only records with today's date
    const filteredData = data.filter(item => item.date === formattedToday);
    
    return filteredData;
}

  // Event listener for the filter button
document.getElementById('filterButton').addEventListener('click', () => {
  const location = searchInput.value.trim();
  const selectedDate = document.getElementById('dateSelector').value;

  if (location && selectedDate) {
    // Call the searchForDataByDate function with user input
    searchForDataByDate(location, selectedDate);
  } else {
    console.error('Please provide both location and date.');
  }
});

// Function to search for data by location and a specific date
async function searchForDataByDate(location, selectedDate) {
  try {
    const formattedDate = selectedDate.split('-').reverse().join('-');
    const url = `http://localhost:3000/api/location-data?input=${location}&date=${formattedDate}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Handle the retrieved data
    console.log('Data for the selected date:', data);

    // Update your user interface to display the data
    displayData(data, 'dateFilterData');
    displayData1(data, 'container');
    displayData2(data, 'container1');
    displayData3(data, 'container2');
    displayData4(data, 'container3');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


  // Event listener for input change
  searchInput.addEventListener('input', function () {
    const inputText = searchInput.value.trim();
    fetchLocationSuggestions(inputText);

    // Reset the date filter and clear the filter results when a new location search is performed
    resetDateFilter();
    dateFilterDataContainer.innerHTML = ''; // Clear the filter results
  });

});
// Function to format a date from "yyyy-mm-dd" to "dd-mm-yyyy"
function formatDate(inputDate) {
  const parts = inputDate.split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  return `${day}-${month}-${year}`;
}

document.addEventListener('DOMContentLoaded', function () {
  const locationInput = document.getElementById('search-input');
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');
  const fetchButton = document.getElementById('fetch-ph-button');
  const ctx = document.getElementById('phChart').getContext('2d');
  let phChart;

  fetchButton.addEventListener('click', async () => {
      const location = locationInput.value.trim();
      const startDate = formatDate(startDateInput.value); // Format the start date
      const endDate = formatDate(endDateInput.value); // Format the end date

      // Fetch pH values for the specified location and date range from your API
      try {
          const response = await fetch(`http://localhost:3000/api/location-data?input=${location}&startDate=${startDate}&endDate=${endDate}`);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();

          // Extract pH values from the fetched data
          const phValues = data.map(item => parseFloat(item.ph));

          // Create or update the pH chart
          if (phChart) {
              phChart.destroy();
          }

          phChart = new Chart(ctx, {
              type: 'line', // You can change the chart type as needed
              data: {
                  labels: data.map(item => formatDate(item.date)), // Format date labels
                  datasets: [{
                      label: 'pH Values',
                      data: phValues,
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true, // Start y-axis at zero
                          // You can customize other options as needed
                      }
                  }
              }
          });
      } catch (error) {
          console.error('Error fetching pH data:', error);
          alert('Error fetching pH data. Please try again.');
      }
  });

  // Handle form submission
  const searchForm = document.getElementById('new-search-form');
  searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      fetchButton.click(); // Simulate a click on the fetch button
  });
});

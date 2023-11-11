const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const { DateTime } = require('luxon');
const cors = require('cors');
const app = express();
const port = 3000;

const mongoURI = Enter Your MongoDB URL Here;
const dbName = 'water_quality_db';
const collectionName = 'water_quality_data';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

const client = new MongoClient(mongoURI);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Connect to MongoDB before starting the server
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');

    // Create an endpoint for inserting data
    app.post('/api/data', async (req, res) => {
      try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        const dataToInsert = req.body;
        // Implement data validation here if needed
        await collection.insertOne(dataToInsert);
        res.status(201).json(dataToInsert);
      } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Route for fetching location data based on the input river name
    app.get('/api/location-data', async (req, res) => {
      try {
          const db = client.db(dbName);
          const collection = db.collection(collectionName);
          const input = req.query.input;
          const startDate = req.query.startDate;
          const endDate = req.query.endDate;
          const sortField = 'date'; // Specify the field for sorting (e.g., date)
          const sortOrder = 1; // Specify the sort order (1 for ascending, -1 for descending)
          const date = req.query.date;
  
          console.log('Searching for location:', input);
  
          // Define a filter object to filter data by location and date range
          const filter = {
              location: input
          };

  
          // If startDate and endDate are provided, add date range filtering to the filter object
          if (startDate && endDate) {
              filter.date = {
                  $gte: startDate,
                  $lte: endDate
              };
          }else if (date) {
            filter.date = date;
        }
        
  
          // Define a sort object for sorting the results
          const sort = {};
          sort[sortField] = sortOrder;
  
          // Use MongoDB to find, filter, and sort the data
          const data = await collection.find(filter).sort(sort).toArray();
  
          console.log('Found data:', data);
  
          if (data.length === 0) {
              res.status(404).json({ error: 'Location not found' });
          } else {
              res.json(data);
          }
      } catch (error) {
          console.error('Error fetching location data:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  });



    // Create an endpoint for retrieving all data
    app.get('/api/data', async (req, res) => {
      try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        const data = await collection.find({}).toArray();
        res.json(data);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

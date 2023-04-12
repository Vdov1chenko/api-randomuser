const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Подключение к базе данных PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'randomuser',
  password: 'admin',
  port: 5432,
});

// Обработчик GET запроса
app.get('/', async (req, res) => {
  try {
    // Получение данных с API
    const response = await axios.get('https://randomuser.me/api/');
    const users = response.data.results;

    // Сохранение данных в базу данных
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const { gender, name, location } = user;
      const { title, first, last } = name;
      const { street, city, state, country, postcode, coordinates } = location;
      const { number, name: streetName } = street;
      const { latitude, longitude } = coordinates;

      await pool.query(
        `INSERT INTO users (gender, title, first_name, last_name, street_number, street_name, city, state, country, postcode, latitude, longitude)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [gender, title, first, last, number, streetName, city, state, country, postcode, latitude, longitude]
      );
    }

    res.send('Data has been saved to database.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error.');
  }
});

//Сохранение в БД
const saveDataToDatabase = async () => {
    try {
      // Получение данных с API
      const response = await axios.get('https://randomuser.me/api/');
      const users = response.data.results;
  
      // Сохранение данных в базу данных
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const { gender, name, location } = user;
        const { title, first, last } = name;
        const { street, city, state, country, postcode, coordinates } = location;
        const { number, name: streetName } = street;
        const { latitude, longitude } = coordinates;
  
        await pool.query(
          `INSERT INTO users (gender, title, first_name, last_name, street_number, street_name, city, state, country, postcode, latitude, longitude)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [gender, title, first, last, number, streetName, city, state, country, postcode, latitude, longitude]
        );
      }
  
      console.log('Data has been saved to database.');
    } catch (error) {
      console.error(error);
    }
  };
  
  // Сохранение данных в базу данных каждые 10 минут
  setInterval(saveDataToDatabase, 10 * 60 * 1000);

// Старт сервера
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
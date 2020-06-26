/* Entry point to backend API */

// Bring all dependencies
const express = require('express');


// Init express
const app = express();

// Listen to server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
});
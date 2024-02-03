require("dotenv").config();
const express = require("express");
const app = express();
const fileRoutes = require('./routes/fileRoutes');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5500;




app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/files', fileRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});


// Start the server
app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
});




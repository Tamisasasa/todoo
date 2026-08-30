// server.js
const express = require('express')
const router = require('./Route/todoRoute')
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())
app.use('/api', router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
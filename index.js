const app = require('./src/app/app')
const { PORT } = require('./src/config/config');
const connectDB = require('./src/db/database');

// Connect to database
connectDB();

//Port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
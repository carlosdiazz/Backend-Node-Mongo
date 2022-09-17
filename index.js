const app = require('./src/app/app')
const { PORT } = require('./src/config/config');
const connectDB = require('./src/db/database');
const { createRoles } = require('./src/libs/initialSetup');
// Connect to database
connectDB();

// Create roles
createRoles();

//Port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
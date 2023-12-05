require('dotenv').config();
const mongoose = require('mongoose');
const chalk = require('chalk');
const http = require('http');
const app = require('./app');

//TODO godaddy/terminus implementation

//* Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`${chalk.red.bold('❌ UNCAUGHT EXCEPTION 💥 shutting down...')}`);
  console.log(err.name, err.message);

  process.exit(1);
});

const mode = process.env.NODE_ENV;
const port = process.env.PORT || 9000;
const DB = process.env.MONGODB_URL;

//* Create an HTTP server using the Express application
const server = http.createServer(app);

//* Start the server
const startServer = async () => {
  try {
    //! Connect to the database
    await mongoose.connect(DB);
    console.log(`${chalk.green.bold('✔')} Database connected successfully! ✨`);

    //! Start the server and listen on the specified port
    server.listen(port, () => {
      console.log(
        `${chalk.green.bold('✔')} Server running in ${chalk.yellow.bold(
          mode
        )} mode on port ${chalk.blue.bold(port)}`
      );
    });
  } catch (err) {
    //! Handle any errors that occur during database connection or server startup
    console.log(err.name, err.message);
    process.exit(1);
  }
};

//* Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log(
    `${chalk.red.bold('❌ UNHANDLED REJECTION 💥 shutting down...')}`
  );
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

//* Handle SIGTERM signal
process.on('SIGTERM', () => {
  console.log(`${chalk.green.bold('SIGTERM RECEIVED ✔️ Shutting down...')}`);
  server.close(() => {
    console.log(`${chalk.red.bold('❌ Process terminated 💥')}`);
  });
});

startServer();

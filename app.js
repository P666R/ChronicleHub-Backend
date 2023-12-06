const express = require('express');
const morgan = require('morgan');
const usersRouter = require('./routes/userRoutes');
// const postsRouter = require('./routes/postRoutes');
// const commentsRouter = require('./routes/commentRoutes');
// const categoriesRouter = require('./routes/categoryRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//* middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

//* routes
// users subrouter
app.use('/api/v1/users', usersRouter);
// posts subrouter
// app.use('/api/v1/posts', postsRouter);
// comments subrouter
// app.use('/api/v1/comments', commentsRouter);
// categories subrouter
// app.use('/api/v1/categories', categoriesRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//* error handlers
app.use(globalErrorHandler);

module.exports = app;

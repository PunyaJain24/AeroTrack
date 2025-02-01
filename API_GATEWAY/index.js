const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const { checkAuth } = require('./middlewares/authorization');
const app = express();
const PORT = 3005;
const limiter = rateLimit({
	windowMs: 2 * 60 * 1000,
	max: 5, 
})
app.use(morgan('combined'));
app.use(limiter);

app.use('/flightservice', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true}));
app.use('/authservice', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true}));
app.use('/bookingservice', checkAuth, createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true}));
app.use('/reminderservice', createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true}));
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
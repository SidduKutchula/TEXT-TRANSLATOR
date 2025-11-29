// quick-check.js
require('dotenv').config();
console.log('RAPIDAPI_KEY set?', !!process.env.RAPIDAPI_KEY);
console.log('RAPIDAPI_HOST =', process.env.RAPIDAPI_HOST || 'MISSING');

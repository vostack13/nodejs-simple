const express = require('express');

const routerCats = require('./routes/api/v1.0/cats');
// API/V1.0/
//API/V2.0/
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

app.use('/api/v1.0/cats', routerCats);

app.use((req, res, next) => {
  res
    .status(404)
    .json({ err: '404', message: 'Use api on routes /api/v1.0/cats' });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ err: '500', message: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server running. Use our API on port: ${PORT}`);
});

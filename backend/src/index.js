require('dotenv').config()
const app = require('./app.js')


const PORT = process.env.PORT || 5000;

app.get("/", (req, res, next) => {
  res.json({ message: "from backend api" });
});

app.listen(PORT, () => {
  console.log(`Server is running`);
});


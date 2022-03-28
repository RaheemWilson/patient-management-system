import "dotenv/config";
import app from './app'


const PORT = process.env.PORT || 5000;
// app.get("/", (_req, res, next) => {
//   res.json({ message: "from index api" });
// });

app.listen(PORT, () => {
  console.log(`Server is running`);
});


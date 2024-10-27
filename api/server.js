import colors from "colors";
import app from "./app.js";
import { PORT } from "./utils/secret.js";
import mongoDBConnection from "./config/db.js";

// app listener

app.listen(PORT, () => {
  mongoDBConnection();
  console.log(`Server is running on port ${PORT}`.bgGreen.black);
});

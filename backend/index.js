require("dotenv").config();
require("./db/mongoose");

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(morgan("tiny"));

// Allow cors
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: ``,
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: `http://localhost:3000`,
      credentials: true,
      contentType: "*",
    })
  );
}

// Routes
const user = require("./routes/user");
const listing = require("./routes/listing");
const proposal = require("./routes/proposal");

// Routes Middleware
app.use("/api/user", user);
app.use("/api/listing", listing);
app.use("/api/proposal", proposal);

const PORT = process.env.PORT || 5000;

// Deployment
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "frontend/client/build")));
//
//   app.get("*", (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, "frontend", "client", "build", "index.html")
//     );
//   });
// }

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

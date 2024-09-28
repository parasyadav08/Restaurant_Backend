// server.js
import app from "./app.js";

// Ensure process.env.PORT is properly configured
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});

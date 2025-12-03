import app from "./app";
import 'dotenv/config';

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
    console.log(`Server is running on port http://${HOST}:${PORT}`);
});
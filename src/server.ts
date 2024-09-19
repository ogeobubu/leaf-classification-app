import app from './app';
import swaggerDocs from "./swagger";

const PORT = process.env.PORT || 5000;

swaggerDocs(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

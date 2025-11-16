import express from 'express';
import upload from './routes/upload.js'
import cors from 'cors';
const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', upload);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
})
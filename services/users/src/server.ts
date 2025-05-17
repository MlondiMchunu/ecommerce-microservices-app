import express from 'express';

const app = express();
const port = 3003;

app.use(express.json());

app.listen(port, () => {
    console.log(`User service connected to port ${port}`);
});
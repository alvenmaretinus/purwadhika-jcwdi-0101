import express from 'express';
import userRoutes from './routes/user';
import pokemonRoutes from './routes/pokemon';

const PORT = 4000;

const app = express();

app.use('/api/users', userRoutes);
app.use('/api/pokemons', pokemonRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

export default app;

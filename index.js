const express = require('express');
const cors = require('cors');
require('dotenv').config();
// start project backend now
const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const PORT = process.env.PORT || 3000;

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
  );
  const strangerThingsService = new StrangerThingsService(
    strangerThingsRepository,
    );
    
    app.use(cors());
    
    // Caso ela seja true,
    // a API ativará o modo "Mundo Invertido"
    const hereIsTheUpsideDown = process.env.UPSIDEDOWN_MODE === 'true';

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(3000, () => {
  console.log(`conectado na porta ${PORT}`);
});

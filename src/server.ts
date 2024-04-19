import express from 'express';
import bodyParser from 'body-parser';
import { parseTicketPayload } from './tickets/ticket.service';
import { initDb } from '../db/database';

const app = express();
app.use(bodyParser.text());

// create ticket 
app.post('/ticket', async (req, res) => {
  try {
    await parseTicketPayload(req);
    res.status(200).send('Ticket saved');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving ticket');
  }
});

app.listen(3000, () => {
  console.log('Initializing database');
  initDb();
  console.log('Server listening on port 3000');
});

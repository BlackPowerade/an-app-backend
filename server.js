const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('knex')(require('./knexfile.js')['production']);
const port = process.env.PORT || 5001

app.use(cors());
app.use(express.json());

app.get('/calendar', async (req, res) =>
{
    knex
        .select('*')
        .from('calendar')
        .orderBy('id', 'asc')
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500) && console.log(err))
});

app.post('/calendar', async (req, res) => 
{
    knex('calendar')
        .insert(req.body)
        .then(data => res.status(201).json(data).send('Event added to calendar'))
        .catch(err => res.status(500) && console.log(err))
});

app.delete('/calendar', async (req, res) => 
{
    knex('calendar')
    .where('id', req.body.id)
        .del()
        .then(data => res.status(202).json(data).send('Event removed from calendar'))
        .catch(err => res.status(500) && console.log(err))
});

app.patch('/calendar', async (req, res) =>
{
    knex('calendar')
        .where('id', req.body.id)
        .update({event: req.body.event, time: req.body.time, location: req.body.location})
        .then(data => res.status(201).json(data).send('Event updated in calendar'))
        .catch(err => res.status(500) && console.log(err))
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
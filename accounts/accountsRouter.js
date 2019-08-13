const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (request, response) => {
  db('accounts')
    .then(accounts => {
      response.status(200).json(accounts);
      console.log(response)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'error getting the accounts from db' });
    });
});

router.get('/:id', (request, response) => {
  db('accounts')
  .where({ id: request.params.id })
  .first()
  .then(account => {
    response.status(200).json(account);
  })
  .catch(error => {
    console.log(error)
    response.status(500).json({ message: 'error getting the account from db' });
  });
});

router.post('/', (request, response) => {
  const account = request.body;

  db('accounts')
    .insert(account, 'id')
    .then(account => {
      response.status(202).json(account);
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'error saving the account to the db' });
    });
});

router.put('/:id', (request, response) => {
  const accountUpdate = request.body;

  db('accounts')
    .where('id', '=', request.params.id)
    .update(accountUpdate)
    .then(account => {
      if (account > 0) {
        response.status(201).json(account);
      } else {
        response.status(404).json({ message: 'not found' });
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'error updating the post' });
    });
});

router.delete('/:id', (request, response) => {
  db('accounts')
    .where('id', '=', request.params.id)
    .del()
    .then(account => {
      if (account > 0) {
        response.status(200).json(account);
      } else {
        response.status(404).json({ message: 'not found' });
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'error removing the post' });
    });
});

module.exports = router;


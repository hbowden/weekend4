var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/nah';

router.get('/', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      res.sendStatus(500);
      return;
    }
    client.query('SELECT * FROM todo ORDER BY completed ASC', function(err, result) {
      done();
      if(err) {
        res.sendStatus(500);
        return;
      }

      res.send(result.rows);
    });
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      res.sendStatus(500);
      return;
    }
    client.query('DELETE FROM todo ' + 'WHERE id = $1', [id], function(err, result) {
      done();
      if(err) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
  var item = req.body;

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      res.sendStatus(500);
      return;
    }
    client.query('UPDATE todo ' + 'SET completed = NOT completed ' + 'WHERE id = $1',
    [id], function(err, result) {
      done();

      if(err) {
        console.log('err', err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
});

router.post('/', function(req, res) {
  var item = req.body;

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      res.sendStatus(500);
      return;
    }
    client.query('INSERT INTO todo (todo, completed) ' +
                'VALUES ($1, $2)', [item.todoItem, item.completed],
                function (err, result) {
      done();
      if(err) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(201);
    });
  });
});

module.exports = router;

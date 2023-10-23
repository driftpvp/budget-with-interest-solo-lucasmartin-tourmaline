const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('/assets GET route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  if(req.isAuthenticated()) {
    let queryText = `SELECT * FROM "assets" WHERE "user_id" = $1;`;
    pool.query(queryText, [req.user.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log('/assets POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  if(req.isAuthenticated()) {
    console.log('user', req.user);
    let queryText = 'INSERT INTO "assets" ("assets_name", "assets_note", "assets_value", "user_id") VALUES ($1, $2, $3, $4);';
    pool.query(queryText, [req.body.assets_name, req.body.assets_note, req.body.assets_value, req.user.id])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(500)
    })
  } else {
    res.sendStatus(401);
  };


});

module.exports = router;

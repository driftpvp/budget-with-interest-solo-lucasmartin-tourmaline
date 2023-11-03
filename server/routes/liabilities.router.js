const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('/liabilities GET route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  if(req.isAuthenticated()) {
    let queryText = `SELECT * FROM "liabilities" WHERE "user_id" = $1 ORDER BY id;`;
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
  console.log('/liabilities POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  if(req.isAuthenticated()) {
    console.log('user', req.user);
    let queryText = 'INSERT INTO "liabilities" ("liabilities_name", "liabilities_note", "liabilities_value", "liabilities_required", "user_id") VALUES ($1, $2, $3, $4, $5);';
    pool.query(queryText, [req.body.liabilities_name, req.body.liabilities_note, req.body.liabilities_value, req.body.liabilities_required, req.user.id])
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

// DELETE route code here
router.delete('/:id', (req, res) => {
  if(req.isAuthenticated()) {
      let id = req.params.id;
      let queryText = 'DELETE FROM "liabilities" WHERE id=$1;';
      pool.query(queryText, [id])
      .then((result) => {
          res.sendStatus(200);
      })
      .catch((error) => {
          console.log('error DELETE /api/liabilities', error);
          res.sendStatus(500);
      })
  } else {
      res.sendStatus(401);
  }
});

// PUT route code here
router.put(`/toggle/:id`, (req, res) => {
  let { id } = req.params;
  const sqlText = `UPDATE "liabilities" SET "liabilities_required" = NOT "liabilities_required" WHERE "id" = $1;`;
  pool.query(sqlText, [id])
  .then((response) => {
    console.log(`Got stuff back from database`, response);
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log(`Error making the database query ${sqlText}`, error);
    res.sendStatus(500);
  })
})


module.exports = router;

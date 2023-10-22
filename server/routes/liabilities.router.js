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
    let queryText = `SELECT * FROM "liabilities" WHERE "user_id" = $1;`;
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
});

module.exports = router;

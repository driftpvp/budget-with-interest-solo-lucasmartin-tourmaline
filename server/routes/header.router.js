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
    let queryText = `SELECT
    a.user_id,
    SUM(a.assets_value) AS total_assets,
    COALESCE((
        SELECT SUM(liabilities_value)
        FROM liabilities AS l
        WHERE l.user_id = a.user_id
    ), 0) AS total_liabilities,
    SUM(a.assets_value) - COALESCE((
        SELECT SUM(liabilities_value)
        FROM liabilities AS l
        WHERE l.user_id = a.user_id
    ), 0) AS net_worth
FROM
    assets AS a
GROUP BY
    a.user_id
    WHERE id=$1;`;
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

module.exports = router;
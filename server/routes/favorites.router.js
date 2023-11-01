const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('/favorites GET route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  if(req.isAuthenticated()) {
    let queryText = `SELECT * FROM "favorites" WHERE "user_id" = $1;`;
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
  console.log('/favorites POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  if(req.isAuthenticated()) {
    console.log('user', req.user);
    let queryText = 'INSERT INTO "favorites" ("favorites_name", "favorites_note", "favorites_value", "user_id") VALUES ($1, $2, $3, $4);';
    pool.query(queryText, [req.body.favorites_name, req.body.favorites_note, req.body.favorites_value, req.user.id])
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

router.put('/edit/:id', (req, res) => {
  let { favorites_value } = req.params
  if(req.isAuthenticated()) {
    console.log('user', req.user);
    let queryText = `UPDATE "favorites" SET "favorites_value" = ${favoritesValue} WHERE "user_id" = $1;`;
    pool.query(sqlText, [favorites_value])
    // pool.query(queryText, [req.body.favorites_value])
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
        let queryText = 'DELETE FROM "favorites" WHERE id=$1;';
        pool.query(queryText, [id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error DELETE /api/favorites', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
});

// router.put('/toggle/:id', (req, res) => {
//   let { id } = req.params
//   if(req.isAuthenticated()) {
//     console.log('user', req.user);
//     const sqlText = `UPDATE "favorites" SET "favorites_value" = ${favoritesValue} WHERE "user_id" = $1;`;
//     pool.query(sqlText, [id])
//     // pool.query(queryText, [req.body.favorites_value])
//     .then(result => {
//         res.sendStatus(201);
//     })
//     .catch(error => {
//         console.log(error);
//         res.sendStatus(500)
//     })
//   } else {
//     res.sendStatus(401);
//   };
// });

module.exports = router;

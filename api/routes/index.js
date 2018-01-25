const express = require('express');
const router  = express.Router();

module.exports = function makeRoutes(conn) {
    router.get('/api/reserve', (req, res) =>
        conn.query(`
            SELECT  firstname, 
                    lastname, 
                    email, 
                    mobile
            FROM    reservations
        `).then((rows) => {
            res.json({success: true, rows});
            res.end();
        })
    );

    router.post('/api/reserve', (req, res) => {
        const q = `
                INSERT INTO reservations (
                    firstname, 
                    lastname, 
                    email, 
                    mobile
                )
                VALUES (
                    '${req.body.firstName}',
                    '${req.body.lastName}',
                    '${req.body.email}',
                    '${req.body.mobile}'
                )
            `;
        console.log(req.body);
        console.log(q);

        conn.query(q).then(() => {
                res.json({success: true});
                res.end();
            }).catch((e) => console.log(e.message));
        }
    );

    return router;
};

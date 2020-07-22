const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const DB_NAME = 'rtarf05';
const TB_NAME = 'document'
var mongo_db_url = "mongodb://" + DB_NAME + ":" + DB_NAME + "@122.155.202.161:27017/" + DB_NAME + "?authSource=" + DB_NAME;

function connectMongoDBNoToken(res, callback) {
    MongoClient.connect(
        mongo_db_url,
        {
            useNewUrlParser: true
        },
        function (err, db) {
            if (err) {
                res.sendStatus(404);
                return;
            }
            callback(db);
        }
    );
}

router.post('/add-file', (req, res) => {
    let formData = req.body.formData;
    formData.createAt = new Date();

    MongoClient.connect(
        mongo_db_url, {
        useNewUrlParser: true
    },
        function (err, db) {
            if (err) {
                res.sendStatus(404);
                return;
            }
            // เปลี่ยนเป็น  rtarf01-04 ตามเครื่องนักเรียน
            let dbo = db.db(DB_NAME);
            dbo.collection(TB_NAME).insertOne(formData, function (err, result) {
                if (err) {
                    res.send({
                        status: false
                    });
                } else {
                    res.send({
                        status: true,
                        result
                    });
                }
            });
            db.close();
        }
    );
});

module.exports = router;
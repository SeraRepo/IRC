const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const { Channel } = require("../models/channels.js");

router.post("/createChan", auth, (req, res) => {
    const channel = new Channel(req.body);

    channel.save((err, doc) => {
        if (err) return res.json({ success: false, err});
        return res.status(200).json({
            success: true
        })
    });
});

router.get("/getChans", auth, (req, res) => {
    Channel.find()
        .exec((err, chans) => {
            console.log(chans)
            if (err) return res.status(400).send(err);
            res.status(200).send(chans)
        });
});

router.delete("/deleteChan", auth, (req, res) => {
    Channel.findOne({ name: req.body.name}, (err, doc) => {
        if (err) return res.status(400).send(err);
        if (req.body.user._id == doc.creator) {
            Channel.deleteOne({name: req.body.name})
        } else {
            return res.status(403).send({success: false, message: "wrong credentials"})
        }
    })
});

router.post("/joinChannel", auth, (req, res) => {
    Channel.findOneAndUpdate({ name: req.body.name }, { $addToSet : { userConnected: req.user._id }}, (err, doc) => {
        if (err) return res.json({ success: false, err});
        return res.status(200).send({
            success: true
        });
    });
});

router.delete("/joinChannel", auth, (req, res) => {
    Channel.findOneAndUpdate({ name: req.body.name }, { $pull : { userConnected: req.user._id }}, (err, doc) => {
        if (err) return res.json({ success: false, err});
        return res.status(200).send({
            success: true
        });
    });
})

router.get("/getUsers", auth, (req, res) => {
    Channel.findOne({ name: req.body.name }, (err, doc) => {
        if (err) return res.status(200).json({ success: false, err});
        return res.json(doc.userConnected);
    })
})

module.exports = router;

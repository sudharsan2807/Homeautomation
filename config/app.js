const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const cron = require('node-cron');
const axios = require('axios');
const time = require('./time.js');
const { json } = require('body-parser');
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://sudharsan2807:' + encodeURIComponent('sony#2807') + '@cluster0.kfidy0y.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error on connecting to MongoDB:', error);
});

const scheduletime = time.scheduletime();

const passwordSchema = new mongoose.Schema({
    password: String,
});

const monmodel = mongoose.model("password", passwordSchema);

app.post("/post", async (req, res) => {
    console.log("Inside POST function");

    const data = new monmodel({
        password: req.body.password,
        id: req.body.id
    });

    const savedData = await data.save();
    res.json(savedData);
});

app.put("/put/:id", async (req, res) => {
    console.log("Inside the PUT function");

    const upPassword = req.body.password;
    const upId = req.params.id;

    try {
        const updatedData = await monmodel.findOneAndUpdate(
            { id: upId },
            { password: upPassword },
            { new: true }
        );

        if (!updatedData) {
            res.status(404).send("Data not found");
        } else {
            res.json(updatedData);
        }
    } catch (error) {
        console.error(`Error in updating: ${error}`);
        res.status(500).send("Internal server error");
    }
});

app.get("/fetch/all", async (req, res) => {
    try {
        const result = await monmodel.find().exec();

        if (!result || result.length === 0) {
            res.status(404).json({ message: "Data not found" });
        } else {
            res.json(result);
        }
    } catch (error) {
        console.error(`Error in fetching data: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
});

const measuredata = new mongoose.Schema({
    highvalue: Number,
    lowvalue: Number,
    id: Number
})

const monmeas = mongoose.model("Measurment", measuredata);

app.post("/measurment/post", async (req, res) => {
    const data = new monmeas({
        highvalue: req.body.highvalue,
        lowvalue: req.body.lowvalue,
        id: req.body.id
    })

    const savedData = await data.save();
    res.json(savedData);
})

app.get("/fetch/measurment", async (req, res) => {
    try {
        const result = await monmeas.find().exec();

        if (!result || result.length === 0) {
            res.status(404).json({ message: "Data not found" })
        } else {
            res.json(result)
        }
    } catch (err) {
        console.error(`Error while fetching the measurments: ${err}`)
    }
})

app.put("/upg/measurment/high/:id/data/:data", async (req, res) => {
    try {
        const fetch = req.params.id;
        const data = req.params.data
        const senddata = await monmeas.findByIdAndUpdate(fetch, { highvalue: data }, { new: true })
        if (senddata === 0 || !senddata) {
            res.json("Invalid id or data").status(404);
        } else {
            res.json(senddata)
        }
    } catch (err) {
        console.log(err);
        res.json(err)
    }
})

const timedata = new mongoose.Schema({
    SerialNumber: Number,
    Name: String,
    Hours: Number,
    Minutes: Number,
    Delay: Number
})

const mongotime = mongoose.model("time", timedata)

app.post("/time/post", async (req, res) => {
    const data = new mongotime({
        Name: req.body.name,
        Hours: req.body.hours,
        Minutes: req.body.minutes,
        Delay: req.body.Delay
    })

    const savedData = await data.save();
    res.json(savedData);
})

app.get("/fetch/time/all", (req, res) => {
    mongotime.find().then((response) => {
        res.json(response);
    }).catch((err) => {
        res.json(err);
        console.log(err);
    })
})

app.get("/fetch/time/:id", async (req, res) => {
    try {
        const fetch = req.params.id;
        const get_id = await mongotime.find({ _id: fetch });
        if (!get_id || get_id.length == 0) {
            console.log("Invalid id");
            res.status(404).json("Invalid id")
        } else {
            res.json(get_id)
        }
    } catch (err) {
        console.log("Error message:", err);
        res.json("Error message", err)
    }
})
app.put("/upadate/time/:_id", async (req, res) => {
    try {
        let fetch = req.params._id
        let upadate = await mongotime.findByIdAndUpdate(fetch, req.body);
        if (!upadate || upadate.length == 0) {
            console.log("Invalid id");
            res.status(404).json("Invalid id")
        } else {
            res.json(upadate)
        }
    } catch (err) {
        console.log("error on sending id message:", err);
        res.sendStatus(500);
    }
})
app.delete("/delete/time/:_id", async (req, res) => {
    try {
        let id = req.params._id
        let fetch = await mongotime.findByIdAndDelete(id);
        if (!fetch || fetch.length == 0) {
            console.log("Invalid Id");
            res.json("Invalid id");
        } else {
            res.json(fetch)
        }
    }
    catch (err) {
        res.status(404).json("Error on deleting", `${err}`)
    }
})

const roomdata = new mongoose.Schema({
    name: String,
    icon: String,
})

const mongoroom = mongoose.model('Room', roomdata);

app.post("/room/post", async (req, res) => {
    try {
        const data = new mongoroom({
            name: req.body.name,
            icon: req.body.icon
        })
        const savedata = await data.save();
        res.json(savedata);
    } catch (err) {
        console.log("error in post", err);
    }
})

app.put("/room/put/:id", async (req, res) => {
    try {
        let fetch = req.params.id;
        let senddata = await mongoroom.findByIdAndUpdate(fetch, req.body);
        if (senddata === 0 || !senddata) {
            res.json("Invalid id");
            console.log("Invalid id");
        } else {
            res.json(senddata)
        }
    } catch (err) {
        console.log(err);
    }
})

app.get("/room/get/all", async (req, res) => {
    mongoroom.find().then((response) => {
        res.json(response)
    }).catch((err) => {
        res.json(err);
        console.log(err);
    })
})
app.listen(4000, () => {
    console.log('Server listening on port 4000');
});

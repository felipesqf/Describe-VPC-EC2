const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const express = require('express')
const app = express()
const port = 3000
dotenv.config();
// Import required AWS SDK clients and commands for Node.js

getServices = () => {
    // AWS.config.setPromisesDependency();
    AWS.config.update({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
        region: process.env.REGION,
    })

    var ec2 = new AWS.EC2({apiVersion: '2016-11-15'})
    var params = {
    DryRun: false
    };
    // Call EC2 to retrieve policy for selected bucket
    ec2.describeInstances(params, function(err, data) {
    if (err) {
        console.log("Error", err.stack);
    } else {

        app.get('/', (req, res) => {
            res.send(JSON.stringify(data))
        })
        console.log("Success", data.Reservations[0].Instances);
    }
    });
}

getServices();
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})
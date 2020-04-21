const express = require('express')
var async = require('async');
const { MongoClient, ObjectID } = require('mongodb')
const app = express()
const port = process.env.PORT
const mongoose = require('mongoose')
app.use(express.json())
const data = require('./dataReviews')



console.log(data.length)


// DataBase Config
// const db = require('./config/keys').mongoURI;
const connectionURL = process.env.DBURL
const databaseName = "TEST"


// Connect to MongoDB
MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
  
      console.log('MongoDB Connected')

    app.get('/time',async(req,res)=>{
            code = req.body.code
            db.collection('user').find({ CODE: code }).toArray((error, result) => {
            res.send(result)
           
        })
    })
    app.patch('/time',(req,res)=>{
        db.collection('user').updateMany({},{$set:{"REVIEW":0}})
            res.send()
               
    })
    app.get('/time/teacher',async (req,res)=>{
        name = req.body.name
        code = req.body.code
        if(req.body.sort==='morn'){
            flag =1
        }
        else{
            flag =0
        }
        db.collection('user').find({FACULTY:name,CODE:code,Flag:flag}).toArray((error,result)=>{
            res.send(result)
            console.log(result)
            
        })
        if(flag===1){
            app.get('/time',async(req,res)=>{
                db.collection('user').find({FACULTY:name,CODE:code,SLOT:{$regex:/^L3[0-9]|^L4[0-9]|^L5[[0-9]/}}).toArray((error,result)=>{
                    console.log(result)
                    res.send(result)
                })
            
            })
        }
        else{
            app.get('/time',async(req,res)=>{
                db.collection('user').find({FACULTY:name,CODE:code,SLOT:{$regex:/^L[0-9]|^L1[0-9]|^L2[0-9]/}}).toArray((error,result)=>{
                    console.log(result)
                    res.send(result)
                })
            
            })

        }
        

    })

    

    async.eachSeries(data, function updateObject (obj, done) {
        // Model.update(condition, doc, callback)
        db.collection('user').updateMany({ FACULTY: obj.NAME }, { $set : { REVIEW: obj.RATINGS }}, done);
    }, function allDone (err) {
        // this will be called when all the updates are done or an error occurred during the iteration
    });

    
    // mr = db.runCommand({
    //     "mapreduce": "user",
    //     "map": function() {
    //         var regxp = /\s/;
    //         for (var key in this) { 
    //             if (key.match(regxp)) {
    //                 emit(key, null); 
    //             }
    //         }
    //     },
    //     "reduce": function() {}, 
    //     "out": "filtered_keys"
    // })
    
    // db[mr.result].distinct("_id")
    
    // var update = { "$rename": {} };
    // db[mr.result].distinct("_id").forEach(function (key){
    //     update["$rename"][key] = key.replace(/\s+/g, "_");
    // });
    
    // //print(update)
    
    // db.user.update({ }, update, false, true );
    
        

    
    })
  






app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

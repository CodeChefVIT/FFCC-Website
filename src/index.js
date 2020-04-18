const express = require('express')

const User = require('./models/user')
const { MongoClient, ObjectID } = require('mongodb')
const app = express()
const port = process.env.PORT || 3000
 const mongoose = require('mongoose')
app.use(express.json())


// DataBase Config
// const db = require('./config/keys').mongoURI;
const connectionURL = 'mongodb+srv://jugalbhatt123:Panujugu123@cluster0-cmlwg.mongodb.net/test?retryWrites=true&w=majority'
const databaseName = "TEST"


// Connect to MongoDB
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
  
      console.log('MongoDB Connected')

    app.get('/time/:code',async(req,res)=>{
          code =req.params.code
        db.collection('user').find({ CODE: code }).toArray((error, result) => {
            res.send(result)
           
        })
    })
    app.patch('/time',(req,res)=>{
        db.collection('user').updateMany({},{$set:{"REVIEW":0}})
            res.send()
               
    })
    app.get('/time',async (req,res)=>{
        name = req.query.name
        code = req.query.code
        if(req.query.sort==='morn'){
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
    
        

    
    })
  






app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

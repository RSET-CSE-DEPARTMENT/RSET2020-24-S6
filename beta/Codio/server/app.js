const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
codecount=0
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET','POST'],
    credentials: true //since no ssl
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

const {DynamoDBClient , GetItemCommand,PutItemCommand,ScanCommand,UpdateItemCommand} = require("@aws-sdk/client-dynamodb");
//const {DynamoDBClient2, } = require("@aws-sdk/client-dynamodb");

//set aws region and credentials
const REGION = "ap-south-1"
const credentials= {

    secretAccessKey: 'WbVrvyqcUFDTOBUS4+13UWlvs0LzMb3/80qX2Ihb',
    accessKeyId: 'AKIAU4KAUOXD3FB6O76C'
};
const REGION1="ap-south-1";
const credentials1={
    secretAccessKey:'k1DdHwcwjV1cE6XEMAk1xihsL1/8MuuD5lFO9ZVZ',
    accessKeyId: 'AKIAVBBA7M24BVL35YP3',
}

//Create DynamoDB client object

const client1 = new DynamoDBClient({   //client connect..authentication token?
    region:REGION1,
    credentials: credentials1
});
app.post('/info',(req,res)=>{   ///req-data sent to server..result-msg/...
    //const email = req.body.data.email;
const input1={
    TableName:"information",
    Key:{
        "algorithm":{S:req.body.data.algorithm},
    }  
};
const command1 = new GetItemCommand(input1);

async function fetchDetails() { //wait for process to end before doing rest
    try{
        const response1 = await client1.send(command1)
        console.log("search",response1)
        res.send(response1.Item);
    } catch(err) {
        console.error("error:",err)
    }
}
    fetchDetails();
})


const client = new DynamoDBClient({   //client connect..authentication token?
    region:REGION,
    credentials: credentials
});
app.post('/login',(req,res)=>{   ///req-data sent to server..result-msg/...
    //const email = req.body.data.email;
const input={
    TableName:"formdata",
    Key:{
        "email":{S:req.body.data.email},
    }  
};
const command = new GetItemCommand(input);
async function searchItem() { //wait for process to end before doing rest
    try{
        const response = await client.send(command)
        console.log("search",response)
        res.send(response.Item);
    } catch(err) {
        console.error("error:",err)
    }
}
    searchItem();
})

app.post('/codegeneration',(req,res)=>{   ///req-data sent to server..result-msg/...
    const code = req.body.data.code;
    //console.log(code);
    //codecount++;
    const fs = require('fs');
    fs.open('codecount.txt', 'a+', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
      });
    fs.readFile('codecount.txt', function (err, data) {
        if (err) {
           return console.error(err);
        }
        console.log("Count read: "+ data.toString());
        codecount=data;
        codecount++
        //console.log("Count code "+ codecount);
        fs.writeFile('codecount.txt', codecount+"" , function (err) {
            if (err) throw err;
            console.log('Saved!');
    });

     });
     
    fs.writeFile('mynewfile1.py', code , function (err) {
    if (err) throw err;
    console.log('Saved!');
    var spawn = require("child_process").spawn;
    var process = spawn('python',["mynewfile1.py"] );
    process.stdout.on('data',function(data){
        util.log(data);
    });
});
})
app.use('/file', function (req, res, next) {
    const path = require('path');
    const options = {
        root: path.join(__dirname)
    };
 
    const fileName = 'mynewfile1.py';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
            next();
        }
    });
});
app.get('/file', function (req, res) {
    console.log("File Sent")
    res.send();
});
app.use('/download/output', function (req, res, next) {
    const path = require('path');
    const options = {
        root: path.join(__dirname)
        
    };
 
    const fileName = 'output.pkl';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
            next();
        }
    });
});
 
app.get('/download/output', function (req, res) {
    console.log("File Sent")
    res.send();
});
 
app.post('/signup',(req,res)=>{   ///req-data sent to server..result-msg/...
    const email = req.body.data.email;
    const item={
        "email": {S:req.body.data.email}, //S-string N-number
        "name": {S:req.body.data.name},
        "phone":{S:req.body.data.phone},
        "password":{S:req.body.data.password},
        "status": { S: "user"}
    };

    //define table name and putitem command
    const tableName="formdata";
    const putItemCommand= new PutItemCommand({ //write to db
        TableName: tableName, 
        Item: item
    });

    //call dynamic api to add item to table
    async function addItem() { //wait for process to end before doing rest
        try{
            const response = await client.send(putItemCommand)
            res.redirect('localhost:3000/login');
            console.log("item added successfully",response)
        } catch(err) {
            console.error("error adding item:",err)
        }
    }
    addItem();
})

app.post('/admin',(req,res)=>{ 
    try{
        ///
        const fs = require('fs');
        fs.readFile('codecount.txt', function (err, data) {
            if (err) {
               return console.error(err);
            }
            console.log("Count read: " + data.toString());
            res.send(data.toString());
         });
    } catch(err) {
        console.error("error sending count:",err)
    }
})

app.post('/admin2',(req,res)=>{ 

    async function countItem() { //wait for process to end before doing rest
        try{
            const command = new ScanCommand({
                TableName: "formdata",
                Select: "COUNT",
              });
            const response = await client.send(command);
              console.log("logincount:"+response.Count);
              res.send(response.Count+"")
        } catch(err) {
            console.error("error:",err)
        }
    } 
    countItem();
})
app.post('/admin3',(req,res)=>{   ///req-data sent to server..result-msg/...
    //const email = req.body.data.email;
const input1={
    TableName:"information",
    Key:{
        "algorithm":{S:req.body.data.algorithm},
    }  
};
const command1 = new GetItemCommand(input1);
async function getInfo() { //wait for process to end before doing rest
    try{
        const response1 = await client1.send(command1)
        console.log("search",response1)
        res.send(response1.Item);
    } catch(err) {
        console.error("error:",err)
    }
}
    getInfo();
})

app.post('/admin4',(req,res)=>{   ///req-data sent to server..result-msg/...
    //const email = req.body.data.email;
const input1={
    TableName:"information",
    Key:{
        "algorithm":{S:req.body.data.algorithm},
    },
    UpdateExpression: "set details = :det",
    ExpressionAttributeValues: {
        ":det": { S:req.body.data.details},
      },
};
const command1 = new UpdateItemCommand(input1);
async function updateInfo() { //wait for process to end before doing rest
    try{
        const response1 = await client1.send(command1)
    } catch(err) {
        console.error("error:",err)
    }
}
    updateInfo();
})
app.listen(8080,()=>{ //specifying server port
    console.log('server started on port 8080')
})


//ncminfo accesskey//AKIAU4KAUOXDVVQS34HK
//ncm secretAccessKey//yJvUAr1nrt8ltUDS1agmi2Z88B/tWYXT3vTIXyyE
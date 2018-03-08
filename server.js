var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config={
    user:'simranbhamrah1997',
    database:'simranbhamrah1997',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var articles={ 
'article1':{
    title:'Article One | Simran Bhamrah',
    heading:'Article One',
    date:'18 Feb 2018',
    content:`<p>
                    This is content for my first article.This is content for my first article.This is content for my first articl.This is content for my first article.This is content for my first article.This is content for my first article.
                </p>
                <p>
                     This is content for my first article.This is content for my first article.This is content for my first artic.This is content for my first article.This is content for my first article.This is content for my first article.
                </p>
                 <p>
                     This is content for my first article.This is content for my first article.This is content for my first artic.This is content for my first article.This is content for my first article.This is content for my first article.
                </p>`
},
'article2':{
    title:'Article Two | Simran Bhamrah',
    heading:'Article Two',
    date:'19 Feb 2018',
    content:`<p>
                    This is content for my first article.This is content for my first article.This is content for my first articl.This is content for my first article.This is content for my first article.This is content for my first article.
                </p>
                <p>
                     This is content for my first article.This is content for my first article.This is content for my first artic.This is content for my first article.This is content for my first article.This is content for my first article.
                </p>
                 <p>
                     This is content for my first article.This is content for my first article.This is content for my first artic.This is content for my first article.This is content for my first article.This is content for my first article.
                </p>`
},
'article3':{
    title:'Article Three | Simran Bhamrah',
    heading:'Article Three',
    date:'20 Feb 2018',
    content:`<p>
                    This is content for my first article.This is content for my first article.This is content for my first articl.This is content for my first article.This is content for my first article.This is content for my first article.
                </p>
                <p>
                     This is content for my first article.This is content for my first article.This is content for my first artic.This is content for my first article.This is content for my first article.This is content for my first article.
                </p>
                 <p>
                     This is content for my first article.This is content for my first article.This is content for my first artic.This is content for my first article.This is content for my first article.This is content for my first article.
                </p>`
}
};

function createTemp(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemp=`
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width-device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body class="container">
            <div>
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemp;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt) {
    var hashed = crypto.pbkdf2Sync(inout,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}

app.get('/create-user',function(req,res) {
   var salt = crypto.getRandomBytes(128).toString('hex');
   var dbString = hash(password,salt);
   pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)', [username,dbString], function(err,result) {
       if(err) {
           res.status(500).send(err.toString());
       } 
       else {
           res.send(JSON.stringify(result.rows));
       }
   });
});

var pool=new Pool(config);
app.get('/test-db', function(req,res)
{
    pool.query('SELECT * from test',function(err,result)
    {
       if(err) {
           res.status(500).send(err.toString());
       } 
       else {
           res.send(JSON.stringify(result.rows));
       }
    });
});

var counter=0;
app.get('/counter',function(req,res){
   counter=counter+1;
   res.send(counter.toString());
});

app.get('articles/:articleName', function (req, res) {
    pool.query("SELECT * from article where TITLE='"+req.params.articleName+"'",function(err,result){
        if(err) {
            res.status(500).send(err.toString());
        } else {
            if(result.rows.length === 0) {
                res.status(404).send('Article not found');
            } else {
                var articleData=result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var a1={
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
    
};
function createTemp (data) {
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

app.get('/article1', function (req, res) {
  res.send(createTemp(a1));
});

app.get('/article2', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article2.html'));
});

app.get('/article3', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article3.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
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

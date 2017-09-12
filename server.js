var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require ('pg').Pool;
var config = {
    user: 'dineshbs97',
    database:'dineshbs97',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var articles = {
                            'article-one':{
                                title: 'Thinking of Dinesh',
                                heading:'Memories',
                                date:'Sep8,2017',
                                content:    `
                                               <p>
                                                  Yeah!!!!! I am Dinesh....I think i wasted my college life from the first two years ....I hope me to comeback to the world  with the fine skills to survive in the  racing  universe....
                                               </p>`
                        },
                            'article-two':{
                                title: 'Trip to kerala',
                                heading:'Industrial visit to kerala',
                                date:'Nov12,2017',
                                content:    `
                                               <p>
                                                  A famous place to visit......Awaiting to Swim...
                                               </p>`
                                
                            },
                            'article-three':{
                                 title: 'Coffee day moments',
                                 heading:'Hello friends.....',
                                 date:'Dec 16,2017',
                                 content:    `
                                               <p>
                                                  Pls dont order the Espresso inn the coffee day shop.. Because it is very large amount to drink.....Fuck OFF......
                                               </p>`
                            }
};
function createTemplate (data) {
     var title= data.title;
     var heading= data.heading;
     var date = data.date;
     var content= data.content;
     var htmlTemplate=`
                <html>
                    <head>
                        <title>
                            ${title}
                        </title>
                          <meta name="viewport" content="width=device-width, initial-scale=1" />
                          <link rel="stylesheet" href="/ui/style.css" />
                    </head>
                    <body>
                       <div>
                            <div class="container">
                                    <div>
                                        <a href='/'>Home</a>
                                    </div>
                                    <h4>
                                     ${heading}
                                    </h4>
                                       <div>
                                       ${date}
                                      </div>
                                        <div>
                                             ${content}
                                        </div>
                            </div>
                       </div>
                    </body>
                </html>
            `;
            return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


var pool = new Pool(config);
app.get('/test-db',function(req,res){
 //make a select request
 // return aresponse with the results
        pool.query('SELECT * FROM article',function(err,result){
            if (err){
                res.status(500).send(err.toString());
            }
            else{
                res.send(JSON.stringify(result.rows));
            }
        });
});

var counter = 0;
app.get('/counter',function(req,res){
    counter=counter + 1;
    res.send(counter.toString());
});


app.get('/articles/:articleName',function(req,res){
    //articleName== article-one
    //articles[articleName]== {} content object for article one
    
     pool.query('SELECT * FROM article WHERE title= ' + req.params.articleNmae,function(err,result){
            if (err){
                res.status(500).send(err.toString());
            } else{
              if(result.rows.length === 0){
                  res.status(404).send('Article not found');
              } else{
                  var articleData =result.rows[0];
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

var express = require('express');
var morgan = require('morgan');
var path = require('path');

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
    },
};
function createTemplate(data){
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
app.get('/:articleName',function(req,res){
    //articleName== article-one
    //articles[articleName]== {} content object for article one
    var articleName= req.params.articleName;
    res.send(createTemplate(articles[aricleName]));
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

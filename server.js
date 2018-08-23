const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',() => new Date().getFullYear());

hbs.registerHelper('screamIt',(text) => text.toUpperCase());

app.set('view engine','hbs');

app.use(express.static(__dirname+'/'+'public'));

app.use((req,res,next) => {

    var now = new Date().toString();

     log =`${now} : ${req.method} ${req.url}` ;

     console.log(log);

     fs.appendFile('server.log',log+ '\n',(err) => {

        if(err){
            console.log('Unable to append to server.log.');
        }
        });

    next();


});

app.use((req,res,next) => {
 
    if(req.url === '/maintenance'){
        res.render('maintenance.hbs');
    }else{

        next();
    }
  

});


app.get('/',(req,res) => {

    //res.send('<h1><center>hello world mon premier express</center></h1>');
   
    res.render('home.hbs',{
        welcomeMessage : 'Welcome in my Web Site node',
        pageTitle : 'about Page'
         
    })

});

app.get('/about',(req,res) => {
  
    res.render('about.hbs',{

        pageTitle : 'about Page'
    
});

});


app.get('/bad',(req,res) => {
    
          
        res.send({
            errrorMessage : 'Unable to handle request'
       })
    
    });


app.listen(3500,() => {

    console.log('Server is up in port 3500');
});
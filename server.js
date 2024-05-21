const express = require('express');
//conectar a la base de datos
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./mydb.sqlite', (err)=>
{
    if(err)
        console.log(err.message);
    console.log('Database created');
});

const app = express();
const port = 8000;

//para poder recibir body como x-url-form-encoded
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//ofrecer contenido de la carpeta public
app.use(express.static('public'));

//endpoint para manejar el form de agregar fruta
app.post('/submit', (req, res)=>
{
    console.log("data received: ",req.body);

    // agregar a la base de datos la fruta :)

    res.json({message:'Fruta agregada'});
})

//Endpoint para el dato random de una sola fruta random 
app.get('/random', (req, res)=>
{
    let query = "SELECT * FROM fruta ORDER BY RANDOM() LIMIT 1"
    //db.all para varios resultados (SELECT)
    //db.run para un resultado (INSERT, UPDATE, DELETE, or CREATE TABLE)
    db.all(query, (err, rows)=>
    {
        if(err)
        {
            console.log(err.message);
            res.json({error:err.message});
        } 
        else
        {
            res.json(rows);
        }
    });
});

//resource catch all
app.use( (req, res, next) =>
{
    res.status(404).sendFile(__dirname+'/public/notfound.html');
} );

app.listen(port, ()=>
{
    console.log("iniciando servidor web de la api de frutas");
});

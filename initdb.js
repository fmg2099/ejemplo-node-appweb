//inizializa la base de datos 
//incluir la biblioteca de sqlite3

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./mydb.sqlite', (err)=>
{
    if(err)
        console.log(err.message);
    console.log('Database created');
});

let query = "CREATE TABLE IF NOT EXISTS fruta \
        (id INTEGER PRIMARY KEY AUTOINCREMENT,\
        name TEXT,\
        sci_name TEXT,\
        random_fact TEXT);"

db.run(query, (err)=>
{
    if(err)
    {
        console.log(err.message);
    }
    else  
    {
        console.log('tabla fruta creada en al BD');
    }
})

query = "INSERT INTO fruta (name,sci_name,random_fact) VALUES \
    ('Manzana', 'malus domestica', 'Existen mas de 7500 variedades'),\
    ('Pera','pyrus comunis', 'Tardan semanas en madurar y ser comestibles'),\
    ('Naranja','citrus sinensis', 'Su nombre viene del sanscrito naranga');";

db.run(query, (err)=>
{
    if(err)
        console.log(err.message);
    console.log('Registros insertados');
})

db.close();

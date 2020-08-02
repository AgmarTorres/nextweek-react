npm init -y
npm install express @types/express
npm i typescript
npm i ts-node
npx tsc --init

npm i nodemon
npm i knex
npm install sqlite3

//points
//item (items de coleta)
//Muitos para Muitos(Tabela Pivo)


Migrations = controle de versão do banco de dados

// Create table points
// Create table users


Settings.json
     "material-icon-theme.folders.associations":{
         "infra":"app",
         "entities":"class",
         "schemas":"class",
         "typeorm":"database",
         "repositories":"mappings",
         "http":"container",
         "migration":"tools",
         "modules":"components",
         "implementations":"core",
         "dtos":"typescript",
         "fakes":"mock",
         "websockets":"pipe",
         "protos":"pipe",
         "grpc":"pipe"
    }


criar as migrations com up e down

criar um arquivo 
    /knexfile.ts

import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    },
    migrations:{
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
}

npx knex migrate:latest --knexfile knexfile.ts migrate:latest

useNullAsDefault: true
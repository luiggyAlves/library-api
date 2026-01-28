import { Sequelize } from "sequelize";

// instancia uma nova instancia do sequelize 
const db = new Sequelize(
   {    
    // define que o sequelize usará o sqlite e armazenaraá os dados no arquivo database.sqlite
     dialect: "sqlite",
    storage: "./database.sqlite"
   }
);

// tentar autenticar a conexão com o banco de dados (iniciar a conexão com o banco)
try {
    // é preciso usar o await para o código parar e só prosseguir quando a conexão for autenticada, pois não há como continuar o código sem o banco de dados estar conectado
    await db.authenticate();
    console.log("conection sucessful'");
} catch (error) {
    console.log("unable to connect to the database:", error);
}

// exporta a classe Sequelize e a instancia do banco de dados para que os outros arquivos do projeto possam usar
export default {
    Sequelize, 
    db,
}
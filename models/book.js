import config from "../db/config.js";

// desestruturar sequelize e db de config (pegar o que tá em config referente a eles e passar para uma variável nesse escopo, com o mesmo nome dos elementos no arquivo config)
const {Sequelize, db} = config 

// definiremos um modelo book, ele será usado para definir a tabela do banco de dados sql (por isso o db.define), nele criamos o que será cada seção da tabela, title, author e count e definimos os tipos dos dados de cada um
const Book = db.define('Book', {
    title:{
        type:Sequelize.STRING,
        unique:true,
    },
    author:{
        type:Sequelize.STRING
    },
    count:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
}, {})

// Book.sync irá sincronizar o modelo com o banco de dados e criará a tabela Books
Book.sync()

// exportamos o modelo para podermos usá-lo no books router, que devidamente atenderá nossas requisições
export default Book




// essa importação dará acesso ao ORM book que criamos, que nos permitirá efetivamente fazer as operações de CRUD no banco de dados 
import Book from "../models/book.js";

// adicionando uma rota GET para os livros 
// essa é uma função de plugin, ela é responsável por conter dentro dela as funções do servidor, nesse caso, nossa função irá conter as rotas da nossa api
// fastify.get registra uma rota get com um parametro ID, que irá ser justamente o id do livro que a requisição do cliente irá enviar, esse id é desestruturado diretamente do request.params, após isso (enquanto não integramos o banco de dados), um objeto livro é criado com o atributo id e retorando com o reply.send, que é responsável por devolver o código json a uma requisição
async function booksRouter(fastify, _opts) {
    fastify.get("/:id", async (request, reply)=>{
        const {id} = request.params
        try {
            // Book.findByPk recebe um parametro, vindo da requisição no nosso caso, e pesquisa o registro correspondente a esse id no banco de dados, uma vez que acha, ele será retornado com o nosso reply.send
            const book = await Book.findByPk(id)
            reply.send(book)
        } catch (error) {
            console.error("Error: ", error.message)
            reply.send(error)
        }
    });

     fastify.get("/", async (request, reply)=>{
        try {
           
            // book.findall retorna todos os registros de um banco de dados na forma de uma array json
            const book = await Book.findAll()
            reply.send(book)
        } catch (error) {
            console.error("Error: ", error.message)
            reply.send(error)
        }
    });

     fastify.put("/:id", async (request, reply)=>{
        const {id} = request.params
        const {title, author} = request.body
        try {
            // book.update recebe um um dado e o atualiza no local especificado
            const book = await Book.update({title, author}, {where:{id}})
            reply.send(book)
        } catch (error) {
            console.error("Error: ", error.message)
            reply.send(error)
        }
    });

     fastify.delete("/:id", async (request, reply)=>{
        const {id} = request.params
        try {
            // book.destroy destroi o registro do identificador de where, sempre use o where, pois se não usar, excluirá todos os registros 
            const book = await Book.destroy({where:{id}})
            reply.send(book)
        } catch (error) {
            console.error("Error: ", error.message)
            reply.send(error)
        }
    })

    fastify.post("/", async (request, reply)=>{
        const {title, author} = request.body
        try {
            // primeiro faça a busca usando await para em cima disso trabalhar com as condições etc.
            let book = await Book.findOne({where:{title}});
            // book.create cria um registro com os parametros que passamos, nesse caso, o title e o author vindo da requisição virarão um registro no banco de dados, que já está configurado com esses dados 
            if(book){  
                console.log("livro existente, quantidade atualizada")
                book.count++
                // .save() salva qualquer alteração feita no bd pelo node em memória, no banco de dados de fato
                await book.save()
            }else{
                book  = await Book.create({title, author})
            }
            
            reply.send(book)
        } catch (error) {
            reply.send(error)
        }
    });
}

// permitir que o código seja importado e acessado de outros arquivos 
export default booksRouter
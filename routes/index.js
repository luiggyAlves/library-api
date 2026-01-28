import booksRouter from "./booksRouter.js";

// aqui estamos registrando o plugin books Router sob o namepasce "/books", assim, as requisições da rota usarão o prefixo /books para enviar as requisições, essa função routes criada será responsavel por registrar na instancia do servidor atual o nosso plugin de rotas booksRouter

 async function routes(fastify, _opts) {
    fastify.register(booksRouter, {prefix:"/books"})
}

export default routes


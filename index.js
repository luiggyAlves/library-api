import Fastify from "fastify";
import formbody from '@fastify/formbody'
import routes from "./routes/index.js";

// instanciando e inicializando o servidor 
const app = Fastify()
// formbody será responsável pelas funções de middleware, a api trabalhará com JSON, porém as requisições são enviadas criptografados na forma de URLs, então será necessário analisar (parsing) e normalizar os dados e as requisições recebidas e para isso usaremos o fastify formbody
// o comando abaixo registra o plugin formbody no servidor, para fazer esse parsing
await app.register(formbody)
const PORT = 3000


// Adicionando uma rota GET
// app.get define uma rota que atende apenas requisições get, o fato dela apontar para '/' significa que ela atende apenas as requisições que forem feitas ao URI padrão definido no listen do servidor
// caso uma requisição que aponte para o uri padrão (localhost) e use o método GET, a função de callback será ativada
// usamos a função de callback reply.send para responder ao cliente com JSON, caso a requisição seja processada
// variáveis declaradas, mas que não são usadas em uma função por convenção começam com _, por isso _request nesse caso
// os objetos reply e request são padrões do fastify, request nos permite examinar o conteúdo da requisição, já o reply nos permite atribuir valores e empacotar dados na resposta ao cliente


// middleware de tratamento de erros (catch-all)
// setNotFoundHandler define uma rota padrão para as requisições que não estão sendo cobertas pelos GETs
// linha 34: desestrutura da propriedade error da request os atributos message e statusCode caso disponiveis, caso error seja undefined, coloca um objeto vazio por padrão
// linha 36: configura o status http da resposta como o status retornado ou 500 por padrão caso undefined e envia o status e a messagem de erro previamente configuradas


// esse bloco registra na nossa instancia do servidor o plugin books route, aqui adicionamos o prefixo /api, ja haviamos adicinado o prefixo /books no routes e o get no booksRouter esta direcionado para /:id, logo, as requisições serão ouvidas pelo caminho localhost/api/books/:id

app.register(routes, {prefix:"/api"})
app.setNotFoundHandler((request, reply)=>{
    const {message, statusCode} = request.error || {} // extrair os atributos message e statusCode da propriedade error,da request, caso error de undefined, coloque um objeto vazio como padrão
    reply.status(statusCode || 500).send({message})
});

// o registro das rotas deve sempre vir antes do listen, pois esse é o momento em que o servidor é iniciado e após sua inicialização, não é possível registrar novas rotas
try {
    await app.listen({port:PORT}) // configurando o servidor para observar a nossa porta escolhida
    console.log(`listening at http://localhost:${PORT}`)
} catch (error) {
    // irá nos indicar quando houver algum erro e interromperá a execução do projeto
    console.log(error)
    process.exit(1)
}
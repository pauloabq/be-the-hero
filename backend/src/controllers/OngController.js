// crypto - pacote que vem junto com o node
const crypto = require('crypto');
// a confguração de conexão com o banco.
const connection = require('../database/connection');

// exportando um objeto que contém os métodos
module.exports = {
    // usando async / await para aguardar o processamento.
    index : async function (request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },
    create : async function (request, response) {
        // const data = request.body;
        // desestruturação dos dados
        const { nome, email, whatsapp, city, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            city,
            uf
        });
        console.log(nome);
        return response.json({ id });
    }
}
// a confguração de conexão com o banco.
const connection = require('../database/connection');

module.exports = {
    index: async function (req, res) {
        //Obtendo o total de regstros e retornando no cabeçalho http da resposta

        const [count] = await connection('incidents')
            .count();
        res.header('X-Total-Count', count['count(*)']);

        //caso não exista o parâmetro no querystring, usa 1 como padrão
        const { page = 1 } = req.query;
        // fazendo join com a tabela de ongs
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)                   //limitando em 5 registros
            .offset((page - 1) * 5)    //pegando a partir do No registro
            .select(['incidents.*', 'ongs.nome', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
        return res.json(incidents);
    },
    create: async function (req, res) {
        const { title, description, value } = req.body;
        // cabeçalho de requisição HTTP contém o parâmetro authorization
        const ong_id = req.headers.authorization;
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return res.json({ id });
    },
    delete: async function (req, res) {
        // obtendo o parâmetro id da url
        const { id } = req.params;
        // obtendo o código da ong (via cabeçalho http)
        const ong_id = req.headers.authorization;

        // query para verificar se o registro é correto
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        if (undefined === incident) {
            return res.status(404).json({ error: "Not found" });
        }
        if (incident.ong_id != ong_id) {
            return res.status(401).json({ error: "Operação não permitida" });
        }
        // deletando o registro / resposa com corpo vazio
        await connection('incidents').where('id', id).delete();
        return res.status(204).send();
    }
}
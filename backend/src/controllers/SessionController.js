// a confguração de conexão com o banco.
const connection = require('../database/connection');

module.exports = {
    create: async function (req, res) {
        const { id } = req.body;
        //retornar nome do primeiro registro encontrado.
        const ong = await connection('ongs')
            .where('id', id)
            .select('nome')
            .first();
        if(!ong){
            return res.status(404).json({error: "Not found"});
        }
        return res.json(ong);
    }
}

const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./data/db.json');
const db = lowdb(adapter);

export default async function handler(req, res) {
    if (req.method == 'DELETE') {
        const id = req.query.todoId;
        await db.get('todos').remove({ id: id }).write();
        res.status(200).json({ success: true });
    }

    if (req.method === 'PUT') {
        const id = req.query.todoId;
        db.get('todos').find({ id: id }).assign(JSON.parse(req.body)).write();
        res.status(200).json({ success: true });
    }


}
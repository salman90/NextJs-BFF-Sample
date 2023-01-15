const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./data/db.json');
const db = lowdb(adapter);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const todos = await db.get('todos').value();
        res.status(200).json({ todos: todos });
    }
    
    if (req.method === 'POST') {
        db.get('todos').push(JSON.parse(req.body)).write();
        res.status(200).json({ success: true });
    }

}

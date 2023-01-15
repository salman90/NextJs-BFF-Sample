export default async function handler(req, res) {
    console.log("call graph to get data")
    res.status(200).json({ success: true });
}
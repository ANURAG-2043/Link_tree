const url = require("url");
const MongoClient = require("mongodb").MongoClient;
let cachedDb = null;
const uri = process.env.VISITORSDB;
async function connectToDatabase()
{
    if(cachedDb){
        return cachedDb;
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = await client.db(url.parse(uri).pathname.substr(1));

    cachedDb = db;
    return db;
}
module.exports = async (req, res) => {
    try {
        console.log("Inside default log function");
        const referer = req.headers["referer"];
        const ip = req.headers["x-forwarded-for"];
        const ua = req.headers["user-agent"];
        const ul = req.headers["accept-language"];
        const dnt = req.headers["dnt"];
        const reg = req.headers["x-vercel-id"];


        d = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        info = {ip, ua, ul, dnt, referer, reg, dt: "" + d};

        const db = await connectToDatabase();
        const collection = await db.collection(process.env.COLLECTION);
        await collection
            .insertOne(info)
            .then(() => {
                res.status(200).send();
            })
            .catch(err => {
                throw err;
            });
        }
        catch(error)
        {
            console.log(error);
            res.status(500).send();
        }
};

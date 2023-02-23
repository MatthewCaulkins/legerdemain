import { MongoClient } from 'mongodb'

let client = new MongoClient("mongodb+srv://doadmin:7Xjan048zt1293gO@dbaas-db-4024796-ea5a6b4b.mongo.ondigitalocean.com/admin?replicaSet=dbaas-db-4024796&tls=true&authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect().then((client) => {
    const db = client.db('test');

    db.collection('test').insertOne({ message: "Hello from Digital Ocean!"}).then(() => {
        process.exit();
    });
});
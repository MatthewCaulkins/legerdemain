import express  from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;

const uri = "mongodb+srv://doadmin:7Xjan048zt1293gO@dbaas-db-4024796-ea5a6b4b.mongo.ondigitalocean.com/admin?replicaSet=dbaas-db-4024796&tls=true&authSource=admin";

app.get('/', (req, res) => {

    let client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('Clicked Register');

    client.connect().then((client) => {
        const db = client.db('legerdemain');

        console.log('Connected to DB');

        const username = 'test';//document.querySelector('#user-name');
        const email = 'matt.caulkins@gmail.com';//document.querySelector('#email');
        const password = 'password';//document.querySelector('#password');
        const passwordConfirm = 'password';//document.querySelector('#password2');

            // TODO: Compare passwords

            // TODO: Check if user already exists

        db.collection('users').insertOne({
            username: username,
            email: email,
            password: password
        }).then(() => {
            process.exit();
        });
    });

    console.log(res);
    console.log(req);
    res.send('Hello world');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// import { MongoClient } from 'mongodb';

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('JS loaded');
        
//     console.log('Document ready');

//     const submit = document.querySelector('#submit');
//     submit.addEventListener('click', main());
// });

// function main() {
//     uri = "mongodb+srv://doadmin:7Xjan048zt1293gO@dbaas-db-4024796-ea5a6b4b.mongo.ondigitalocean.com/admin?replicaSet=dbaas-db-4024796&tls=true&authSource=admin";

//     let client = new MongoClient(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });

//     console.log('Clicked Register');

//     client.connect().then((client) => {
//         const db = client.db('legerdemain');

//         console.log('Connected to DB');

//         const username = 'matt';//document.querySelector('#user-name');
//         const email = 'matt.caulkins@gmail.com';//document.querySelector('#email');
//         const password = 'password';//document.querySelector('#password');
//         const passwordConfirm = 'password';//document.querySelector('#password2');

//             // TODO: Compare passwords

//             // TODO: Check if user already exists

//         db.collection('users').insertOne({
//             username: username,
//             email: email,
//             password: password
//         }).then(() => {
//             process.exit();
//         });
//     });
// }
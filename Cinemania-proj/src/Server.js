const { MongoClient } = require('mongodb');


async function main(){
    
    const uri = "mongodb+srv://grantprusik5:fP0xugxfu5EERhQK@cluster0.m3q4sbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


    const client = new MongoClient(uri);

    try {
        await client.connect();

        
        await  listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){ //Function that shows Databases within Mongo Connection (Just for testing)
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);
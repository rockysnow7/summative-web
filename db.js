const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const db = client.db("db");

const insertPost = async (post) => {
    try {
        const collection = db.collection("posts");
        const result = await collection.insertOne(post);
        console.log(`Inserted post with the id ${result.insertedId}`);

        return result;
    } catch (e) {
        console.error(e);

        throw e;
    }
};

const getLastPosts = async (numPosts) => {
    try {
        const collection = db.collection("posts");
        const cursor = collection.find().sort({ _id: -1 }).limit(numPosts);
        const posts = await cursor.toArray();
        console.log(`Found ${posts.length} posts`);

        return posts;
    } catch (e) {
        console.error(e);

        throw e;
    }
};

module.exports.insertPost = insertPost;
module.exports.getLastPosts = getLastPosts;

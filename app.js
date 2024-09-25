const express = require("express");
const path = require("path");
const { insertPost, getLastPosts, countPosts } = require("./db");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (_req, res) => {
    const numPostsToShow = 10;
    const posts = await getLastPosts(numPostsToShow);
    const numPostsTotal = await countPosts();

    res.render("index", {
        posts: posts,
        numPosts: numPostsTotal - numPostsToShow,
    });
});

app.post("/", async (req, res) => {
    console.log(req.body);
    await insertPost(req.body);

    res.redirect("/");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require("express");
const path = require("path");
const { insertPost, likePost, getLastPosts, getMostLikedPosts, countPosts } = require("./db");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/about", async (_req, res) => {
    const numPostsTotal = await countPosts();

    res.render("about", { numPosts: numPostsTotal });
});

app.get("/most-liked", async (_req, res) => {
    const numPostsToShow = 10;
    const posts = await getMostLikedPosts(numPostsToShow);
    const numPostsTotal = await countPosts();

    res.render("most-liked", {
        posts: posts,
        numPosts: Math.max(0, numPostsTotal - numPostsToShow),
    });
});

app.get("/", async (_req, res) => {
    const numPostsToShow = 10;
    const posts = await getLastPosts(numPostsToShow);
    const numPostsTotal = await countPosts();

    res.render("index", {
        posts: posts,
        numPosts: Math.max(0, numPostsTotal - numPostsToShow),
    });
});

app.post("/add-post", async (req, res) => {
    console.log(req.body);
    await insertPost(req.body);

    res.redirect("/");
});

app.post("/like-post/:id", async (req, res) => {
    await likePost(req.params.id);

    res.redirect("/");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

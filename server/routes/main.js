import { Router } from "express";
import post from "../models/Post.js";
import { marked } from 'marked';

const router = Router();


router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "Nodejs Blog",
      description: "How to create a blog with node js and express",
    };

    let perPage = 6;
    let page = req.query.page || 1;

    const data = await post
      .aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    // console.log(data.length);

    const count = await post.countDocuments();
    const maxPage = Math.ceil(count / perPage);

    if (page > maxPage) {
      return res.redirect(`/?page=${maxPage}`);
    }

    const nextPage = parseInt(page) + 1;
    const prevPage = parseInt(page) - 1;
    const hasNextPage = nextPage <= maxPage;
    const hasPrevPage = prevPage >= 1;

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage: hasPrevPage ? prevPage : null,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Post :id
 */

router.get("/post/:id", async (req, res) => {
  try {
    const slug = req.params.id;
    const data = await post.findById({ _id: slug });
    // console.log(post.schema.obj);
    // console.log("data\n",data);
    
    const markdownTitle = marked(data.title)
    const markdownBody = marked(data.body)
    
    const title = markdownTitle.replace(/<\/?[^>]+(>|$)/g, ''); // Use a regular expression to remove the HTML tag
    const locals = {
      title: title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    // const posts = await post.find();
    // posts.forEach((post) => {
    //   console.log(post);
    // });
    // console.log(posts.length);

    res.render("post", { locals,markdownTitle, markdownBody, currentRoute: `/post/${slug}` });
  } catch (error) {
    console.log(error);
  }
});

router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "How to create a blog with node js and express",
    };
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      data,
      locals,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

// function insertPostData () {
//   post.insertMany([
//     {
//       title: "Building APIs with Node.js",
//       body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
//     },
//     {
//       title: "Deployment of Node.js applications",
//       body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//     },
//     {
//       title: "Authentication and Authorization in Node.js",
//       body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//     },
//     {
//       title: "Understand how to work with MongoDB and Mongoose",
//       body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//     },
//     {
//       title: "build real-time, event-driven applications in Node.js",
//       body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//     },
//     {
//       title: "Discover how to use Express.js",
//       body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//     },
//     {
//       title: "Asynchronous Programming with Node.js",
//       body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//     },
//     {
//       title: "Learn the basics of Node.js and its architecture",
//       body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//     },
//     {
//       title: "NodeJs Limiting Network Traffic",
//       body: "Learn how to limit netowrk traffic."
//     },
//     {
//       title: "Learn Morgan - HTTP Request logger for NodeJs",
//       body: "Learn Morgan."
//     },
//   ])
// }

// insertPostData();

// async function insertBodyData() {
//   const bodyValues = [
//     "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js",
//     "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments...",
//     "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries.",
//     "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications.",
//     "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js.",
//     "Discover how to use Express.js, a popular Node.js web framework, to build web applications.",
//     "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations.",
//     "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers.",
//     "Learn how to limit netowrk traffic.",
//     "Learn Morgan.",
//     "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js",
//     "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments...",
//     "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries.",
//     "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications.",
//     "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js.",
//     "Discover how to use Express.js, a popular Node.js web framework, to build web applications.",
//     "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations.",
//     "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers.",
//     "Learn how to limit netowrk traffic.",
//     "Learn Morgan.",
//   ];

//   const posts = await post.find({body: {$exists: false}})

//   for (const [index,postDoc] of posts.entries()) {
//     if(bodyValues[index]){
//       await post.updateOne(
//         {_id:postDoc._id},
//         {$set: {body: bodyValues[index]}}
//       )
//     }
//   }
// }

// insertBodyData()

export default router;

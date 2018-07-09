// dependencies
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// routes
// index route
router.get("/", (request, response) => {
    User.find({}, (error, allUsers) => {
        response.render("users.ejs", {
            Users: allUsers
        })
    });
});

// seed route
router.get("/seed", async (request, response) => {
    const newUsers = [
        {
            name: "Justin Dang",
            password: "apple",
            email: "dangjustintime@gmail.com",
            location: "Tallahassee, Florida",
            profilePic: "https://scontent.fmia1-2.fna.fbcdn.net/v/t1.0-1/p320x320/1970376_10203353474943623_8913990952585153013_n.jpg?_nc_cat=0&oh=77aba4312565f0d07f24976e5df5b079&oe=5BE3B5EE",
            skills: ["HTML", "CSS", "Javascript", "Sheep herding"],
            friends: ["John Doe", "Marissa Mayer", "Kendall Jenner", "Lady Gaga"]
        },
        {
            name: "John Doe",
            password: "lemon",
            email: "johndoe@gmail.com",
            location: "Kansas City, Kansas",
            profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg/440px-John_Doe%2C_born_John_Nommensen_Duchac.jpg",
            skills: ["Knitting", "Writing"],
            friends: ["Justin Dang", "Michelle Obama", "Donna Tartt"]
        },
        {
            name: "Michelle Obama",
            password: "lime",
            email: "michelleobama@hotmail.com",
            location: "Chicago, Illinois",
            profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Michelle_Obama_2013_official_portrait.jpg/440px-Michelle_Obama_2013_official_portrait.jpg",
            skills: ["Politics", "Management", "Charity Work"],
            friends: ["John Doe", "Marissa Mayer", "Dara Khosrowshahi", "Michio Kaku"]
        },
        {
            name: "Lady Gaga",
            password: "banana",
            email: "ladygaga@hotmail.com",
            location: "New York City, New York",
            profilePic: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Lady_Gaga_JWT_Montreal_BM%2C_2017-11-03_%28cropped%29.jpg",
            skills: ["Singing", "Song Writing"],
            friends: ["Justin Dang", "Aubrey Dake Graham", "Kendall Jenner"]
        },
        {
            name: "Aubrey Drake Graham",
            password: "pickle",
            email: "drake@yahoo.com",
            location: "Toronto, Ontario",
            profilePic: "https://upload.wikimedia.org/wikipedia/commons/8/81/Drake_at_the_Velvet_Underground_-_2017_%2835986086223%29_%28cropped%29.jpg",
            skills: ["Rapping", "Singing", "Song Writing"],
            friends: ["Lady Gaga", "Kendall Jenner"]
        },
        {
            name: "Donna Tartt",
            password: "blueberry",
            email: "donnatartt@gmail.com",
            location: "Greenwood, Mississippi",
            profilePic: "https://images.gr-assets.com/authors/1409871301p8/8719.jpg",
            skills: ["Writing"],
            friends: ["Michelle Obama", "Dara Khosrowshahi", "Michio Kaku"]
        },
        {
            name: "Kendall Jenner",
            password: "rasberry",
            email: "kendalljenner@gmail.com",
            location: "Los Angeles, California",
            profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Kendal_Jenner_Cannes_2017.jpg/440px-Kendal_Jenner_Cannes_2017.jpg",
            skills: ["Social Media", "Modeling"],
            friends: ["Justin Dang", "Aubrey Drake Graham", "Lady Gaga"]
        },
        {
            name: "Michio Kaku",
            password: "mango",
            email: "michiokaku@aol.com",
            location: "New York City, New York",
            profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Michio_Kaku_Presentation.jpg/440px-Michio_Kaku_Presentation.jpg",
            skills: ["Physics", "Public Speaking", "Writing"],
            friends: ["Donna Tartt", "Dara Khosrowshahi", "Michelle Obama"]
        },
        {
            name: "Dara Khosrowshahi",
            password: "starfruit",
            email: "darakhosrowshahi@uber.com",
            location: "New York City, New York",
            profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Dara_Khosrowshahi_-_2012_%288189921554%29.jpg/440px-Dara_Khosrowshahi_-_2012_%288189921554%29.jpg",
            skills: ["Management", "Driving"],
            friends: ["Michelle Obama", "Donna Tartt", "Michio Kaku"]
        },
        {
            name: "Marissa Mayer",
            password: "peach",
            email: "marissamayer@yahoo.com",
            location: "Palo Alto, California",
            profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Marissa_Mayer%2C_World_Economic_Forum_2013_III.jpg/440px-Marissa_Mayer%2C_World_Economic_Forum_2013_III.jpg",
            skills: ["Management", "Software Developement"],
            friends: ["Justin Dang", "Michelle Obama"]
        },
    ];
    try {
        const seedUsers = await User.create(newUsers);
        response.send(seedUsers);
    } catch (erro) {
        response.send(error.message);
    }
});

// create route
router.get("/new", (request, response) => {
    response.render("signup.ejs");
});
router.post("/", (request, response) => {
    request.body.skills = request.body.skills.split(",");
    User.create(request.body, (error, newUser) => {
        response.redirect("/user");
    });
});

// show route
router.get("/:id", (request, response) => {
    User.findById(request.params.id, (error, currentUser) => {
        response.render("profile.ejs", {
            User: currentUser
        })
    });
});




module.exports = router;

// dependencies
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

// routes
// index route
router.get("/", (request, response) => {
    User.find({}, (error, allUsers) => {
        response.render("users.ejs", {
            currentUser: request.session.currentUser,
            Users: allUsers
        })
    });
});

// seed route
router.get("/seed", async (request, response) => {
    const newUsers = [
        {
            name: "Justin Dang",
            password: bcrypt.hashSync("justin", bcrypt.genSaltSync(10)),
            email: "dangjustintime@gmail.com",
            location: "Tallahassee, Florida",
            profilePic: "https://scontent.fmia1-2.fna.fbcdn.net/v/t1.0-1/p320x320/1970376_10203353474943623_8913990952585153013_n.jpg?_nc_cat=0&oh=77aba4312565f0d07f24976e5df5b079&oe=5BE3B5EE",
            skills: ["HTML", "CSS", "Javascript", "Sheep herding"],
            balance: 15000
        },
        {
            name: "John Doe",
            password: bcrypt.hashSync("john", bcrypt.genSaltSync(10)),
            email: "johndoe@gmail.com",
            location: "Kansas City, Kansas",
            profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg/440px-John_Doe%2C_born_John_Nommensen_Duchac.jpg",
            skills: ["Knitting", "Writing"],
            balance: 500 
        },
        {
            name: "Michelle Obama",
            password: bcrypt.hashSync("michelle", bcrypt.genSaltSync(10)),
            email: "michelleobama@hotmail.com",
            location: "Chicago, Illinois",
            profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Michelle_Obama_2013_official_portrait.jpg/440px-Michelle_Obama_2013_official_portrait.jpg",
            skills: ["Politics", "Management", "Charity Work"],
            balance: 2300 
        },
        {
            name: "Lady Gaga",
            password: bcrypt.hashSync("lady", bcrypt.genSaltSync(10)),
            email: "ladygaga@hotmail.com",
            location: "New York City, New York",
            profilePic: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Lady_Gaga_JWT_Montreal_BM%2C_2017-11-03_%28cropped%29.jpg",
            skills: ["Singing", "Song Writing"],
            balance: 190 
        },
        {
            name: "Aubrey Drake Graham",
            password: bcrypt.hashSync("aubrey", bcrypt.genSaltSync(10)),
            email: "drake@yahoo.com",
            location: "Toronto, Ontario",
            profilePic: "https://upload.wikimedia.org/wikipedia/commons/8/81/Drake_at_the_Velvet_Underground_-_2017_%2835986086223%29_%28cropped%29.jpg",
            skills: ["Rapping", "Singing", "Song Writing"],
            balance: 9000 
        },
        {
            name: "Donna Tartt",
            password: bcrypt.hashSync("donna", bcrypt.genSaltSync(10)),
            email: "donnatartt@gmail.com",
            location: "Greenwood, Mississippi",
            profilePic: "https://images.gr-assets.com/authors/1409871301p8/8719.jpg",
            skills: ["Writing"],
            balance: 300 
        },
        {
            name: "Kendall Jenner",
            password: bcrypt.hashSync("kendall", bcrypt.genSaltSync(10)),
            email: "kendalljenner@gmail.com",
            location: "Los Angeles, California",
            profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Kendal_Jenner_Cannes_2017.jpg/440px-Kendal_Jenner_Cannes_2017.jpg",
            skills: ["Social Media", "Modeling"],
            balance: 2400 
        },
        {
            name: "Michio Kaku",
            password: bcrypt.hashSync("michio", bcrypt.genSaltSync(10)),
            email: "michiokaku@aol.com",
            location: "New York City, New York",
            profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Michio_Kaku_Presentation.jpg/440px-Michio_Kaku_Presentation.jpg",
            skills: ["Physics", "Public Speaking", "Writing"],
            balance: 100 
        },
        {
            name: "Dara Khosrowshahi",
            password: bcrypt.hashSync("dara", bcrypt.genSaltSync(10)),
            email: "darakhosrowshahi@uber.com",
            location: "New York City, New York",
            profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Dara_Khosrowshahi_-_2012_%288189921554%29.jpg/440px-Dara_Khosrowshahi_-_2012_%288189921554%29.jpg",
            skills: ["Management", "Driving"],
            balance: 490 
        },
        {
            name: "Marissa Mayer",
            password: bcrypt.hashSync("marissa", bcrypt.genSaltSync(10)),
            email: "marissamayer@yahoo.com",
            location: "Palo Alto, California",
            profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Marissa_Mayer%2C_World_Economic_Forum_2013_III.jpg/440px-Marissa_Mayer%2C_World_Economic_Forum_2013_III.jpg",
            skills: ["Management", "Software Developement"],
            balance: 3300 
        },
    ];
    try {
        const seedUsers = await User.create(newUsers);
        response.send(seedUsers);
    } catch (error) {
        response.send(error.message);
    }
});

// create route
router.get("/new", (request, response) => {
    response.render("signup.ejs");
});
router.post("/", (request, response) => {
    request.body.password = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10));
    request.body.skills = request.body.skills.split(",");
    User.create(request.body, (error, newUser) => {
        response.redirect("/user");
    });
});

// show route
router.get("/:id", (request, response) => {
    User.findById(request.params.id, (error, currentUser) => {
        response.render("profile.ejs", {
            currentUser: request.session.currentUser,
            User: currentUser
        })
    });
});

// edit route
router.get("/:id/edit", (request, response) => {
    User.findById(request.params.id, (error, currentUser) => {
        response.render("editProfile.ejs", {
            currentUser: request.session.currentUser,
            User: currentUser
        });
    });
});
router.put("/:id", (request, response) => {
    request.body.password = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10));
    request.body.skills = request.body.skills.split(",");
    User.findByIdAndUpdate(request.params.id, request.body,
        { new: true }, (error, updatedUser) => {
            response.redirect("/user");
    });
});

// delete route
router.delete("/:id", (request, response) => {
    User.findByIdAndDelete(request.params.id, (error, currentUser) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Deleting User...");
        }
    });
    response.redirect("/user");
});

module.exports = router;

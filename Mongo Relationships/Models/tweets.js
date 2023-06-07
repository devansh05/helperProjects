//451 ONE TO MILLIONS : Large qty data sets refer through id provided by mongo
// In this we use refrences of parent objs on children, like in user and tweets we will store
// references of user object IDs on tweets obj unlike the previous one to many

const mongoose = require("mongoose");

//Initiating db connection
mongoose
  .connect("mongodb://127.0.0.1:27017/tweets")
  .then(() => {
    console.log("Mongo Connected!");
  })
  .catch((error) => {
    console.log("Mongo Connection Error ", error);
  });

const tweetSchema = new mongoose.Schema({
  tweet: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const userSchema = new mongoose.Schema({
  username: String,
  age: Number,
});

const Tweet = mongoose.model("Tweet", tweetSchema);
const User = mongoose.model("User", userSchema);

async function make1Tweet() {
    const user1 = new User({usernamme: 'testUser1', age: 18});
    const tweet1 = new Tweet({tweet: 'Hi this is a new tweet', });
    tweet1.user = user1;
    user1.save();
    tweet1.save();
}

// make1Tweet();

async function make2Tweet() {
    const user2 = new User({usernamme: 'testUser2', age: 18});
    const tweet2 = new Tweet({tweet: 'Hi this is a second tweet', });
    tweet2.user = user2;
    user2.save();
    tweet2.save();
}

// make2Tweet();

async function populateData() {
    const tweets = await Tweet.find({}).populate('user', 'username');
    console.log('LOG tweets  ',tweets);
}

// populateData();
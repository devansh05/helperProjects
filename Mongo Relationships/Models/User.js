//450 ONE TO FEW : Small num of data sets insert directly to obj
const mongoose = require('mongoose');

//Initiating db connection
mongoose
  .connect("mongodb://127.0.0.1:27017/relationshipDemo")
  .then(() => {
    console.log("Mongo Connected!");
  })
  .catch((error) => {
    console.log("Mongo Connection Error ", error);
  });

  const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    address: [
        {
            city: String,
            street: String,
            state: String
        }
    ]
  })

  const User = mongoose.model('User', userSchema);

  const makeUser = async() => {
    const u = new User({
        first: 'Harry',
        last: 'Potter',
        address: [
            {
                street: '100 St',
                city: 'Pune',
                state: 'Maharashtra'
            }
        ]
    })
    u.address.push({
        street: 'St 120',
        city: 'New York',
        state: 'New York'

    });
    const res = await u.save()
    console.log('LOG res  ',res)
  }

  makeUser();
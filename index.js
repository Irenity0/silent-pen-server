require('dotenv').config()
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const morgan = require('morgan');

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oo5u4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const blogCollection = client.db("SilentPen").collection("blogs");  

    // blog api
    app.get('/blogs', async(req,res) => {
      const result = await blogCollection.find().toArray();
      res.send(result);
    })

    app.post('/blogs', async (req, res) => {
      const newBlog = req.body;
      console.log('Adding new blog', newBlog)
      
      const result = await blogCollection.insertOne(newBlog);
      res.send(result);
      });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('writing silently')
})

app.listen(port, () => {
    console.log(`writing silently in port ${port}`);
})
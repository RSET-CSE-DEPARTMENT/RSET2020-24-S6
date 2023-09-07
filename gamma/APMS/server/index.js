const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

mongoose
  .connect('INSERT API HERE', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isUser: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model('User', userSchema);

const imageSchema = new mongoose.Schema({
  username: String,
  dropdown1: String,
  dropdown2: String,
  certificateDetails: {
    name: String,
    issueDate: String,
    issuer: String
  },
  imageName: String,
  imageData: String,
  status: {
    type: String,
    default: 'pending'
  },
  activityPoints: {
    type: Number,
    default: 0,
  },
});

const Image = mongoose.model('Image', imageSchema);


app.post('/api/checkUsername', async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.json({ message: 'Username already exists' });
    } else {
      res.json({ message: 'Username available' });
    }
  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({
      username,
      password,
    });

    await newUser.save();
    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const failedAttemptsMap = new Map(); // Map to store failed attempts count and lockout time

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.json({ error: 'User not found' });
      return;
    }

    const failedAttempts = failedAttemptsMap.get(username) || 0;
    const remainingAttempts = 3 - failedAttempts;
    const lockoutTime = failedAttempts >= 2 ? calculateLockoutTime(username) : 0;

    if (failedAttempts >= 3 && lockoutTime > Date.now()) {
      res.json({ error: 'User is locked out', remainingAttempts: 0, lockoutTime });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      failedAttemptsMap.set(username, failedAttempts + 1);
      res.json({ error: 'Invalid password', remainingAttempts: 3 - failedAttempts - 1, lockoutTime });
      return;
    }

    failedAttemptsMap.delete(username);
    res.json({ username: user.username, isAdmin: user.isAdmin });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const calculateLockoutTime = (username) => {
  const lockoutMinutes = 5;
  const lockoutTime = Date.now() + lockoutMinutes * 60 * 1000; // Convert minutes to milliseconds
  failedAttemptsMap.set(username, 3); // Set failed attempts to 3 to trigger lockout
  setTimeout(() => {
    failedAttemptsMap.delete(username);
  }, lockoutMinutes * 60 * 1000); // Remove lockout after lockoutMinutes
  return lockoutTime;
};



app.get('/api/user/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.json({ error: 'User not found' });
      return;
    }

    const certificates = await Image.find({ username });
    const imageData = certificates.map((certificate) => {
      return {
        imageName: certificate.imageName,
        dropdown1: certificate.dropdown1,
        dropdown2: certificate.dropdown2,
        certificateDetails: certificate.certificateDetails,
        imageData: certificate.imageData.toString('base64'),
        status: certificate.status,
        activityPoints: certificate.activityPoints, 
      };

    });

    res.json({ imageData });
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});



app.get('/api/image/:username/:imageName', async (req, res) => {
  const { username, imageName } = req.params;

  try {
    const image = await Image.findOne({ username, imageName });
    if (!image) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    const imageData = Buffer.from(image.imageData, 'base64');

    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': imageData.length,
    });
    res.end(imageData);
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});




app.post('/api/uploadImage', upload.single('image'), async (req, res) => {
  try {
    const { username, dropdown1, dropdown2, name, issueDate, issuer, activityPoints } = req.body;
    const { originalname, buffer } = req.file;

    const image = new Image({
      username,
      dropdown1,
      dropdown2,
      certificateDetails: {
        name,
        issueDate,
        issuer,
      },
      imageName: originalname,
      imageData: buffer.toString('base64'),
      activityPoints, 
    });

    await image.save();

    res.json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});



app.get('/api/users/pendingImageCount', async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }, 'username');
    const usersWithPendingImageCount = await Promise.all(users.map(async (user) => {
      const pendingImageCount = await Image.countDocuments({ username: user.username, status: 'pending' });
      return { username: user.username, pendingImageCount };
    }));
    res.json({ users: usersWithPendingImageCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }, 'username');
    const usersWithPendingImageCount = await Promise.all(users.map(async (user) => {
      const pendingImageCount = await Image.countDocuments({ username: user.username, status: 'pending' });
      const acceptedImageCount = await Image.countDocuments({ username: user.username, status: 'accepted' });
      const rejectedImageCount = await Image.countDocuments({ username: user.username, status: 'rejected' });
      const semester1 = await Image.countDocuments({ username: user.username, dropdown1: 's1' });
      const semester2 = await Image.countDocuments({ username: user.username, dropdown1: 's2' });
      const semester3 = await Image.countDocuments({ username: user.username, dropdown1: 's3' });
      const semester4 = await Image.countDocuments({ username: user.username, dropdown1: 's4' });
      const semester5 = await Image.countDocuments({ username: user.username, dropdown1: 's5' });
      const semester6 = await Image.countDocuments({ username: user.username, dropdown1: 's6' });
      const semester7 = await Image.countDocuments({ username: user.username, dropdown1: 's7' });
      const semester8 = await Image.countDocuments({ username: user.username, dropdown1: 's8' });
      const sports = await Image.countDocuments({ username: user.username, dropdown2: 'SPORTS' });
      const ncc = await Image.countDocuments({ username: user.username, dropdown2: 'NCC/NSS' });
      const music = await Image.countDocuments({ username: user.username, dropdown2: 'MUSIC/PERFORMING ARTS' });
    
      return { username: user.username, pendingImageCount,acceptedImageCount,rejectedImageCount,semester1,semester2,semester3,semester4,semester5,semester6,semester7,semester8,sports,ncc,music };
    }));
    res.json({ users: usersWithPendingImageCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/users1', async (req, res) => {
  try {
    const dropdown1 = req.query.dropdown1; // Get the selected dropdown1 value from the query parameters
    console.log("Received dropdown1 value:", dropdown1);
    if (!dropdown1) {
      // If no dropdown1 value is provided, fetch all users (without filtering)
      const users = await User.find({ isAdmin: false }, 'username');

      const usersWithPendingImageCount = await Promise.all(users.map(async (user) => {
        const pendingImageCount = await Image.countDocuments({ username: user.username, status: 'pending' });
        return { username: user.username, pendingImageCount };
      }));

      res.json({ users: usersWithPendingImageCount });
    } else {
      // If a dropdown1 value is provided, fetch all usernames with the specified dropdown1 value
      const usersWithMatchingImage = await Image.find({ dropdown1 }).distinct('username');

      console.log("Users with Matching Image: ", usersWithMatchingImage);


      // Fetch users with the usernames from the previous query result
      const users = await User.find({ isAdmin: false, username: { $in: usersWithMatchingImage } }, 'username');

      const usersWithPendingImageCount = await Promise.all(users.map(async (user) => {
        const pendingImageCount = await Image.countDocuments({ username: user.username, status: 'pending' });
        return { username: user.username, pendingImageCount };
      }));

      res.json({ users: usersWithPendingImageCount });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.get('/api/users2', async (req, res) => {
  try {
    const dropdown2 = req.query.dropdown1; // Get the selected dropdown1 value from the query parameters
    console.log("Received dropdown2 value:", dropdown2);
    if (!dropdown2) {
      // If no dropdown1 value is provided, fetch all users (without filtering)
      const users = await User.find({ isAdmin: false }, 'username');

      const usersWithPendingImageCount = await Promise.all(users.map(async (user) => {
        const pendingImageCount = await Image.countDocuments({ username: user.username, status: 'pending' });
        return { username: user.username, pendingImageCount };
      }));

      res.json({ users: usersWithPendingImageCount });
    } else {
      // If a dropdown1 value is provided, fetch all usernames with the specified dropdown1 value
      const usersWithMatchingImage = await Image.find({ dropdown2 }).distinct('username');

      console.log("Users with Matching Image: ", usersWithMatchingImage);


      // Fetch users with the usernames from the previous query result
      const users = await User.find({ isAdmin: false, username: { $in: usersWithMatchingImage } }, 'username');

      const usersWithPendingImageCount = await Promise.all(users.map(async (user) => {
        const pendingImageCount = await Image.countDocuments({ username: user.username, status: 'pending' });
        return { username: user.username, pendingImageCount };
      }));

      res.json({ users: usersWithPendingImageCount });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.put('/api/user/:username/image/:imageName', async (req, res) => {
  const { username, imageName } = req.params;
  const { status } = req.body;

  try {
    const image = await Image.findOneAndUpdate(
      { username, imageName },
      { $set: { status } },
      { new: true }
    );

    if (!image) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    
    if (status === 'accepted') {
      if (image.dropdown2 === 'NCC/NSS') {
        image.activityPoints = 50;
      } else if (image.dropdown2 === 'SPORTS') {
        image.activityPoints = 60;
      } else if (image.dropdown2 === 'MUSIC/PERFORMING ARTS') {
        image.activityPoints = 70;
      }
    } else {
      image.activityPoints = 0; 
    }

    await image.save();

    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.get('/api/user/:username/data', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.json({ error: 'User not found' });
      return;
    }

    const totalCertificates = await Image.countDocuments({ username });
    const approvedCertificates = await Image.countDocuments({ username, status: 'accepted' });
    const totalActivityPoints = await Image.aggregate([
      { $match: { username, status: 'accepted' } },
      { $group: { _id: null, totalActivityPoints: { $sum: '$activityPoints' } } }
    ]);

    res.json({
      totalCertificates,
      approvedCertificates,
      totalActivityPoints: totalActivityPoints.length ? totalActivityPoints[0].totalActivityPoints : 0
    });
  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});



const port = 3080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

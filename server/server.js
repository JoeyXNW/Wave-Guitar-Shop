const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const async = require("async");

const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.DATABASE);
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//for heroku
app.use(express.static("client/build"));

// Set up cloudinary account
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Models
const { User } = require("./models/user");
const { Brand } = require("./models/brand");
const { Wood } = require("./models/wood");
const { Guitar } = require("./models/guitar");
const { Payment } = require("./models/payment");
const { Site } = require("./models/site");

//Middleware
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin");

mongoose.set("useFindAndModify", false);
//===========================================
//              Guitar
//===========================================

// get produts on the shop page
app.post("/api/product/shop", (req, res) => {
  let order = req.body.order ? req.body.order : "asc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length === 0) continue;

    if (key === "price") {
      findArgs[key] = {
        $gte: req.body.filters[key][0],
        $lte: req.body.filters[key][1]
      };
    } else {
      findArgs[key] = req.body.filters[key];
    }
  }
  findArgs["publish"] = true;

  Guitar.find(findArgs)
    .populate("brand")
    .populate("wood")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, guitars) => {
      if (err) return res.status(400).send(err);

      res.status(200).json({ size: guitars.length, guitars, findArgs });
    });
});

// Guitar register
app.post("/api/product/guitar", auth, admin, (req, res) => {
  const guitar = new Guitar(req.body);
  guitar.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true
      // guitar: doc
    });
  });
});

// Get guitar by arrival
// sortBy=createdAt&order=desc&limit=4&skip=5
app.get("/api/product/guitars", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Guitar.find()
    .populate("brand")
    .populate("wood")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, guitars) => {
      if (err) return res.status(400).send(err);

      res.status(200).send(guitars);
    });
});

// Get guitar by id
app.get("/api/product/guitars_by_id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;
  if (type === "array") {
    let ids = items.split(",");
    items = [];
    items = ids.map(id => mongoose.Types.ObjectId(id));
  }
  Guitar.find({ _id: { $in: items } })
    .populate("brand")
    .populate("wood")
    .exec((err, doc) => res.status(200).send(doc));
});
//===========================================
//              Woods
//===========================================
// Wood register
app.post("/api/product/wood", auth, admin, (req, res) => {
  const wood = new Wood(req.body);
  wood.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      wood: doc
    });
  });
});

// Get wood
app.get("/api/product/woods", (req, res) => {
  Wood.find({}, (err, woods) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(woods);
  });
});
//===========================================
//              BRAND
//===========================================
// Brand register
app.post("/api/product/brand", auth, admin, (req, res) => {
  const brand = new Brand(req.body);
  brand.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      brand: doc
    });
  });
});

// Get brand
app.get("/api/product/brands", (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(brands);
  });
});
//===========================================
//              USER
//===========================================
// auth
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    cartTotal: req.user.cartTotal,
    history: req.user.history
  });
});

// User Register
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      registerSuccess: true
      // userdata: doc
    });
  });
});

// User Login
// find the email, compare the password and generate a token
app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed. Email not found"
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });
      user.generateToken((err, user) => {
        if (err) res.status(400).send(err);
        res
          .cookie("w_auth", user.token)
          .status(200)
          .json({ loginSuccess: true });
      });
    });
  });
});

//User Logout
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ logoutSuccess: false, err });
    return res.status(200).send({ logoutSuccess: true });
  });
});

//
// upload image
app.post("/api/users/uploadimage", auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    result => {
      res.status(200).send({ public_id: result.public_id, url: result.url });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto"
    }
  );
});

//add cart
app.post("/api/users/addtocart", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;

    // doc.cart.forEach(item => {
    for (let item of doc.cart) {
      if (item.id == req.query.productId) {
        duplicate = true;
        break;
      }
    }
    console.log(duplicate);
    if (duplicate) {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          "cart.id": mongoose.Types.ObjectId(req.query.productId)
        },
        { $inc: { "cart.$.quantity": 1, cartTotal: 1 } },
        { new: true },
        (err, file) => {
          if (err) return res.json({ success: false, err });
          res.status(200).send({ cart: file.cart, cartTotal: file.cartTotal });
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId),
              quantity: 1,
              date: Date.now()
            }
          },
          $inc: { cartTotal: 1 }
        },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).send({ cart: doc.cart, cartTotal: doc.cartTotal });
        }
      );
    }
  });
});

//Remove item from cart
app.get("/api/users/removefromcart", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { cart: { id: mongoose.Types.ObjectId(req.query._id) } },
      $inc: { cartTotal: -req.query.qty }
    },
    { new: true },
    (err, doc) => {
      let cart = doc.cart;
      let cartTotal = doc.cartTotal;
      let array = cart.map(item => {
        return mongoose.Types.ObjectId(item.id);
      });

      Guitar.find({ _id: { $in: array } })
        .populate("brand")
        .populate("wood")
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart,
            cartTotal
          });
        });
    }
  );
});

//Order success
app.post("/api/users/ordersuccess", auth, (req, res) => {
  //user history
  let history = [];
  let transactionData = {};

  req.body.cartDetail.forEach(item =>
    history.push({
      dateOfPurchase: Date.now(),
      name: item.name,
      breand: item.brand,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentId
    })
  );
  //payment dash
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email
  };
  transactionData.data = req.body.paymentData;
  transactionData.product = history;
  //update user info
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [], cartTotal: 0 } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        let products = [];
        doc.product.forEach(item => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          products,
          (item, callback) => {
            Guitar.update(
              { _id: item.id },
              { $inc: { sold: item.quantity } },
              { new: false },
              callback
            );
          },
          err => {
            if (err) return res.json({ success: false, err });
            res.status(200).json({
              success: true,
              cart: user.cart,
              cartDetail: []
            });
          }
        );
      });
    }
  );
});

//update user
app.post("/api/users/update_profile", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });

      res.status(200).json({ success: true }); //userData: doc
    }
  );
});

//===========================================
//             Cloudindary
//===========================================
// remove image from cloudinary
app.get("/api/users/removeimage", auth, admin, (req, res) => {
  let id = req.query.public_id;

  cloudinary.uploader.destroy(id, (error, result) => {
    if (error) return res.json({ success: false });

    res.status(200).send("image removed successfully");
  });
});

//===========================================
//             Site
//===========================================

//get site data
app.get("/api/site/site_data", (req, res) => {
  Site.find({}, (err, site) => {
    if (err) return res.json({ success: false });
    res.status(200).send(site[0].siteInfo);
  });
});

app.post("/api/site/site_data", auth, admin, (req, res) => {
  Site.findOneAndUpdate(
    { name: "Site" },
    { $set: { siteInfo: req.body } },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
        siteInfo: doc.siteInfo
      });
    }
  );
});

//===========================================
//             Default
//===========================================
// only for production
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});

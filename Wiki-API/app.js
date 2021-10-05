//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/WikiDB", {
  useNewUrlParser: true
});

const articlesSchema = {
  title: String,
  content: String
};
const Article = mongoose.model("Article", articlesSchema);



app.route("/articles")

  .get(function(req, res) {
    Article.find({}, function(err, foundArticle) {
      if (!err) {
        res.send(foundArticle);
      } else {
        res.send(err);
      }
    });
  })

  .post(function(req, res) {
    // console.log(req.body.title);
    // console.log(req.body.content);

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save(function(err) {
      if (!err) {
        res.send("Successfully added a new element");
      } else {
        res.send(err);
      }

    });
  })

  .delete(function(req, res) {
    Article.deleteMany({}, function(err) {
      if (!err) {
        res.send("succesfully delete all elements");
      } else {
        res.send(err);
      }
    });
  });



app.route("/articles/:articleTitle")

  .get(function(req, res) {
    Article.findOne({
      title: req.params.articleTitle
    }, function(err, foundArticle) {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("nothing found matching");
      }
    });
  })

  .put(function(req, res) {

    Article.update(
      {
        title: req.params.articleTitle
      }, {
        title: req.body.title,
        content: req.body.content
      }, {
        overwrite: true
      },

      function(err) {
        if (!err) {
          res.send("Successfully updated ");
        }
      });


  })



  .patch(function(req, res) {
      Article.update({
          title: req.params.articleTitle
        }, {
          $set: req.body
        },
        function(err) {
          if (!err) {
            res.send("Successfully updated article.");
          } else {
            res.send(err);
          }
        }
      );
    })
    .delete(function(req, res) {
    Article.deleteOne({
      title: req.params.articleTitle
    }, function(err) {
      if (!err) {
        res.send("Successfully deleted article.");
      } else {
        res.send(err);
      }
    })
  });



// .get("/articles", );





// app.post("/articles", function(req, res)
// {
//   // console.log(req.body.title);
//   // console.log(req.body.content);
//
//   const newArticle = new Article({
//     title:req.body.title,
//     content:req.body.content
//   });
//
//   newArticle.save(function(err)
// {if(!err)
//   {
//     res.send("Successfully added a new element");
//   }else{
//     res.send(err);
//   }
//
// });
// });


// app.delete("/articles", );






//TODO

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

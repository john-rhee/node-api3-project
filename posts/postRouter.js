const express = require('express');

const postData = require("./postDb.js");

const router = express.Router();

router.get('/', (req, res) => {
  postData.get(req.query)
    .then(stuffs => {
      res.status(200).json(stuffs);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved." 
      });
    });
});

router.get('/:id', validatePostId,  (req, res) => {
  postData.getById(req.params.id)
  .then(stuff => {
      if (stuff) {
      res.status(200).json(stuff);
      } else {
      res.status(404).json({ message: 'ID not found' });
      }
  })
  .catch(error => {
      console.log(error);
      res.status(500).json({
      message: 'Error retrieving the stuff',
      });
  });
});

router.delete('/:id', (req, res) => {
  postData.remove(req.params.id)
    .then(removed => {
        if (removed) {
        res.status(200).json({ message: 'Delete sucessful' });
        } else {
        res.status(404).json({ message: 'ID not found' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
        message: 'Error removing the post',
        });
    });
});

router.put('/:id',  (req, res) => {
  const updatedPost = req.body;

  postData.update(req.params.id, updatedPost)
    .then(updated => {
        if (updated) {
        res.status(200).json(updated);
        } else {
        res.status(404).json({ message: 'ID not found' });
        }
    })
    .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
        message: 'Error updating the post',
        });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  postData.getById(req.params.id)
    .then(post => {
      if (post) {
        req.post = post
      } else {
        res.status(400).json({ errorMessage: 'invalid post ID' })
      }
    })
   next(); 
}

module.exports = router;

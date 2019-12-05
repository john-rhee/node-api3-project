const express = require('express');

const userData = require("./userDb.js");

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  const updateData = req.body; 
  
  userData.insert(updateData)
    .then(stuff => {
        res.status(201).json(stuff);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
        message: 'Error adding',
        });
    });

});


//*************BROKEN*************
router.post('/:id/posts', (req, res) => {
  const updateData = req.body; 
  
  userData.insert(updateData)
    .then(stuff => {
        res.status(201).json(stuff);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
        message: 'Error adding',
        });
    });
});
//*************BROKEN*************


router.get('/', (req, res) => {
  userData.get(req.query)
    .then(stuffs => {
      res.status(200).json(stuffs);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The users information could not be retrieved." 
      });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  userData.getById(req.params.id)
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

router.get('/:id/posts', (req, res) => {
  userData.getUserPosts(req.params.id)
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
  userData.remove(req.params.id)
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

router.put('/:id', (req, res) => {

  const updatedPost = req.body;

  userData.update(req.params.id, updatedPost)
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

//custom middleware



function validateUserId(req, res, next) {

  userData.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user
      } else {
        res.status(400).json({ errorMessage: 'invalid user ID' })
      }
    })
   next(); 
}



function validateUser(req, res, next) {
  const updatedPost = req.body;

  if (!updatedPost) {
    res.status(400).json({ message: "missing user data" });
  } 
  
  if (!updatedPost.name) {
    res.status(400).json({ message: "missing required name field" });
  } 
  else {
    next();
  }
}

function validatePost(req, res, next) {
  const updatedPost = req.body;

  if (!updatedPost) {
    res.status(400).json({ message: "missing post data" });
  } 
  
  if (!updatedPost.text) {
    res.status(400).json({ message: "missing required text field" });
  } 
  else {
    next();
  }
}

module.exports = router;

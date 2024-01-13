const express = require('express')
const Feedback = require('../models/feedback')
const validateFeedback = require('../schema');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')


router.get('/', (req, res) => {
    const name = 'Home'
    res.render('home.ejs', {name});
})

router.get('/about', (req, res) => {
    const name = 'About';
    res.render('about.ejs', {name});
})

router.get('/projects', (req, res) => {
    const name = 'Projects';
    res.render('project.ejs', {name});
})

//post route for submitting the feedback

router.post("/feedback", validateFeedback, catchAsync(async (req, res) => {
  await new Feedback(req.body).save()
  req.flash('success', 'Feedback Submitted Successfully')
  res.redirect('/feedback');
}));


router.get('/feedback', async (req, res) => {
    const name = 'Feedback'
    const feedback = await Feedback.find();
    res.render('feedback.ejs', {name, feedback})
})


module.exports = router
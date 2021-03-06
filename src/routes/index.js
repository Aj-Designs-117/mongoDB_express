const express = require('express');
const { translateAliases } = require('../models/task');
const router = express.Router();

// importing Schema mongo
const Task = require('../models/task');

router.get('/', async (req, res)=>{
    const tasks = await Task.find();
    res.render('index', {
        title: 'MongoDB and Express',
        tasks
    });
});

router.post('/add', async (req, res) =>{
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
});

router.get('/turn/:id', async (req, res) =>{
    const {id} = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

router.get('/edit/:id', async (req, res)=>{
    const {id} = req.params;
    const task = await Task.findById(id);
    res.render('edit', {
        title: 'MongoDB and Express',
        task
    });
});

router.post('/update/:id', async (req, res)=>{
    const { id } = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/');
});

router.get('/delete/:id', async (req, res)=>{
    const {id} = req.params;
    await Task.remove({_id: id});
    res.redirect('/');
});

module.exports = router;
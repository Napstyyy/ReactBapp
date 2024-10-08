const express = require('express');
const { getProjectsWithQuotes, getMessagesByProject, addMessageToProject, getAllProjects, getOneProject, getProjectQuotes, addProject, getProjectById } = require('../services/projectService');

const router = express.Router();

router.get('/with-quotes/:userId', (req, res) => {
    const userId = req.params.userId;

    getProjectsWithQuotes(userId, (err, projects) => {
        console.log(userId);
        if (err) {
            console.error('Error fetching projects:', err.stack);
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(200).json(projects);
    });
});

router.get('/getProjects', (req, res) => {

    getAllProjects((err, projects) => {
        if (err) {
            console.error('Error fetching projects:', err.stack);
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(200).json(projects);
    });
});

router.get('/getProjectQuotes/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    getProjectQuotes(projectId, (err, quotes) => {
        console.log(projectId);
        if (err) {
            console.error('Error fetching quotes: ', err.stack);
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(200).json(quotes);
    });
})

router.get('/getOneProject/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    console.log(projectId);
    getOneProject(projectId, (err, projects) => {
        if (err) {
            console.error('Error fetching project:', err.stack);
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(200).json(projects);
    });
});

router.get('/messages/:projectId', (req, res) => {
    const projectId = req.params.projectId;

    getMessagesByProject(projectId, (err, messages) => {
        console.log(projectId);
        if (err) {
            console.error('Error fetching messages:', err.stack);
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(200).json(messages);
    });
});

router.post('/messages/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    const { text, message_file } = req.body; // Asume que el cuerpo de la solicitud tiene estos campos
    console.log(projectId[0], text, message_file);
    addMessageToProject(projectId, text, message_file, (err, result) => {
        console.log(projectId, text, message_file);
        if (err) {
            console.error('Error adding message:', err.stack);
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json({ message: 'Message added successfully', id: result.insertId });
    });
});

router.post('/addQuote', (req, res) => {
    const { id_user, id_project, payment_terms, warranty, note, price } = req.body;
    console.log(id_user, id_project, payment_terms, warranty, note, price);
    addQuote(id_user, id_project, payment_terms, warranty, note, price, (err, result) => {
        if (err) {
            console.error('Error adding quote:', err.stack);
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json({ message: 'Quote added successfully', id: result.insertId });
    });
});

router.post('/addProject', (req, res) => {
    const { name, description, id_user, image1, image2, image3, pdf1, pdf2 } = req.body;
    console.log(name, description, id_user, image1, image2, image3, pdf1, pdf2);
    addProject(name, description, id_user, image1, image2, image3, pdf1, pdf2, (err, result) => {
        if (err) {
            console.error('Error adding project:', err.stack);
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json({ message: 'project added successfully', id: result.insertId });
    });
});

router.get('/getProject', (req, res) => {
  const id_project = req.query.id_project;

  if (!id_project) {
    return res.status(400).json({ error: 'id_project is required' });
  }

  getProjectById(id_project)
    .then(project => {
      res.json(project);
    })
    .catch(error => {
      console.error('Error fetching project:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});


module.exports = router;
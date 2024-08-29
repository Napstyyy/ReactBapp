const connection = require('../config/db');

const getAllProjects = (callback) => {
    const query = `
    SELECT * from projects
    `;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return callback(err, null);
        }
        console.log('list of Projects:', results)
        callback(null, results);
    });
};

const getOneProject = (projectId, callback) => {
    const query = `
    SELECT * FROM projects WHERE projects.id_project = ?
    `;
    connection.query(query, [projectId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return callback(err, null);
        }

        // Convertir las imágenes a base64
        if (results.length > 0) {
            const project = results[0];
            project.image1 = project.image1 ? project.image1.toString('base64') : null;
            project.image2 = project.image2 ? project.image2.toString('base64') : null;
            project.image3 = project.image3 ? project.image3.toString('base64') : null;
        }
        

        console.log('Project Details:', results);
        callback(null, results);
    });
};

const getProjectsWithQuotes = (userId, callback) => {
    const query = `
    SELECT 
        p.id_project,
        p.name AS project_name,
        p.description,
        q.id_quote,
        q.payment_terms,
        q.warranty,
        q.note
    FROM 
        projects p
    JOIN 
        quotes q ON p.id_project = q.id_project
    JOIN 
        users u ON q.id_user = u.email
    WHERE 
        u.email = ?

    `;
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return callback(err, null);
        }
        console.log('Projects with quotes:', results)
        callback(null, results);
    });
};

const getMessagesByProject = (projectId, callback) => {
    const query = `
        SELECT 
            id_message,
            text,
            message_file
        FROM 
            messages
        WHERE 
            id_project = ?
    `;
    
    connection.query(query, [projectId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return callback(err, null);
        }
        console.log('Messages for project:', results);
        callback(null, results);
    });
};

const addMessageToProject = (projectId, text, messageFile, callback) => {
    const query = `
        INSERT INTO messages (id_project, text, message_file)
        VALUES (?, ?, ?)
    `;
    
    connection.query(query, [projectId, text, messageFile], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return callback(err, null);
        }
        console.log('Message added:', results);
        callback(null, results);
    });
};

// Puedes añadir más funciones para otros endpoints relacionados con proyectos

module.exports = {
    getAllProjects,
    getOneProject,
    getProjectsWithQuotes,
    getMessagesByProject,
    addMessageToProject,
};

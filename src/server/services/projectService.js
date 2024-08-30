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
            project.pdf1 = project.pdf1 ? project.pdf1.toString() : null;
            project.pdf2 = project.pdf2 ? project.pdf2.toString() : null;
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

const getProjectQuotes = (projectId, callback) => {
    const query = `
    SELECT 
        q.id_quote,
	q.id_project,
        q.payment_terms,
        q.warranty,
        q.note,
        q.price,
        u.name
    FROM
        quotes q
    JOIN
	projects p ON p.id_project = q.id_project
    JOIN
    	users u ON u.email = q.id_user
    WHERE
	p.id_project = ?
    `;

    connection.query(query, [projectId], (err, results) => {
        if (err) {
            console.error('Error executing query: ', err.stack);
            return callback(err, null);
        }
        console.log('Quotes per project: ', results);
        callback(null, results);
    })
}

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

const addQuote = (idUser, idProject, paymentTerms, warranty, note, price, callback) => {
    const query = `
        INSERT INTO quotes (id_user, id_project, payment_terms, warranty, note, price)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    connection.query(query, [idUser, idProject, paymentTerms, warranty, note, price], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return callback(err, null);
        }
        console.log('Quote added:', results);
        callback(null, results);
    });
};

const addProject = (name, description, idUser, image1, image2, image3, pdf1, pdf2, callback) => {
    const query = `
        INSERT INTO projects (name, description, id_user, image1, image2, image3, pdf1, pdf2)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    connection.query(query, [name, description, idUser, image1, image2, image3, pdf1, pdf2], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return callback(err, null);
        }
        console.log('Project added:', results);
        callback(null, results);
    });
};

const getProjectById = (id_project) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM projects WHERE id_project = ?';

    connection.query(query, [id_project], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results); // Los resultados se devuelven en formato JSON automáticamente
    });
  });
};


// Puedes añadir más funciones para otros endpoints relacionados con proyectos

module.exports = {
    getAllProjects,
    getOneProject,
    getProjectQuotes,
    getProjectsWithQuotes,
    getMessagesByProject,
    addMessageToProject,
    addQuote,
    addProject,
    getProjectById,
};

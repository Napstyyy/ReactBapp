const db = require('../config/db');

const getProjectsByEmail = (email, callback) => {
  const query = `
    SELECT 
      p.id_project, 
      p.name AS title, 
      p.description, 
      (SELECT COUNT(*) FROM messages m WHERE m.id_project = p.id_project) > 0 AS HasMessages
    FROM projects p
    LEFT JOIN quotes q ON p.id_project = q.id_project
    WHERE p.id_user = ?
    GROUP BY p.id_project
  `;

  db.query(query, [email], (error, results) => {
    if (error) {
      console.error('Error querying projects:', error);
      callback(error, null);
    } else {
      const projects = results.map(project => ({
        title: project.title,
        description: project.description || "No description provided",
        HasMessages: !!project.HasMessages
      }));
      callback(null, projects);
    }
  });
};

module.exports = { getProjectsByEmail };

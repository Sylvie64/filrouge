const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const connection = require('./config/conf')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (request, response) => {
  response.send('Bienvenue sur Express');
});

app.get('/family', (req, res) => {
  connection.query('SELECT * FROM family', (err, result) => {
    if (err ){
      res.status(500).send('erreur')
    } else {
      res.json(result)
    }
  })
})

app.get('/family/firstname', (req, res) => {
  connection.query('SELECT firstname FROM family', (err, result) => {
    if (err ){
      res.status(500).send('erreur')
    } else {
      res.json(result)
    }
  })
})

app.get('/family/firstnames', (req, res) => {
  connection.query('SELECT firstname FROM family WHERE firstname LIKE "j%"', (err, result) => {
    if (err ){
      res.status(500).send('erreur')
    } else {
      res.json(result)
    }
  })
})

app.get('/family/filtername', (req, res) => {
  connection.query('SELECT firstname FROM family WHERE firstname LIKE "%a%"', (err, result) => {
    if (err ){
      res.status(500).send('erreur')
    } else {
      res.json(result)
    }
  })
})

app.get('/family/date', (req, res) => {
  connection.query('SELECT birthday FROM family WHERE birthday > "1966-01-01"', (err, result) => {
    if (err ){
      res.status(500).send('erreur')
    } else {
      res.json(result)
    }
  })
})

app.get('/family/birthday', (req, res) => {
  connection.query('SELECT birthday FROM family ORDER BY birthday ASC', (err, result) => {
    if (err ){
      res.status(500).send('erreur')
    } else {
      res.json(result)
    }
  })
})

app.post('/family/postuser', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO family SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un employé");
    } else {
      res.sendStatus(200);
    }
  });
});

app.put('/family/:id', (req, res) => {
  // récupération des données envoyées
  const idEmployee = req.params.id;
  const formData = req.body;
  // connection à la base de données, et insertion de l'employé
  connection.query('UPDATE family SET ? WHERE id = ?', [formData, idEmployee], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un employé");
    } else {
      res.sendStatus(200);
    }
  });
});

app.put('/family/updatebool/:id', (req, res) => {
  const idEmployee = req.params.id;
  // connection à la base de données, et insertion de l'employé
  connection.query('UPDATE family SET `is_connected` = NOT `is_connected` WHERE id = ?', [idEmployee], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un employé");
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/family/deleteid/:id', (req, res) => {
  // récupération des données envoyées
  const idEmployee = req.params.id;
  // connexion à la base de données, et suppression de l'employé
  connection.query('DELETE FROM family WHERE id = ?', [idEmployee], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un employé");
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/family/deletebool', (req, res) => {

  connection.query('DELETE FROM family WHERE is_connected = 0', (err) => {
    if (err) { 
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un employé");
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});
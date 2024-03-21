const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        username: 'Manu'
    });
});

// Ruta para renderizar el formulario de registro
router.get('/register', (req, res) => {
    res.render('register');
});

// Ruta para renderizar el formulario de login
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/recovery', (req, res) => {
    res.render('recovery');
});
module.exports = router;

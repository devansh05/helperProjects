const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Home');
})
router.post('/search/:searchQuery', (req, res) => {
    res.send('Search User');
})
router.post('/', (req, res) => {
    res.send('USer Profile');
})
router.get('/edit/:id', (req, res) => {
    res.send('Edit User');
})

module.exports = router;
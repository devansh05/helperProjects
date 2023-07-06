const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Home');
})
router.post('/search/:searchQuery', (req, res) => {
    res.send('Search Results');
})
router.post('/', (req, res) => {
    res.send('Create User');
})
router.get('/edit/:id', (req, res) => {
    res.send('Edit');
})

module.exports = router;
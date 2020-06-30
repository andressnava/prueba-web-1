const { Router } = require('express');
const router = Router();


router.get('/', (req, res)=>{
    res.render('index.html', {title: 'Home'});
});

router.get('/about', (req, res) =>{
    res.render('about.html', {title: 'About'});
});

module.exports = router;
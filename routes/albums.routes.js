const { Router } = require('express');
const router = Router();

const { renderAlbumForm, createNewAlbum, renderAlbums, renderEditForm, updateAlbum, deleteAlbum} = require('../controllers/albums.controller');

const { isAuthenticated } = require('../helpers/auth');

//New albums
router.get('/albums/add', isAuthenticated, renderAlbumForm);

router.post('/albums/new-album', isAuthenticated, createNewAlbum);

//Get albums
router.get('/albums', isAuthenticated, renderAlbums);

//Update albums
router.get('/albums/edit/:id', isAuthenticated, renderEditForm);

router.put('/albums/edit/:id', isAuthenticated, updateAlbum);

//delete albums
router.delete('/albums/delete/:id', isAuthenticated, deleteAlbum);

module.exports = router;
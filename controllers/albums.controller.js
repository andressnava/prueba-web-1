const albumsCtrl = {};

const Album = require('../models/Album');

albumsCtrl.renderAlbumForm = (req, res) => {
    res.render('Albums/newAlbum.html', { title: 'New Album' });
};

albumsCtrl.createNewAlbum = async (req, res) => {
    const errors = [];
    const { name, artist, year } = req.body;

    const newAlbum = new Album({ name, artist, year });

    console.log(newAlbum);
    await newAlbum.save();
    req.flash('success_msg', 'Album added successfully');
    res.redirect('/albums');

};

albumsCtrl.renderAlbums = async (req, res) => {
    const Albums = await Album.find();

    res.render('Albums/allAlbums.html', { title: 'Albums', Albums });
};

albumsCtrl.renderEditForm = async (req, res) => {

    const EditAlbum = await Album.findById(req.params.id);

    res.render('Albums/editAlbum.html', { title: "Edit Album", EditAlbum });
};

albumsCtrl.updateAlbum = async (req, res) => {
    const { name, artist, year } = req.body;
    await Album.findByIdAndUpdate(req.params.id, { name, artist, year });
    req.flash('success_msg', 'Album updated sucessfully');
    res.redirect('/albums');
};

albumsCtrl.deleteAlbum = async (req, res) => {
    await Album.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Album deleted successfully');
    res.redirect('/albums');
};

module.exports = albumsCtrl;
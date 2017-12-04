const util = require('util');
const Toy = require('../models/toy');


module.exports = class ToysController {
  index(req, res) {
    Toy.find()
      .then(toys => { console.log(util.inspect(toys)); res.render('toys/index', { toys: toys })})
      .catch(err => { res.render('toys/index', { error: 'not found '})})
  }



  show(req, res) {
    Toy.findById(req.params.id, function(err,toy){
      console.log(util.inspect(toy)); res.render('toys/show', { toy: toy })})
    // res.send(`GET toys#show id=${req.params.id}\n`);
  }

  delete(req, res) {
    Toy.findByIdAndRemove(req.params.id, function(err,toy){
      if (err) throw err;
        console.log('toy deleted!');
        res.redirect('/toys');
      });
  }

  edit(req,res){
    Toy.findById(req.params.id, function(err,toy){
      console.log(util.inspect(toy)); res.render('toys/update', { toy: toy })})
  }

  update(req,res){


    Toy.update({ _id: req.params.id }, { $set: { name: req.body.toy.name, description: req.body.toy.description }}, function(err){
      if (err) {
        res.statusCode = 403;
        res.send(err);
      } else {
        res.redirect('/toys');
      }
    });
}




  new(req, res) {
    res.render('toys/new');
  }

  create(req, res) {
    const toy = new Toy(req.body.toy);
    const fault = (err) => res.status(400);
    const redirect = (toy) => res.redirect('/toys');
    toy.save().then(redirect).catch(fault);
  }
}

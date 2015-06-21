var config = require('../config');
var express = require('express');
var router = express.Router();

// TO DO: GET list of reactions
router.get('/', function(req, res, next) {
  var example = ["UTERINE HAEMORRHAGE","BLOOD CULTURE POSITIVE","CONVULSION","DEPRESSED LEVEL OF CONSCIOUSNESS","ELECTROENCEPHALOGRAM ABNORMAL","FUNGAL INFECTION","HYPOTENSION","HYPOXIA","MENTAL STATUS CHANGES","MULTI-ORGAN FAILURE","PANCREATITIS","SEPSIS","SPUTUM CULTURE POSITIVE","BRADYCARDIA","EMBOLISM","ILEUS PARALYTIC","INTESTINAL ISCHAEMIA","OXYGEN SATURATION DECREASED","RENAL FAILURE ACUTE","RENAL TUBULAR NECROSIS","AIDS ENCEPHALOPATHY"];
  res.json(example);
});

// TO DO: Post new or update reaction definition
router.post('/', function(req, res, next) {
  // Validate that incoming request is ok... and not a duplicate
  //res.json({todo: 'post reaction definition'});
  if(Object.keys(req.body).length != 1 ||
     req.body.reaction == null ||
     typeof req.body.reaction != "string") {
    var err = new Error();
    err.status = 400;
    err.error = "Invalid Request Body";
    err.message = "Either the incorrect number of attributes were provided or" +
                  " the 'reaction' attribute could not be found, or the" +
                  " 'reaction' attribute wasn't properly formatted.";
    next(err);
  }
  // Check to see if the Record already exists in Mongo...
  //JOB
  else if(false) {
    var err = new Error();
    err.status = 400;
    err.error = "Duplicate Reaction";
    err.message = "The reaction that you are trying to create already exists" +
                  " and cannot be created again.";
    next(err);
  }

  //JOB pseudo code
  //===================
  // -- Go and get the medical dictionary terms
  // -- Create and use the DEFINITION model to store it
  // -- USE THE REACTIONS model to stage everything together
  // -- Save the REACTIONS model as a document in the dre reactions collection
  res.status(200);
  res.json();
  // ^^^ JOB >> Set the response to be the REACTIONS model that was just saved
});

// TO DO: Get reaction defintion
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var example = JSON.parse('{"reaction":"' + id + '","terms":[{"term":"urosepsis","text":"sepsis caused by bacteria from the urinary tract invading the bloodstream","attributionText":"from Wiktionary, Creative Commons Attribution/Share-Alike License","source":"wordnik"},{"term":"urosepsis","text":"sepsis caused by bacteria from the urinary tract invading the bloodstream","attributionText":"from Wiktionary, Creative Commons Attribution/Share-Alike License","source":"wordnik"}]}');
  res.json(example);
});

// TO DO: Put reaction defintion
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var example = JSON.parse('{"reaction":"' + id + '","terms":[{"term":"urosepsis","text":"sepsis caused by bacteria from the urinary tract invading the bloodstream","attributionText":"from Wiktionary, Creative Commons Attribution/Share-Alike License","source":"wordnik"},{"term":"urosepsis","text":"sepsis caused by bacteria from the urinary tract invading the bloodstream","attributionText":"from Wiktionary, Creative Commons Attribution/Share-Alike License","source":"wordnik"}]}');
  res.json(example);
});

// TO DO: Delete reaction definition
router.delete('/:id', function(req, res, next) {
  res.json({todo: 'delete reaction definition ' +  req.params.id});
});


module.exports = router;

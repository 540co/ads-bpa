var config = require('../config');
var express = require('express');
var router = express.Router();

// TO DO: GET list of reactions
router.get('/', function(req, res, next) {
  var example = ["UTERINE HAEMORRHAGE","BLOOD CULTURE POSITIVE","CONVULSION","DEPRESSED LEVEL OF CONSCIOUSNESS","ELECTROENCEPHALOGRAM ABNORMAL","FUNGAL INFECTION","HYPOTENSION","HYPOXIA","MENTAL STATUS CHANGES","MULTI-ORGAN FAILURE","PANCREATITIS","SEPSIS","SPUTUM CULTURE POSITIVE","BRADYCARDIA","EMBOLISM","ILEUS PARALYTIC","INTESTINAL ISCHAEMIA","OXYGEN SATURATION DECREASED","RENAL FAILURE ACUTE","RENAL TUBULAR NECROSIS","AIDS ENCEPHALOPATHY"];
  res.json(example);
});

// TO DO: Get reaction defintion
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var example = JSON.parse('{"reaction":"' + id + '","terms":[{"term":"urosepsis","text":"sepsis caused by bacteria from the urinary tract invading the bloodstream","attributionText":"from Wiktionary, Creative Commons Attribution/Share-Alike License","source":"wordnik"},{"term":"urosepsis","text":"sepsis caused by bacteria from the urinary tract invading the bloodstream","attributionText":"from Wiktionary, Creative Commons Attribution/Share-Alike License","source":"wordnik"}]}');
  res.json(example);
});

// TO DO: Post new or update reaction definition
router.post('/:id', function(req, res, next) {
  res.json({todo: 'post reaction definition ' +  req.params.id});
});

// TO DO: Delete reaction definition
router.delete('/', function(req, res, next) {
  res.json({todo: 'delete reaction definition ' +  req.params.id});
});


module.exports = router;

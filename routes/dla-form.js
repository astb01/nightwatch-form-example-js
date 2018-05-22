const express = require('express');
const router = express.Router();
const validator = require('express-validator');
const uuidv4 = require('uuid/v4');

/** Helper Functions */
function countEmpty(arr){
  return arr.filter(v => v === undefined || v === '').length;
}

function hasValues(arr){
  var hasValArr = [];

  for (var i = 0; i < arr.length; ++i){
    if (arr[i] !== ''){
      hasValArr.push(arr[i]);
    }
  }

  return hasValArr;
}

function countErrors(keys, map){
  var count = 0;

  for(var i = 0; i < keys.length; ++i){
    //console.log('>>>> ', keys[i], ' = ' ,  map[keys[i]] );
    if (map[keys[i]]){
      //console.log('-->> Error: ', keys[i], ' = ' ,  map[keys[i]] );
      count++;
    }
  }
  return count;
}

/* GET users listing. */
router.post('/', function(req, res, next) {
  var aboutChildFields = [ req.body.surname, req.body.othernames, req.body.dob, req.body.sex ];

  req.checkBody('surname')
    .notEmpty().withMessage('Surname is required')
    .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i).withMessage('Surname must only contain characters and spaces');

    req.checkBody('othernames')
    .notEmpty().withMessage('Other names is required')
    .matches(/^^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i).withMessage('Other names must only contain characters and spaces');
  
  req.checkBody('dob')
    .notEmpty().withMessage('Date of Birth is required')
    .isValidDate(req.body.dob).withMessage('Date of Birth is not valid. Please enter as DD/MM/YYYY');

  req.checkBody('sex', 'Sex is required').notEmpty();
  
  var childLivesFields = [ req.body.street, req.body.city, req.body.postcode, req.body.claiming,
    req.body.nationality, req.body.ukliving, req.body.abroad4weeks ];

  req.checkBody('street', 'Street is required').notEmpty();
  req.checkBody('city', 'City/Town is required').notEmpty();
  req.checkBody('postcode', 'Post Code is required').notEmpty();
  req.checkBody('postcode', 'Post Code must be a valid UK postal code').isPostalCode('GB');
  req.checkBody('claiming', 'Please state if you are claiming under Special Rules').notEmpty();
  req.checkBody('nationality')
    .notEmpty().withMessage('Nationality is required')
    .isAlpha().withMessage('Nationality must only contain characters');
  
  req.checkBody('ukliving', 'Please state if the child in question lives in the UK or not').notEmpty();  
  req.checkBody('abroad4weeks', 'Please state if the child in question has lived abroad for more than 4 weeks').notEmpty();

  var childRefFields = [ req.body.childref1, req.body.childref2, req.body.childref3, req.body.childref4,
    req.body.childref5, req.body.childref6, req.body.childref7, req.body.childref8, req.body.childref9 ];
  
  var childRefPopulated = hasValues(childRefFields).length > 0;
  var childRefErrors = false;

  if (childRefPopulated){
    req.checkBody('childref1', 'Child Reference Number must only contain numbers 0-9.').isNumeric();
    req.checkBody('childref2', 'Child Reference Number must only contain numbers 0-9.').isNumeric();
    req.checkBody('childref3', 'Child Reference Number must only contain numbers 0-9.').isNumeric();
    req.checkBody('childref4', 'Child Reference Number must only contain numbers 0-9.').isNumeric();
    req.checkBody('childref5', 'Child Reference Number must only contain numbers 0-9.').isNumeric();
    req.checkBody('childref5', 'Child Reference Number must only contain numbers 0-9.').isNumeric();
    req.checkBody('childref6', 'Child Reference Number must only contain numbers 0-9.').isNumeric();
    req.checkBody('childref7', 'Child Reference Number must only contain numbers 0-9.').isNumeric();
    req.checkBody('childref8', 'Child Reference Number must only contain numbers 0-9.').isNumeric();
    req.checkBody('childref9', 'Child Reference Number must only contain numbers 0-9.').isNumeric();
  }

  var additionalFields = [ req.body.email ];
  req.checkBody('email', 'Email for confirmation is required').notEmpty();
  req.checkBody('email', 'Please enter a valid Email Address').isEmail();

  var errors = req.validationErrors(true);
  var sectionErrors = {};

  if (childRefPopulated){
    var allFilled = true;
    for (var i = 0; i < childRefFields.length; ++i){
      if (childRefFields[i] === ''){
        allFilled = false;

        errors.childref1 = {location: 'body',
          param: 'childref1', 
          msg: 'Please enter the complete Child Reference Number',
          value: ''};
        childRefErrors = true;
        break;
      }
    }
  }

  var aboutChildCount = countErrors([
    'surname', 'othernames', 'dob', 'sex', 'childref1', 'childref2', 'childref3',
    'childref4', 'childref5', 'childref6', 'childref7', 'childref8', 'childref9'], errors);
  var childLivesCount = countErrors([ 'street', 'city', 'postcode', 'claiming',
    'nationality', 'ukliving', 'abroad4weeks' ], errors);
  var additionalCount = countErrors([ 'email' ], errors);

  if (aboutChildCount > 0 || childRefErrors){
    sectionErrors.aboutchild = {};
    if (childRefErrors){
      aboutChildCount += childRefErrors;
    }

    sectionErrors.aboutchild.msg = aboutChildCount;
  }
  
  if (childLivesCount > 0){
    sectionErrors.childlives = {};
    sectionErrors.childlives.msg = childLivesCount;
  }

  if (additionalCount > 0){
    sectionErrors.additionalinfo = {};
    sectionErrors.additionalinfo.msg = additionalCount;
  }

  //console.log('Body\n', req.body, '\n\n');
  //console.log('Errors', JSON.stringify(errors));
  //console.log('Section Errors: ', JSON.stringify(sectionErrors));

  if (errors){
    res.render('index', { 'errors': errors, 'sectionErrors': sectionErrors, 'form': req.body } );
    return;
  }
  else {
    const uuid = uuidv4();
    const email = req.body.email;

    res.render('success', { 'applicationId': uuid, 'emailConf': email });
  }
});

module.exports = router;

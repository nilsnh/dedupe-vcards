'use strict'

var fs = require('fs');
var _ = require('lodash');

exports.findAndDedupeVcards = function (vcardDirectory, callback) {
  fs.readdir(vcardDirectory, function (err, files) {
    if (err) throw err;
    exports.processVcardFiles(filterAndAddFilePath(files), callback);
  });
  function filterAndAddFilePath (files) {
    return _.reduce(files, function (newArray, file) {
      if (/vcf$/.test(file)) newArray.push(vcardDirectory + file);
      return newArray
    }, []);
  }
}

exports.processVcardFiles = function (vcardFiles, callback) {
  var vcardsResult = [];
  var done = _.after(vcardFiles.length, function () {
    callback(deduplicate(vcardsResult));
  });
  _.map(vcardFiles, function (fileUri) {
    fs.readFile(fileUri, {encoding: 'UTF-8'}, function (err, data) {
      if (err) throw err;
      var result = exports.createVcardArray(data);
      vcardsResult = addArraysToArray(vcardsResult, result);
      done();
    });
  });
  function addArraysToArray (destinationArray, arrays) {
    return _.reduce(arrays, function (newArray, arrayInArrays) {
      newArray.push(arrayInArrays);
      return newArray;
    }, destinationArray);
  }
  function deduplicate (vcardArray) {
    return _.reduce(vcardArray, function (dedupedArray, vcard) {
      if (!isAlreadyIncluded(vcard, dedupedArray)) dedupedArray.push(vcard);
      return dedupedArray;
    }, []);
    function isAlreadyIncluded (vcard, dedupedArray) {
      return _.some(dedupedArray, function (vcardInArray) {
        return _.isEqual(vcardInArray, vcard);
      });
    }
  }
}

exports.createVcardArray = function (vcardFileData) {
  return _.reduce(vcardFileData.split('\n'), function (vcardObjArray, entry) {
    if (/^BEGIN:VCARD/.test(entry)) {
      vcardObjArray.push(["BEGIN:VCARD"]);
      return vcardObjArray;
    } else {
      return exports.addVCardEntry(vcardObjArray, entry);
    }
  }, []);
}

exports.addVCardEntry = function (vcardObjArray, entry) {
  if (entry != "") {
    var vcard = vcardObjArray.pop();
    vcard.push(entry);
    vcardObjArray.push(vcard);
  }
  return vcardObjArray;
}
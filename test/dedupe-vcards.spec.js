var assert = require("assert");
var dedupeVcards = require('../dedupe-vcards.js');
var _ = require('lodash');

describe('vcard program', function(){
  it('createVcardArray() should be able to create vcardArrays', function(){
    var data = "BEGIN:VCARD\n" +
    "N:Test\n" +
    "END:VCARD\n" +
    "BEGIN:VCARD\n" +
    "FN:TestName\n" +
    "END:VCARD\n";
    var actualResult = dedupeVcards.createVcardArray(data);
    var desiredResult = [["BEGIN:VCARD", "N:Test", "END:VCARD"],
    ["BEGIN:VCARD", "FN:TestName", "END:VCARD"]];
    assert.deepEqual(actualResult, desiredResult);
  });

  it('processVcardFiles() should be able to concatenate and remove duplicates', function (done) {
    var desiredResult = [["BEGIN:VCARD",
    "VERSION:3.0",
    "FN:TestName Will be reduced to one",
    "N:",
    "TEL;TYPE=CELL:",
    "END:VCARD"],
    ["BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Not a duplicate",
    "N:",
    "TEL;TYPE=CELL:",
    "END:VCAR"]];
    dedupeVcards.processVcardFiles(['vcards/testFile1.vcf', 'vcards/testFile2.vcf'],
      function (actualResult) {
        assert.equal(areArraysOfArraysEqual(desiredResult, actualResult), true);
        done();
        function areArraysOfArraysEqual (array1, array2) {
          var result = true;
          _.map(array1, function (array1Array) {
            result = _.some(array2, function (array2Array) {
              return !_.isEqual(array1Array, array2Array);
            });
          });
          return result;
        }
      });
  })
})

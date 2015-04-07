var assert = require("assert")
var dedupeVcards = require('../dedupe-vcards.js')

describe('vcard program', function(){
  it('processVcardData() should be able to create vcardArrays', function(){
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
  })
})

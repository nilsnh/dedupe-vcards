var fs = require('fs');
var vcard = require('./dedupe-vcards')
var _ = require('lodash');

vcard.findAndDedupeVcards('./vcards/', function (dedupedData) {
  fs.writeFile('deduped-contacts.vcf', _.flatten(dedupedData).join('\n'), function (err) {
    if (err) throw err;
    console.log('Successfully wrote file');
  });
});
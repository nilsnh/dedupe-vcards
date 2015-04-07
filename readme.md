# Remove duplicate vcards

"Vcards, vcards everywhere." This little program digests any number of vcard files before removing duplicate vcard entries and spitting out a nice de-duplicated .vcf export file.

## Usage

1. First you'll have to install [nodejs](https://nodejs.org/).
2. Then you'll have to download this project. And navigate inside the extracted project folder with a command prompt and execute the command `npm install`.
3. Afterwards you may run `npm start` to concatenate and deduplicate all .vcf files located inside the vcards/ folder. The program will then finish by creating a deduped-contacts.vcf inside the project folder.

# Licensed under MIT

Copyright (c) 2015 Nils Norman Haukås

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

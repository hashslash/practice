var transformer = require('api-spec-transformer');
var fs = require('fs')

var postmanToRaml = new transformer.Converter(transformer.Formats.POSTMAN, transformer.Formats.RAML10);

// postmanToRaml.loadFile('jsd.postman_collection21.json', function (err) {
//     if (err) console.log(err.message)
//     postmanToRaml.convert('yaml').then((raml) => {
//         fs.writeFileSync('raml.yaml', raml)
//     })
// });

var postmanToSwagger = new transformer.Converter(transformer.Formats.POSTMAN, transformer.Formats.SWAGGER);

postmanToSwagger.loadFile('jsd.postman_collection21.json', function (err) {
    if (err) console.log(err.message)
    postmanToSwagger.convert('yaml').then((raml) => {
        fs.writeFileSync('raml.yaml', raml)
    })
    postmanToSwagger.convert('json').then((raml) => {
        fs.writeFileSync('raml.json', raml)
    })
});
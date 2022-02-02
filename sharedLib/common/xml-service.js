'use strict';

let instance = null;

const xml2js = require('xml2js');
const js2xmlparser = require('js2xmlparser');

class XmlService {

    constructor(parser, builder) {
        this.parser = parser;
        this.builder = builder;
    }

    static getInstance()
    {
        if(!instance){
            const options = {
                explicitCharKey: false,
                trim: false,
                normalize: false,
                explicitRoot: true,
                emptyTag: null,
                explicitArray: false,
                ignoreAttrs: false,
                mergeAttrs: true,
                validator: null
            };
            const parser = new xml2js.Parser(options);
            const builder = new xml2js.Builder();
            instance = new XmlService(parser, builder);
        }
        return instance;
    }

    async convertToJson(xmlString) {
        return new Promise(((resolve, reject) => {
            return this.parser.parseStringPromise(xmlString)
                .then(result => resolve(result))
                .catch(err => reject(err));
        }));
    }

    async convertToXml(jsonObject) {
        return new Promise(((resolve, reject) => {
            try {
                let xml = this.builder.buildObject(jsonObject);
                resolve(xml);
            } catch (err) {
                reject(err);
            }
        }));
    }

    static ensureElementsAreArray(json, elements) {
        elements.forEach(e => this.ensureElementIsArray(json, e));
    }

    static ensureElementIsArray(json, element) {
        //{"a":{"x":1"}} --> (json, "a") --> {"a":[{"x": "1"}]}
        if (json[element] && !Array.isArray(json[element])) {
            console.log(`Converting to array: ${json[element]}`);
            json[element] = [json[element]];
        }
    }

    serializeJsToXML(rootName, JSObject) {
        return js2xmlparser.parse(rootName, JSObject)
    }
}

module.exports = XmlService;
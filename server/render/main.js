"use strict";
let fs = require('fs'),
  _ = require('lodash'),
  numeral = require('numeral'),
  jade = require('jade'),
  crawlerGit = require('../crawler/github');

const HTMLINPUT = '../../views/main/index.jade',
  HTMLOUTPUT = '../../rendered/main/index.html',
  PROTOTYPE = './viewModel.json',
  ICONMAP = '../data/db.json',
  VMJSON = '../data/viewModel.json';

const privateFn = {
  exportViewModel:(data)=> {
    fs.openSync(VMJSON, 'w');
    fs.writeFileSync(VMJSON, JSON.stringify(data));
  },
  getIconJson:() => {
    var db = null;
    try {
      db = JSON.parse(fs.readFileSync(ICONMAP));
    }

    catch(err){
      console.error("JSON Error: " + err.message);
    }

    return db;
  },
  getViewModel: () => {
    var result = null;
    try {
      result = JSON.parse(fs.readFileSync(PROTOTYPE));
      result['module'] = 'main';
      result['pretty'] = process.env.NODE_ENV != "production";
    }

    catch(err){
      console.error("JSON Error: " + err.message);
    }

    return result;
  },

  render: (data, inputUrl, outputUrl)=> {
    try {
      var html = jade.renderFile(inputUrl, data);
      fs.openSync(outputUrl, 'w');
      fs.writeFileSync(outputUrl, html);
    }
    catch(err){
      console.error("Jade Build Error: " + err.message);
    }

    console.log("render success!");
  },

  group: (data) => {
    let result = [];
    let data1 =  _.orderBy(data, (v) => {
      return numeral(v.star).value();
    }, 'desc');
    let data2 = _.groupBy(data1, "group");
    let data3 = privateFn.getIconJson();
     _.each(data2, (v, k) => {
      result.push({
        name: k,
        icon: data3.grpIcon[k],
        list: v
      });
    });

    return result;
  },
};

const inst = {
  start: () => {
    let me = this;
    crawlerGit.start().then(v => {
      let data = privateFn.group(v);
      let vmData = privateFn.getViewModel();
      vmData.package = data;
      privateFn.exportViewModel(vmData);
      privateFn.render(vmData, HTMLINPUT, HTMLOUTPUT);
    }, v => {
      console.log("github start update fail!");
    });
  }
};

inst.start();
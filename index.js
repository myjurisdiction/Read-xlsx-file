"use strict";

const path = require("path");
const fs = require("fs");

const reader = require("xlsx");

const fileToRead = path.join(__dirname, "/../../Lat Long.xlsx");

const file = reader.readFile(fileToRead);

const contents = [];

const sheets = file.SheetNames;

for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    contents.push(res);
  });
}

const contents_by_booth_number = new Object();

for (let item of contents) {
  contents_by_booth_number[item["PS Number"]] = {
    latitude: item.Latitude,
    longitude: item.Longitude,
  };
}

const destination = path.join(__dirname, "/../../coordinates.json");

fs.writeFile(destination, JSON.stringify(contents_by_booth_number), (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("File written successfully !!");
});

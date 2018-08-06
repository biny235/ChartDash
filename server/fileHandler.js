//process XML
const jsonxml = require('jsontoxml');
const xmlFormat = require('xml-formatter');
const fs = require('fs');

const xml = (data)=>{
  let xml = jsonxml({data: reformatter(data)});
  let formattedXML = xmlFormat(xml)
  fs.writeFileSync('analysys.xml', formattedXML, (err, file)=>{
    if(err) next(err);
  })
}
const txt = (data) => {
  let lines = []
  Object.keys(data).forEach(key => {
    if(Array.isArray(data[key])){
      lines.push(`${key}:`)
      data[key] = data[key].forEach(item => {
        lines.push(`  ${item[0]}: ${((item[1] / data.total) * 100).toFixed(2)}%`)
      })
    }else{
      lines.push(`${key}: ${((data[key] / data.total) * 100).toFixed(2)}%`) 
    }
  })
  fs.writeFileSync('analysys.txt', lines.join('\n'), (err, file)=>{
    if(err) next(err);
  })
}
const json = (data)=>{
  fs.writeFileSync('analysys.json', JSON.stringify(reformatter(data)), (err, file)=>{
    if(err) next(err);
  })
}

const reformatter = (data) =>{
  Object.keys(data).forEach(key => {
    if(key === "total"){
      data[key] = data[key]
    }else if(Array.isArray(data[key])){
      data[key] = data[key].reduce((memo, item)=>{
        memo[item[0]] = `${((item[1] * 1 / data.total) * 100).toFixed(2)}%`
        return memo
      },{})
    }else{
      data[key] = `${((data[key]* 1 / data.total) * 100).toFixed(2)}%`
    }
  })
  return data
}

module.exports = {
  xml,
  json,
  txt
}

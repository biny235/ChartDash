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
    if(key === 'total'){
      lines.push(`Total :${data.total}`)
    }else if(key === 'mostPopulousStates'){
      //Most Populous State already has some calculations made for the tooltips. 
      lines.push(`${key}:`)

      data[key] = data[key].map(state => {

        return lines.push(`  Total: ${state[1] + state[3]}; ${state[2]}; ${state[4]}`)

      })
    }else if(Array.isArray(data[key])){
      //if its an array, need to format each index
      lines.push(`${key}:`)

      data[key] = data[key].forEach(item => {

        lines.push(`  ${item[0]}: ${((item[1] / data.total) * 100).toFixed(2)}%`)

      })
    }else{

      lines.push(`${key}: ${((data[key] / data.total) * 100).toFixed(2)}%`) 

    }
  })
  fs.writeFileSync('analysys.txt', lines.join('\n'), (err)=>{

    if(err) next(err);

  })
}

const json = (data)=>{
  fs.writeFileSync('analysys.json', JSON.stringify(reformatter(data)), (err)=>{

    if(err) next(err);

  })
}

const reformatter = (data) =>{
  Object.keys(data).forEach(key => {
    //need to leave 'total' alone because we use it to compare
    if(key === 'total'){

      data[key] = data[key]

    }else if(key === 'mostPopulousStates'){
      //Most Populous State already has some calculations made for the tooltips. 
      data[key] = data[key].reduce((memo, state) => {
        memo[state[0]] = {total: state[1] + state[3]}
        memo[state[0]].male = (((state[1]  / memo[state[0]].total)).toFixed(2)) * 1
        memo[state[0]].female = (((state[3]  * 1 / memo[state[0]].total)).toFixed(2)) * 1
        return memo

  }, {})
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

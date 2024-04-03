const fs = require('fs');


const installationSKU = (data, code, childData, files) => {
    const res = Object.keys(data[Object.keys(jsonData)[0]]).find((key) => key  === code)
    if(!res){
       const data = {...jsonData[Object.keys(jsonData)[0]],  [code]: [childData]}
       jsonData[Object.keys(jsonData)[0]] = data;
       let final = JSON.stringify(jsonData, null, 2);
       fs.writeFileSync(files, final);
       console.log(`Installation data on code: ${code} is added successfully!`);
    }else{
        console.log(`Data is already exist code: ${res}`);
    }
}




const handleReadFile = (file) => {
    try {
        const jsonData = fs.readFileSync(file, 'utf8'); 
        const data = JSON.parse(jsonData);
        return data;
    } catch (error) {
        console.error('Error reading or parsing JSON file:', error);
        return null;
    }
};

const childData = (key,val) => {
    const value = {
        [key]: val
    }
    return value;
}


var childD;
// const jsonData = handleReadFile('installationSKU.json');
const jsonData = handleReadFile('SKUContent.json');
// const jsonData = handleReadFile('installationSKU.json');
// const jsonData = handleReadFile('installationSKU.json');

switch (Object.keys(jsonData)[0]) {
    case 'skuInstallation':
       childD = childData("installationLink", 
       "<a href='/Resources/ProductImages/SP383-deluxe-19332532-install-guide.pdf'>Click here to download installation information.</a>"
       );
    break;
    case 'skuContent':
       childD = childData("additionalInfo", 
       "<a href='/Resources/ProductImages/SP383-deluxe-19332532-install-guide.pdf'>Click here to download installation information.</a>"
       );
    break;
    default:
        break;
}


installationSKU(jsonData, 'testData', childD, "installationSKU.json")
installationSKU(jsonData, 'testData', childD, "SKUContent.json")
installationSKU(jsonData, 'testData', childD, "skuTech.json")
installationSKU(jsonData, 'testData', childD, "videoSKU.json")






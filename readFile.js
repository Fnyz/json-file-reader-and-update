const fs = require('fs');


const installationSKU = (data, code, childData) => {
    const res = Object.keys(data[Object.keys(jsonData)[0]]).find((key) => key  === code)
    if(!res){
       const data = {...jsonData.skuInstallation,  [code]: [childData]}
       jsonData.skuInstallation = data;
       let final = JSON.stringify(jsonData, null, 2);
       fs.writeFileSync('installationSKU.json', final);
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
        [key]: [val]
    }
    return value;
}


var childD = childData("installationLink", "<a href='/Resources/ProductImages/SP383-deluxe-19332532-install-guide.pdf'>Click here to download installation information.</a>");
const jsonData = handleReadFile('installationSKU.json');



switch (Object.keys(jsonData)[0]) {
    case 'skuInstallation':
        installationSKU(jsonData, 'testData', childD)
        break;
    default:
        break;
}







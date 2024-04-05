const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const fs = require('fs');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Define a route to handle POST requests
app.post('/submit', (req, res) => {
 
    const key = req.body.key;
    const value = req.body.type === "skuTech.json" ? req.body.value.replace(/>\s+</g, "><").replace(/"/g, "'") : req.body.value.replace(/>\s+</g, "><").replace(/"/g, "'").replace(/ class='[^']*'/g, '');     
    const file = req.body.type;
    const allData = req.body.allData;
  

 

        const dataPassNow = (data, code, value, files) => {

        const result = Object.keys(data[Object.keys(data)[0]]).find((key) => key  === code)
        if(!result){
           const d = {...data[Object.keys(data)[0]],  [code]: value}
           data[Object.keys(data)[0]] = d;
           let final = JSON.stringify(data, null, 2);
           fs.writeFileSync(files, final);
           res.json({
            message: `Installation data on code: ${code} is added successfully!`
           })
        }else{
            res.json({
                message: `Data is already exist code: ${result}`
            })
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

    const datas = handleReadFile(file)

 
    
    switch (Object.keys(datas)[0]) {
    case 'skuInstallation':
        const a =[ {
            "installationLink": value
        }]
        dataPassNow(datas, key, a , file)

    break;
    case 'skuContent':
        const b = [ {
            "additionalInfo": value
        }]
        dataPassNow(datas, key, b , file)
    break;
    case 'skuTech':
        const c =[ {
            "techInfo": value
        }]
        dataPassNow(datas, key, c , file)
   
    break;
    case 'videoSKU':
        dataPassNow(datas, key, allData, file)
     break;
    default:
        break;
        
    }

      
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

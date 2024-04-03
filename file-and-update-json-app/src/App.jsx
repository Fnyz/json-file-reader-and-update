import { useEffect, useState } from 'react'
import './App.css'
import BrowserFS from 'browserfs'


function App() {

  const [file, setFilePath] = useState('');
  const [code, setCode] = useState('');
  const [value, setValue] = useState('');

  const handleReadFile = async () => {
  

    var reader = new FileReader();
    reader.onload = function(event) {
      // The *.txt file text will be printed here
      console.log(event.target.result)
    };
  
    reader.readAsText(file);
   
  };
 
  return (
    <div className='flex  justify-center items-center h-screen w-screen'>
        <div className='flex flex-col justify-center items-center flex-1'>
        <select className="select select-bordered w-full max-w-xs" onChange={(e)=> setFilePath(e.target.value)}>
          <option disabled selected>Pick File</option>
          <option value="installationSKU.json">InstallationSKU</option>
          <option value= "SKUContent.json">SKUContent</option>
          <option value="skuTech.json">SkuTech</option>
          <option value="videoSKU.json">VideoSKU</option>
        </select>

        <label className="form-control w-full max-w-xs mt-2">
          <div className="label">
            <span className="label-text">Code:</span>
          </div>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e)=> setCode(e.target.value)} />
        </label>

        <label className="form-control mt-2 max-w-xs w-full">
          <div className="label">
            <span className="label-text">Value:</span>
          </div>
          <textarea className="textarea textarea-bordered h-24 w-full" placeholder="add here" onChange={(e)=> setValue(e.target.value)}></textarea>
        </label>
        <button className="btn btn-active max-w-xs w-full mt-5" onClick={handleReadFile}>SUBMIT</button>
        </div>

        <div className="flex-1 flex justify-center h-96 items-center pr-10 py-4">
        <textarea className="textarea textarea-bordered w-full h-full overflow-auto" placeholder="Result"></textarea>
        </div>
    </div>
  )
}

export default App

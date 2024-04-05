

const titleLabel = document.getElementById('titleLabel');
const linkLabel = document.getElementById('linkLabel');
const titleInput = document.getElementById('titleInput');
const linkInput = document.getElementById('linkInput');
const key = document.getElementById('keyInput')
const value = document.getElementById('valueInput')
const addMoreButton = document.getElementById('addMoreButton');
const additionalInputsContainer = document.getElementById('additionalInputs');



const multiply = [
    {
        title: "",
        link: ""
    }
];



addMoreButton.style.display = 'none';
let inputCount = 0; 

const generateInputFields = (index, title = null, link = null) => {
    return `
  
    <div id="inputSet${index}" class="inputSet mb-2">
       
        <label for="titleInput${index}" class="form-label">Title:</label>
        <input type="text" id="titleInput${index}" name="titleInput" class="form-control" size="100" required value="${title}">
        <label for="linkInput${index}" class="form-label">Link:</label>
        <input type="text" id="linkInput${index}" name="linkInput" class="form-control" size="100" required value="${link}">
        <button type="button" class="removeButton btn btn-danger mt-4 mb-2">Remove</button>
    </div>
    `;
};



const addMoreInputs = () => {
    const newInputs = generateInputFields(inputCount, "", "");
    additionalInputsContainer.insertAdjacentHTML('beforeend', newInputs);
    inputCount++;

  
};

// Function to remove a set of inputs
const removeInputs = (index) => {
    const inputSet = document.getElementById(`inputSet${index}`);
    if (inputSet) {
        inputSet.remove();
    }
};

// Initial generation of input fields



const showMultiply = () => {
    multiply.forEach((item, index) => {
        const { title, link } = item;
        const newInputs = generateInputFields(index, title, link);
        additionalInputsContainer.insertAdjacentHTML('beforeend', newInputs);
        inputCount++;
    });
}

addMoreButton.addEventListener('click', addMoreInputs);



additionalInputsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('removeButton')) {
        const inputSetIndex = event.target.parentNode.id.replace('inputSet', '');
        removeInputs(inputSetIndex);
    }
});


document.getElementById('typeSelect').addEventListener('change', function() {
    const type = this.value.trim(); // Trim whitespace from the value
    if (type === 'videoSKU.json') {
        showMultiply();
        value.disabled = true;
        addMoreButton.style.display = 'inline-block';
    } else {
        key.disabled = false;
        value.disabled = false;
        additionalInputsContainer.innerHTML = ""
        
    }
});



const getInputValues = () => {
    const inputSets = document.querySelectorAll('.inputSet');
    const inputData = [];

    inputSets.forEach((inputSet, index) => {
        const titleInput = inputSet.querySelector(`#titleInput${index}`);
        const linkInput = inputSet.querySelector(`#linkInput${index}`);

        if (titleInput && linkInput) {
            const title = titleInput.value;
            const link = linkInput.value;

            inputData.push({ title, link });
        }
    });

    return inputData;
};

// Example usage:
const allData = getInputValues();

document.getElementById('submitButton').addEventListener('click', function(e) {
    e.preventDefault();


    const getInputValues = () => {
        const inputSets = document.querySelectorAll('.inputSet');
        const inputData = [];
    
        inputSets.forEach((inputSet, index) => {
            const titleInput = inputSet.querySelector(`#titleInput${index}`);
            const linkInput = inputSet.querySelector(`#linkInput${index}`);
            const regex = /<iframe.*?src=["'](.*?)["']/;

            if (titleInput && linkInput) {
                const title = titleInput.value.trim();
                const link = linkInput.value.match(regex)[1].trim();
                inputData.push({ title, link });
            }
        });
    
        return inputData;
    };
 
    // Example usage:
    const allData = getInputValues();


    const key = document.getElementById('keyInput').value;
    const value = document.getElementById('valueInput').value;
    const type = document.getElementById('typeSelect').value;

   

    if(type === "SELECT JSON FILE"){
        alert("Please select JSON file!");
        return;
    }
 
    const formData = {
        key: key.trim(),
        value: value.trim(),
        allData:allData,
        type: type
    };


    fetch('http://localhost:3000/submit', {
        method: 'POST',
        body: JSON.stringify(formData), // Convert formData to JSON
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('keyInput').value = '';
        document.getElementById('valueInput').value = '';
    })
    .catch(error => console.error('Error:', error));
});

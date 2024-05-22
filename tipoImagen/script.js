document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      const imgElement = document.getElementById('uploadedImage');
      imgElement.src = e.target.result;
      imgElement.style.display = 'block';
      classifyImage(imgElement);
    };
    reader.readAsDataURL(file);
  });
  
  async function classifyImage(imgElement) {
    const mobilenetModel = await mobilenet.load();
    const predictions = await mobilenetModel.classify(imgElement);
    displayPredictions(predictions);
  }
  
  function displayPredictions(predictions) {
    const predictionElement = document.getElementById('prediction');
    predictionElement.innerHTML = '';
    
    // Mostrar alerta con la predicción principal
    const mainPrediction = predictions[0];
    alert(`Predicción: ${mainPrediction.className}\nProbabilidad: ${Math.round(mainPrediction.probability * 100)}%`);
    
    // Mostrar todas las predicciones en el párrafo
    predictions.forEach(prediction => {
      const p = document.createElement('p');
      p.innerText = `${prediction.className}: ${Math.round(prediction.probability * 100)}%`;
      predictionElement.appendChild(p);
    });
  }
  
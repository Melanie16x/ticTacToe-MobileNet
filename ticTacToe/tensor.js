async function loadModel() {
    const model = await tf.loadLayersModel('path/to/model.json');
    return model;
}

async function computerMoveWithAI() {
    const model = await loadModel();
    const inputTensor = tf.tensor(board.map(cell => {
        if (cell === 'x') return 1;
        if (cell === 'o') return -1;
        return 0;
    })).reshape([1, 9]);
    const prediction = model.predict(inputTensor);
    const move = prediction.argMax(-1).dataSync()[0];
    const cell = cells[move];
    placeMark(cell, computerClass);
    if (checkWin(computerClass)) {
        endGame(false, computerClass);
    } else if (isDraw()) {
        endGame(true);
    }
}

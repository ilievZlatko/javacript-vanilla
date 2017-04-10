// app.js
(function(app) {
  // Config phase
  app.ui.setInput(document.getElementById('userInput'));
  app.ui.setOutput(document.getElementById('result'));

  // setup app (run phase)
  document.getElementById('button').addEventListener('click', function(e) {
    var rangeEl = document.getElementById('range');
    app.fn.setDefaultStep(rangeEl.value);
    app.ui.exec(rangeEl.value);
  });
})(app);

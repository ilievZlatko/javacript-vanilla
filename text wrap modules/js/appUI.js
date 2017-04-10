// ui.js
(function (app) {
  // var input = document.getElementById('userInput');
  // var output = document.getElementById('result');
  // var range = document.getElementById('range');

  var inputElement = null;
  var outputElement = null;

  app.ui = {
    // Sets the output ELEMENT where we should put the result
    setOutput: function(el) {
      outputElement = el;
    },
    // Sets the input ELEMENT - the place from where we should READ the data
    setInput: function(el) {
      inputElement = el;
    },
    // Runs the functionality - reqad from input and writes to output.
    exec: function(step) {
      if (!inputElement || !outputElement) {
        throw new Error('Missing element(s)');
      }
      var input = inputElement.value;
      var output = app.fn.textWrap(input, step);
      outputElement.textContent = output;
    }
  }
})(window.app ? app : window.app = {});

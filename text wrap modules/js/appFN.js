(function (app) {
  var defaultStep = -1;
  app.fn = {
    setDefaultStep: function(step) {
      defaultStep = step;
    },
    textWrap: function(str, step) {
      if (!step || defaultStep != -1) step = defaultStep;
      else throw new Error('No suitable step found');
      var breakLinePoint = /^[.,!?\s]+$/;
      function testWhiteSpace(cuttHere) {
        var cutt = breakLinePoint.test(cuttHere.charAt(0));
        return cutt;
      }
      var newLineStr = "\n";
      var done = false;
      var result = '';

      do {
          var found = false;
          // Inserts new line at first whitespace or symbol of the line
          for (var i = step - 1; i >= 0; i--) {
              if (testWhiteSpace(str.charAt(i))) {
                  var cuttedText = [str.slice(0, i), newLineStr];
                  result = result + cuttedText.join('');
                  // console.log(str);
                  str = str.slice(i + 1);

                  found = true;
                  break;
              }
          }
          // Inserts new line at step position, if the word is too long to wrap
          if (!found) {
              result = result + cuttedText.join('');
              str = str.slice(step);
          }

          if (str.length < step) {
            done = true;
          }
      } while (!done);
      return result + str;
    }
  }
})(window.app ? app : window.app = {});

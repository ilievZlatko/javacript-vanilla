$(document).ready(function(){

    var keys = $('.btn');
    var operators = /([*,/,+,\-,\u00D7,\u00f7])\1+$/;
    var regex = /^[0-9*/\-+()\u00D7\u00f7]+$/;
    var operatorsReg = /^[*/\-+\u00D7\u00f7]+$/;
    var rawinputelement = $('.input_val');
    var display = $('#input_display');
    var result = $('#result');
    var rawinputbuffer = '';
    var previousrawinputbuffer = '';
    var resultbuffer = '';

    /*---taking the focus on hidden input field---*/

    rawinputelement.blur(function() {
        $(this).focus();
    });

    rawinputelement.bind('keypress', function (event) {
      var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
         event.preventDefault();
         return false;
      }
    });

    function checkRawInputvalue(e) {
        rawinputbuffer = rawinputelement.val();
        processRawInputBuffer();
    }

    function resultUpdate () {
      rawinputelement.val(resultbuffer);
      rawinputbuffer = resultbuffer;
      previousrawinputbuffer = resultbuffer;
      resultbuffer = '';
      updateDisplay();
    }

    rawinputelement.keydown(function(evt) {
      if(evt.keyCode == 13) {
        resultUpdate();
      }
    });

    rawinputelement.on('input', function(e) {
        checkRawInputvalue();
    });

    keys.click(function(e) {
        var key = $(this).data('value');
        rawinputelement.val(rawinputelement.val() + key);
        checkRawInputvalue();
    });

    //update the display after we have checked if the input value is allowed

    $('.del').click(function deleteSymbol() {
      rawinputelement.val(rawinputbuffer.slice(0, rawinputbuffer.length - 1));
      checkRawInputvalue();
    });

    $('.equals').click(function equal() {
      resultUpdate();
    });

    function updateDisplay() {
        display.text(rawinputbuffer);
        result.text(resultbuffer);
    }

    function processRawInputBuffer() {
        if (rawinputbuffer.length != previousrawinputbuffer.length) {

            var lastChar = rawinputbuffer.slice(-1);
            var allowedSymbols = ['0','1','2','3','4','5','6','7','8','9','(', ')', '÷', '-', '+', '×', '.', '*', '/'];
            var hasDuplicates = operators.test(rawinputbuffer);
            var previousLastChar = previousrawinputbuffer.slice(-1);

            if (rawinputbuffer.length > previousrawinputbuffer.length) {

                // added symbol
                if(allowedSymbols.indexOf(lastChar) >= 0 && !hasDuplicates) {
                  if(lastChar.match(operatorsReg) && previousLastChar.match(operatorsReg)) {
                    rawinputbuffer = previousrawinputbuffer;
                  } else {
                    rawinputbuffer = previousrawinputbuffer + lastChar;
                  }
                } else {
                  return;
                }
            } else {
                // removed a symbol
                resultbuffer = resultbuffer - lastChar;
            }
            // update last buffer
            previousrawinputbuffer = rawinputbuffer;
        }
        var a = rawinputbuffer.replace(/\u00D7/g, '*').replace(/\u00f7/g, '/');
        try {
          var res = eval(a);

          if(rawinputbuffer == '') {
            resultbuffer = '0';
          } else {
            resultbuffer = res.toString();
          }

        } catch (e) {
          console.log('invalid location');
        }
        updateDisplay();
    }
    rawinputelement.focus();
});

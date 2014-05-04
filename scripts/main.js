(function() {
    'use strict';

    function getInstance($outer) {
        var $output = $outer.find('.console .container'),
            $input = $outer.find('.config .container'),
            config = eval($input.val()),
            inst = new Global.view.InputEmulator({
                $elm: $output,
                data: config
            });
        
        inst.addEventListener('end', function(){
            setTimeout(function() {
                $output.val('');
                inst.start();
            }, 1000*3);
        });
        return inst;
    }

    var basic = getInstance($('#basic')),
        conversion = getInstance($('#conversion'));
   
    basic.start();
    conversion.start();

})();

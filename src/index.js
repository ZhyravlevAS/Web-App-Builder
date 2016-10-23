'use strict';

console.log('Run index.js');

(function(){
  $(document).ready(function () {
    $.ajax('/api/users', {
      method: 'GET',
      cache: false,
      contentType: 'application/json',
      dataType: 'json',
      success: function(res){
        console.log('Response from API use fixtures', res);
      }
    });
  });
})();


let path = require('path');

let formatMobileNumber = (number) => {
  if (/^0[1-9]{2}/.test(number)) {
    return '+38' + number;
  }

  if (/^80[1-9]{2}/.test(number)) {
    return '+3' + number;
  }

  return number;
};

let send = (number, message) => {
  // number = formatMobileNumber(number);

  // var soap = require('soap');

  // soap.createClient('http://turbosms.in.ua/api/wsdl.html', function(err, client) {

  //   // client.setSecurity(new soap.BasicAuthSecurity('cursorroute', 'rokubooghj'));

  //   var params = {'login':'cursorroute', 'password':'rokubooghj'};
  //   client.Auth(params, function(err, result) {
  //     console.log(111, err, result);

  //     client.GetCreditBalance({}, function(err, result) {
  //       console.log(222, err, result);
  //     });
  //   })


  //   var sms = {
  //     'sender': 'CURSOR',
  //     'destination': number,
  //     'text': 'test1'
  //   };

  //   client.SendSMS(sms, function(err, result) { console.log(333, err, result) })
  // });

  // //
}

module.exports = { addCard }

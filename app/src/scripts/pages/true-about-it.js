(() => {

  document.getElementById('ask-us').addEventListener('click', (e) => {
    let templateId = document.getElementById('ask-us').getAttribute('data-template');
    let template = document.getElementById(templateId).innerHTML;

    var modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeLabel: "",
        cssClass: ['ask-us'],
        onOpen: function() {
            // console.log('modal open');
        },
        onClose: function() {
            // console.log('modal closed');
        },
        beforeClose: function() {
            // here's goes some logic
            // e.g. save content before closing the modal
            return true; // close the modal
          return false; // nothing happens
        }
    });

    // set content
    modal.setContent(template);

    // add a button
    modal.addFooterBtn('Button label', 'tingle-btn tingle-btn--primary', function() {
        // here goes some logic
        modal.close();
    });

    // // add another button
    // modal.addFooterBtn('Dangerous action !', 'tingle-btn tingle-btn--danger', function() {
    //     // here goes some logic
    //     modal.close();
    // });

    // open modal
    modal.open();

    // close modal
    //- modal.close();
  })

})()

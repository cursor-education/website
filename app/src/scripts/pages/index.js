"use strict";

// navigation
(() => {



  if (document.querySelector('.student-photo')) {
    // let photoNum = 0;

    // let toggleStudentPhoto = () => {
    //   let $studentPhoto = document.querySelector('.student-photo');
    //   let currentPhotoNum = (photoNum++ % 4) + 1;

    //   if (document.querySelector('.student-photo .icon.first.visible')) {
    //     document.querySelector('.student-photo .icon.first.visible').classList.remove('visible');
    //     document.querySelector('.student-photo .icon.second').classList.add('visible');
    //   }
    //   else {
    //     document.querySelector('.student-photo .icon.second.visible').classList.remove('visible');
    //     document.querySelector('.student-photo .icon.first').classList.add('visible');
    //   }
    // }

    // setInterval(toggleStudentPhoto, 2000);
  }



  let programTypes = document.querySelectorAll('.educational-programms-types .program-type');
  for (var i = 0; i < programTypes.length; i++) {
    let $programType = programTypes[i];

    $programType.addEventListener('click', (e) => {
      e.stopPropagation();

      let $el = e.toElement;
      let type = $el.getAttribute('data-type');
      // console.log(e, $el.getAttribute('data-type'));

      try {
      document.querySelector('.educational-programms-types .program-type.active').classList.remove('active');
      document.querySelector('.educational-programms-types .program-type[data-type="' + type + '"]').classList.add('active');
      }catch(e){}

      try{
      document.querySelector('.list-of-educational-programms .list-of-program-type.visible').classList.remove('visible');
      document.querySelector('.list-of-educational-programms .list-of-program-type.type-' + type).classList.add('visible');
      }catch(e){}
    });
  }




  let $programs = document.querySelectorAll('.list-of-educational-programms .program');
  for (var i = 0; i < $programs.length; i++) {
    let $program = $programs[i];

    (($program) => {

      $program.addEventListener('mouseenter', (e) => {
        document.querySelector('.list-of-educational-programms').classList.add('program-focused');
        // e.toElement.classList.add('focused');

        let programId = $program.querySelector('.program-title').innerText;
        console.log('programId', programId)

        typeof ga == 'function' && ga('send', 'event', 'Program', 'hover', programId);
        typeof fbq == 'function' && fbq('track', 'Program', {
          'action': 'hover',
          'name': programId
        });

      });

      $program.addEventListener('mouseleave', (e) => {
        document.querySelector('.list-of-educational-programms').classList.remove('program-focused');
        // console.log('mouseleave');
      })

    })($program);

  }



  let $trainers = document.querySelectorAll('.list-of-superheroes .teacher');
  for (var i = 0; i < $trainers.length; i++) {
    $trainers[i].addEventListener('mouseenter', (e) => {
      document.querySelector('.list-of-superheroes').classList.add('teacher-focused');
      // e.toElement.classList.add('focused');
    });

    $trainers[i].addEventListener('mouseleave', (e) => {
      document.querySelector('.list-of-superheroes').classList.remove('teacher-focused');
      // console.log('mouseleave');
    })
  }









})()

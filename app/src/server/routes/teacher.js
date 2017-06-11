var express = require('express');
var router = express.Router();

// @url /course/:teacherId
router.get('/:teacherId', function (req, res) {
  let teacherId = req.params['teacherId'];
  let teachers = {
    "andrew-petryk": {
      "name": "Andrew Petryk",
      "position": "Software Engineer",
      "desc": "<p>Не зважаючи на те, що першу свою освіту Андрій здобув на юридичному факультеті ЛНУ Ім. Івана Франка, ІТ і програмування ніколи не залишало його життя.</p><p>Розпочавшись як хобі, Java переросла у другу професію, а згодом і в основну.</p><p>В перелік інтересів Андрія входять Java, Scala, C#, Unity.</p><p>Окрім програмування Андрій полюбляє скоротити холодні осінні дощові вечори за чашкою чаю і партією  DOTA2 чи Hearthstone.</p>",
      "photo": "https://www.dropbox.com/s/v1nx6dvex4kk7ti/300x300.png?raw=1",
      "background": "http://www.hearthstonetopdecks.com/wp-content/uploads/2014/06/featured-cardbacks.jpg"
    },
    "dmytro-fedorov": {
      "name": "Dmytro Fedorov",
      "position": "Software Engineer",
      "desc": "Більше 4 років досвіду в розробці Enterprise Java проектів.<br><br> За час роботи розробником, встиг попрацювати з багатьма іноземними замовниками та широким набором провідних фрейморків та технологій, зокрема: Spring, Hibernate, Struts, Apache Camel, Play, Wicket та інші.<br><br> Залюбки поділиться накопиченим досвідом з людьми, які б хотіли поринути в світ Java.<br><br> Вільний час проводить в компанії друзів, грає більярд, футбол та займається в тренажерному залі.",
      "photo": "https://www.dropbox.com/s/1y4lhw48oood7c6/dmytro-fedorov-300x300.jpg?raw=1",
      "background": "http://ogsport.ru/wp-content/uploads/2012/12/biliard.jpg"
    },
    "viktor-abramov": {
      "name": "Viktor Abramov",
      "position": "Senior Software Engineer",
      "desc": "<p>Senior Frontend Engineer, діючий спортсмен-бодібілдер.</p><p>Один з співзасновників та розробників хмарної GPS платформи UBORO (http://uboro.io).</p><p>Любить автомобілі та собак.</p>",
      "photo": "https://cs540101.userapi.com/c638123/v638123513/22fad/fIwm6IxZHcE.jpg",
      "background": "http://www.sciencebuzz.org/sites/default/files/images/moon_footprint.jpg"
    },
    "volodymyr-sen": {
      "name": "Volodymyr Sen",
      "position": "Senior UI Engineer",
      "desc": "Frontend Engineer в EPAM Systems з більше 6+ років досвіду.",
      "photo": "https://www.dropbox.com/s/crovgdepvb4oujy/volodymyr-sen.png?raw=1",
      "background": "http://new.tinygrab.com/7020c0e8b0a48415115f112f0b5784647ec2d0d9f9.png"
    },
    "roman-rodomansky": {
      "name": "Roman Rodomansky",
      "position": "Senior Software Engineer",
      "desc": "Засновник <b>Ukrainian Security Community</b> (UASC), з якою отримав <a href=\"http://new.tinygrab.com/7020c0e8b05a71e7d85fff85fda69a35a3a30cad11.png\" target=\"_blank\">Gold сертифікат</a> на <a href=\"http://cc.org.ru/10/\" target=\"_blank\">Chaos Construction 2010</a>.<br> Брав участь у всесвітньому <b>Stripe CTF</b>, зайнявши <a href=\"https://stripe-ctf.com/progress/pomapoma\" target=\"_blank\">125 місце</a> із 16000 учасників.<br><br> З 2011 року проводить <b>АДМ (Анонімний Дід Мороз)</b> у Львові, метої якої є анонімний обмін подарунками між учасниками. У перший рік запуску взяло участь більше 500 жителів України.<br><br> Один із спів-засновників <a href=\"http://lviv.gdg.org.ua/\" target=\"_blank\">Google Developers Group Lviv (GDG Lviv)</a>.<br><br> Запустив <b>стартап 2enota.ru</b>, який став лідером ринку аналізу реклами в СНГ. За період запуску також отримав <a href=\"http://education.mongodb.com/downloads/certificates/2ef2277228c6412dabc05d0a9a222306/Certificate.pdf \" target=\"_blank\">сертифікат MongoDB від 10gen</a>.<br><br> Брав участь у львівському <a href=\"https://www.facebook.com/events/264744323659793/\" target=_blank>The Game</a> хакатоні, благодійному хакатоні <a href=\"http://www.symphony-solutions.eu/kindhack-two-day-charity-it-event/\" target=_blank>Kindhack</a>, та у безлічі інших. У UA Wide 2014 Hackathon (EPAM Systems) з командою реалізував \"ще одну\" Edx (online education) для оптимізації процесу навчання та збереження часу менторів.<br> В 2014-у взяв участь у хакатоні при підтримці <a href=\"http://www.rnbo.gov.ua/\" target=\"_blank\">Ради Національної Безпеки України (РНБО)</a>, реалізувавши командою проект для створення додатку, який робить спілкування в популярних соціальних мережах - безпечним та захищеним.<br><br> Проводив доповіді у Lviv Symfony Cafe по Symfony2, <a href=\"http://www.slideshare.net/rodomansky/dockerizing-a-symfony2-application\" target=\"_blank\">Docker</a>, <a href=\"http://www.slideshare.net/rodomansky/deploying-symfony2-app-with-ansible\" target=\"_blank\">Ansible</a>, <a href=\"http://www.slideshare.net/rodomansky/neo4j-epam-33682703\" target=\"_blank\">Neo4j</a>, <a href=\"http://www.slideshare.net/rodomansky/\" target=\"_blank\">тощо</a>.<br><br> Захоплюється змішаними єдиноборствами (<a href=\"http://mmacenter.lviv.ua/\" target=\"_blank\">MMA Center Lviv</a>), ударними музичними інструментами, акриловим малюванням та мотоциклами.",
      "photo": "https://www.dropbox.com/s/wgsuhgrrka4ayqj/roman-rodomansky-300x300.png?raw=1",
      "background": "http://img3.goodfon.ru/original/1680x1050/2/fa/pole-senokos-aisty-aist-ptica.jpg"
    },
    "yevhen-lysyakov": {
      "name": "Yevhen Lysyakov",
      "position": "Lead Software Engineer",
      "desc": "Lead Frontend Developer в EPAM Systems. Захоплюється екстремальними походами в гори.",
      "photo": "https://www.dropbox.com/s/6z7s3iaa9kgpveu/eugene-lysakov-300x.png?raw=1",
      "background": "http://phandroid.s3.amazonaws.com/wp-content/uploads/2014/10/mountains.jpg"
    },
    "oleg-lazaryev": {
      "name": "Oleg Lazaryev",
      "position": "Senior Ruby Developer",
      "desc": "Рубіст в InterLink LLC, з великим досвідом та глибокими технічними знаннями.",
      "photo": "https://media.licdn.com/media/p/7/000/271/3d7/2ab487f.jpg",
      "background": ""
    },
    "volodymyr-stashchenko": {
      "name": "Volodymyr Stashchenko",
      "position": "Lead Ruby Engineer",
      "desc": "Senior Ruby розробник в EPAM, з комерційним досвідом 5+ на Java EE & ROR",
      "photo": "https://www.dropbox.com/s/fzbn6a68rcjc1yb/volodymyr-stashchenko-300x.jpg?raw=1",
      "background": ""
    },
    "vasyl-lasiak": {
      "name": "Vasyl Lasiak",
      "position": "Ruby Engineer",
      "desc": "Рубіст в Innocode з фулстек досвідом та DevOps скілами",
      "photo": "https://www.dropbox.com/s/apiu3h6walp9xyr/vasyl-lasiak-300x300.png?raw=1",
      "background": ""
    },
    "volodymyr-kuriy": {
      "name": "Volodymyr Kuriy",
      "position": "Frontend Engineer",
      "desc": "Frontend девелопер у Pixelant AB із 6+ production досвіду",
      "photo": "https://www.dropbox.com/s/3y6s8fhy3lc72gw/volodymyr-kyriy-300x?raw=1",
      "background": ""
    },
    "yurii-danyliak": {
      "name": "Yurii Danyliak",
      "position": "Ruby Engineer",
      "desc": "Закінчував ЛНУ ім.І.Франка. Досвід роботи в чотирьох компаніях, в числі яких як аутсорсингові, так і продуктові. Намагається приділяти багато часу професійним мітапам, воркшопам, хакатонам. Серед захоплень - велосипеди, автомобілі Mercedes-Benz кінця минулого століття, більярд, кікер, але завжди залишає місце для чогось нового та невипробуваного.",
      "photo": "https://www.dropbox.com/s/eqdrsnhx02oa1ul/yurii-danyliak-300x.png?raw=1",
      "background": ""
    },
    "roman-kryvun": {
      "name": "Roman Kryvun",
      "position": "Frontend Developer",
      "desc": "I am Front End Developer at Sombra Inc. I have been working as a Software Engineer for 1.5+ years. I have experience in frontend and have strong knowledge of backend development too.<br><br>My duties in Integer Company include: writing semantic, modular front end code using HTML5, CSS3, JavaScript and W3C coding practices, responsible for performing research, provide website maintenance and enhancements, write functional requirement documents and specifications, develop functional and appealing web- and mobile-based applications based on usability, write functional requirement documents and specifications, create quality mockups and prototypes on tight timelines, always stay up-to-date on emerging technologies, describe and use the best decision to solve particular task in the short time.<br><br>I am challenging developer with great potential, who always wants to learn and develop more cool and interesting features.",
      "photo": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/005/070/08a/058c0d2.jpg",
      "background": ""
    },
    "sergii-storozhenko": {
      "name": "Sergii Storozhenko",
      "position": "Senior Software Engineer",
      "desc": "Java Engineer в Remit, експерт по Hybris, захоплюється мотоспортом",
      "photo": "https://media.licdn.com/media/p/2/000/19c/377/32d6c89.jpg",
      "background": "http://cdn.coresites.factorymedia.com/moto_new/wp-content/uploads/2014/06/THE-ULTIMATE-ENDURO-BIKE-GUIDE-5.jpg"
    },
  }

  let teacher = teachers[teacherId];

  if (!teacher) {
    return res.redirect('/');
  }

  // teacher
  teacher.id = teacherId;

  res.render('pages/teacher', {teacher});
})

module.exports = router

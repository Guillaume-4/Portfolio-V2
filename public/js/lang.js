var lang = 0;

function loadTranslations(language) {
    fetch("../json/lang.json")
      .then(response => response.json())
      .then(data => {
        document.getElementById('nav-home').textContent = data[language].header.home;
        document.getElementById('nav-about').textContent = data[language].header.about;
        document.getElementById('nav-btssio').textContent = data[language].header.btssio;
        document.getElementById('nav-eee').textContent = data[language].header.eee;
        document.getElementById('nav-missions').textContent = data[language].header.missions;
        document.getElementById('nav-projets').textContent = data[language].header.projects;
        document.getElementById('nav-veilleTechno').textContent = data[language].header.VeilleTechno;
        document.getElementById('nav-contact').textContent = data[language].header.contact;
        document.getElementById('change-language').textContent = data[language].header.change;
        document.getElementById('welcome-me').textContent = data[language].home_page.welcome_me;
        document.getElementById('welcome-message').textContent = data[language].home_page.welcome_message;
        document.getElementById('TextAbout').textContent = data[language].about_page.TextAbout;
        //document.getElementById('lib').textContent = data[language].about_page.lib;
        //document.getElementById('learn-more-btn').textContent = data[language].home_page.learn_more;
      })
      .catch(error => console.error('Error loading translations:', error));
  }

  function setLanguage() {
    if (lang === 0){
        loadTranslations("fr")
        lang = 1
    }
    else{
        loadTranslations("en")
        lang = 0
    }

  }

  document.addEventListener('DOMContentLoaded', function () {
    setLanguage('fr'); 
  });
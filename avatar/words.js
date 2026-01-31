// Single combined word list for the background swarm
// Exposes window.WORD_SWARM_WORDS as an array of unique words (both en/ru)

(function(){
  const en = [
    'python','linux','android','opensource','dev','code','rust','java','docker','k8s','git','cli','api','ssh','sql','nosql','db','cloud','server','debug','build','test','ux','ui','design','script','automation','tooling','terminal','pkg','npm','pip','repo','branch','pull','merge','ci','cd','encrypt','rsa','ssl','kernel','sys','monitor','log','data','ml','ai','neural','model','app','release','version','mobile','web','frontend','backend','security','ops','infra','container','stack','service','lambda','rest','graphql','socket','threads','async','plugin','binary'
  ];

  const ru = [
    'python','linux','android','открытый','разработчик','код','контейнер','docker','k8s','гит','терминал','бэкенд','фронтенд','дизайн','тест','сборка','лог','сервер','база','данные','шаблон','скрипт','пакет','репо','ветка','слияние','безопасность','шифр','ядро','модель','искусственный','инфо','мобильный','веб','инфраструктура','сервис','авто','монитор','api','ssh','sql','nosql','кеш','клиент','сервер','сеть'
  ];

  // Merge and dedupe, prefer shorter variant if duplicates
  const merged = Array.from(new Set([...en, ...ru]));

  window.WORD_SWARM_WORDS = merged;
})();
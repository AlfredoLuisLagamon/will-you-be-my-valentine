(function () {
  function init() {
    var card = document.getElementById('card');
    var btnYes = document.getElementById('btn-yes');
    var btnNo = document.getElementById('btn-no');
    var success = document.getElementById('success');

    if (!card || !btnYes || !btnNo || !success) return;

    btnYes.addEventListener('click', function () {
      card.classList.add('hidden');
      success.hidden = false;
    });

    if (typeof gimmicks !== 'undefined' && gimmicks.length > 0) {
      var gimmick = gimmicks[Math.floor(Math.random() * gimmicks.length)];
      gimmick.init(btnNo, btnYes, card);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

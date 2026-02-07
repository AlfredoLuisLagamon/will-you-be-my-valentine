var gimmicks = [
  {
    id: 'run-away',
    name: 'Run away',
    init: function (noBtn, yesBtn, card) {
      var wrapper = noBtn.closest('.buttons-wrap');
      if (!wrapper) return;
      noBtn.style.transition = 'left 0.2s ease-out, top 0.2s ease-out';
      var padding = 12;
      var activated = false;
      var minDistance = 100;

      function getCardBounds() {
        var cardRect = card.getBoundingClientRect();
        var btnRect = noBtn.getBoundingClientRect();
        return {
          padding: padding,
          maxLeft: cardRect.width - btnRect.width - padding,
          maxTop: cardRect.height - btnRect.height - padding
        };
      }

      function getCurrentPos() {
        var left = parseFloat(noBtn.style.left);
        var top = parseFloat(noBtn.style.top);
        if (isNaN(left) || isNaN(top)) return null;
        return { left: left, top: top };
      }

      function clampToCard(left, top) {
        var b = getCardBounds();
        left = Math.max(b.padding, Math.min(b.maxLeft, left));
        top = Math.max(b.padding, Math.min(b.maxTop, top));
        return { left: left, top: top };
      }

      function activateAndMove() {
        if (!activated) {
          activated = true;
          wrapper.style.justifyContent = 'flex-start';
          var spacer = document.createElement('div');
          spacer.className = 'no-btn-spacer';
          spacer.setAttribute('aria-hidden', 'true');
          spacer.style.width = noBtn.offsetWidth + 'px';
          spacer.style.height = noBtn.offsetHeight + 'px';
          spacer.style.flexShrink = '0';
          wrapper.insertBefore(spacer, noBtn);

          var cardRect = card.getBoundingClientRect();
          var noRect = noBtn.getBoundingClientRect();
          noBtn.style.position = 'absolute';
          noBtn.style.left = (noRect.left - cardRect.left) + 'px';
          noBtn.style.top = (noRect.top - cardRect.top) + 'px';
        }

        var current = getCurrentPos();
        var b = getCardBounds();
        var angle = Math.random() * Math.PI * 2;
        var dist = minDistance + Math.random() * 80;
        var newLeft, newTop;
        if (current) {
          newLeft = current.left + dist * Math.cos(angle);
          newTop = current.top + dist * Math.sin(angle);
        } else {
          newLeft = b.padding + Math.random() * (b.maxLeft - b.padding);
          newTop = b.padding + Math.random() * (b.maxTop - b.padding);
        }
        var clamped = clampToCard(newLeft, newTop);
        noBtn.style.left = clamped.left + 'px';
        noBtn.style.top = clamped.top + 'px';
      }

      noBtn.addEventListener('mouseenter', activateAndMove);
      noBtn.addEventListener('click', function (e) {
        e.preventDefault();
        activateAndMove();
      });
    }
  },
  {
    id: 'fake-progress',
    name: 'Fake progress modal',
    init: function (noBtn, yesBtn, card) {
      var modal = document.getElementById('gimmick-modal');
      var modalTitle = document.getElementById('modal-title');
      var progressWrap = document.getElementById('progress-wrap');
      var progressFill = document.getElementById('progress-fill');
      var progressStatus = document.getElementById('progress-status');
      var backdrop = document.getElementById('modal-backdrop');
      var progressInterval = null;
      if (!modal || !progressWrap || !progressFill) return;

      var sureActions = document.getElementById('sure-modal-actions');
      function openModal() {
        if (progressInterval) clearInterval(progressInterval);
        if (sureActions) sureActions.hidden = true;
        progressWrap.hidden = false;
        progressFill.style.width = '0%';
        if (progressStatus) progressStatus.textContent = '';
        modalTitle.textContent = 'Processing your answer...';
        modal.classList.add('modal--progress');
        modal.hidden = false;

        var step = 3 + Math.floor(Math.random() * 6);
        var intervalMs = 40 + Math.floor(Math.random() * 80);
        var maxP = 70 + Math.floor(Math.random() * 22);
        var p = 0;

        progressInterval = setInterval(function () {
          p += step;
          if (p >= maxP) {
            clearInterval(progressInterval);
            progressInterval = null;
            progressFill.style.width = maxP + '%';
            if (progressStatus) progressStatus.textContent = 'Process failed.';
            setTimeout(function () {
              modal.classList.remove('modal--progress');
              modal.hidden = true;
            }, 1200);
            return;
          }
          progressFill.style.width = p + '%';
        }, intervalMs);
      }

      function closeModal() {
        if (progressInterval) clearInterval(progressInterval);
        progressInterval = null;
        modal.classList.remove('modal--progress');
        modal.hidden = true;
      }

      noBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
      backdrop.addEventListener('click', closeModal);
    }
  },
  {
    id: 'swap-places',
    name: 'Swap places',
    init: function (noBtn, yesBtn, card) {
      var wrap = noBtn.closest('.buttons-wrap');
      if (!wrap) return;
      var orderYes = 1;
      var orderNo = 2;
      yesBtn.style.order = orderYes;
      noBtn.style.order = orderNo;

      function swap() {
        var t = orderYes;
        orderYes = orderNo;
        orderNo = t;
        yesBtn.style.order = orderYes;
        noBtn.style.order = orderNo;
      }

      noBtn.addEventListener('mouseenter', swap);
      noBtn.addEventListener('click', function (e) {
        e.preventDefault();
        swap();
      });
    }
  },
  {
    id: 'shrink',
    name: 'Shrinking button',
    init: function (noBtn, yesBtn, card) {
      var scale = 1;
      var minScale = 0.2;
      var step = 0.25;

      function shrink() {
        scale = Math.max(minScale, scale - step);
        noBtn.style.transform = 'scale(' + scale + ')';
        noBtn.style.transformOrigin = 'center';
        if (scale <= minScale && noBtn.parentNode) {
          noBtn.parentNode.removeChild(noBtn);
        }
      }

      noBtn.addEventListener('click', function (e) {
        e.preventDefault();
        shrink();
      });
    }
  },
  {
    id: 'are-you-sure',
    name: 'Are you sure?',
    init: function (noBtn, yesBtn, card) {
      var modal = document.getElementById('gimmick-modal');
      var modalTitle = document.getElementById('modal-title');
      var progressWrap = document.getElementById('progress-wrap');
      var countdownText = document.getElementById('countdown-text');
      var sureActions = document.getElementById('sure-modal-actions');
      var btnSure = document.getElementById('modal-btn-sure');
      var btnCancel = document.getElementById('modal-btn-cancel');
      var backdrop = document.getElementById('modal-backdrop');
      if (!modal || !sureActions || !btnSure || !btnCancel) return;

      function showSureModal() {
        progressWrap.hidden = true;
        if (countdownText) countdownText.hidden = true;
        sureActions.hidden = false;
        modalTitle.textContent = 'Are you sure?';
        modal.hidden = false;
      }

      function closeModal() {
        modal.hidden = true;
      }

      noBtn.addEventListener('click', function (e) {
        e.preventDefault();
        showSureModal();
      });

      btnSure.addEventListener('click', function (e) {
        e.preventDefault();
        modal.hidden = true;
        setTimeout(showSureModal, 100);
      });
      btnCancel.addEventListener('click', closeModal);
      backdrop.addEventListener('click', closeModal);
    }
  }
];

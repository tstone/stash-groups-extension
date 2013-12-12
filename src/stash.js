;(function($){

  $(function(){
    var ui = new UI({
      onRecall: RW.recallGroups,
      onClear: RW.clearGroups(function(){
        ui.showOnlySavable();
      }),
      onStore: RW.storeGroups(function(){
        ui.showFullyInteractable();
      })
    });

    // Insert UI onto page
    $('.pull-request-reviewers').append(ui.$el);

    // Manually inject CSS
    var css = $('<link rel="stylesheet">').attr('href', chrome.extension.getURL('ui.css'));
    $('head').append(css);

    // Update UI based on if something is saved or not
    if (RW.hasSavedGroup()) {
      RW.recallGroups();
    } else {
      ui.showOnlySavable();
    }
  });

  var key = 'stash-group-extension-group-state-';

  /* ---[ UI ]--- */
  var UI = function(o){ this.init.call(this, o); };
  ;(function(ui){

    ui.init = function(options){
      this.$el = this._buildUi();
      this._bindEvents(options);
    };

    ui._buildUi = function(){
      return $(' \
        <div id="stash-groups-ui"> \
          <a id="sg-recall" data-does="recall" title="Load Saved Reviewers"> \
            <span class="aui-icon aui-icon-small aui-iconfont-user"></span> \
          </a> \
          <a id="sg-store" class="sg-secondary" data-does="store" title="Save Current Reviewers"> \
            <span class="aui-icon aui-icon-small aui-iconfont-configure"></span> \
          </a> \
          <a id="sg-clear" class="sg-secondary" data-does="clear" title="Clear Saved Reviewers"> \
            <span class="aui-icon aui-icon-small aui-iconfont-remove"></span> \
          </a> \
        </div>');
    };

    ui._bindEvents = function(options) {
      if (typeof options.onRecall === 'function') {
        this.$el.on('click', '[data-does="recall"]', options.onRecall);
      }
      if (typeof options.onStore === 'function') {
        this.$el.on('click', '[data-does="store"]', options.onStore);
      }
      if (typeof options.onClear === 'function') {
        this.$el.on('click', '[data-does="clear"]', options.onClear);
      }
    };

    ui.showFullyInteractable = function() {
      ui.showClearBtn();
      ui.showLoadBtn();
      $('#sg-store').removeClass('sg-primary');
    };

    ui.showOnlySavable = function() {
      ui.hideClearBtn();
      ui.hideLoadBtn();
      $('#sg-store').addClass('sg-primary');
    }

    ui.showClearBtn = function() {
      $('#sg-clear').show();
    };

    ui.showLoadBtn = function() {
      $('#sg-recall').show();
    };

    ui.hideClearBtn = function() {
      $('#sg-clear').hide();
    };

    ui.hideLoadBtn = function() {
      $('#sg-recall').hide();
    };

  }(UI.prototype));

  /* ---[ RW ]--- */
  var RW = {
    hasSavedGroup: function() {
      return !!localStorage.getItem(key+'val');
    },

    storeGroups: function(stored) {
      return function() {
        if (confirm('Save current reviewers?')) {
          var choices = $('.pull-request-reviewers .select2-choices');
          // store the outer html
          var html = $('<div />').append(choices.clone()).html();
          localStorage.setItem(key+'html', html);

          // store actual "hidden" value
          localStorage.setItem(key+'val', $('#reviewers').val());
          stored();
        }
      }
    },

    recallGroups: function() {
      var choices = $('.pull-request-reviewers .select2-choices');
      choices.replaceWith(localStorage.getItem(key+'html'));
      $('#reviewers').val(localStorage.getItem(key+'val'));
    },

    clearGroups: function(cleared) {
      return function() {
        if (confirm('Really clear saved reviewers?')) {
          localStorage.removeItem(key+'html');
          localStorage.removeItem(key+'val');
          cleared();
        }
      }
    }
  };

}(window.jQuery));

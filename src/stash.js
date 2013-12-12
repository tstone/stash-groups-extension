;(function($){

  $(function(){
    var ui = new UI({
      onRecall: RW.recallGroups,
      onStore: RW.storeGroups
    });

    // Insert UI onto page
    $('.pull-request-reviewers').append(ui.$el);

    // Manually inject CSS
    var css = $('<link rel="stylesheet">').attr('href', chrome.extension.getURL('ui.css'));
    $('head').append(css);

    // Automatically load saved group if present
    if (RW.hasSavedGroup()) {
      RW.recallGroups();
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
          <a id="sg-store" data-does="store" title="Save Current Reviewers"> \
            <span class="aui-icon aui-icon-small aui-iconfont-configure"></span> \
          </a> \
        </div>');
    };

    ui._bindEvents = function(options) {
      if (typeof options.onRecall === 'function') {
        this.$el.find('[data-does="recall"]').click(options.onRecall);
      }
      if (typeof options.onStore === 'function') {
        this.$el.find('[data-does="store"]').click(options.onStore);
      }
    };

  }(UI.prototype));

  /* ---[ RW ]--- */
  var RW = {
    hasSavedGroup: function() {
      return !!localStorage.getItem(key+'val');
    },

    storeGroups: function($el) {
      if (confirm('Save current reviewers?')) {
        var choices = $('.pull-request-reviewers .select2-choices');
        // store the outer html
        var html = $('<div />').append(choices.clone()).html();
        localStorage.setItem(key+'html', html);

        // store actual "hidden" value
        localStorage.setItem(key+'val', $('#reviewers').val());
      }
    },

    recallGroups: function($el) {
      var choices = $('.pull-request-reviewers .select2-choices');
      choices.replaceWith(localStorage.getItem(key+'html'));
      $('#reviewers').val(localStorage.getItem(key+'val'));
    }
  };

}(window.jQuery));

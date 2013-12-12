;(function($){

  $(function(){
    console.log("RUNNING");
    var ui = new UI({
      onRecall: RW.recallGroups,
      onStore: RW.storeGroups
    });

    $('.pull-request-reviewers').append(ui.$el);
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
          <a data-does="recall">Recall Group</a> \
          <a data-does="store">Store Group</a> \
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
    storeGroups: function($el) {
      var choices = $('.pull-request-reviewers .select2-choices');
      // store the outer html
      var html = $('<div />').append(choices.clone()).html();
      localStorage.setItem(key+'html', html);

      // store actual "hidden" value
      localStorage.setItem(key+'val', $('#reviewers').val());
    },

    recallGroups: function($el) {
      var choices = $('.pull-request-reviewers .select2-choices');
      choices.replaceWith(localStorage.getItem(key+'html'));
      $('#reviewers').val(localStorage.getItem(key+'val'));
    }
  };

}(window.jQuery));

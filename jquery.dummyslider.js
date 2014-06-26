(function( $ ) {
  var DummySlider = function DummySlider(node, opts) {
    var _ = this;
    _.viewport = $(node);
    _.controls = null;
    _.pager = null;
    _.buildNodes();
    _.size();
    _.calc();
    if (opts.controls) _.buildControls();
    if (opts.pager) _.buildPager();
    _.slide = 0;
    _.position();
  };
  DummySlider.prototype.buildNodes = function () {
    var _ = this;
    _.viewport.addClass("dummyslider-viewport");
    _.wrapper = _.viewport.wrap("<div></div>").parent().addClass("dummyslider-wrapper");
  };
  DummySlider.prototype.buildControls = function () {
    var _ = this;
    _.controls = $("<div>").addClass("dummyslider-controls").appendTo(_.wrapper);
    _.controls.prev = $("<div>").addClass("dummyslider-prev").appendTo(_.controls);
    _.controls.next = $("<div>").addClass("dummyslider-next").appendTo(_.controls);
    _.controls.prev.click(function () {
      _.prev();
    });
    _.controls.next.click(function () {
      _.next();
    });
  };
  DummySlider.prototype.buildPager = function () {
    var _ = this;
    var listener = function () {
      _.currentSlide = $(this).data("slide");
      _.positionSlides();
    };
    _.pager = $("<ul>").addClass("dummyslider-pager").appendTo(_.wrapper);
    var i, l = _.pos.length;
    for (i = 0; i < l; i++) {
      $("<li>").attr("data-slide", i).appendTo(_.pager).click(listener);
    }
  };
  DummySlider.prototype.size = function () {
    var _ = this;
    var height = 0;
    _.viewport.children().each(function () {
      var h = this.offsetHeight;
      if (h > height) {
        height = h;
      }
    });
    _.viewport.height(height);
  };
  DummySlider.prototype.calc = function () {
    var _ = this;
    var children = _.viewport.children();
    var w = 0, width = _.viewport.width();
    var f, t, wt;
    var i, j, l = children.length;
    _.pos = [];
    for (i = 0; i < l; i++) {
      _.pos.push(w);
      wt = $(children[i]).outerWidth() + parseInt($(children[i]).css("marginRight"), 10);
      for (j = i + 1; j < l; j++) {
        t = $(children[j]).outerWidth() + parseInt($(children[j]).css("marginLeft"), 10);
        if (wt + t> width) {
          i = j - 1;
          break;
        }
        wt += t;
      }
      w += wt;
    }
  };
  DummySlider.prototype.position = function () {
    var viewport = this.viewport;
    var pos = -this.pos[this.slide];
    viewport.removeClass("dummyslider-transition");
    viewport.children().each(function () {
      $(this).css("left", pos + "px");
      pos += $(this).outerWidth() + parseInt($(this).css("marginRight"), 10);
    });
    viewport.addClass("dummyslider-transition");
  };
  DummySlider.prototype.prev = function () {
    if (this.slide === 0) return;
    this.slide--;
    this.position();
  };
  DummySlider.prototype.next = function () {
    if (this.slide + 1 === this.pos.length ) return;
    this.slide++;
    this.position();
  };

  $.fn.dummyslider = function(options) {
    var opts = $.extend({}, $.fn.dummyslider.defaults, options);

    return this.map(function() {
      var slider = this.dummyslider;
      if (slider === undefined) {
        slider = this.dummyslider = new DummySlider(this, opts);
      }
      return slider;
    });
  };
  $.fn.dummyslider.defaults = {
    controls: true,
    pager: true,
    loop: false
  };
}(jQuery));

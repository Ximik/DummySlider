(function( $ ) {
  var DummySlider = function DummySlider(node, opts) {
    this.viewport = node;
    this.controls = null;
    this.pager = null;
    this.currentSlide = 0;
    this.buildNodes();
    if (opts.controls) this.buildControls();
    if (opts.pager) this.buildPager();
    this.position();
  };
  DummySlider.prototype.buildNodes = function () {
    var _ = this;
    _.viewport.addClass("dummyslider-viewport");
    _.wrapper = _.viewport.wrap("<div class='dummyslider-wrapper'></div>").parent();
    _.slides =  _.viewport.children();
    _.slides.each(function (i) {
      $(this).addClass("dummyslider-slide").attr("data-index", i);
    });
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
      _.currentSlide = $(this).data("index");
      _.positionSlides();
    };
    _.pager = $("<ul>").addClass("dummyslider-pager").appendTo(_.wrapper);
    var i, l = _.slides.length;
    for (i = 0; i < l; i++) {
      $("<li>").attr("data-index", i).appendTo(_.pager).click(listener);
    }
  };
  DummySlider.prototype.positionSlides = function () {
    var left = 0;
    var slides = this.slides;
    var i, l = this.currentSlide;
    for (i = 0; i < l; i++) {
      left -= $(slides[i]).outerWidth(true);
    }
    l = slides.length;
    for (i = 0; i < l; i++) {
      $(slides[i]).css("left", left + "px");
      left += $(slides[i]).outerWidth(true);
    }
    if (this.pager !== null) {
      this.pager.find("li.current").removeClass("current");
      this.pager.find("li[data-index=" + this.currentSlide + "]").addClass("current");
    }
  };
  DummySlider.prototype.position = function () {
    this.viewport.removeClass("dummyslider-transition");
    var height = 0;
    this.slides.each(function () {
      var h = this.offsetHeight;
      if (h > height) {
        height = h;
      }
    });
    this.viewport.height(height);
    this.positionSlides();
    this.viewport.addClass("dummyslider-transition");
  };
  DummySlider.prototype.prev = function () {
    if (this.currentSlide === 0) return;
    this.currentSlide--;
    this.positionSlides();
  };
  DummySlider.prototype.next = function () {
    if (this.currentSlide + 1 === this.slides.length ) return;
    this.currentSlide++;
    this.positionSlides();
  };
  
  $.fn.dummyslider = function(options) {
    var opts = $.extend({}, $.fn.dummyslider.defaults, options);

    return this.map(function() {
      var node = $(this);
      var slider = $(this).data("dummyslider");
      if (slider === undefined) {
        slider = new DummySlider(node, opts);
        $(this).data(slider);
      }
      return slider;
    });
  };
  $.fn.dummyslider.defaults = {
    controls: true,
    pager: true
  };
}(jQuery)); 

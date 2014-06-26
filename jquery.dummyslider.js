(function( $ ) {
  var DummySlider = function DummySlider(node, opts) {
    var _ = this;
    _.opts = opts;
    _.viewport = $(node);
    _.controls = null;
    _.pager = null;
    _.buildNodes();
    _.size();
    _.calc();
    if (opts.controls) _.buildControls();
    if (opts.pager) _.buildPager();
    _.slide = 0;
    _.position(true);
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
      _.slide = $(this).data("slide");
      _.position();
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
    var pos = _.pos = [];
    var children = _.viewport.children();
    var w = 0, width = _.viewport.width();
    var f, t, wt;
    var i, j, br = 0, l = children.length;
    switch (_.opts.align) {
      case "left":
        for (i = 0; i < l; i++) {
          pos.push(w);
          wt = $(children[i]).outerWidth() + parseInt($(children[i]).css("marginRight"), 10);
          for (j = i + 1; j < l; j++) {
            t = $(children[j]).outerWidth() + parseInt($(children[j]).css("marginLeft"), 10);
            if (wt + t > width) {
              i = j - 1;
              br++;
              break;
            }
            wt += t;
          }
          w += wt;
        }
        if (br + 1 === pos.length) {
          pos[pos.length - 1] += t - width;
        } else {
          pos.pop();
        }
        break;
      case "center":
      case "middle":
        for (i = 0; i < l; i++) {
          wt = $(children[i]).outerWidth(true);
          w += (width - wt) / 2;
          pos.push(w);
        }
        break;
    }
    console.log(pos);
  };
  DummySlider.prototype.position = function (quiet) {
    quiet = quiet === undefined ? false : true;
    var viewport = this.viewport;
    var pos = -this.pos[this.slide];
    if (quiet) {
      viewport.removeClass("dummyslider-transition");
    }
    viewport.children().each(function () {
      $(this).css("left", pos + "px");
      pos += $(this).outerWidth() + parseInt($(this).css("marginRight"), 10);
    });
    if (quiet) {
      viewport.addClass("dummyslider-transition");
    }
    if (this.pager !== null) {
      this.pager.find(".current").removeClass("current");
      this.pager.find("[data-slide=" + this.slide + "]").addClass("current");
    }
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
    align: "left",
    valign: "middle",
    loop: false
  };
}(jQuery));

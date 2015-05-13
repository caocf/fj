(function(c) {
	var e = c(".Play");
	var g = e.find(".scroll"), b = e.find(".left"), j = e.find(".right");
	var a = function(l) {
		g.find("a.ht" + l).show();
		g.find("a:not(.ht" + l + ")").hide()
	};
	b.click(function() {
		var l = e.find(".house:visible").first();
		l.fadeTo("slow").before(g.find(".house:visible:gt(-5)"));
		g.css({
			left : "",
			right : l.outerWidth() * 4 + 60
		});
		g.animate({
			right : 0
		}, "normal")
	});
	j.click(function() {
		var l = e.find(".house:visible").first();
		g.animate({
			left : -l.outerWidth() * 4 - 60
		}, "normal", function() {
			g.fadeTo("slow").find(".house:visible:lt(4)").insertAfter(
					c(".scroll .house:visible:last()"));
			g.css({
				left : 0,
				right : ""
			})
		})
	});
	c(window).resize(function() {
		var m = e.outerWidth(), l = e.parents().width();
		if (l < m) {
			e.css("left", (l - m) / 2);
			b.css("left", (m - l) / 2);
			j.css("right", (m - l) / 2)
		} else {
			e.css("left", 0);
			b.css("left", 0);
			j.css("right", 0)
		}
	});
	function f(v, l, o, r, x) {
		if (v.tm) {
			clearTimeout(v.tm)
		}
		var n = c(l).height();
		var w = c(l).position().top;
		var q = c(o).first().css("margin-top");
		var m = c(o).css("font-size");
		var u = c(r).css("font-size");
		if (/^([\-\d+]).*$/.test(q)) {
			q = parseInt(q.replace(/^(\d+).*$/, "$1"))
		} else {
			q = 0
		}
		if (/^([\-\d+]).*$/.test(m)) {
			m = parseInt(m.replace(/^(\d+).*$/, "$1"))
		} else {
			m = 0
		}
		if (/^([\-\d+]).*$/.test(u)) {
			u = parseInt(u.replace(/^(\d+).*$/, "$1"))
		} else {
			u = 0
		}
		if (x > 0) {
			h = 200;
			t = 0;
			mt = 60;
			iFz = 22;
			bFz = 36;
			x += parseInt((129 - n) * 0.2);
			if (n < h) {
				n = n + x;
				if (n > h) {
					n = h
				}
			} else {
				n = h
			}
			if (w > t) {
				w = w - x;
				if (w < t) {
					w = t
				}
			} else {
				w = t
			}
			if (q < mt) {
				q += parseInt(x * 30 / 71);
				if (q > mt) {
					q = mt
				}
			} else {
				q = mt
			}
			if (m < iFz) {
				m = m + 3
			} else {
				m = iFz
			}
			if (u < bFz) {
				u = u + 5
			} else {
				u = bFz
			}
			c(l).css({
				height : n,
				top : w
			});
			c(o).first().css("margin-top", q);
			c(o).css("font-size", m);
			c(r).css("font-size", u);
			if (n != h || w != t || q != mt || m != iFz || u != bFz) {
				v.tm = setTimeout(function() {
					f(v, l, o, r, x)
				}, 30)
			}
		} else {
			h = 58;
			t = 142;
			mt = 0;
			iFz = bFz = 16;
			x = x + parseInt((109 - n) * 0.2);
			if (n > h) {
				n = n + x;
				if (n < h) {
					n = h
				}
			} else {
				n = h
			}
			if (w < t) {
				w = w - x;
				if (w > t) {
					w = t
				}
			} else {
				w = t
			}
			if (q > mt) {
				q += parseInt(x * 30 / 71);
				if (q < mt) {
					q = mt
				}
			} else {
				q = mt
			}
			if (m > iFz) {
				m = m - 6
			} else {
				m = iFz
			}
			if (u > bFz) {
				u = u - 5
			} else {
				u = bFz
			}
			c(l).css({
				height : n,
				top : w
			});
			c(o).first().css("margin-top", q);
			c(o).css("font-size", m);
			c(r).css("font-size", u);
			if (n != h || w != t || q != mt || m != iFz || u != bFz) {
				v.tm = setTimeout(function() {
					f(v, l, o, r, x)
				}, 30)
			}
		}
	}
	var d = function() {
		var o = c(".word .scroll");
		var w = o.html();
		o.html(w + w);
		var p = null;
		var l = c(".word .scroll>div");
		var r = l.eq(0).width();
		var v = l.length;
		var u = r * v;
		o.width(u);
		var x = -2;
		var q = r / 2;
		function n() {
			var m = o.css("left");
			m = cutN(m);
			if (m == -u / 2) {
				m = 0;
				i = r;
				o.css("left", m + "px")
			}
			var s = m - r;
			o.animate({
				left : s
			}, "normal", function() {
				setTimeout(n, 4000)
			})
		}
		n()
	};
	var k = function() {
		var n = c(".word .scroll div");
		var l = c(".word .scroll>div:visible").index(".word .scroll>div");
		var m = c(".word .scroll div").length;
		n.eq(l).animate({
			opacity : "0"
		}, 1000, function() {
			c(this).hide()
		});
		if (l == m - 1) {
			l = 0
		} else {
			l++
		}
		n.eq(l).css({
			opacity : 0,
			display : "block"
		});
		n.eq(l).animate({
			opacity : 1
		}, 1000, function() {
			setTimeout(k, 4000)
		})
	};
	c(document).ready(
			function() {
				c(window).resize();
				var l = c("#Nav").attr("cityId");
				videoId = (l == "" ? "" : swfUrls[l]);
				if (videoId == "") {
					c(".video").hide()
				} else {
					c(".video").show();
					c(".video a").click(PopVideo)
				}
				k();
				c(".ST li").click(
						function() {
							c(this).addClass("act").siblings().removeClass(
									"act");
							c(".STC").eq(c(this).index()).addClass("act")
									.siblings().removeClass("act");
							var m = c(this).attr("ht");
							a(m)
						});
				c(".ST li.act").click();
				c(".Hint i").click(function() {
					c(".Hint").remove()
				})
			})
})(jQuery);
var swfUrls = {
	"2" : "XODY1MjE3NDky",
	"12438" : "XODY1MjIwMzc2"
};
var videoId, player;
function PopVideo() {
	if ($(".PopVideo").length == 0 || typeof (player) == undefined) {
		var b = '<div id="youkuplayer" style="width:640px;height:500px"></div>';
		b = $(
				'<div class="Pop PopVideo" style="width:640px;height:500px;overflow:visible">')
				.appendTo("body").html(
						b + '<i class="iconfont closed">&#xe617;</i>');
		b.show();
		b.css({
			top : ($(window).height() - b.height()) / 3,
			left : ($(window).width() - b.width()) / 2
		});
		player = new YKU.Player("youkuplayer", {
			styleid : "0",
			client_id : VideoClientId,
			vid : videoId,
			autoplay : true,
			show_related : false,
			events : {
				onPlayEnd : function() {
					$(".Pop .closed").click()
				}
			}
		});
		$(".Pop .closed").click(function() {
			$(this).parents(".Pop").remove();
			if ($(".Pop:visible").length == 0) {
				$(".Mask").remove()
			}
		})
	} else {
		$(".PopVideo").show();
		player.playVideo()
	}
	var a = $(".Mask");
	if (a.length == 0) {
		a = $('<div class="Mask">').appendTo("body")
	}
	a.show().height($(document).height())
};

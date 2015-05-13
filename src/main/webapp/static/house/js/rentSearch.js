(function(f) {
	var j = f("#rentSearch");
	if (j.length == 0) {
		return
	}
	var l = f("#Province");
	var c = f("#listFilter");
	var a = f("#Order dd i");
	var m = f("#Map").length;
	var d = window.Search = {
		searchName : j.find("[name=searchName],[name=kw]"),
		provinceId : Num(j.attr("provinceId") || l.attr("provinceid")),
		list : (j.attr("provincePy") || l.attr("provincepy")) + "/",
		grade : j.find("[name=grade]"),
		subLineId : j.find("[name=subLineId]"),
		areaId : j.find("[name=areaId]"),
		startPrice : j.find("[name=startPrice]"),
		endPrice : j.find("[name=endPrice]"),
		PriceId : j.find("[name=Price_Id]"),
		roomNums : j.find("[name=roomNums]"),
	};
	d.kw = Val(d.searchName);
	function h() {
		if (d.startPrice.attr("txt") == "") {
			d.startPrice.val("")
		} else {
			d.startPrice.val(d.startPrice.attr("txt"));
			d.PriceId.val(-1)
		}
		if (d.endPrice.attr("txt") == "") {
			d.endPrice.val("")
		} else {
			d.endPrice.val(d.endPrice.attr("txt"));
			d.PriceId.val(-1)
		}
	}
	var b = function(o) {
		var n = Url + "chuzu/" + d.list;
		if (typeof o == "string") {
			d.kw = o;
			o = 1
		}
		if (o == 1) {
			d.kw = Val(d.searchName);
			searchHistory(d.kw, Num(d.provinceId), 2);
			if (d.kw != "") {
				n += "?kw=" + encodeURIComponent(d.kw)
			}
			var p = k();
			if (p != "") {
				n += (n.indexOf("?") > -1 ? "&" : "?") + p
			}
			location = n;
			return false
		} else {
			if (o == 2) {
				d.searchName.val("");
				d.kw = ""
			} else {
				if (o == 3) {
					d.searchName.val(d.kw)
				}
			}
		}
		if (o != 1 && o != 5) {
			h()
		}
		if (o != 1 && o != 4) {
			if (d.kw == "") {
				if (d.grade.val() > 0) {
					n += "g" + d.grade.val()
				}
				if ((d.grade.val() == 1 || d.grade.val() == 2)
						&& d.areaId.val() > 0) {
					n += "id" + d.areaId.val()
				}
				if ((d.grade.val() == 4 || d.grade.val() == 5)
						&& d.subLineId.val() > 0) {
					n += "id" + d.subLineId.val()
				}
			}
			if (Num(a.siblings(".act").attr("o")) > 0) {
				n += "o" + Num(a.siblings(".act").attr("o"))
			}
			if (d.PriceId.val() != -1) {
				n += "ip" + d.PriceId.val()
			}
			if (d.roomNums.val() != -1) {
				n += "rn" + d.roomNums.val()
			}
			n += "p1/";
			if (d.kw != "") {
				n += "?kw=" + encodeURIComponent(d.kw)
			}
			if (d.PriceId.val() == -1 && isNum(d.startPrice.val())) {
				n += (n.indexOf("?") > -1 ? "&" : "?") + "sp="
						+ d.startPrice.val()
			}
			if (d.PriceId.val() == -1 && isNum(d.endPrice.val())) {
				n += (n.indexOf("?") > -1 ? "&" : "?") + "ep="
						+ d.endPrice.val()
			}
			var p = k();
			if (p != "") {
				n += (n.indexOf("?") > -1 ? "&" : "?") + p
			}
			location = n
		}
		if (o == 4) {
			n = Url + "chuzu/map/";
			if (d.provinceId) {
				n += (n.indexOf("?") > -1 ? "&" : "?") + "p=" + d.provinceId
			}
			if (d.kw == "") {
				if (d.grade.val() > 0) {
					n += (n.indexOf("?") > -1 ? "&" : "?") + "g="
							+ d.grade.val()
				}
				if ((d.grade.val() == 1 || d.grade.val() == 2)
						&& d.areaId.val() > 0) {
					n += (n.indexOf("?") > -1 ? "&" : "?") + "id="
							+ d.areaId.val()
				}
				if ((d.grade.val() == 4 || d.grade.val() == 5)
						&& d.subLineId.val() > 0) {
					n += (n.indexOf("?") > -1 ? "&" : "?") + "id="
							+ d.subLineId.val()
				}
			}
			if (Num(a.siblings(".act").attr("o")) > 0) {
				n += (n.indexOf("?") > -1 ? "&" : "?") + "o="
						+ Num(a.siblings(".act").attr("o"))
			}
			if (d.PriceId.val() != -1) {
				n += (n.indexOf("?") > -1 ? "&" : "?") + "ip="
						+ d.PriceId.val()
			}
			if (d.roomNums.val() != -1) {
				n += (n.indexOf("?") > -1 ? "&" : "?") + "rn="
						+ d.roomNums.val()
			}
			if (d.kw != "") {
				n += (n.indexOf("?") > -1 ? "&" : "?") + "kw="
						+ encodeURIComponent(d.kw)
			}
			if (d.PriceId.val() == -1 && isNum(d.startPrice.val())) {
				n += (n.indexOf("?") > -1 ? "&" : "?") + "sp="
						+ d.startPrice.val()
			}
			if (d.PriceId.val() == -1 && isNum(d.endPrice.val())) {
				n += (n.indexOf("?") > -1 ? "&" : "?") + "ep="
						+ d.endPrice.val()
			}
			d.queryType = (d.queryType == null) ? 0 : d.queryType;
			n += (n.indexOf("?") > -1 ? "&" : "?") + "t=" + d.queryType;
			return n
		}
	};
	var e = f("#Line");
	if (e.length) {
		e.hi = e.find("[name=subLineId]");
		e.h4 = e.find("h4");
		e.h4.attr("txt", e.h4.html());
		e.dn = f('<div class="Dn"></div>').prependTo(e);
		f.ajax({
			url : Url + "getCitySubwayLines.action",
			cache : true,
			data : {
				provinceId : d.provinceId
			},
			success : function(r) {
				if (r.status == 1) {
					var q = '<p class="arrow"></p><ol>';
					var n = r.data;
					for (var o = 0; o < n.length; o++) {
						if (e.hi.val() == n[o].id) {
							e.h4.addClass("set").html(
									'<i class="iconfont">&#xe60c;</i>'
											+ n[o].name);
							d.subLineId.val(n[o].id)
						}
						var t = n[o].subList;
						q += '<li id="' + n[o].id;
						q += '">';
						if (t && t.length) {
							q += '<div style="width:'
									+ (Math.ceil(t.length / n.length) * 120)
									+ 'px"><p>';
							for (var p = 0; p < t.length; p++) {
								if (e.hi.val() == t[p].id) {
									e.h4.addClass("set").html(
											'<i class="iconfont">&#xe60c;</i>'
													+ t[p].name);
									d.subLineId.val(t[p].id)
								}
								if (p % n.length == 0 && p != 0) {
									q += "</p><p>"
								}
								q += "<i";
								if (p == 0) {
									q += ' class="first"'
								} else {
									if (p == t.length - 1) {
										q += ' class="last"'
									}
								}
								q += ' id="' + t[p].id;
								q += '">' + t[p].name + "</i>"
							}
							q += "</p></div>"
						}
						q += "<b>" + n[o].name + "</b></li>"
					}
					q += "</ol>";
					e.dn.html(q);
					e.dn.find("li").bind(
							{
								mouseover : function() {
									if (this.tim) {
										clearTimeout(this.tim)
									}
									var s = f(this);
									e.dn.find("div:visible").hide();
									e.dn.find("b").removeClass("over");
									s.find("b").addClass("over");
									s.find("div").show().height(
											e.dn.find("ol").outerHeight() - 15)
								},
								click : function(w) {
									w.stopPropagation();
									var v = f(this);
									var s = v.find(">b").html(), u = Num(v
											.attr("id"));
									g.h4.removeClass("set").html(
											g.h4.attr("txt"));
									d.subLineId.val(u);
									d.grade.val(4);
									e.h4.addClass("set").html(
											'<i class="iconfont">&#xe60c;</i>'
													+ s);
									e.dn.hide();
									d.queryType = 4;
									d.fm = s;
									b(2)
								}
							});
					e.bind({
						mouseover : function() {
							if (this.tim) {
								clearTimeout(this.tim)
							}
							e.h4.addClass("act");
							e.dn.show()
						},
						mouseout : function(s) {
							this.tim = setTimeout(function() {
								e.h4.removeClass("act");
								e.dn.find("b").removeClass("over");
								e.dn.find("li>div").hide();
								e.dn.hide()
							}, 100)
						}
					});
					e.dn.find("i")
							.click(
									function(w) {
										w.stopPropagation();
										var v = f(this);
										var u = v.parents("li");
										var s = v.text();
										g.h4.removeClass("set").html(
												g.h4.attr("txt"));
										d.subLineId.val(v.attr("id"));
										d.grade.val(5);
										d.queryType = 4;
										d.fm = v.html();
										e.h4.addClass("set").html(
												'<i class="iconfont">&#xe60c;</i>'
														+ s);
										e.dn.hide();
										b(2)
									});
					e.dn.find("li>b").mouseout(function(s) {
						s.preventDefault()
					});
					e.dn.find("li>div").click(function(s) {
						s.stopPropagation()
					})
				}
			}
		});
		e.h4.click(function() {
			if (f(this).hasClass("set")) {
				e.dn.hide();
				d.grade.val(0);
				b(2)
			}
		})
	}
	var g = f("#Area");
	if (g.length) {
		g.hi = g.find("[name=areaId]");
		g.h4 = g.find("h4");
		g.h4.attr("txt", g.h4.html());
		g.dn = f('<div class="Dn"></div>').prependTo(g);
		f
				.ajax({
					url : Url + "getCityAreas2.action",
					cache : true,
					data : {
						provinceId : d.provinceId
					},
					success : function(n) {
						if (n.length) {
							var r = '<p class="arrow"></p><ol>';
							for (var p = 0; p < n.length; p++) {
								if (g.hi.val() == n[p].id) {
									g.h4.addClass("set").html(
											'<i class="iconfont">&#xe605;</i>'
													+ n[p].name)
								}
								var v = n[p].subList;
								r += '<li id="' + n[p].id;
								r += '">';
								if (v && v.length) {
									r += "<div>";
									for (var q = 0; q < v.length; q++) {
										r += "<p><span>" + v[q].letter
												+ ":</span>";
										var u = v[q].towns;
										for (var o = 0; o < u.length; o++) {
											if (g.hi.val() == u[o].id) {
												g.h4.addClass("set").html(
														'<i class="iconfont">&#xe605;</i>'
																+ u[o].name)
											}
											r += '<i id="' + u[o].id + '">'
													+ u[o].name + "</i>"
										}
										r += "</p>"
									}
									r += "</div>"
								}
								r += "<b>" + n[p].name + "</b></li>"
							}
							r += "</ol>";
							g.dn.html(r);
							g.dn
									.find("li")
									.bind(
											{
												mouseover : function() {
													if (this.tim) {
														clearTimeout(this.tim)
													}
													var s = f(this);
													g.dn.find("div:visible")
															.hide();
													g.dn.find("b").removeClass(
															"over");
													s.find("b")
															.addClass("over");
													s.find("div").show();
													if (s.find("div").height() < g.dn
															.find("ol")
															.outerHeight() - 2) {
														s
																.find("div")
																.height(
																		g.dn
																				.find(
																						"ol")
																				.outerHeight() - 15)
													}
												},
												click : function(w) {
													w.stopPropagation();
													var t = f(this);
													var s = t.find("b").html();
													d.grade.val(1);
													d.areaId.val(Num(t
															.attr("id")));
													e.h4
															.removeClass("set")
															.html(
																	e.h4
																			.attr("txt"));
													d.queryType = 5;
													d.fm = s;
													g.h4.addClass("set").html(
															'<i class="iconfont">&#xe605;</i>'
																	+ s);
													g.dn.hide();
													b(2)
												}
											});
							g.bind({
								mouseover : function() {
									if (this.tim) {
										clearTimeout(this.tim)
									}
									g.h4.addClass("act");
									g.dn.show()
								},
								mouseout : function(s) {
									this.tim = setTimeout(function() {
										g.h4.removeClass("act");
										g.dn.find("b").removeClass("over");
										g.dn.find("li>div").hide();
										g.dn.hide()
									}, 100)
								}
							});
							g.dn.find("i").click(
									function(w) {
										w.stopPropagation();
										var t = f(this);
										var s = t.text();
										e.h4.removeClass("set").html(
												e.h4.attr("txt"));
										d.grade.val(2);
										d.areaId.val(Num(t.attr("id")));
										d.queryType = 5;
										d.fm = t.html();
										g.h4.addClass("set").html(
												'<i class="iconfont">&#xe605;</i>'
														+ s);
										g.dn.hide();
										b(2)
									});
							g.dn.find("li>b").mouseout(function(s) {
								s.preventDefault()
							});
							g.dn.find("li>div").click(function(s) {
								s.stopPropagation()
							})
						}
					}
				});
		g.h4.click(function() {
			if (f(this).hasClass("set")) {
				g.dn.hide();
				d.grade.val(0);
				b(2)
			}
		})
	}
	var i = j.find(".Sb");
	i.click(function() {
	   //	f(this).attr("href", b(4))
	});
	a.click(function() {
		var n = this;
		var p = Num(n.getAttribute("o"));
		f(this).addClass("act").siblings().removeClass("act");
		b(3)
	});
	f("#listNav button:submit").click(function(n) {
		if (d.searchName.val() == "") {
			return false
		}
		d.queryType = 1;
		searchHistory(Val(d.searchName), Num(d.provinceId), 2);
		n.preventDefault();
		b(1)
	});
	c.find("#pSel a").click(function(n) {
		f(this).addClass("act").siblings().removeClass("act");
		d.endPrice.val("");
		d.startPrice.val("");
		d.PriceId.val(f(this).attr("txt"));
		b(5)
	});
	c.find("#pSel button").click(
			function(n) {
				if ((!isNum(d.startPrice.val()) && !isNum(d.endPrice.val()))
						|| (isNum(d.startPrice.val())
								&& isNum(d.endPrice.val()) && d.startPrice
								.val()
								- d.endPrice.val() > 0)) {
					d.startPrice.val("");
					d.endPrice.val("");
					return false
				} else {
					d.PriceId.val(-1);
					b(5);
					return false
				}
			});
	c.find("#rnSel a").click(function(n) {
		f(this).addClass("act").siblings().removeClass("act");
		d.roomNums.val(f(this).attr("txt"));
		b(5)
	});
	f(document).ready(
			function() {
				f("#listNav input").focus(function(r) {
					f(this).siblings("button").addClass("act")
				});
				f("#listNav input").blur(function(r) {
					f(this).siblings("button").removeClass("act")
				});
				f("#listFilter input").focus(function(r) {
					f(this).siblings("button").show()
				});
				f("#listFilter input").blur(
						function(r) {
							if (f(this).val() != "" && !isNum(f(this).val())) {
								f(this).val("");
								f("#listFilter button").hide();
								return false
							}
							if (isNum(f(this).val())
									|| isNum(f(this).siblings("input").val())) {
								f(this).siblings("button").show();
								if (isNum(d.startPrice.val())
										&& isNum(d.endPrice.val())
										&& d.startPrice.val()
												- d.endPrice.val() > 0) {
									f(this).siblings("input").val("");
									f("#listFilter button").hide();
									return false
								}
							} else {
								f("#listFilter button").hide()
							}
						});
				var n = f(".List").attr("searchName");
				if (n != "") {
					var p = new RegExp(n, "g"), o = new RegExp(n);
					var q = '<span class="highLightWord">' + n + "</span>";
					f(".highLight").each(function() {
						f(this).html(f(this).html().replace(o, q))
					})
				}
			});
	var k = function() {
		var o = ((d.fm != null && d.fm != "") ? "fm="
				+ encodeURIComponent(d.fm) + "&" : "");
		var n = (d.queryType > 0 ? "t=" + d.queryType : "");
		var p = (o + n);
		d.queryType = 0;
		d.fm = "";
		return p
	}
})(jQuery);

(function(f) {
	var k = f("#sellSearch");
	if (k.length == 0) {
		return
	}
	var n = f("#Province");
	var c = f("#listFilter");
	var a = f("#Order dd i");
	var o = f("#Map").length;
	var d = window.Search = {
		searchName : k.find("[name=searchName],[name=kw]"),
		provinceId : Num(k.attr("provinceId") || n.attr("provinceid")),
		list : (k.attr("provincePy") || n.attr("provincepy")) + "/",
		grade : k.find("[name=grade]"),
		subLineId : k.find("[name=subLineId]"),
		areaId : k.find("[name=areaId]"),
		startPrice : k.find("[name=startPrice]"),
		endPrice : k.find("[name=endPrice]"),
		startArea : k.find("[name=startArea]"),
		endArea : k.find("[name=endArea]"),
		roomNum : k.find("[name=roomNum]"),
		feature : k.find("[name=feature]"),
		PriceId : k.find("[name=Price_Id]"),
		Area_Id : k.find("[name=Area_Id]"),
		roomNums : k.find("[name=roomNums]"),
		features : k.find("[name=features]")
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
	function l() {
		if (d.startArea.attr("txt") == "") {
			d.startArea.val("")
		} else {
			d.startArea.val(d.startArea.attr("txt"));
			d.Area_Id.val(-1)
		}
		if (d.endArea.attr("txt") == "") {
			d.endArea.val("")
		} else {
			d.endArea.val(d.endArea.attr("txt"));
			d.Area_Id.val(-1)
		}
	}
	var b = function(q) {
		var p = Url + "sale/" + d.list;
		if (typeof q == "string") {
			d.kw = q;
			q = 1
		}
		if (q == 1) {
			d.kw = Val(d.searchName);
			searchHistory(d.kw, Num(d.provinceId), 2);
			if (d.kw != "") {
				p += "?kw=" + encodeURIComponent(d.kw)
			}
			var r = m();
			if (r != "") {
				p += (p.indexOf("?") > -1 ? "&" : "?") + r
			}
			location = p;
			return false
		} else {
			if (q == 2) {
				d.searchName.val("");
				d.kw = ""
			} else {
				if (q == 3) {
					d.searchName.val(d.kw)
				}
			}
		}
		if (q != 1 && q != 5) {
			h();
			l()
		}
		if (q != 1 && q != 4) {
			if (d.kw == "") {
				if (d.grade.val() > 0) {
					p += "g" + d.grade.val()
				}
				if ((d.grade.val() == 1 || d.grade.val() == 2)
						&& d.areaId.val() > 0) {
					p += "id" + d.areaId.val()
				}
				if ((d.grade.val() == 4 || d.grade.val() == 5)
						&& d.subLineId.val() > 0) {
					p += "id" + d.subLineId.val()
				}
			}
			if (Num(a.siblings(".act").attr("o")) > 0) {
				p += "o" + Num(a.siblings(".act").attr("o"))
			}
			if (d.PriceId.val() != -1) {
				p += "ip" + d.PriceId.val()
			}
			if (d.Area_Id.val() != -1) {
				p += "ia" + d.Area_Id.val()
			}
			if (d.roomNums.val() != -1) {
				p += "rn" + d.roomNums.val()
			}
			if (d.features.val() != -1) {
				p += "fe" + d.features.val()
			}
			p += "p1/";
			if (d.kw != "") {
				p += "?kw=" + encodeURIComponent(d.kw)
			}
			if (d.PriceId.val() == -1 && isNum(d.startPrice.val())) {
				p += (p.indexOf("?") > -1 ? "&" : "?") + "sp="
						+ d.startPrice.val()
			}
			if (d.PriceId.val() == -1 && isNum(d.endPrice.val())) {
				p += (p.indexOf("?") > -1 ? "&" : "?") + "ep="
						+ d.endPrice.val()
			}
			if (d.Area_Id.val() == -1 && isNum(d.startArea.val())) {
				p += (p.indexOf("?") > -1 ? "&" : "?") + "sa="
						+ d.startArea.val()
			}
			if (d.Area_Id.val() == -1 && isNum(d.endArea.val())) {
				p += (p.indexOf("?") > -1 ? "&" : "?") + "ea="
						+ d.endArea.val()
			}
			var r = m();
			if (r != "") {
				p += (p.indexOf("?") > -1 ? "&" : "?") + r
			}
			location = p
		}
		if (q == 4) {
			p = Url + "sale/map/";
			if (d.provinceId) {
				p += (p.indexOf("?") > -1 ? "&" : "?") + "p=" + d.provinceId
			}
			if (d.kw == "") {
				if (d.grade.val() > 0) {
					p += (p.indexOf("?") > -1 ? "&" : "?") + "g="
							+ d.grade.val()
				}
				if ((d.grade.val() == 1 || d.grade.val() == 2)
						&& d.areaId.val() > 0) {
					p += (p.indexOf("?") > -1 ? "&" : "?") + "id="
							+ d.areaId.val()
				}
				if ((d.grade.val() == 4 || d.grade.val() == 5)
						&& d.subLineId.val() > 0) {
					p += (p.indexOf("?") > -1 ? "&" : "?") + "id="
							+ d.subLineId.val()
				}
			}
			if (Num(a.siblings(".act").attr("o")) > 0) {
				p += (p.indexOf("?") > -1 ? "&" : "?") + "o="
						+ Num(a.siblings(".act").attr("o"))
			}
			if (d.PriceId.val() != -1) {
				p += (p.indexOf("?") > -1 ? "&" : "?") + "ip="
						+ d.PriceId.val()
			}
			if (d.Area_Id.val() != -1) {
				p += (p.indexOf("?") > -1 ? "&" : "?") + "ia="
						+ d.Area_Id.val()
			}
			if (d.roomNums.val() != -1) {
				p += (p.indexOf("?") > -1 ? "&" : "?") + "rn="
						+ d.roomNums.val()
			}
			if (d.features.val() != -1) {
				p += (p.indexOf("?") > -1 ? "&" : "?") + "fe="
						+ d.features.val()
			}
			if (d.kw != "") {
				p += (p.indexOf("?") > -1 ? "&" : "?") + "kw="
						+ encodeURIComponent(d.kw)
			}
			d.queryType = (d.queryType == null) ? 0 : d.queryType;
			p += (p.indexOf("?") > -1 ? "&" : "?") + "t=" + d.queryType;
			return p
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
			success : function(u) {
				if (u.status == 1) {
					var t = '<p class="arrow"></p><ol>';
					var p = u.data;
					for (var q = 0; q < p.length; q++) {
						if (e.hi.val() == p[q].id) {
							e.h4.addClass("set").html(
									'<i class="iconfont">&#xe60c;</i>'
											+ p[q].name);
							d.subLineId.val(p[q].id)
						}
						var v = p[q].subList;
						t += '<li id="' + p[q].id;
						t += '">';
						if (v && v.length) {
							t += '<div style="width:'
									+ (Math.ceil(v.length / p.length) * 120)
									+ 'px"><p>';
							for (var r = 0; r < v.length; r++) {
								if (e.hi.val() == v[r].id) {
									e.h4.addClass("set").html(
											'<i class="iconfont">&#xe60c;</i>'
													+ v[r].name);
									d.subLineId.val(v[r].id)
								}
								if (r % p.length == 0 && r != 0) {
									t += "</p><p>"
								}
								t += "<i";
								if (r == 0) {
									t += ' class="first"'
								} else {
									if (r == v.length - 1) {
										t += ' class="last"'
									}
								}
								t += ' id="' + v[r].id;
								t += '">' + v[r].name + "</i>"
							}
							t += "</p></div>"
						}
						t += "<b>" + p[q].name + "</b></li>"
					}
					t += "</ol>";
					e.dn.html(t);
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
								click : function(y) {
									y.stopPropagation();
									var x = f(this);
									var s = x.find(">b").html(), w = Num(x
											.attr("id"));
									g.h4.removeClass("set").html(
											g.h4.attr("txt"));
									d.subLineId.val(w);
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
									function(y) {
										y.stopPropagation();
										var x = f(this);
										var w = x.parents("li");
										var s = x.text();
										g.h4.removeClass("set").html(
												g.h4.attr("txt"));
										d.subLineId.val(x.attr("id"));
										d.grade.val(5);
										d.queryType = 4;
										d.fm = x.html();
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
					success : function(p) {
						if (p.length) {
							var v = '<p class="arrow"></p><ol>';
							for (var r = 0; r < p.length; r++) {
								if (g.hi.val() == p[r].id) {
									g.h4.addClass("set").html(
											'<i class="iconfont">&#xe605;</i>'
													+ p[r].name)
								}
								var x = p[r].subList;
								v += '<li id="' + p[r].id;
								v += '">';
								if (x && x.length) {
									v += "<div>";
									for (var u = 0; u < x.length; u++) {
										v += "<p><span>" + x[u].letter
												+ ":</span>";
										var w = x[u].towns;
										for (var q = 0; q < w.length; q++) {
											if (g.hi.val() == w[q].id) {
												g.h4.addClass("set").html(
														'<i class="iconfont">&#xe605;</i>'
																+ w[q].name)
											}
											v += '<i id="' + w[q].id + '">'
													+ w[q].name + "</i>"
										}
										v += "</p>"
									}
									v += "</div>"
								}
								v += "<b>" + p[r].name + "</b></li>"
							}
							v += "</ol>";
							g.dn.html(v);
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
												click : function(y) {
													y.stopPropagation();
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
									function(y) {
										y.stopPropagation();
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
	var j = k.find(".Sb");
	j.click(function() {
		f(this).attr("href", b(4))
	});
	a.click(function() {
		var p = this;
		var q = Num(p.getAttribute("o"));
		f(this).addClass("act").siblings().removeClass("act");
		b(3)
	});
	f("#listNav button:submit").click(function(p) {
		if (d.searchName.val() == "") {
			return false
		}
		d.queryType = 1;
		searchHistory(Val(d.searchName), Num(d.provinceId), 2);
		p.preventDefault();
		b(1)
	});
	c.find("#pSel a,#aSel a").click(function(p) {
		f(this).addClass("act").siblings().removeClass("act");
		if (f(this).parent().attr("id") == "pSel") {
			d.endPrice.val("");
			d.startPrice.val("");
			l();
			d.PriceId.val(f(this).attr("txt"))
		} else {
			d.startArea.val("");
			d.endArea.val("");
			h();
			d.Area_Id.val(f(this).attr("txt"))
		}
		b(5)
	});
	c.find("#pSel button").click(
			function(p) {
				if ((!isNum(d.startPrice.val()) && !isNum(d.endPrice.val()))
						|| (isNum(d.startPrice.val())
								&& isNum(d.endPrice.val()) && d.startPrice
								.val()
								- d.endPrice.val() > 0)) {
					d.startPrice.val("");
					d.endPrice.val("");
					return false
				} else {
					l();
					d.PriceId.val(-1);
					b(5);
					return false
				}
			});
	c
			.find("#aSel button")
			.click(
					function(p) {
						if ((!isNum(d.startArea.val()) && !isNum(d.endArea
								.val()))
								|| (isNum(d.startArea.val())
										&& isNum(d.endArea.val()) && d.startArea
										.val()
										- d.endArea.val() > 0)) {
							d.startArea.val("");
							d.endArea.val("");
							return false
						} else {
							h();
							d.Area_Id.val(-1);
							b(5);
							return false
						}
					});
	c.find("#rnSel label,#feSel label").click(
			function(r) {
				if (f(this).is(".chked")) {
					f(this).removeClass("chked").find(":checkbox.chklist")
							.prop("checked", false)
				} else {
					f(this).addClass("chked").find(":checkbox.chklist").prop(
							"checked", true)
				}
				f(this).find(":checkbox.chklist").click(function(s) {
					s.stopPropagation();
					return false
				});
				var q = -1;
				var p = f(this).parent().find(".chked");
				if (p.length > 0) {
					q = p.eq(0).find(":checkbox.chklist").val();
					if (p.length > 1) {
						for (i = 1; i < p.length; i++) {
							q += "," + p.eq(i).find(":checkbox.chklist").val()
						}
					}
				}
				if (f(this).parent().attr("id") == "rnSel") {
					d.roomNums.val(q)
				} else {
					d.features.val(q)
				}
				h();
				l();
				b(3)
			});
	f(document).ready(
			function() {
				f("#listNav input").focus(function(t) {
					f(this).siblings("button").addClass("act")
				});
				f("#listNav input").blur(function(t) {
					f(this).siblings("button").removeClass("act")
				});
				f("#listFilter input").focus(function(t) {
					f(this).siblings("button").show()
				});
				f("#listFilter input").blur(
						function(t) {
							if (f(this).val() != "" && !isNum(f(this).val())) {
								f(this).val("");
								f("#listFilter button").hide();
								return false
							}
							if (isNum(f(this).val())
									|| isNum(f(this).siblings("input").val())) {
								f(this).siblings("button").show();
								if (f(this).parent().attr("id") == "pSel") {
									if (isNum(d.startPrice.val())
											&& isNum(d.endPrice.val())
											&& d.startPrice.val()
													- d.endPrice.val() > 0) {
										f(this).siblings("input").val("");
										f("#listFilter button").hide();
										return false
									}
								} else {
									if (isNum(d.startArea.val())
											&& isNum(d.endArea.val())
											&& d.startArea.val()
													- d.endArea.val() > 0) {
										f(this).siblings("input").val("");
										f("#listFilter button").hide();
										return false
									}
								}
							} else {
								f("#listFilter button").hide()
							}
						});
				var p = f(".List").attr("searchName");
				if (p != "") {
					var r = new RegExp(p, "g"), q = new RegExp(p);
					var s = '<span class="highLightWord">' + p + "</span>";
					f(".highLight").each(function() {
						f(this).html(f(this).html().replace(q, s))
					})
				}
			});
	var m = function() {
		var q = ((d.fm != null && d.fm != "") ? "fm="
				+ encodeURIComponent(d.fm) + "&" : "");
		var p = (d.queryType > 0 ? "t=" + d.queryType : "");
		var r = (q + p);
		d.queryType = 0;
		d.fm = "";
		return r
	}
})(jQuery);

$(document)
		.ready(
				function() {
					var k = $("#sellMap");
					var i = $("#sellList");
					var d;
					i.h3 = i.find(">h3");
					i.div = i.find(">div");
					i.tab = $("#Tab");
					i.tab.click(function() {
						var L = $(this);
						if (L.hasClass("h")) {
							L.removeClass("h");
							i.css("top", "");
							i.h3.show();
							i.div.show();
							o()
						} else {
							L.addClass("h");
							i.css("top", 101);
							i.h3.hide();
							i.div.hide();
							o(1)
						}
					});
					$(document).keydown(function(L) {
						if (L.keyCode == 9) {
							i.tab.click();
							return false
						}
					});
					var u = function() {
						var M = $(window).height() - k.offset().top;
						k.height(M);
						var L = M - 179 - 40;
						i.div.height("");
						if (i.div.height() > L) {
							i.div.height(L)
						}
					};
					u();
					$(window).resize(u);
					var B = function(N) {
						var L = m.area.dn.find('[id="' + N + '"]');
						if (L.length <= 0) {
							return
						}
						if (m.g < 4) {
							L.click()
						} else {
							var M = 15;
							M = L[0].tagName == "I" ? M = 17 : 15;
							e(M, L.attr("lon"), L.attr("lat"))
						}
					};
					var m = $("#sellSearch");
					m.g = Num(Gs("g"));
					m.id = Gs("id");
					m.subId = null;
					m.data = {
						provinceId : m.attr("provinceId"),
						ht : m.attr("ht")
					};
					m.city = m.attr("provinceName");
					var E = true;
					m.kw = m.find("[name=kw]");
					m.kw.txt = Gs("kw");
					if (Ks(m.kw.txt)) {
						m.kw.val(m.kw.txt)
					}
					m.submit(function(N) {
						N.preventDefault();
						m.g = 0;
						m.kw.txt = Ks(m.kw.val());
						m.line.h4.removeClass("set").html(m.line.txt);
						m.area.h4.removeClass("set").html(m.area.txt);
						if (!E) {
							m.reset()
						}
						var M = {
							provinceId : m.attr("provinceId"),
							ht : m.attr("ht"),
							level : 13,
							t : m.attr("t")
						}, O = 17, L = 3;
						if (m.kw.txt) {
							M.kw = m.kw.txt
						}
						m.attr("t", 0);
						$.ajax({
							url : Url + "mapSearch.action",
							data : M,
							cache : false,
							success : function(P) {
								f = false;
								if (m.kw.txt) {
									if (P.data.areaId > 0) {
										delete M.kw;
										delete m.kkw;
										t = P.data.areaId;
										H(t, 17, 3);
										e(O, P.data.lon, P.data.lat)
									} else {
										if (P.data.drawline.id > 0) {
											delete m.kkw;
											B(P.data.drawline.id)
										} else {
											m.kkw = M.kw;
											h();
											q();
											if (E) {
												l.centerAndZoom(m.city);
												o()
											}
											return
										}
									}
								} else {
									l.centerAndZoom(new BMap.Point(P.data.lon,
											P.data.lat), 12);
									o();
									j(P.data);
									g()
								}
							},
							complete : function() {
								E = false
							}
						})
					});
					m.line = $("#Line");
					m.line.h4 = m.line.find(">h4");
					m.line.txt = m.line.h4.html();
					m.line.icon = m.line.txt.replace(/(<.*>.*<\/.*>).*/, "$1");
					m.line.dn = $('<div class="Dn"></div>').prependTo(m.line);
					$
							.ajax({
								url : Url + "getCitySubwayLines.action",
								cache : true,
								data : m.data,
								success : function(P) {
									var O = '<p class="arrow"></p><ol>';
									var L = P.data;
									for (var M = 0; M < L.length; M++) {
										if (m.g == 4 && m.id == L[M].id) {
											m.name = L[M].name;
											m.line.h4
													.addClass("set")
													.html(
															m.line.icon
																	+ "&nbsp;"
																	+ Cut(
																			L[M].name,
																			10));
											m.area.h4.html(m.area.icon);
											w()
										}
										O += '<li id="' + L[M].id + '">';
										var Q = L[M].subList;
										if (Q && Q.length) {
											O += '<div style="width:'
													+ (Math.ceil(Q.length
															/ L.length) * 120)
													+ 'px"><p>';
											for (var N = 0; N < Q.length; N++) {
												if (m.g == 5 && m.id == Q[N].id) {
													m.id = L[M].id;
													m.name = L[M].name;
													m.lon = Q[N].lon;
													m.lat = Q[N].lat;
													m.line.h4
															.addClass("set")
															.html(
																	m.line.icon
																			+ "&nbsp;"
																			+ Cut(
																					Q[N].name,
																					10));
													m.area.h4.html(m.area.icon);
													t = null;
													w()
												}
												if (N != 0 && N % L.length == 0) {
													O += "</p><p>"
												}
												O += "<i";
												if (N == 0) {
													O += ' class="first"'
												} else {
													if (N == Q.length - 1) {
														O += ' class="last"'
													}
												}
												O += ' id="' + Q[N].id
														+ '" lon="' + Q[N].lon
														+ '" lat="' + Q[N].lat
														+ '">' + Q[N].name
														+ "</i>"
											}
											O += "</p></div>"
										}
										O += "<b>" + L[M].name + "</b></li>"
									}
									O += "</ol>";
									m.line.dn.html(O);
									m.line.dn
											.find("li")
											.bind(
													{
														mouseover : function() {
															if (this.tim) {
																clearTimeout(this.tim)
															}
															var R = $(this);
															m.line.dn
																	.find(
																			"div:visible")
																	.hide();
															m.line.dn
																	.find("b")
																	.removeClass(
																			"over");
															R
																	.find("b")
																	.addClass(
																			"over");
															R
																	.find("div")
																	.show()
																	.height(
																			m.line.dn
																					.find(
																							"ol")
																					.outerHeight() - 15)
														},
														click : function(S) {
															S.stopPropagation();
															var R = $(this);
															f = false;
															m.g = 4;
															t = null;
															d = m.id = R
																	.attr("id");
															m.name = R
																	.find("b")
																	.html();
															m.lon = 0;
															m.lat = 0;
															m.kw.txt = "";
															m.kw.val("");
															delete m.kkw;
															m.line.h4
																	.addClass(
																			"set")
																	.html(
																			m.line.icon
																					+ "&nbsp;"
																					+ Cut(
																							m.name,
																							10));
															m.line.dn.hide();
															m.area.h4
																	.removeClass(
																			"set")
																	.html(
																			m.area.icon);
															t = null;
															m.attr("t", 4);
															m.attr("fm", R
																	.find("b")
																	.html());
															w()
														}
													});
									m.line
											.bind({
												mouseover : function() {
													if (this.tim) {
														clearTimeout(this.tim)
													}
													m.line.h4.addClass("act");
													m.line.dn.show()
												},
												mouseout : function(R) {
													this.tim = setTimeout(
															function() {
																m.line.h4
																		.removeClass("act");
																m.line.dn
																		.find(
																				"b")
																		.removeClass(
																				"over");
																m.line.dn
																		.find(
																				"li>div")
																		.hide();
																m.line.dn
																		.hide()
															}, 100)
												}
											});
									m.line.dn.find("i").click(
											function(T) {
												T.stopPropagation();
												var S = $(this);
												var R = S.parents("li");
												f = false;
												m.g = 5;
												t = null;
												d = m.subId = this.id;
												m.id = R.attr("id");
												m.name = R.find("b").html();
												m.lon = S.attr("lon");
												m.lat = S.attr("lat");
												m.kw.txt = "";
												m.kw.val("");
												delete m.kkw;
												m.line.h4.addClass("set").html(
														m.line.icon
																+ "&nbsp;"
																+ Cut(S.html(),
																		10));
												m.line.dn.hide();
												m.area.h4.removeClass("set")
														.html(m.area.icon);
												t = null;
												m.attr("t", 4);
												m.attr("fm", S.html());
												w()
											});
									m.line.dn.find("li>b").mouseout(
											function(R) {
												R.preventDefault()
											});
									m.line.dn.find("li>div").click(function(R) {
										R.stopPropagation()
									})
								}
							});
					m.line.h4.click(function() {
						if ($(this).hasClass("set")) {
							f = false;
							t = null;
							delete m.kkw;
							w()
						}
					});
					m.area = $("#Area");
					m.area.h4 = m.area.find(">h4");
					m.area.txt = m.area.h4.html();
					m.area.icon = m.area.txt.replace(/(<.*>.*<\/.*>).*/, "$1");
					m.area.dn = $('<div class="Dn"></div>').prependTo(m.area);
					$
							.ajax({
								url : Url + "getCityAreas2.action",
								cache : true,
								data : m.data,
								success : function(L) {
									var P = '<p class="arrow"></p><ol>';
									for (var N = 0; N < L.length; N++) {
										if (m.g == 1 && m.id == L[N].id) {
											m.name = L[N].name;
											m.lon = L[N].lon;
											m.lat = L[N].lat;
											m.area.h4
													.addClass("set")
													.html(
															m.area.icon
																	+ "&nbsp;"
																	+ Cut(
																			L[N].name,
																			10));
											m.line.h4.html(m.line.icon);
											H(L[N].id, 15, 2);
											e(15, m.lon, m.lat)
										}
										var R = L[N].subList;
										P += '<li id="' + L[N].id + '" lon="'
												+ L[N].lon + '" lat="'
												+ L[N].lat + '">';
										if (R && R.length) {
											P += "<div>";
											for (var O = 0; O < R.length; O++) {
												P += "<p><span>" + R[O].letter
														+ ":</span>";
												var Q = R[O].towns;
												for (var M = 0; M < Q.length; M++) {
													if (m.g == 2
															&& m.id == Q[M].id) {
														m.name = Q[M].name;
														m.lon = Q[M].lon;
														m.lat = Q[M].lat;
														m.area.h4
																.addClass("set")
																.html(
																		m.area.icon
																				+ "&nbsp;"
																				+ Cut(
																						Q[M].name,
																						10));
														m.line.h4
																.html(m.line.icon);
														H(Q[M].id, 17, 3);
														e(17, m.lon, m.lat)
													}
													P += '<i id="' + Q[M].id
															+ '" lon="'
															+ Q[M].lon
															+ '" lat="'
															+ Q[M].lat + '">'
															+ Q[M].name
															+ "</i>"
												}
												P += "</p>"
											}
											P += "</div>"
										}
										P += "<b>" + L[N].name + "</b></li>"
									}
									P += "</ol>";
									m.area.dn.html(P);
									m.area.dn
											.find("li")
											.bind(
													{
														mouseover : function() {
															if (this.tim) {
																clearTimeout(this.tim)
															}
															var S = $(this);
															m.area.dn
																	.find(
																			"div:visible")
																	.hide();
															m.area.dn
																	.find("b")
																	.removeClass(
																			"over");
															S
																	.find("b")
																	.addClass(
																			"over");
															S.find("div")
																	.show();
															if (S.find("div")
																	.height() < m.area.dn
																	.find("ol")
																	.outerHeight() - 2) {
																S
																		.find(
																				"div")
																		.height(
																				m.area.dn
																						.find(
																								"ol")
																						.outerHeight() - 15)
															}
														},
														click : function(T) {
															f = false;
															T.stopPropagation();
															var S = $(this);
															m.g = 1;
															d = m.id = S
																	.attr("id");
															m.name = S
																	.find("b")
																	.html();
															m.lon = S
																	.attr("lon");
															m.lat = S
																	.attr("lat");
															t = null;
															m.kw.txt = "";
															m.kw.val("");
															delete m.kkw;
															m.line.h4
																	.removeClass(
																			"set")
																	.html(
																			m.line.icon);
															m.area.h4
																	.addClass(
																			"set")
																	.html(
																			m.area.icon
																					+ "&nbsp;"
																					+ Cut(
																							m.name,
																							10));
															m.area.dn.hide();
															H(S.attr("id"), 15,
																	2);
															m.attr("t", 5);
															m.attr("fm", S
																	.find("b")
																	.html());
															e(15, m.lon, m.lat)
														}
													});
									m.area
											.bind({
												mouseover : function() {
													if (this.tim) {
														clearTimeout(this.tim)
													}
													m.area.h4.addClass("act");
													m.area.dn.show()
												},
												mouseout : function(S) {
													this.tim = setTimeout(
															function() {
																m.area.h4
																		.removeClass("act");
																m.area.dn
																		.find(
																				"b")
																		.removeClass(
																				"over");
																m.area.dn
																		.find(
																				"li>div")
																		.hide();
																m.area.dn
																		.hide()
															}, 100)
												}
											});
									m.area.dn.find("i").click(
											function(T) {
												T.stopPropagation();
												var S = $(this);
												f = false;
												m.g = 2;
												d = m.id = S.attr("id");
												m.name = S.html();
												m.lon = S.attr("lon");
												m.lat = S.attr("lat");
												t = null;
												m.kw.txt = "";
												m.kw.val("");
												delete m.kkw;
												m.line.h4.removeClass("set")
														.html(m.line.icon);
												m.area.h4.addClass("set").html(
														m.area.icon
																+ "&nbsp;"
																+ Cut(m.name,
																		10));
												m.area.dn.hide();
												H(S.attr("id"), 17, 3);
												m.attr("t", 5);
												m.attr("fm", S.html());
												e(17, m.lon, m.lat)
											});
									m.area.dn.find("li>b").mouseout(
											function(S) {
												S.preventDefault()
											});
									m.area.dn.find("li>div").click(function(S) {
										S.stopPropagation()
									})
								}
							});
					m.area.h4.click(function() {
						if ($(this).hasClass("set")) {
							f = false;
							delete m.kkw;
							t = null;
							if (m.g == 1) {
								H(m.id, 15, 2);
								e(15, m.lon, m.lat)
							} else {
								H(m.id, 17, 3);
								e(17, m.lon, m.lat)
							}
						}
					});
					var G = function() {
						var N = null, M = null, L = null;
						e(N, M, L)
					};
					m.ip = m.find("[name=ip]");
					m.ip.val(Gs("ip") || 0).change(function() {
						f = false;
						if (m.g == 4 || m.g == 5) {
							w(true)
						} else {
							G()
						}
					});
					m.ia = m.find("[name=ia]");
					m.ia.val(Gs("ia") || 0).change(function() {
						f = false;
						if (m.g == 4 || m.g == 5) {
							w(true)
						} else {
							G()
						}
					});
					m.multi = function(P) {
						f = false;
						var M = Gs(P);
						if (M) {
							M = M.split(",")
						} else {
							M = []
						}
						var N = this.find("[name=" + P + "]");
						var O = N.parents(".Multi");
						var L = O.find("dd");
						N.each(function(Q, R) {
							R = $(R);
							R.parent().removeClass("checked");
							R.prop("checked", false)
						});
						if (M.length) {
							N.each(function(Q, R) {
								R = $(R);
								R.parent().removeClass("checked");
								R.prop("checked", false);
								for (var S = 0; S < M.length; S++) {
									if (R.val() == M[S]) {
										R.parent().addClass("checked");
										R.prop("checked", true);
										break
									}
								}
							});
							O.addClass("seled");
							L.html(M.length).show()
						}
						O.bind({
							mouseover : function() {
								if (m.hasClass("more")) {
									return
								}
								if (this.tim) {
									clearTimeout(this.tim)
								}
								$(this).find("i.iconfont").html("&#xe629;");
								$(this).find(".Dn").show()
							},
							mouseout : function() {
								if (m.hasClass("more")) {
									return
								}
								var Q = $(this).find(".Dn");
								$(this).find("i.iconfont").html("&#xe61f;");
								this.tim = setTimeout(function() {
									Q.hide()
								}, 200)
							}
						});
						O.find("label").click(function() {
							f = false;
							var Q = [];
							var R = $(this).parent().parent();
							O.find(":checked").each(function(S, T) {
								Q.push(T.value)
							});
							if (Q.length) {
								L.html(Q.length);
								if (!m.hasClass("more")) {
									O.addClass("seled");
									L.show()
								}
							} else {
								O.removeClass("seled");
								L.html("").hide()
							}
							if (P == "rn") {
								m.rn = Q
							} else {
								if (P == "fe") {
									m.fe = Q
								}
							}
							if (m.g == 4 || m.g == 5) {
								w(true)
							} else {
								G()
							}
						});
						return M
					};
					m.rn = m.multi("rn");
					m.fe = m.multi("fe");
					var f;
					var a;
					var z = {};
					var t;
					var r = {
						hover : [],
						read : [],
						area : [],
						line : null,
						lineId : null,
						lines : [],
						subway : [],
						sites : [],
						dot : [],
						circle : null,
						remark : null
					};
					var c = function(L) {
						if (!L) {
							L = l.getZoom()
						}
						if (L <= 13) {
							return 1
						} else {
							if (L >= 16) {
								return 3
							} else {
								return 2
							}
						}
					};
					var q = function() {
						var N = l.getOverlays();
						var O = c();
						var L = (m.g == 4 || m.g == 5);
						for (var M = 0; M < N.length; M++) {
							if (!(r.line == N[M] && L) && !(N[M].line && L)
									&& !(r.circle == N[M] && O >= 3 && L)
									&& !(r.remark == N[M] && O >= 3 && L)) {
								l.removeOverlay(N[M])
							}
						}
					};
					var v = $(
							'<div class="noDaTip Dn"><b></b><i>\u5f88\u62b1\u6b49\uff0c\u5730\u56fe\u4e2d\u6ca1\u6709\u627e\u5230\u5408\u9002\u7684\u623f\u6e90\uff0c\u8bf7\u91cd\u65b0\u641c\u7d22~</i></div>')
							.appendTo($(".Pr"));
					var D = function() {
						if (f && i.tab.hasClass("h")
								&& i.div.find("dl").length == 0) {
							v.fadeIn("slow");
							setTimeout(function() {
								v.fadeOut("slow")
							}, 3000)
						} else {
							if (i.tab.hasClass("h")) {
								i.tab.click()
							}
						}
					};
					var h = function() {
						v.hide();
						i.div.html("&nbsp;");
						i.h3
								.html('<i class="noData">\u5f88\u62b1\u6b49\uff0c\u5217\u8868\u4e2d\u6ca1\u6709\u627e\u5230\u5408\u9002\u7684\u623f\u6e90\uff0c\u8bf7\u91cd\u65b0\u641c\u7d22~</i>');
						u()
					};
					var F = function(N) {
						var M = l.getOverlays();
						if (l.getZoom() < 16) {
							return
						}
						for (var L = 0; L < M.length; L++) {
							if (M[L].deft == null) {
								continue
							}
							if (M[L].areaId == N) {
								if (M[L].over != null) {
									M[L].setContent(M[L].over);
									M[L].setStyle({
										zIndex : 9
									});
									M[L].setZIndex(9);
									M[L].cked = true
								}
							} else {
								if (M[L].cked) {
									M[L].setContent(M[L].acted);
									M[L].setStyle({
										zIndex : 4
									})
								} else {
									M[L].setContent(M[L].deft);
									M[L].setStyle({
										zIndex : 4
									})
								}
							}
						}
					};
					var I = function(N, L) {
						F(N);
						var M = {
							provinceId : m.attr("provinceId"),
							ht : m.attr("ht")
						};
						t = M.areaId = N;
						L = (L == null ? $(
								"http://resource.iwjw.com/2.2/cache/js/.sortw .act")
								.attr("o")
								: L);
						if (L != null) {
							M.orderType = L
						}
						M.level = 17;
						if (Num(m.ip.val())) {
							M.ip = m.ip.val()
						}
						if (Num(m.ia.val())) {
							M.ia = m.ia.val()
						}
						if (m.rn.length) {
							M.rn = m.rn.join(",")
						}
						if (m.fe.length) {
							M.fe = m.fe.join(",")
						}
						$
								.ajax({
									url : Url + "getHouseListByEstateId.action",
									data : M,
									cache : false,
									success : function(V) {
										html = "";
										var U = V.data.rows;
										if (U.length == 0) {
											h();
											return
										}
										for (var R = 0; R < U.length; R++) {
											var Q = U[R];
											var S = (Q.sign == 1 ? '<i class="dj"></i>'
													: "");
											var T = (Q.houseVideo != null ? '<i class="videoBtn"><img src="'
													+ Cache
													+ 'cache/img/videoBtn.png"></i>'
													: "");
											var P = (Q.aboveFiveYear == 1 ? '<i class="gtFive">\u6ee1\u4e94</i>'
													: "");
											P += (Q.onlyOne == 1 ? '<i class="only">\u552f\u4e00</i>'
													: "");
											P += (Q.ifSchool == 1 ? '<i class="school">\u5b66\u533a</i>'
													: "");
											P += (Q.ifSubway == 1 ? '<i class="subway">\u5730\u94c1</i>'
													: "");
											html += '<dl class="info"><a href="'
													+ Url
													+ Q.houseDetailUrl
													+ '" target="_blank" class="all"></a><dt><a href="'
													+ Url
													+ Q.houseDetailUrl
													+ '" target="_blank" class="hPic"><img src="'
													+ Q.picUrl
													+ '">'
													+ S
													+ T
													+ '</a></dt><dd class="Fl inf"><h4><b><a class="til" href="'
													+ Url
													+ Q.houseDetailUrl
													+ '" target="_blank" title="'
													+ Q.estateName
													+ '"><i>'
													+ Q.estateName
													+ "</i></a><span class=Fr><i class=prr>"
													+ Q.price
													+ '</i> \u4e07</span></b></h4><p class="Cb">'
													+ Q.bedroomSum
													+ "\u5ba4"
													+ Q.livingRoomSum
													+ '\u5385&nbsp;&nbsp;<i class="ll">|</i>&nbsp;&nbsp;'
													+ Q.area
													+ ' m\u00b2&nbsp;&nbsp;<i class="ll">|</i>&nbsp;&nbsp;'
													+ Q.floor
													+ '</p><p class="Cb Fe">'
													+ P + "</p></dd></dl>"
										}
										i.h3
												.html("\u5171 "
														+ U.length
														+ " \u4e2a\u76f8\u5173\u623f\u6e90");
										var O = $(
												'<p class="sortw"><i o="0">\u9ed8\u8ba4</i><i o="1">\u6700\u65b0</i><i o="3">\u4ef7\u683c<i class="iconfont">&#xe63f;</i></i></p>')
												.appendTo(i.h3);
										L = L == null ? 0 : L;
										O.find('>i[o="' + L + '"]').addClass(
												"act");
										O.find(">i").click(function() {
											var W = $(this);
											if (W.hasClass("act")) {
												return
											}
											var X = Num(W.attr("o"));
											I(N, X)
										});
										i.div.html(html);
										u();
										r.read.push(N)
									}
								})
					};
					var j = function(X) {
						if (X) {
							X = X.markList
						}
						if ((!X || X.length == 0) && (m.g < 4 || a)) {
							D();
							q();
							return
						}
						if (v.is(":visible")) {
							v.hide()
						}
						var V = [];
						var U = [];
						var Q;
						var M = c();
						q();
						if (!f && i.tab.hasClass("h")) {
							i.tab.click()
						}
						r.area = [];
						var R = false;
						for (var O = 0; O < X.length; O++) {
							if (t == X[O].areaId && X[O].houseNum > 0) {
								R = true
							}
							U[O] = new BMap.Point(X[O].lon, X[O].lat);
							if (M == 1) {
								Q = p(X[O].houseNum);
								V[O] = new BMap.Label('<p class="point1">'
										+ X[O].areaName + "<br>" + Q + "</p>",
										{
											position : U[O],
											offset : new BMap.Size(-36, -36)
										});
								V[O]
										.setStyle({
											background : "url("
													+ Cache
													+ "cache/css/bg/sellmap.png) no-repeat 0 -67px",
											width : "72px",
											height : "72px"
										});
								V[O].areaId = X[O].areaId;
								V[O].lon = X[O].lon;
								V[O].lat = X[O].lat;
								V[O].addEventListener("click", function() {
									f = false;
									a = true;
									d = this.areaId;
									H(this.areaId, 15, 2);
									B(this.areaId)
								});
								V[O]
										.addEventListener(
												"mouseover",
												function() {
													this
															.setStyle({
																backgroundPosition : "0 -143px",
																zIndex : 9
															});
													for (var Z = r.hover.length - 1; Z >= 0; Z--) {
														if (this != r.hover[Z]) {
															l
																	.removeOverlay(r.hover[Z])
														}
													}
													if (this.hover == false) {
														return
													} else {
														if (this.hover) {
															l
																	.addOverlay(this.hover)
														} else {
															J(this)
														}
													}
												});
								V[O]
										.addEventListener(
												"mouseout",
												function() {
													this
															.setStyle({
																backgroundPosition : "0 -67px",
																zIndex : 4
															});
													for (var Z = r.hover.length - 1; Z >= 0; Z--) {
														l
																.removeOverlay(r.hover[Z])
													}
												});
								V[O].setZIndex(4)
							} else {
								if (M == 2) {
									Q = p(X[O].houseNum);
									var N = '<div class="point2"><p class="num">'
											+ Q
											+ '</p><i class="name">'
											+ X[O].areaName + "</i></div>";
									var T = '<div class="point2 over"><p class="num">'
											+ Q
											+ '</p><i class="name">'
											+ X[O].areaName + "</i></div>";
									V[O] = new BMap.Label(N, {
										position : U[O]
									});
									V[O].deft = N;
									V[O].over = T;
									V[O].setStyle({
										background : ""
									});
									V[O].areaId = X[O].areaId;
									V[O].lon = X[O].lon;
									V[O].lat = X[O].lat;
									V[O].addEventListener("click", function() {
										f = false;
										a = true;
										d = this.areaId;
										H(this.areaId, 17, 3);
										B(this.areaId)
									});
									V[O]
											.addEventListener(
													"mouseover",
													function() {
														this
																.setStyle({
																	backgroundPosition : "0 -271px",
																	zIndex : 9
																});
														for (var Z = r.hover.length - 1; Z >= 0; Z--) {
															if (this != r.hover[Z]) {
																l
																		.removeOverlay(r.hover[Z])
															}
														}
														if (this.hover == false) {
															return
														} else {
															if (this.hover) {
																l
																		.addOverlay(this.hover)
															} else {
																this.hover = false;
																J(this)
															}
														}
													});
									V[O]
											.addEventListener(
													"mouseout",
													function() {
														this.setStyle({
															zIndex : 4
														});
														for (var Z = r.hover.length - 1; Z >= 0; Z--) {
															l
																	.removeOverlay(r.hover[Z])
														}
													});
									V[O].setZIndex(4)
								} else {
									if (M >= 3) {
										var W = true;
										if (!V[O]) {
											var S = K(X[O].areaId);
											Q = X[O].houseNum + "\u5957";
											var Y = X[O].unitPrice == null ? ""
													: (" " + X[O].unitPrice);
											var N = '<p class="point3"><i class="num">'
													+ Q
													+ '</i><i class="name">'
													+ X[O].areaName
													+ "<span>"
													+ Y
													+ '</span></i><i class="arrow"></i></p>';
											var T = '<p class="point3 over"><i class="num">'
													+ Q
													+ '</i><i class="name">'
													+ X[O].areaName
													+ "<span>"
													+ Y
													+ '</span></i><i class="arrow"></i></p>';
											var P = '<p class="point4"><i class="num">'
													+ Q
													+ '</i><i class="name">'
													+ X[O].areaName
													+ "<span>"
													+ Y
													+ '</span></i><i class="arrow"></i></p>';
											var L = S == true ? P : N;
											L = t == X[O].areaId ? T : L;
											V[O] = new BMap.Label(L, {
												position : U[O]
											});
											V[O].deft = N;
											V[O].over = T;
											V[O].acted = P;
											V[O].cked = S;
											V[O].setStyle({
												background : ""
											});
											V[O].areaId = X[O].areaId;
											V[O].lon = X[O].lon;
											V[O].lat = X[O].lat;
											V[O].ps = X[O].houseNum;
											V[O].ck = function(Z) {
												if (i.tab.hasClass("h")) {
													i.tab.click()
												}
												a = false;
												H(this.areaId, 17, 3);
												I(this.areaId, Z);
												return false
											};
											V[O].addEventListener("click",
													function() {
														this.ck()
													});
											V[O].addEventListener("mouseover",
													function() {
														this.setStyle({
															zIndex : 9
														})
													});
											V[O].addEventListener("mouseout",
													function() {
														if (this.areaId != t) {
															this.setStyle({
																zIndex : 4
															})
														} else {
															this.setStyle({
																zIndex : 8
															})
														}
													})
										}
										r.area[O] = V[O];
										V[O].setZIndex(4)
									}
								}
							}
							V[O].setStyle({
								border : 0
							});
							l.addOverlay(V[O])
						}
						F(t)
					};
					var b = function(L, M) {
						l.removeOverlay(r.circle);
						l.removeOverlay(r.remark);
						r.circle = new BMap.Circle(new BMap.Point(L, M), 1000,
								{
									strokeColor : "#e84a01",
									strokeWeight : 2,
									strokeOpacity : 1,
									fillColor : "#000",
									fillOpacity : 0.1,
									enableClicking : false
								});
						l.addOverlay(r.circle);
						r.remark = new BMap.Label('<p class="remark">1km</p>',
								{
									position : new BMap.Point(L,
											(parseFloat(M) + 0.0095))
								});
						r.remark.setStyle({
							border : 0,
							background : ""
						});
						l.addOverlay(r.remark)
					};
					var J = function(L) {
						$.ajax({
							url : Url + "getPathInfo.action",
							data : {
								areaId : L.areaId,
								grade : c()
							},
							cache : false,
							success : function(O) {
								var M = [];
								for (var N = 0; N < O.length; N++) {
									M.push(new BMap.Point(O[N].lon, O[N].lat))
								}
								if (M.length) {
									L.hover = new BMap.Polygon(M, {
										strokeWeight : 4,
										strokeColor : "#e84a01",
										fillColor : "#333",
										fillOpacity : 0.05,
										strokeOpacity : 0.7,
										enableClicking : false
									});
									l.addOverlay(L.hover);
									r.hover.push(L.hover)
								} else {
									L.hover = false
								}
							}
						})
					};
					var e = function(R, Q, P, M) {
						if (!R) {
							R = l.getZoom()
						}
						if (R < 10) {
							R = 10
						} else {
							if (R > 18) {
								R = 18
							}
						}
						if (R != l.getZoom()) {
							u()
						}
						if (Q && P) {
							l.centerAndZoom(new BMap.Point(Q, P), R);
							o();
							if (M) {
								b(Q, P)
							}
							setTimeout(e, 200);
							return
						}
						z = {
							provinceId : m.attr("provinceId"),
							ht : m.attr("ht")
						};
						if (R >= 13) {
							var N = l.getBounds();
							var O = N.getSouthWest();
							var L = N.getNorthEast();
							if (f
									&& z.level
									&& z.level == R
									&& Math.abs(L.lat - z.latT) <= Math
											.abs((z.latT - z.latF) * 0.2)
									&& Math.abs(L.lng - z.lngT) <= Math
											.abs((z.lngT - z.lngF) * 0.2)) {
								return
							}
							z.lngF = O.lng;
							z.lngT = L.lng;
							z.latF = O.lat;
							z.latT = L.lat
						}
						delete z.ip;
						delete z.ia;
						delete z.rn;
						delete z.fe;
						z.level = R;
						if (m.kkw && Val(m.kw)) {
							z.kw = m.kkw
						}
						if (Num(m.ip.val())) {
							z.ip = m.ip.val()
						}
						if (Num(m.ia.val())) {
							z.ia = m.ia.val()
						}
						if (m.rn.length) {
							z.rn = m.rn.join(",")
						}
						if (m.fe.length) {
							z.fe = m.fe.join(",")
						}
						if (!f && a) {
							t = null
						}
						if (t > 0) {
							z.areaId = t
						}
						$.ajax({
							url : Url + "houseMarkByLevel.action" + A(),
							data : z,
							cache : false,
							success : function(S) {
								if (!f || R < 16) {
									r.read = []
								}
								if (S.status == 1) {
									j(S.data)
								}
							}
						});
						if (m.g < 4 || a) {
							if (t > 0) {
								I(t)
							} else {
								g()
							}
						}
					};
					var w = function(P) {
						var N = P ? P : false;
						a = false;
						var M = function() {
							var Q = {
								provinceId : m.attr("provinceId"),
								ht : m.attr("ht"),
								id : m.id,
								g : 4
							};
							if (Num(m.ip.val())) {
								Q.ip = m.ip.val()
							}
							if (Num(m.ia.val())) {
								Q.ia = m.ia.val()
							}
							if (m.rn.length) {
								Q.rn = m.rn.join(",")
							}
							if (m.fe.length) {
								Q.fe = m.fe.join(",")
							}
							$
									.ajax({
										url : Url + "mapSearch.action" + A(),
										data : Q,
										cache : false,
										success : function(X) {
											var W = l.getOverlays();
											for (var U = 0; U < W.length; U++) {
												if (W[U].line) {
													l.removeOverlay(W[U])
												}
											}
											var R = X.data.markList;
											r.sites = [];
											r.dot = [];
											i.sum = 0;
											i.div.html("");
											for (var U = 0, T; U < R.length; U++) {
												T = new BMap.Point(R[U].lon,
														R[U].lat);
												r.dot[U] = new BMap.Label(
														'<p class="dot"></p>',
														{
															position : T
														});
												r.dot[U].line = true;
												r.dot[U].setStyle({
													border : 0,
													background : "",
													zIndex : 3
												});
												r.dot[U].setZIndex(3);
												l.addOverlay(r.dot[U]);
												var V = '<p class="sites"><i class="l"></i><i>'
														+ R[U].stationName
														+ '</i><i class="r">'
														+ R[U].houseNum
														+ "\u5957</i></p>";
												var S = '<p class="sites act"><i class="l"></i><i>'
														+ R[U].stationName
														+ '</i><i class="r">'
														+ R[U].houseNum
														+ "\u5957</i></p>";
												if (m.lon == R[U].lon
														&& m.lat == R[U].lat) {
													r.sites[U] = new BMap.Label(
															S, {
																position : T
															})
												} else {
													r.sites[U] = new BMap.Label(
															V, {
																position : T
															})
												}
												r.sites[U].line = true;
												r.sites[U].id = R[U].stationId;
												r.sites[U].name = R[U].stationName;
												r.sites[U].hn = R[U].houseNum;
												r.sites[U].lon = R[U].lon;
												r.sites[U].lat = R[U].lat;
												r.sites[U].def = V;
												r.sites[U].act = S;
												r.sites[U].setStyle({
													border : 0,
													background : "",
													zIndex : 5
												});
												r.sites[U].setZIndex(5);
												r.sites[U].ck = function() {
													if (m.subId != this.id) {
														t = null
													}
													f = false;
													m.g = 5;
													m.lon = this.lon;
													m.lat = this.lat;
													a = false;
													d = m.subId = this.id;
													m.name = this.name;
													m.line.h4
															.addClass("set")
															.html(
																	m.line.icon
																			+ "&nbsp;"
																			+ Cut(
																					this.name,
																					10));
													for (var Y = r.sites.length - 1; Y >= 0; Y--) {
														r.sites[Y]
																.setContent(r.sites[Y].def)
													}
													this.setContent(this.act);
													e(16, this.lon, this.lat, 1);
													if (f) {
														return
													}
													H(this.id, 16, 5);
													g()
												};
												r.sites[U].addEventListener(
														"click", function() {
															this.ck()
														});
												r.sites[U].addEventListener(
														"mouseover",
														function() {
															this.setStyle({
																zIndex : 8
															})
														});
												r.sites[U].addEventListener(
														"mouseout", function() {
															this.setStyle({
																zIndex : 5
															})
														});
												l.addOverlay(r.sites[U]);
												if (!f && m.g == 4) {
													i.sum += R[U].houseNum;
													if (R[U].houseNum > 0) {
														$(
																'<dl i="'
																		+ U
																		+ '" id="'
																		+ R[U].stationId
																		+ '" lon="'
																		+ R[U].lon
																		+ '" lat="'
																		+ R[U].lat
																		+ '"><dt>'
																		+ R[U].stationName
																		+ "</dt><dd>"
																		+ R[U].houseNum
																		+ "\u5957</dd></dl>")
																.click(
																		function() {
																			f = false;
																			m.g = 5;
																			a = false;
																			d = m.subId = this.id;
																			m.name = $(
																					this)
																					.find(
																							"dt")
																					.text();
																			m.line.h4
																					.addClass(
																							"set")
																					.html(
																							m.line.icon
																									+ "&nbsp;"
																									+ Cut(
																											m.name,
																											10));
																			t = null;
																			H(
																					this.id,
																					16,
																					5);
																			r.sites[$(
																					this)
																					.attr(
																							"i")]
																					.ck()
																		})
																.mouseover(
																		function() {
																			for (var Y = r.sites.length - 1; Y >= 0; Y--) {
																				if ($(
																						this)
																						.attr(
																								"id") == r.sites[Y].id) {
																					r.sites[Y]
																							.setContent(r.sites[Y].act);
																					r.sites[Y]
																							.setStyle({
																								zIndex : 8
																							})
																				} else {
																					r.sites[Y]
																							.setContent(r.sites[Y].def);
																					r.sites[Y]
																							.setStyle({
																								zIndex : 5
																							})
																				}
																			}
																		})
																.mouseout(
																		function() {
																			for (var Y = r.sites.length - 1; Y >= 0; Y--) {
																				r.sites[Y]
																						.setContent(r.sites[Y].def);
																				r.sites[Y]
																						.setStyle({
																							zIndex : 5
																						})
																			}
																		})
																.appendTo(i.div)
													}
												}
												if (!f && m.g == 5 && m.lon
														&& m.lat
														&& R[U].lon == m.lon
														&& R[U].lat == m.lat
														&& !N) {
													r.sites[U].ck()
												}
											}
											if (!f && m.g == 5 && N && y.id > 0) {
												if (t > 0) {
													I(t)
												} else {
													g()
												}
											}
											if (!f && m.g == 4) {
												if (i.sum == 0) {
													h()
												} else {
													i.h3
															.html("\u5171 "
																	+ i.sum
																	+ " \u4e2a\u76f8\u5173\u623f\u6e90")
												}
												u()
											}
										}
									})
						};
						var O = n();
						if (!f & !O & m.g >= 4) {
							l.centerAndZoom(m.city);
							if (r.line) {
								l.removeOverlay(r.line)
							}
							if (r.circle) {
								l.removeOverlay(r.circle)
							}
							r.subway = [];
							var L = new BMap.BusLineSearch(l, {
								renderOptions : {
									map : l
								},
								onGetBusListComplete : function(Q) {
									if (Q) {
										L.getBusLine(Q.getBusListItem(0))
									}
								}
							});
							L.disableAutoViewport();
							setTimeout(function() {
								L.getBusList(m.name)
							}, 1000);
							L.setMarkersSetCallback(function(Q) {
								for (var R = 0; R < Q.length; R++) {
									l.removeOverlay(Q[R])
								}
							});
							L.setPolylinesSetCallback(function(R) {
								for (var Q = 0; Q < R.getPath().length; Q++) {
									r.subway[Q] = new BMap.Point(
											R.getPath()[Q]["lng"],
											R.getPath()[Q]["lat"])
								}
								r.line = new BMap.Polyline(r.subway, {
									strokeColor : "#e84a01",
									strokeWeight : 6,
									strokeOpacity : 1
								});
								r.lines.push({
									lineId : m.id,
									line : r.line,
									subway : r.subway
								});
								l.addOverlay(r.line);
								M();
								if (m.g == 4) {
									l.setViewport(r.subway);
									o();
									setTimeout(e, 200)
								}
							})
						} else {
							if (m.g == 4 && !N) {
								l.setViewport(r.subway);
								o();
								l.removeOverlay(r.circle)
							}
							M();
							setTimeout(e, 200)
						}
					};
					m.reset = function() {
						m.ip.val(0);
						m.ia.val(0);
						m.rn = [];
						m.fe = [];
						m.find(".Multi label").removeClass("checked").find(
								"[type=checkbox]").prop("checked", false);
						m.find(".Multi dd").html("").hide();
						m.find(".Multi.seled").removeClass("seled");
						t = null
					};
					$("#more").click(function() {
						var L = $(this);
						var M = $("#Filter");
						if (L.html() == "\u66f4\u591a") {
							L.html("\u6536\u8d77");
							m.addClass("more");
							M.find(".Dn").show();
							M.find("dd").hide();
							M.find("i.iconfont").hide();
							s.parents(".Multi").removeClass("seled");
							M.find("select").each(function(N, O) {
								$(O).find("option:eq(0)").text("\u4e0d\u9650")
							})
						} else {
							L.html("\u66f4\u591a");
							m.removeClass("more");
							M.find(".Dn").hide();
							M.find("i.iconfont").show();
							M.find("dd").each(function(N, O) {
								var O = $(O);
								if (O.html()) {
									O.parents(".Multi").addClass("seled");
									O.show()
								}
							});
							M.find("select").each(function(N, O) {
								var O = $(O);
								O.find("option:eq(0)").text(O.prev().text())
							})
						}
					});
					$("#sellSwitch").click(function() {
						var L = $(this).attr("hr");
						if (m.kw.val() == "") {
							L += m.g != "" ? "g" + m.g : "";
							if (m.g == 5 && m.subId) {
								L += m.subId > 0 ? "id" + m.subId : ""
							} else {
								L += m.id > 0 ? "id" + m.id : ""
							}
						}
						L += m.ip.val() > 0 ? "ip" + m.ip.val() : "";
						L += m.ia.val() > 0 ? "ia" + m.ia.val() : "";
						L += m.rn.length > 0 ? "rn" + m.rn.join(",") : "";
						L += m.fe.length > 0 ? "fe" + m.fe.join(",") : "";
						L += L.charAt(L.length - 1) == "/" ? "" : "/";
						if (m.kw.val() != "") {
							L += "?kw=" + encodeURIComponent(m.kw.val())
						}
						$(this).attr("href", L)
					});
					$(".searchForm button:submit").click(function(L) {
						m.attr("t", 1);
						if (m.kw.val() == "") {
							L.preventDefault();
							return false
						}
					});
					var l = new BMap.Map("sellMap", {
						enableMapClick : false
					});
					l.setMinZoom(9);
					l.enableScrollWheelZoom();
					l.disableDoubleClickZoom();
					l.disableInertialDragging();
					l.addControl(new BMap.ScaleControl({
						anchor : BMAP_ANCHOR_BOTTOM_RIGHT,
						offset : new BMap.Size(20, 20)
					}));
					l.addEventListener("zoomstart", function() {
						f = true
					});
					l.addEventListener("zoomend", function() {
						if (f) {
							setTimeout(e, 200)
						}
					});
					l.addEventListener("dragend", function() {
						f = true;
						setTimeout(e, 200)
					});
					if (m.g == 0) {
						m.submit()
					} else {
						E = false
					}
					$("#bzoom").click(function() {
						var L = l.getZoom();
						l.setZoom(L + 1)
					});
					$("#szoom").click(function() {
						var L = l.getZoom();
						l.setZoom(L - 1)
					});
					var y = {
						provinceId : m.attr("provinceId"),
						ht : m.attr("ht"),
						lv : 13,
						g : m.g,
						id : null
					};
					var H = function(N, M, L) {
						y.id = N;
						y.lv = M;
						y.g = L
					};
					var g = function() {
						if (f) {
							return
						}
						if (m.g >= 4 && !a) {
							z = {
								l : y.id,
								ht : m.attr("ht"),
								provinceId : m.attr("provinceId")
							}
						} else {
							z = {
								provinceId : y.provinceId,
								ht : y.ht,
								areaId : y.id,
								g : y.g
							}
						}
						if (Num(m.ip.val())) {
							z.ip = m.ip.val()
						}
						if (Num(m.ia.val())) {
							z.ia = m.ia.val()
						}
						if (m.rn.length) {
							z.rn = m.rn.join(",")
						}
						if (m.fe.length) {
							z.fe = m.fe.join(",")
						}
						if (y.g >= 4 && !a) {
							$
									.ajax({
										url : Url + "getStationHouseNum.action",
										data : z,
										cache : false,
										success : function(O) {
											i.sum = 0;
											i.div.html("");
											var L = O.data.markList;
											for (var N = 0; N < L.length; N++) {
												i.sum += L[N].houseNum;
												var M = L[N].unitPrice == "" ? ""
														: (" " + L[N].unitPrice + "/\u5e73");
												$(
														'<dl id="'
																+ L[N].areaId
																+ '" lon="'
																+ L[N].lon
																+ '" lat="'
																+ L[N].lat
																+ '"><dt>'
																+ L[N].areaName
																+ "<i>"
																+ M
																+ "</i></dt><dd>"
																+ L[N].houseNum
																+ "\u5957</dd></dl>")
														.click(
																function() {
																	I($(this)
																			.attr(
																					"id"));
																	e(
																			17,
																			$(
																					this)
																					.attr(
																							"lon"),
																			$(
																					this)
																					.attr(
																							"lat"))
																})
														.mouseover(
																function() {
																	for (var P = 0; P < r.area.length; P++) {
																		if (r.area[P].areaId == $(
																				this)
																				.attr(
																						"id")) {
																			r.area[P]
																					.setContent(r.area[P].over);
																			r.area[P]
																					.setStyle({
																						zIndex : 9
																					});
																			break
																		}
																	}
																})
														.mouseout(
																function() {
																	for (var P = 0; P < r.area.length; P++) {
																		if (r.area[P].areaId == $(
																				this)
																				.attr(
																						"id")) {
																			r.area[P]
																					.setContent(r.area[P].deft);
																			r.area[P]
																					.setStyle({
																						zIndex : 4
																					});
																			break
																		}
																	}
																}).appendTo(
																i.div);
												if (i.sum > 0) {
													i.h3
															.html("\u5171 "
																	+ i.sum
																	+ " \u4e2a\u76f8\u5173\u623f\u6e90")
												}
											}
											if (!f && m.g == 5 && i.sum == 0) {
												h()
											}
											u()
										}
									})
						} else {
							$.ajax({
								url : Url + "getMapListByAreaId.action",
								data : z,
								cache : false,
								success : function(L) {
									if (L.status == 1) {
										x(L.data)
									}
								}
							})
						}
					};
					function x(L) {
						if (L) {
							L = L.markList
						}
						if (!L || L.length == 0) {
							h();
							q();
							return
						}
						if (v.is(":visible")) {
							v.hide()
						}
						var O;
						var P = c(y.lv);
						if ((!f && (m.g < 4)) || (!f && a)) {
							i.sum = 0;
							i.div.html("");
							i.div.dl = []
						}
						if (!f && i.tab.hasClass("h")) {
							i.tab.click()
						}
						for (var N = 0; N < L.length; N++) {
							if (P == 1) {
								if ((!f && m.g < 4) || (!f && a)) {
									O = p(L[N].houseNum);
									i.sum += L[N].houseNum;
									$(
											'<dl id="' + L[N].areaId
													+ '" lon="' + L[N].lon
													+ '" lat="' + L[N].lat
													+ '"><dt>' + L[N].areaName
													+ "</dt><dd>" + O
													+ "</dd></dl>")
											.click(function() {
												var Q = $(this);
												f = false;
												needShowList = true;
												d = Q.attr("id");
												H(Q.attr("id"), 15, 2);
												B(Q.attr("id"))
											})
											.mouseover(
													function() {
														if (l.getZoom() >= 14) {
															return
														}
														var S = $(this).attr(
																"id");
														var R = C(S);
														if (R == null) {
															return
														}
														R
																.setStyle({
																	backgroundPosition : "0 -143px"
																});
														for (var Q = r.hover.length - 1; Q >= 0; Q--) {
															if (R != r.hover[Q]) {
																l
																		.removeOverlay(r.hover[Q])
															}
														}
														if (R.hover == false) {
															return
														} else {
															if (R.hover) {
																l
																		.addOverlay(R.hover)
															} else {
																if (c() == P) {
																	J(R)
																}
															}
														}
													})
											.mouseout(
													function() {
														if (l.getZoom() >= 14) {
															return
														}
														var S = $(this).attr(
																"id");
														var R = C(S);
														if (R == null) {
															return
														}
														R
																.setStyle({
																	backgroundPosition : "0 -67px"
																});
														for (var Q = r.hover.length - 1; Q >= 0; Q--) {
															l
																	.removeOverlay(r.hover[Q])
														}
													}).appendTo(i.div)
								}
							} else {
								if (P == 2) {
									if ((!f && m.g < 4) || (!f && a)) {
										O = p(L[N].houseNum);
										i.sum += L[N].houseNum;
										$(
												'<dl i="' + N + '" id="'
														+ L[N].areaId
														+ '" lon="' + L[N].lon
														+ '" lat="' + L[N].lat
														+ '"><dt>'
														+ L[N].areaName
														+ "</dt><dd>" + O
														+ "</dd></dl>")
												.click(function() {
													var Q = $(this);
													f = false;
													d = Q.attr("id");
													m.lon = Q.attr("lon");
													m.lat = Q.attr("lat");
													H(Q.attr("id"), 17, 3);
													B(Q.attr("id"))
												})
												.mouseover(
														function() {
															if (l.getZoom() < 14
																	|| l
																			.getZoom() >= 16) {
																return
															}
															var S = $(this)
																	.attr("id");
															var R = C(S);
															if (R == null) {
																return
															}
															R
																	.setContent(R.over);
															for (var Q = r.hover.length - 1; Q >= 0; Q--) {
																if (R != r.hover[Q]) {
																	l
																			.removeOverlay(r.hover[Q])
																}
															}
															if (R.hover == false) {
																return
															} else {
																if (R.hover) {
																	l
																			.addOverlay(R.hover)
																} else {
																	if (c() == P) {
																		J(R)
																	}
																}
															}
														})
												.mouseout(
														function() {
															if (l.getZoom() < 14
																	|| l
																			.getZoom() >= 16) {
																return
															}
															var S = $(this)
																	.attr("id");
															var R = C(S);
															if (R == null) {
																return
															}
															R
																	.setContent(R.deft);
															for (var Q = r.hover.length - 1; Q >= 0; Q--) {
																l
																		.removeOverlay(r.hover[Q])
															}
														}).appendTo(i.div)
									}
								} else {
									if (P >= 3) {
										if ((!f && m.g < 4) || (!f && a)) {
											O = p(L[N].houseNum);
											i.sum += L[N].houseNum;
											var M = L[N].unitPrice == null ? ""
													: (" " + L[N].unitPrice + "/\u5e73");
											$(
													'<dl i="' + N + '" id="'
															+ L[N].areaId
															+ '" ps="'
															+ L[N].houseNum
															+ '" lon="'
															+ L[N].lon
															+ '" lat="'
															+ L[N].lat
															+ '"><dt>'
															+ L[N].areaName
															+ "<i>" + M
															+ "</i></dt><dd>"
															+ O + "</dd></dl>")
													.click(
															function() {
																var Q = $(this);
																f = false;
																a = false;
																H(Q.attr("id"),
																		17, 3);
																e(
																		17,
																		Q
																				.attr("lon"),
																		Q
																				.attr("lat"));
																I(Q.attr("id"))
															})
													.mouseover(
															function() {
																var R = $(this)
																		.attr(
																				"id");
																var Q = C(R);
																if (Q == null) {
																	return
																}
																Q.setStyle({
																	zIndex : 9
																});
																Q
																		.setContent(Q.over)
															})
													.mouseout(
															function() {
																var R = $(this)
																		.attr(
																				"id");
																var Q = C(R);
																if (Q == null) {
																	return
																}
																if (Q.areaId != t) {
																	Q
																			.setStyle({
																				zIndex : 4
																			})
																} else {
																	Q
																			.setStyle({
																				zIndex : 8
																			})
																}
																Q
																		.setContent(Q.deft)
															}).appendTo(i.div)
										}
									}
								}
							}
						}
						u();
						if (!f && m.g < 4 || !f && a) {
							if (t > 0 && !hasAreaIdPP || i.sum == 0) {
								h()
							} else {
								i.h3.html("\u5171 " + i.sum
										+ " \u4e2a\u76f8\u5173\u623f\u6e90")
							}
						}
					}
					var C = function(N) {
						var M = l.getOverlays();
						for (var L = 0; L < M.length; L++) {
							if (M[L].areaId == N) {
								return M[L]
							}
						}
						return null
					};
					var p = function(L) {
						if (L > 9999) {
							html = Math.round(L / 1000) / 10 + "\u4e07\u5957"
						} else {
							html = L + "\u5957"
						}
						return html
					};
					var K = function(M) {
						for (var L = r.read.length - 1; L >= 0; L--) {
							if (r.read[L] == M) {
								return true
							}
						}
						return false
					};
					var o = function(L) {
						if (L) {
							l.panBy(-198, 0, {
								noAnimation : true
							})
						} else {
							l.panBy(198, 0, {
								noAnimation : true
							})
						}
					};
					var A = function() {
						var M = ((m.attr("fm") != null && m.attr("fm") != "") ? "fm="
								+ encodeURIComponent(m.attr("fm")) + "&"
								: "");
						var L = (m.attr("t") > 0 ? "t=" + m.attr("t") : "");
						var N = (M + L == "") ? "" : ("?" + M + L);
						m.attr("t", 0);
						m.attr("fm", "");
						return N
					};
					var n = function() {
						var M = false;
						for (var L = 0; L < r.lines.length; L++) {
							if (r.lines[L].lineId == m.id) {
								if (r.line) {
									l.removeOverlay(r.line)
								}
								r.line = r.lines[L].line;
								r.subway = r.lines[L].subway;
								M = true;
								l.addOverlay(r.line);
								break
							}
						}
						return M
					}
				});

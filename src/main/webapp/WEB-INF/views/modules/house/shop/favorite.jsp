<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<title>收藏夹-房界</title>
<meta name="keywords" content="房界">
<meta name="description" content="房界">
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<link rel="stylesheet" href="${st}/css/House.css">
<script src="${st}/js/house.js"></script>
</head>
<body>
<!-- 头部 -->
<jsp:include page="/WEB-INF/views/include/top.jsp"></jsp:include>
<div class="Rw">
	<div id="favoritesList">
	<!--<h3>收藏夹<a href="http://www.iwjw.com/deleteFailHouses.action" title="" class="btnClear Dn">清除失效房源</a></h3>-->
	<table class="HouseTab">
		<tr>
			<th class="Tl" style="font-size:20px;">收藏夹</th>
			<th class="Tr" colspan="5"><button id="delNoRent" class="Sb btnClear" disabled>清除失效房源</button></th>
		</tr>
		<c:forEach var="si" items="${favorites}"> 
				<tr id="iKKOuuAjkEo" ht="1">
					<td class="imgtd tdF"><a
						href="${stx }/detail?id=${si.house.id}" target="_blank"
						class="hPic Fl"> <!-- 独家 -->
							<i class="dj"></i> <img
							src="${si.house.mainImage}">
					</a>
						<div class="Fl inf">
							<h4>
								<b> <a href="${stx }/detail?id=${si.house.id}"
									target="_blank" title="${si.house.name}"> <i>${si.house.name}</i> <!--<i>310号</i>-->
								</a>
								</b>
							</h4>
							<p class="Cb">
								<i class="iconfont">&#xe60b;</i>${si.house.area.name} - ${si.house.smallArea.name}
							</p>
							<p class="Cb">
								<i class="iconfont">&#xe60c;</i>15号线
							</p>
							<p class="Cb Few">今日发布</p>
						</div></td>
					<td>${fns:dl(si.house.housetype,"house_type") }<i class="ll"></i></td>
					<td>${si.house.areanum}m²<i class="ll"></i></td>
					<td>${si.house.floor}<i class="ll"></i></td>
					<td>
						<p class="Tr">
							<b><i class="housePrice">${si.house.rentprice}</i> 元/月</b>
						</p>
					</td>
					<td class="tdL">
					    <c:if test="${si.status=='ordered' }">
						<button class="btn btnRented">预约中</button>
					    </c:if>
					    <c:if test="${si.status=='contracted' }">
					     <a href="" title="删除"  class="btn btnDel">已失效</a>
					    </c:if>
					     <c:if test="${si.status=='normal' }">
					      <a href="" title="删除"  class="btn btnDel">删除</a>
					    </c:if>
						
					</td>
				</tr>
           </c:forEach>
				<!-- <tr id="HFeNbfKAPgg" ht="1" >
			<td class="imgtd tdF">
				<a href="http://www.iwjw.com/chuzu/HFeNbfKAPgg/" target="_blank" class="hPic Fl">
															 视频<i class="videoBtn"><img src="http://resource.iwjw.com/2.2/cache/img/videoBtn.png"></i>					<img src="http://g4.ykimg.com/0100641F4654D0B79C5BE01D245C5DD5AD0DA3-F7A0-6991-6444-B0D2C91AD61C">
				</a>
				<div class="Fl inf">
				<h4>
					<b>
						<a href="http://www.iwjw.com/chuzu/HFeNbfKAPgg/" target="_blank" title="福顺里小区">
							<i>福顺里小区</i> <i>4号</i>
						</a>
					</b>
				</h4>
				<p class="Cb">
					<i class="iconfont">&#xe60b;</i>丰台 - 北大地 福顺里
				</p>
				<p class="Cb"></p>
								<p class="Cb Few"> 今日发布 </p>
								</div>
			</td>
			<td>1室1厅<i class="ll"></i></td>
			<td>60m²<i class="ll"></i></td>
			<td>低层<i class="ll"></i></td>
			<td>
				<p class="Tr"><b><i class="housePrice">3800</i>  元/月</b></p>
							</td>
			<td class="tdL">
							<button class="btn btnSee">我要看房</button>	
							<a href="" title="删除" class="btn btnDel">删除</a>
			</td>
		</tr> -->

			</table>
	</div> <!-- favoritesList end -->


</div> <!-- Rw end -->

<jsp:include page="/WEB-INF/views/include/bottom.jsp"></jsp:include>

</body>
</html>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<title>在线委托出租-房界</title>
<meta name="keywords" content="房界">
<meta name="description" content="房界">
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<link rel="stylesheet" href="${st}/css/Service.css">
<style>body{background:#fff}</style>
</head>
<body>

<!-- 头部 -->
<jsp:include page="/WEB-INF/views/include/top.jsp"></jsp:include>
<div class="Service">
	<div class="top">
		<div class="Rw">
			<a href="/chuzu/proprietor/delegation" class="Pa">在线委托出租</a>
		</div>
	</div>
</div>
<div class="Rw">
	<img src="${st}/images/service2.jpg" style="width:100%;margin:50px 0" alt="">
</div>

<jsp:include page="/WEB-INF/views/include/bottom.jsp"></jsp:include>
<div style="display:none">	
	<!--<script src="http://resource.iwjw.com/2.2/${st}/js/foot.js"></script>-->
	<script type="text/javascript">
	//<!-- 百度统计 -->
		
	var _hmt = _hmt || [];
	(function() {
	  var hm = document.createElement("script");
	  hm.src = "//hm.baidu.com/hm.js?3a10bbf8b4afa9e5ab91d66b6944e813";
	  var s = document.getElementsByTagName("script")[0]; 
	  s.parentNode.insertBefore(hm, s);
	})();
	
	var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fd9c1d8c1576dcc0f1aa537eb3b3e5830' type='text/javascript'%3E%3C/script%3E"));
	
	
	var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F9d413a8e18eff3d12181e53c4fa289cf' type='text/javascript'%3E%3C/script%3E"));
	
	//<!-- 其他统计 -->
	var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1000539121'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s19.cnzz.com/z_stat.php%3Fid%3D1000539121' type='text/javascript'%3E%3C/script%3E"));
	
</script>
</div>
</body>
</html>

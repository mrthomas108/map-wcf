<div class="userProfileContent">
	<div class="border">
		<div class="containerHead">
			<div class="containerIcon"><img src="{@RELATIVE_WCF_DIR}icon/glob24.png" alt="" /> </div>
			<h3 class="containerContent">{lang}wcf.user.profile.map{/lang}</h3>
		</div>
		<div>
			<div id="mapcenter" style="width:100%; height: 300px; overflow:hidden"></div>								
		</div>
	</div>
</div>
{include file='gmapConstants'}
<script src="{@RELATIVE_WCF_DIR}js/gmap/Map.class.js" type="text/javascript"></script>
<script type="text/javascript">
	//<![CDATA[
	if (GMAP_API_KEY != '')  { 
		document.write('<script src="http://maps.google.com/maps?file=api&amp;v=2.118&amp;hl={@$this->language->getLanguageCode()}&amp;key=' + GMAP_API_KEY + '&amp;oe={CHARSET}" type="text/javascript"><\/script>');
		onloadEvents.push(function() {
			if (GBrowserIsCompatible()) {
				var gmap = new Map('{@$id}');
				gmap.setLocation('{$user->location|encodeJS}');
			}
		});
	}
	//]]>
</script>

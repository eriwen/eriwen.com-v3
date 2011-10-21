<!DOCTYPE html>
<html>
<!--___            _
  / __ \  ___ _ __(_)_      _____ _ __
 / / _` |/ _ \ '__| \ \ /\ / / _ \ '_ \ 
| | (_| |  __/ |  | |\ V  V /  __/ | | |
 \ \__,_|\___|_|  |_| \_/\_/ \___|_| |_|
  \____/-->
<head>
<base href="http://eriwen.com/" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="language" content="en, sv" /><meta http-equiv="X-UA-Compatible" content="chrome=1" /><meta name="verify-v1" content="P2xRqLl8A6YG9QoZdBuhksLUfzrww7khJZnI2X8TID8=" /><meta name="y_key" content="62ed107e006109d4" /><meta name="author" content="Eric Wendelin" />
<meta property="og:site_name" content="Eric Wendelin's Blog"/><meta property="og:type" content="blog"/>
<title><?php 
if (is_home()) { bloginfo('name'); echo " - "; bloginfo('description'); $paged = intval(get_query_var('paged')); if(!empty($paged) || $paged != 0) { echo " - Page ".$paged; } 
} elseif (is_category()) {single_cat_title(); echo " - "; bloginfo('name');
} elseif (is_single() || is_page()) {single_post_title();
} elseif (is_search()) {bloginfo('name'); echo " search results: "; echo wp_specialchars($s);
} else { wp_title('',true); } ?></title>
<!-- Unminified CSS at http://static.eriwen.com/css/all.6bb56af.css -->
<link rel="stylesheet" href="http://static.eriwen.com/css/all.6bb56af-min.css" type="text/css" />
<!--[if lt IE 9]>
<script type="text/javascript" src="http://static.eriwen.com/js/html5-min.js"></script>
<![endif]-->
<link rel="apple-touch-icon" href="http://static.eriwen.com/images/iphone-icon.png"/>
<link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="http://feeds2.feedburner.com/EricWendelin"/>
<link rel="alternate" type="text/xml" title="RSS .92" href="http://feeds2.feedburner.com/EricWendelin"/>
<link rel="alternate" type="application/atom+xml" title="Atom 0.3" href="http://feeds2.feedburner.com/EricWendelin" />
<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
<?php if (is_singular() && get_option( 'thread_comments' )) wp_head(); ?>
<script type="text/javascript">
function foo(){bar('blah')} function bar(blah){thing()} function thing(){alert(printStackTrace().join('\n\n'))}
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-721302-4']);
_gaq.push(['_trackPageview']);
_gaq.push(['_trackPageLoadTime']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script>
</head>
<body>
	<header id="header">
		<div id="banner" role="banner">
			<h1 id="bannertext"><a href="http://eriwen.com/" title="Eric Wendelin's Blog">Eric Wendelin's Blog</a></h1>
			<nav role="popular tags">
		<h2>[<a href="http://eriwen.com/tag/programming/" title="Programming posts">programming</a>,
			<a href="http://eriwen.com/category/productivity/" title="Productivity posts">productivity</a>,
			<a href="http://eriwen.com/category/tools/" title="Open-Source tools posts">tools</a>]</h2>
			</nav>
	<div id="search-container" role="search">
	<form action="http://eriwen.com" method="get" id="searchform"><input type="search" value="" id="searchinput" name="s" results="4" placeholder="Search posts..." size="29"/></form>
	<a href="http://eriwen.com/archives/" title="Blog archives" id="archive-link">archives</a>
	</div>
		</div>
	</header>
	<div id="wrap">

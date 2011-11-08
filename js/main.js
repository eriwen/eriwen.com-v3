/*global ActiveXObject: false, $: false */
/**
 * Web page related functions for eriwen.com
 * @class Page
 * @xtype Page
 * @namespace
 */
var Page = function() {
	return Page.fn.init();
};

Page.fn = Page.prototype = {
	/**
	 * Set events and call any other initializing functions.
	 */
	init: function() {
		Page.fn.highlightSearchTerms();
		// Test for placeholder attribute and emulate if not present
		if (!('placeholder' in document.createElement('input'))) {
			var searchinput = $('searchinput');
			searchinput.style.paddingLeft = '0.7em';
			Page.fn.addEvent(searchinput, 'focus', Page.fn.clearSearchValue);
			Page.fn.addEvent(searchinput, 'blur', Page.fn.loadSearchValue);
			Page.fn.fireEvent(searchinput, 'blur');
		}

		// Load sharing bits after user scrolls to optimize initial page loadtime
		if ($('share')) {
			Page.fn.addEvent(window, 'scroll', Page.fn.loadShareWidgets);
		}

		// Load comments on scroll or if the URL references a comment
		if (window.location.hash) {
			Page.fn.loadComments();
		} else if ($('comments')) {
			Page.fn.addEvent(window, 'scroll', Page.fn.loadCommentsLater);
		}

		Page.fn.addEvent(document, 'click', Page.fn.trackLinkClick);
	},
	/**
	 * Clears the value of the target of an event handler.
	 * @param {Event} evt Object passed by event delegate
	 */
	clearSearchValue: function(evt) {
		var targ = Page.fn.getEventTarget(evt);
		targ.style.color = '#000';
		if (targ.value === 'Search posts...') {
			targ.value = '';
		}
	},
	/**
	 * Populates the value of the target of an event handler if the value is cleared.
	 * @param {Event} evt Object passed by event delegate
	 */
	loadSearchValue: function(evt) {
		var targ = Page.fn.getEventTarget(evt);
		targ.style.color = '#999';
		if (targ.value === '') {
			targ.value = 'Search posts...';
		}
	},
	/**
	 * Inject resources for sharing buttons.
	 */
	loadShareWidgets: function() {
		// Load social buttons
		Page.fn.removeEvent(window, 'scroll', Page.fn.loadShareWidgets);
		var permalink = window.__permalink,
			title = window.__title;
		$('reddit-container').innerHTML = '<iframe src="http://reddit.com/static/button/button1.html?width=120&url=' + encodeURIComponent(permalink) + '&title=' + encodeURIComponent(title) + '" height="20" width="120" scrolling="no" frameborder="0"></iframe>';
		$('su-container').innerHTML = '<iframe src="http://www.stumbleupon.com/badge/embed/1/?url=' + encodeURIComponent(permalink) + '" scrolling="no" frameborder="0" style="border: none; overflow: hidden; width: 74px; height: 20px;" allowTransparency="true"></iframe>';
		$('twitter-container').innerHTML = "<a href='http://twitter.com/share' class='twitter-share-button' data-count='horizontal' data-via='eriwen'>Tweet</a>";
		Page.fn.loadScript('http://platform.twitter.com/widgets.js', $('twitter-container'));
		$('gplusone-container').innerHTML = '<g:plusone size="medium"></g:plusone>';
		Page.fn.loadScript('https://apis.google.com/js/plusone.js');
	},
	/**
	 * Remove HTML comments around blog comments, allowing them to display and make requests.
	 */
	loadComments: function() {
		var commentsHtml = $('commentlist').innerHTML,
			commentsHtmlLength = commentsHtml.length;
		$('commentlist').innerHTML = commentsHtml.substring(4, commentsHtmlLength - 4);
		commentsHtml = commentsHtmlLength = null;
	},
	/**
	 * Event handler for scroll events loading comments after a certain timeout to optimize initial page load.
	 */
	loadCommentsLater: function() {
		Page.fn.removeEvent(window, 'scroll', Page.fn.loadCommentsLater);
		window.setTimeout(Page.fn.loadComments, 17);
	},
	/**
	 * Given an event object, determine if the source element was a link, and track it with Google Analytics
	 * @param {Event} evt object that should be fired due to a link click
	 */
	trackLinkClick: function(evt) {
		var reUrl = /^https?\:\/\/([^\/]+)(.*)$/,
			targ = Page.fn.getEventTarget(evt),
			href = targ.getAttribute('href');
		if (!href) {
			return;
		}
		var parts = href.match(reUrl);
		var domain = parts[1];
		var extension = parts[2].slice(parts[2].lastIndexOf('.'));
		if (['jnlp', 'pdf', 'zip'].indexOf(extension) !== -1) {
			_gaq.push(['_trackEvent', 'Downloads', extension.toUpperCase(), href]);
		} else if (href.indexOf(document.domain) === -1) {
			_gaq.push(['_trackEvent', 'Outbound Traffic', domain, href]);
		}
	},
	/**
	 * Adds a javascript event listener to obj of a type
	 * and also receives a function to execute when that event is fired
	 * @param obj {Object} reference
	 * @param type {String} containing event name (e.g. "onclick")
	 * @param fn {Function} definition to execute
	 */
	addEvent: function(obj, type, fn) {
		if (obj.addEventListener) {
			Page.fn.addEvent = function(obj, type, fn) {
				obj.addEventListener(type, fn, false);
			};
		} else { //IE
			Page.fn.addEvent = function(obj, type, fn) {
				obj.attachEvent('on' + type, fn);
			};
		}
		Page.fn.addEvent(obj, type, fn);
	},
	/**
	 * Removes a javascript event listener to obj of a type and also receives a
	 * function to execute when that event is fired.
	 * @param obj {Object} reference
	 * @param type {String} containing event name (e.g. "onclick")
	 * @param fn {Function} definition to execute
	 */
	removeEvent: function(obj, type, fn) {
		if (obj.removeEventListener) {
			Page.fn.removeEvent = function(obj, type, fn) {
				obj.removeEventListener(type, fn, false);
			};
		} else { //IE
			Page.fn.removeEvent = function(obj, type, fn) {
				obj.detachEvent('on' + type, fn);
			};
		}
		Page.fn.removeEvent(obj, type, fn);
	},
	/**
	 * Fires an event of the given type on the given object.
	 * @param obj {Object} to fire event on
	 * @param type {String} of event to fire
	 */
	fireEvent: function(obj, type) {
		if (document.createEvent) {
			Page.fn.fireEvent = function(obj, type) {
				var evt = document.createEvent("Events");
				evt.initEvent(type, false, true);
				return !obj.dispatchEvent(evt);
			};
		} else { //IE
			Page.fn.fireEvent = function(obj, type) {
				return obj.fireEvent('on' + type, document.createEventObject());
			};
		}
		Page.fn.fireEvent(obj, type);
	},
	/**
	 * Returns the HTML element that an event occured upon.
	 * @param {Event} evt object
	 * @return {HTMLElement} event target
	 */
	getEventTarget: function(evt) {
		var targ;
		if (!evt) {
			evt = window.event;
		}
		if (evt.target) {
			targ = evt.target;
		} else if (evt.srcElement) {
			targ = evt.srcElement;
		}
		if (targ.nodeType === 3) { // defeat Safari bug
			targ = targ.parentNode;
		}
		return targ;
	},
	/**
	 * Add an event to execute a given function once the DOM is loaded.
	 * @param func - Function to execute as soon as possible
	 */
	domready: function(func) {
		if (document.addEventListener) {
			Page.fn.domready = function(fn) {
				document.addEventListener('DOMContentLoaded', fn, false);
			};
		} else { //IE
			Page.fn.domready = function(fn) {
				if (document.readystate === 'complete') { //Prevent this from firing too early in IE7
					window.setTimeout(fn, 0);
				} else {
					Page.fn.addEvent(window, 'load', fn);
				}
			};
		}
		Page.fn.domready(func);
	},
	/**
	 * Inject a Javascript file and call a callback function when it's loaded.
	 * @param src {String} URL to JS file
	 * @param targetEl {HTMLElement} script should be injected into, defaults to HEAD
	 * @param callback {Function} to execute on success
	 * @return {HTMLElement} Script so we can set the source to null or whatever later
	 */
	loadScript: function(src, targetEl, callback) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		if (script.readyState) { //IE
			script.onreadystatechange = function() {
				if (script.readyState === 'loaded' || script.readyState === 'complete') {
					script.onreadystatechange = null;
					callback && callback();
				}
			};
		} else {
			script.onload = function() {
				callback && callback();
			};
		}

		script.src = src;
		script.async = true;
		// Suggested by Google: http://googlecode.blogspot.com/2010/11/instant-previews-under-hood.html
		var injectTarget = targetEl || document.getElementsByTagName('head')[0];
		window.setTimeout(function() {injectTarget.appendChild(script);}, 0);
		return script;
	},
	/**
	 * Determine the size of 1 "em" based on the given element or the body.
	 * @param {HTMLElement} el within which to measure (Optional)
	 * @return {Number} size of 1em in pixels
	 */
	getEmSize: function(el) {
		// Default to body
		if (typeof el === 'undefined') {
			el = document.documentElement;
		}
		var tempDiv = document.createElement("DIV");
		tempDiv.style.height = 1 + "em";
		el.appendChild(tempDiv);
		var emSize = tempDiv.offsetHeight;
		el.removeChild(tempDiv);
		return emSize;
	},
	/**
	 * Check for a search term in the URL and highlight all nodes in content with any of the words.
	 */
	highlightSearchTerms: function() {
		// Get search string
		if (/s\=/.test(window.location.search)) {
			var searchString = this.getSearchStringFromUrl(window.location.search);
			// Starting node, parent to all nodes you want to search
			var textContainerNode = $('content');
			var searchInfo = 'Search Results for: ';
			// Split search terms on '|' and iterate over resulting array
			var searchTerms = searchString.split('|');
			for (var i = 0, l = searchTerms.length; i < l; i++) {
				// The regex is the secret, it prevents text within tag declarations to be affected
				var regex = new RegExp(">([^<]*)?(" + searchTerms[i] + ")([^>]*)?<", "ig");
				this.highlightTextNodes(textContainerNode, regex, i);
				searchInfo += ' <span class="highlighted term' + i + '">' + searchTerms[i] + '</span> ';
			}
			var searchTermDiv = document.createElement("H2");
			searchTermDiv.className = 'searchterms';
			searchTermDiv.innerHTML = searchInfo;
			textContainerNode.insertBefore(searchTermDiv, textContainerNode.childNodes[0]);
		}
	},
	/**
	 * Parse individual words from URL search.
     * @param {String} str to extract search terms from
	 * @return {String} pipe separated terms
	 */
	getSearchStringFromUrl: function(str) {
		var rawSearchString = str.replace(/[a-zA-Z0-9\?\&\=\%\#]+s\=(\w+)(\&.*)?/, '$1');
		// Replace '+' with '|' for regex
		// Also replace '%20' if your cms/blog uses this instead
		return rawSearchString.replace(/\%20|\+/g, '|');
	},
	/**
	 * Given an element, Regex, and termid, wrap any regex matches in the
	 * content with a span given a class with the termid.
	 * @param {HTMLElement} element to search content
	 * @param {RegExp} regex of terms to look for
	 * @param {String} termid unique to each word or search term
	 */
	highlightTextNodes: function(element, regex, termid) {
		var tempinnerHTML = element.innerHTML;
		element.innerHTML = tempinnerHTML.replace(regex, '>$1<span class="highlighted term' + termid + '">$2</span>$3<');
	}
};
Page.prototype.$ = function(str) {
	return document.getElementById(str);
};

window.Page = Page;
window.$ = Page.fn.$;
window.Page.fn.domready(window.Page);


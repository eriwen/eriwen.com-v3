(function(window, undefined) {
	var Page = function() {
		return Page.fn.init();
	};
	
	Page.fn = Page.prototype = {
		init: function() {
			this.highlightSearchTerms();
			// Test for placeholder attribute and emulate if not present
			if (!('placeholder' in document.createElement('input'))) {
				var searchinput = $('searchinput');
				searchinput.style.paddingLeft = '0.7em';
				Page.fn.addEvent(searchinput, 'focus', Page.fn.clearSearchValue);
				Page.fn.addEvent(searchinput, 'blur', Page.fn.loadSearchValue);
				Page.fn.fireEvent(searchinput, 'blur');
			}
			
			if ($('share')) {
				Page.fn.addEvent(window, 'scroll', Page.fn.loadShareWidgets);
		    }
		
			// Load comments on scroll
			if ($('comments')) {
				Page.fn.addEvent(window, 'scroll', Page.fn.loadComments);
			}
		},
		clearSearchValue: function(evt) {
			var targ = Page.fn.getEventTarget(evt);
			targ.style.color = '#000';
			if (targ.value === 'Search posts...') {
				targ.value = '';
			}
		},
		loadSearchValue: function(evt) {
			var targ = Page.fn.getEventTarget(evt);
			targ.style.color = '#999';
			if (targ.value === '') {
				targ.value = 'Search posts...';
			}
		},
		loadShareWidgets: function() {
			// Load social buttons
			var permalink = window.__permalink,
				title = window.__title;
	    	$('reddit-container').innerHTML = '<iframe src="http://reddit.com/static/button/button1.html?width=120&url=' + encodeURIComponent(permalink) + '&title=' + encodeURIComponent(title) + '" height="20" width="120" scrolling="no" frameborder="0"></iframe>';
	    	$('su-container').innerHTML = '<iframe src="http://www.stumbleupon.com/badge/embed/1/?url=' + encodeURIComponent(permalink) + '" scrolling="no" frameborder="0" style="border: none; overflow: hidden; width: 74px; height: 20px;" allowTransparency="true"></iframe>';
	    	$('twitter-container').innerHTML = "<a href='http://twitter.com/share' class='twitter-share-button' data-count='horizontal' data-via='eriwen'>Tweet</a>";
	    	Page.fn.loadScript('http://platform.twitter.com/widgets.js', $('twitter-container'));
	    	$('dzone-container').innerHTML = '<iframe src="http://widgets.dzone.com/links/widgets/zoneit.html?t=2&url=' + encodeURIComponent(permalink) + '&title=' + encodeURIComponent(title) + '" height="20" width="155" scrolling="no" frameborder="0"></iframe>';
		},
		loadComments: function(evt) {
			window.setTimeout(function() {
				var commentsHtml = $('commentlist').innerHTML;
				var commentsHtmlLength = commentsHtml.length;
				$('commentlist').innerHTML = commentsHtml.substring(4, commentsHtmlLength - 4);
				commentsHtml = commentsHtmlLength = null;
			}, 400);
			Page.fn.removeEvent(window, 'scroll', Page.fn.loadComments);
		},
		xhr: function(url, callback, postData) {
			var request = createXMLHTTPObject();
			if (!request) return;
			var method = (postData) ? 'POST' : 'GET';
			request.open(method, url, true);
			request.setRequestHeader('User-Agent', 'XMLHTTP/1.0');
			if (postData) {
				request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			}
			request.onreadystatechange = function() {
				if (request.readyState != 4) return;
				if (request.status != 200 && request.status != 304) {
					return;
				}
				callback(request);
			}
			if (request.readyState == 4) return;
			request.send(postData);

			function createXMLHTTPObject() {
				var XhrFactories = [
					function() {return new XMLHttpRequest()},
					function() {return new ActiveXObject('Msxml2.XMLHTTP')},
					function() {return new ActiveXObject('Msxml3.XMLHTTP')},
					function() {return new ActiveXObject('Microsoft.XMLHTTP')}
				];
				var xmlhttp = false;
				for (var i = 0; i < XhrFactories.length; i++) {
					try {
						xmlhttp = XhrFactories[i]();
						createXMLHTTPObject = function() { 
							return XhrFactories[i]();
						};
					} catch (e) {
						continue;
					}
					break;
				}
				return xmlhttp;
			}
		},
		/**
		 * addEvent() adds a javascript event listener to obj of a type
		 * and also receives a function to execute when that event is fired
		 * 
		 * @param obj - Object reference
		 * @param type - String containing event name (e.g. "click")
		 * @param fn - Function to execute
		 */
		addEvent: function(obj, type, fn) {
		    if (obj.addEventListener) {
				addEvent = function(obj, type, fn) {
					obj.addEventListener(type, fn, false);
				}
		    } else { //IE
				addEvent = function(obj, type, fn) {
					obj.attachEvent('on' + type, fn);
				}
		    }
			addEvent(obj, type, fn);
		},
		/**
		 * removeEvent() removes a javascript event listener to obj
		 * of a type and also receives a function to execute when that event is fired
		 * 
		 * @param obj - Object reference
		 * @param type - String containing event name (e.g. "onclick")
		 * @param fn - Function definition to execute
		 */
		removeEvent: function(obj, type, fn) {
		    if (obj.removeEventListener) {
				removeEvent = function(obj, type, fn) {
					obj.removeEventListener(type, fn, false);
				}
		    } else { //IE
		        removeEvent = function(obj, type, fn) {
					obj.detachEvent('on' + type, fn);
				}
		    }
			removeEvent(obj, type, fn);
		},
		/**
		 * fireEvent() Fires an event of the given type on the given object.
		 *
		 * @param obj - Object to fire event on
		 * @param type - Type of event to fire
		 */
		fireEvent: function(obj, type) {
			if (document.createEvent) {
				fireEvent = function(obj, type) {
					var evt = document.createEvent("HTMLEvents");
					evt.initEvent(type, false, true);
					return !obj.dispatchEvent(evt);					
				}
			} else { //IE
				fireEvent = function(obj, type) {
					return obj.fireEvent('on' + type, document.createEventObject())					
				}
			}
			fireEvent(obj, type);
		},
		/**
		 * getEventTarget() returns the HTML element that an event occured upon
		 *
		 * @param e - HTML Event object
		 * @return - HTML Element
		 */
		getEventTarget: function(evt) {
			var targ;
			if (!evt) var evt = window.event;
			if (evt.target) targ = evt.target;
			else if (evt.srcElement) targ = evt.srcElement;
			if (targ.nodeType == 3) { // defeat Safari bug
				targ = targ.parentNode;
			}
			return targ;
		},
		/**
		 * Add an event to execute a given function once the DOM is loaded.
		 *
		 * @param func - Function to execute as soon as possible
		 */
		domready: function(func) {
		    if (document.addEventListener) {
				domready = function(fn) {
					document.addEventListener('DOMContentLoaded', fn, false);
				}
		    } else { //IE
				domready = function(fn) {
					if (document.readystate == 'complete') { //Prevent this from firing too early in IE7
						window.setTimeout(fn, 0);
					} else {
						Page.prototype.addEvent(window, 'load', fn);
					}					
				}
		    }
			domready(func);
		},
		/**
		 * Inject a Javascript file and call a callback function when it's loaded.
		 * 
		 * @param src - String URL to JS file
		 * @param targetEl - HTMLElement script should be injected into, defaults to HEAD
		 * @param callback - callback function to execute on success
		 * @return HTMLElement Script so we can set the source to null or whatever later
		 */
		loadScript: function(src, targetEl, callback) {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			if (script.readyState) { //IE
				script.onreadystatechange = function() {
					if (script.readyState == 'loaded' || script.readyState == 'complete') {
						script.onreadystatechange = null;
						callback && callback();
					}
				}
			} else {
				script.onload = function() {
					callback && callback();
				}
			}
			
			script.src = src;
			script.async = true;
			script.defer = true;
			// Suggested by Google: http://googlecode.blogspot.com/2010/11/instant-previews-under-hood.html
			var injectTarget = targetEl || document.getElementsByTagName('head')[0];
			window.setTimeout(function() {injectTarget.appendChild(script)}, 0);
			return script;
		},
		/**
		 * Determine the size of 1 "em" based on the given element or the body.
		 * 
		 * @param (Optional) <Element> within which to measure
		 */
		getEmSize: function(el) {
		    // If you pass in an element ID then get a reference to the element
		    if (typeof el === 'undefined') el = document.documentElement;
		    var tempDiv = document.createElement("DIV"); 
		    tempDiv.style.height = 1 + "em";
		    el.appendChild(tempDiv);
		    var emSize = tempDiv.offsetHeight;
		    el.removeChild(tempDiv);
		    return emSize;
		},
		/**
		 * Check for a search term in the URL and highlight all nodes in
		 * #content with any of the words.
		 */
		highlightSearchTerms: function() {
		    // Get search string
		    if (/s\=/.test(window.location.search)) {
		        var searchString = this.getSearchStringFromUrl();
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
		 *
		 * @return <String> pipe separated terms
		 */
		getSearchStringFromUrl: function() {
		    var rawSearchString = window.location.search.replace(/[a-zA-Z0-9\?\&\=\%\#]+s\=(\w+)(\&.*)?/, "$1");
		    // Replace '+' with '|' for regex
		    // Also replace '%20' if your cms/blog uses this instead
		    return rawSearchString.replace(/\%20|\+/g, "\|");
		},
		/**
		 * Given an element, Regex, and termid, wrap any regex matches in the
		 * content with a span given a class with the termid.
		 * 
		 * @param <Element> to search content
		 * @param <RegExp> of terms to look for
		 * @param <String> termid unique to each word or search term
		 */
		highlightTextNodes: function(element, regex, termid) {
		    var tempinnerHTML = element.innerHTML;
		    element.innerHTML = tempinnerHTML.replace(regex, '>$1<span class="highlighted term' + termid + '">$2</span>$3<');
		}
	};
	Page.prototype.$ = function(str) {
		return document.getElementById(str);
	}
	
	window.Page = Page;
	window.$ = Page.fn.$;
	window.Page.fn.domready(window.Page);
})(window);

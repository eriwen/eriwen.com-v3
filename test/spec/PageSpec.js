describe('Page', function() {
	beforeEach(function() {
		// Mock pre-existing objects
		window.__title = 'Foo Title';
		window.__permalink = 'Foo Permalink';
		window._gaq = [];
		this.clock = sinon.useFakeTimers();
	});

	afterEach(function() {
		this.clock.restore();
	});

	it('should initialize search terms, search box, and share widgets, comments, and link tracking', function() {
		spyOn(Page.fn, 'addEvent');
		spyOn(window, '$').andReturn({innerHTML: ''});

		Page();

		expect(Page.fn.highlightSearchTerms).toHaveBeenCalled;
		expect(Page.fn.addEvent).toHaveBeenCalled;
	});
	
	it('should get the search term from a query string', function() {
		var actual = Page.fn.getSearchStringFromUrl('?s=foo');
		expect(actual).toEqual('foo');
	});
	
	it('should separate search terms by pipes', function() {
		var actual = Page.fn.getSearchStringFromUrl('?s=foo+bar');
		expect(actual).toEqual('foo|bar');
	});
	
	it('should determine the size of 1em on body', function() {
		document.documentElement.style.fontSize = '13px';
		expect(Page.fn.getEmSize()).toEqual(13);
	});
	
	it('should remove scroll event after loading sharing widgets', function() {
		spyOn(Page.fn, 'removeEvent');
		spyOn(window, '$').andReturn({innerHTML: ''});
		spyOn(Page.fn, 'loadScript').andReturn(null);
		Page.fn.loadShareWidgets();
		// NOTE: using sinon matchers here
		expect(Page.fn.removeEvent).toHaveBeenCalledOnce;
		expect(Page.fn.loadScript).toHaveBeenCalledTwice;
	});
	
	it('should not clear search box when value does not equal "Search posts..."', function() {
		var mockSearchBox = {style: {color: '#CCC'}, value: 'foo'};
		spyOn(Page.fn, 'getEventTarget').andReturn(mockSearchBox);
		Page.fn.clearSearchValue(mockSearchBox);
		expect(mockSearchBox.value).toEqual('foo');		
	});
	
	it('should clear search box when value equals "Search posts..."', function() {
		var mockSearchBox = {style: {color: '#CCC'}, value: 'Search posts...'};
		spyOn(Page.fn, 'getEventTarget').andReturn(mockSearchBox);
		Page.fn.clearSearchValue(mockSearchBox);
		expect(mockSearchBox.value).toEqual('');
	});
	
	it('should not populate search box when value does not equal ""', function() {
		var mockSearchBox = {style: {color: '#CCC'}, value: 'foo'};
		spyOn(Page.fn, 'getEventTarget').andReturn(mockSearchBox);
		Page.fn.loadSearchValue(mockSearchBox);
		expect(mockSearchBox.value).toEqual('foo');		
	});
	
	it('should populate search box when value equals ""', function() {
		var mockSearchBox = {style: {color: '#CCC'}, value: ''};
		spyOn(Page.fn, 'getEventTarget').andReturn(mockSearchBox);
		Page.fn.loadSearchValue(mockSearchBox);
		expect(mockSearchBox.value).toEqual('Search posts...');
	});

	it('should call standard add event functions', function() {
		var addEventListener = jasmine.createSpy();
		var standardObject = {addEventListener: addEventListener};
		Page.fn.addEvent(standardObject, 'click', function(){});
		expect(standardObject.addEventListener).toHaveBeenCalledOnce;
	});

	it('should delay loading comments when required', function() {
		spyOn(Page.fn, 'loadComments');
		spyOn(Page.fn, 'removeEvent');

		Page.fn.loadCommentsLater();
		expect(Page.fn.removeEvent).toHaveBeenCalledOnce;
		expect(Page.fn.loadComments).not.toHaveBeenCalled;

		this.clock.tick(20);

		expect(Page.fn.loadComments).toHaveBeenCalledOnce;
	});

	it('should call standard remove event functions', function() {
		var removeEventListener = jasmine.createSpy();
		var standardObject = {removeEventListener: removeEventListener};
		Page.fn.removeEvent(standardObject, 'click', function(){});
		expect(standardObject.removeEventListener).toHaveBeenCalledOnce;
	});

	it('should call standard dispatch event functions', function() {
		var dispatchEvent = jasmine.createSpy();
		var standardObject = {dispatchEvent: dispatchEvent};
		Page.fn.fireEvent(standardObject, 'click', function(){});
		expect(standardObject.dispatchEvent).toHaveBeenCalledOnce;
	});

	xit('should call ie-specific event functions', function() {
		var attachEvent = jasmine.createSpy();
		var ieObject = {attachEvent: attachEvent};
		Page.fn.addEvent(ieObject, 'click', function(){});
		expect(ieObject.attachEvent).toHaveBeenCalledOnce;
	});

	xit('should be able to get target elements from events', function() {});

	it('should track outbound link clicks', function() {
		spyOn(Page.fn, 'getEventTarget').andReturn({getAttribute: function(){ return 'https://github.com' }});
		Page.fn.trackLinkClick({});
		expect(window._gaq.length).toEqual(1);
		expect(window._gaq[0][1]).toEqual('Outbound Traffic');
	});

	it('should not track non link clicks', function() {
		spyOn(Page.fn, 'getEventTarget').andReturn({getAttribute: function(){ return false }});
		Page.fn.trackLinkClick({});
		expect(window._gaq.length).toEqual(0);
	});
});
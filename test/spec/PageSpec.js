describe('Page', function() {
	beforeEach(function() {
		// Mock pre-existing objects
		window.__title = 'Foo Title';
		window.__permalink = 'Foo Permalink';
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
});
/**
 * Paginate - jQuery Plugin
 * By Federico Cargnelutti <fedecarg@gmail.com>
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   - http://www.opensource.org/licenses/mit-license.php
 *   - http://www.gnu.org/licenses/gpl.html
 * 
 * Examples and documentation at: 
 *   - http://github.com/fedecarg/jquery-htmlpaginate
 * 
 * Usage:
 * 
 * <ul id="items">
 *     <li>Item 1</li>
 *     <li>Item 2</li>
 *     <li>Item 3</li>
 *     <li>Item 4</li>
 *     <li>Item 5</li>
 *     <li>Item 6</li>
 * </ul>
 * <div id="items-pagination" style="display:none">
 *     <a id="items-previous" href="#">&laquo; Previous</a> 
 *     <a id="items-next" href="#">Next &raquo;</a>
 * </div>
 *     
 * <script type="text/javascript">
 * $('#items').paginate({itemsPerPage: 2});
 * </script>
 * 
 */
(function($) {
    
$.fn.paginate = function(options) {
    
    var Paginator = function(self, options) {
        
        var defaults = {
            itemsPerPage: 10,
            showPageNumbers: false,
            paginationDisabling: true,
            selector: {
                next: self.selector+'-next',
                previous: self.selector+'-previous',
                pagination: self.selector + '-pagination',
                numberdisplay: self.selector + '-numberdisplay'
            },
            cssClassName: {
                disabled: 'disabled'
            }
        };
        options = $.extend(defaults, options);
        var currentPage = 1;
        var numberOfPages = 1;
        var numberOfItems = 0;
        var paginationDisabling = options.paginationDisabling;
        
        var init = function() {
            numberOfItems = self.children().size();
            numberOfPages = Math.ceil(numberOfItems / options.itemsPerPage);
            if (numberOfPages > 1) {
                if (options.showPageNumbers === true) {
            	    $(options.selector.numberdisplay).show();

                    for (var i = 1; i <= numberOfPages; i++) {
                	    $(options.selector.numberdisplay).append('<a class="js-pagenumber js-page' + i + '" href="javascript:void(0);">' + i + '</a>');
                    }

                    $('.js-pagenumber').bind('click', function () {
                	    var selectedPage = $(this).text();
                        if (selectedPage != currentPage) {
                        	show(selectedPage);
                        }
                    });

                    $('.js-pagenumber').wrap('<li />');

                    // Set the current page to be active
                    var activePage = '.js-page' + currentPage;
                    $(activePage).addClass('active'); 
                }

                $(options.selector.pagination).show();
                if (paginationDisabling === true) {
                    $(options.selector.previous).addClass(options.cssClassName.disabled);
                }
            }
            self.children().hide();
            self.children().slice(0, options.itemsPerPage).show();
            
            $(options.selector.previous).click(function(e){
            	e.preventDefault();
                previous();
            });
            $(options.selector.next).click(function(e){
                e.preventDefault();
                next();
            });
            
            self.show();
        };
        
        var show = function(page) {
            if (options.showPageNumbers === true) {
                var activePage = '.js-page' + Number(page);
                $('.js-pagenumber.active').removeClass('active');
                $(activePage).addClass('active');
            }
        	currentPage = Number(page);
            startPage = (currentPage - 1) * options.itemsPerPage;
            endPage = startPage + options.itemsPerPage;
            self.children().hide().slice(startPage, endPage).show();

            if (paginationDisabling === true) {
                var disabled = options.cssClassName.disabled;
                $(options.selector.pagination + ' a').removeClass(disabled);
                if (currentPage <= 1) {
                    $(options.selector.previous).addClass(disabled);
                } else if (currentPage == numberOfPages) {
                    $(options.selector.next).addClass(disabled);
                }
            }
        };
        
        var next = function() {
            if (currentPage < numberOfPages){
                show(currentPage + 1);
            }
        };
        
        var previous = function() {
            if (currentPage > 1) {
                show(currentPage - 1);
            }
        };
        
        init();
        return this;
    };
    
    return new Paginator(this, options);
};
})(jQuery);
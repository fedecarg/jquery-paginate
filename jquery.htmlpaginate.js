/**
 * HTML Paginate - jQuery Plugin
 * By Federico Cargnelutti <fedecarg@gmail.com>
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   - http://www.opensource.org/licenses/mit-license.php
 *   - http://www.gnu.org/licenses/gpl.html
 * 
 * Examples and documentation at: 
 *   - http://github.com/fedecarg/jquery_htmlpaginate
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
 * $('#items').htmlpaginate({itemsPerPage: 2});
 * </script>
 * 
 */
(function($) {
        
    $.fn.htmlpaginate = function(options) {
        
    	var self = this;
        var defaults = {
            itemsPerPage: 10,
            selector: {
            	next: self.selector+'-next',
            	previous: self.selector+'-previous',
            	pagination: self.selector+'-pagination'
            }
        };
        var options = $.extend(defaults, options);
        var currentPage = 1;
        var numberOfPages = 1;
        var numberOfItems = 0;
        
        init = function() {
            numberOfItems = self.children().size();
            numberOfPages = Math.ceil(numberOfItems / options.itemsPerPage);
            if (numberOfPages > 1) {
                $(options.selector.pagination).show();
                $(options.selector.previous).removeAttr('href');
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
        }
        
        show = function(page) {            
            startPage = (page - 1) * options.itemsPerPage;
            endPage = startPage + options.itemsPerPage;
            self.children().hide().slice(startPage, endPage).show();
            
            $(options.selector.previous).attr('href', '#');
            $(options.selector.next).attr('href', '#');
            if (page <= 1) {
                $(options.selector.previous).removeAttr('href');
            } else if (page == numberOfPages) {
                $(options.selector.next).removeAttr('href');
            }
            
            currentPage = page;
        };
        
        next = function() {
            if (currentPage < numberOfPages){
                show(currentPage + 1);
            }
        };
        
        previous = function() {
            if (currentPage > 1) {
                show(currentPage - 1);
            }
        };
        
        init();
        return this;
    };
})(jQuery);
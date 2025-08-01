/**
 * Paginate - Vanilla JavaScript Plugin
 * Converted from jQuery version by Federico Cargnelutti <fedecarg@gmail.com>
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   - http://www.opensource.org/licenses/mit-license.php
 *   - http://www.gnu.org/licenses/gpl.html
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
 * Usage examples:
 *   Method 1 - Using prototype method:
 *   document.getElementById('items').paginate({itemsPerPage: 2});
 *
 *   Method 2 - Using standalone function:
 *   paginate(document.getElementById('items'), {itemsPerPage: 2});
 */

// Add paginate method to HTMLElement prototype
HTMLElement.prototype.paginate = function(options = {}) {
    
    const Paginator = function(element, options) {
        
        const defaults = {
            itemsPerPage: 10,
            selector: {
                next: element.id + '-next',
                previous: element.id + '-previous',
                pagination: element.id + '-pagination'
            },
            cssClassName: {
                disabled: 'disabled'
            }
        };
        
        // Merge options with defaults
        const config = Object.assign({}, defaults, options);
        let currentPage = 1;
        let numberOfPages = 1;
        let numberOfItems = 0;
        
        const init = function() {
            numberOfItems = element.children.length;
            numberOfPages = Math.ceil(numberOfItems / config.itemsPerPage);
            
            if (numberOfPages > 1) {
                const paginationEl = document.getElementById(config.selector.pagination);
                if (paginationEl) {
                    paginationEl.style.display = 'block';
                }
                
                const previousEl = document.getElementById(config.selector.previous);
                if (previousEl) {
                    previousEl.classList.add(config.cssClassName.disabled);
                }
            }
            
            // Hide all children initially
            Array.from(element.children).forEach(child => {
                child.style.display = 'none';
            });
            
            // Show first page items
            Array.from(element.children).slice(0, config.itemsPerPage).forEach(child => {
                child.style.display = 'block';
            });
            
            // Add event listeners
            const previousEl = document.getElementById(config.selector.previous);
            const nextEl = document.getElementById(config.selector.next);
            
            if (previousEl) {
                previousEl.addEventListener('click', function(e) {
                    e.preventDefault();
                    previous();
                });
            }
            
            if (nextEl) {
                nextEl.addEventListener('click', function(e) {
                    e.preventDefault();
                    next();
                });
            }
            
            element.style.display = 'block';
        };
        
        const show = function(page) {
            currentPage = page;
            const startPage = (currentPage - 1) * config.itemsPerPage;
            const endPage = startPage + config.itemsPerPage;
            
            // Hide all children
            Array.from(element.children).forEach(child => {
                child.style.display = 'none';
            });
            
            // Show current page items
            Array.from(element.children).slice(startPage, endPage).forEach(child => {
                child.style.display = 'block';
            });
            
            // Update navigation button states
            const disabled = config.cssClassName.disabled;
            const paginationEl = document.getElementById(config.selector.pagination);
            
            if (paginationEl) {
                const links = paginationEl.querySelectorAll('a');
                links.forEach(link => {
                    link.classList.remove(disabled);
                });
            }
            
            const previousEl = document.getElementById(config.selector.previous);
            const nextEl = document.getElementById(config.selector.next);
            
            if (currentPage <= 1 && previousEl) {
                previousEl.classList.add(disabled);
            } else if (currentPage === numberOfPages && nextEl) {
                nextEl.classList.add(disabled);
            }
        };
        
        const next = function() {
            if (currentPage < numberOfPages) {
                show(currentPage + 1);
            }
        };
        
        const previous = function() {
            if (currentPage > 1) {
                show(currentPage - 1);
            }
        };
        
        init();
        return element;
    };
    
    return new Paginator(this, options);
};

// Alternative function-based approach (doesn't modify prototype)
function paginate(element, options = {}) {
    if (typeof element === 'string') {
        element = document.getElementById(element);
    }
    
    if (!element) {
        console.error('Paginate: Element not found');
        return null;
    }
    
    return element.paginate(options);
}

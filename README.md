# jQuery Pagination Plugin

To use this plugin you need to:

----
Include jquery.min.js and jquery.paginate.min.js in your document.

```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.htmlpaginate.js"></script>
```

----
Include a small css to skin the navigation links.

```html
<style type="text/css">
a.disabled {
    text-decoration: none;
    color: black;
    cursor: default;
}
</style>
```

----
Define an ID on the DOM element you want to paginate, for example: "listitems".

```html
<ul id="listitems">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
    <li>Item 4</li>
    <li>Item 5</li>
    <li>Item 6</li>
    <li>Item 7</li>
    <li>Item 8</li>
    <li>Item 9</li>
    <li>Item 10</li>
    <li>Item 11</li>
    <li>Item 12</li>             
</ul>
```

If you have a huge table, maybe it will be displayed fully before the javascript at the bottom will be executed. To avoid this, you can set the table as hidden by default using css style:

```html
<ul id="listitems" style="display:none">
	...
</ul>
```

----
Place a <div/> in the place you want to display the navigation links.

```html
<div id="listitems-pagination" style="display:none">
    <a id="listitems-previous" href="#" class="disabled">&laquo; Previous</a> 
    <a id="listitems-next" href="#">Next &raquo;</a> 
</div>
```

----
Include an initialization script at the bottom of your page like this:

```html
<script type="text/javascript">
$(document).ready(function() {
	$('#listitems').paginate({itemsPerPage: 3});
});
</script>
```

----
That's all. To download a demo [click here](http://).




 
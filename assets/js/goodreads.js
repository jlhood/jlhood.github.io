var titleLink = $('#gr_custom_widget_1496878058 .gr_custom_title_1496878058 a')[0];
var currentlyReadingTitleLink = $('#currently-reading-title a')[0];
currentlyReadingTitleLink.href = titleLink.href;
currentlyReadingTitleLink.text = titleLink.text;

var authorLink = $('#gr_custom_widget_1496878058 .gr_custom_author_1496878058 a')[0];
var currentlyReadingAuthorLink = $('#currently-reading-author a')[0];
currentlyReadingAuthorLink.href = authorLink.href;
currentlyReadingAuthorLink.text = authorLink.text;

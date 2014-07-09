/*
 * jQuery kusuutab plugin v0.0.1
 * Requires: jQuery v1.11.0
 * Copyright 2014, margaman
 * MIT License (http://www.opensource.org/licenses/mit-license.php).
 */

(function($, window, document, undefined){
    //detault options
    var defaults = {
        show : 'fast',
        hide : 'fast'
    }
    
    function Kusuutab(elem, settings) {
        this.elem = elem;
        this.settings = $.extend({}, defaults, settings); 
        this.init();
    }
    
    Kusuutab.prototype.init = function() {
        //target element
        var $target = $(this.elem); 
        //default active element
        $target.find('li:first').addClass('kusuutab-active');
        var targetAll = $target.find('li:first').nextAll();
        console.log(targetAll);
        //hide except default active element
        for(var i = 0; i < targetAll.length; i++) {
            var hideTarget = $(targetAll[i]).find('a').attr('href');
            $(hideTarget).hide();
        }
        //options
        var options = {
            show : this.settings['show'],
            hide : this.settings['hide']       
        };
        //tab link
        var tabLink = $target.find('a');
        tabLink.on('click', function(ev) {           
            ev.preventDefault();
            //number of tablink
            var index = tabLink.index(this);
            //get element id
            var targetId = $(this).attr('href');
            //whole navigation
            var tabsNavLiAll = $target.find('li');
            for(var i = 0; i < tabsNavLiAll.length; i++) {
                var hideTarget = $(tabsNavLiAll[i]).find('a').attr('href');
                if(targetId != hideTarget) {
                    $(hideTarget).hide(options.hide);
                }
                //remove all classname
                $target.find('li:eq(' + i + ')').removeClass('kusuutab-active');
            }
            //add classname
            $target.find('li:eq(' + index + ')').addClass('kusuutab-active');
            // show content
            $(targetId).show(options.show);
        });
    }
    
    $.fn.kusuutab = function (settings) {
        return this.each(function () {
            new Kusuutab(this, settings);
        });
    };
})(jQuery, window, document);
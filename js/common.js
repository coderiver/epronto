head.ready(function() {

	$('.form').on('click', '.form_children .drop li', function(event) {
		event.preventDefault();
		// $(this).parents('fieldset').remove();
		// docount();
		aa = $(this).text();
		if(aa==0){
			$(this).parents('.form__moar').children('.form__age').hide()
		}
		else{
			$(this).parents('.form__moar').children('.form__age').show().removeClass('show1 show2 show3').addClass('show'+aa);
		}

	});

	function docount(){
		i = 1;
		$('.form__moar legend span').each(function(index, el) {
			$(this).text(i);
			i++;
		});
	}
	docount();
	$('.form').on('click', '.form__removeme', function(event) {
		event.preventDefault();
		$(this).parents('fieldset').remove();
		docount();
	});
	$('.form__clonemoar').click(function(event) {
		event.preventDefault();
		var el = $('.toclone .form__moar').clone(true);
		el.insertBefore( ".form__clonemoar" );
		docount();
	});
	$('.form__select').click(function(event) {
		$(this).addClass('is-active');
	});
	$('.menu').click(function(event) {
		$('body').toggleClass('is-menu');
		return false;
	});
	$('.form').on('click', '.drop li', function(event) {
		event.preventDefault();
		$(this).parents('.form__select').removeClass("is-active").children('.input').val($(this).text());
	});

	//$( ".js-datepicker" ).datepicker();

	$( ".js-datein" ).datepicker({
		minDate: 0,
		onSelect: function( selectedDate ) {
			$( ".js-dateout" ).datepicker( "option", "minDate", selectedDate );
		}
	});
	$( ".js-dateout" ).datepicker({
		onSelect: function( selectedDate ) {
			$( ".js-datein" ).datepicker( "option", "maxDate", selectedDate );
		}
	});

	$('.feedbacks').slick({
	  slidesToShow: 3,
	  responsive: [
	    {
	      breakpoint: 880,
	      settings: {
	        slidesToShow: 2
	      }
	    },
	    {
	      breakpoint: 640,
	      settings: {
	        slidesToShow: 1
	      }
	    }
	  ]
	});
	$('.js-people').focus(function(event) {
		$('.people').addClass('is-open')
	});
	$('.people li').click(function(event) {
		if($(this).data('rooms')==0){
			$('.form__moarpeople').show();
		}
		else{
			$('.form__moarpeople').hide();
			$('.js-people').val($(this).data('adult')+' взрослых и '+$(this).data('rooms')+' комнат');
		}
		cl = $(this).children('i').attr('class');
		$('.form__peopleicon').removeClass('icon11 icon21 icon31 icon41 icon22 iconmore').addClass(cl);
		$('.people').removeClass('is-open');
		
	});

	$(document).click(function(event) {
        if (!$(event.target).closest('.form').length) {
            if ($('.people').is(":visible")) {
                $('.people').hide().removeClass("is-open");
            }
        }
        if (!$(event.target).closest('.form__select').length) {
            // if ($('.people').is(":visible")) {
            //     $('.people').hide().removeClass("is-open");
            // }
            $('.form__select').removeClass('is-active');
        }
    });

    //accordion
    $(".js-accordion-title").on("click", function(){
    	if ($(this).parents(".js-accordion").hasClass("is-active")) {
    		$(this).parents(".js-accordion").removeClass("is-active").find(".js-accordion-body").slideUp();
    	}
    	else {
    		$(".js-accordion").removeClass("is-active");
    		$(".js-accordion-body").slideUp();
    		$(this).parents(".js-accordion").toggleClass("is-active").find(".js-accordion-body").slideDown()
    	};
    	return false;
    });
    //scroll
	$('.js-scroll').jScrollPane( {
		verticalDragMaxHeight: 30,
		autoReinitialise: true
	});
	$('.h-tabs__item').click(function() {
		$('.h-tabs__item').removeClass('is-active');
		$(this).addClass('is-active');
		attr = $(this).attr('href');
		$('#is-gallery,#is-guest,#is-street').hide();
		$(' '+attr).show();
		return false;
	});
	//map items
	$('.h-map__link').on('click', function() {
		$('.h-map__pop').addClass('is-open');
		return false;
	});
	$('.js-close-pop').on('click', function() {
		$('.h-map__pop').removeClass('is-open');
		return false;
	});
	
	$(window).load(function() {
		if($('.h-scroll').length > 0) {
		    if ( $(window).width() < 640) {
		        var element = $('.h-scroll').jScrollPane({});
		        var api = element.data('jsp');
		        api.destroy();
		    } else {
		        $('.h-scroll').jScrollPane({	        	
					verticalDragMaxHeight: 30,
					autoReinitialise: true
		        });
		    };
		};
	});
	$(window).resize(function() {
		if($('.h-scroll').length > 0) {
		    if ( $(window).width() < 640) {
		        var element = $('.h-scroll').jScrollPane({});
		        var api = element.data('jsp');
		        api.destroy();
		    } else {
		        $('.h-scroll').jScrollPane({	        	
					verticalDragMaxHeight: 30,
					autoReinitialise: true
		        });
		    };
		};
	});
});
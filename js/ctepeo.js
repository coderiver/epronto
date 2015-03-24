var monthes = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
function getDate(el) {
    var closest_datepicker = el.closest('div.ui-datepicker-group');
    var date = el.text();
    if (date < 10)
        date = "0" + date;
    var month = monthes.indexOf(closest_datepicker.find('span.ui-datepicker-month').text()) + 1;
    if (month < 10)
        month = "0" + month;
    var year = closest_datepicker.find('span.ui-datepicker-year').text();
    return new Date(year + '-' + month + '-' + date);
}
function highlightDates(date, din) {
    $("#ui-datepicker-div td.daterange").removeClass("daterange");
    $("#ui-datepicker-div td:not(.ui-datepicker-unselectable) a").each(function (n, el) {
        var xdata = getDate($(el));
        if (date > din) {
            if (xdata > din && xdata < date) {
                $(el).parent().addClass("daterange");
            }
        }
        if (date < din) {
            if (xdata < din && xdata > date) {
                $(el).parent().addClass("daterange");
            }
        }
    })
}

function hideTooltip() {
    for (i in tooltips) {
        tooltips[i].data('tooltipsy').hide();
    }
}

var tooltips = [];

function addGo(index) {
    $(".active-destinations-above").append($(".destinations .go:eq(" + (index - 1) + ")")[0].outerHTML);

}

function get_query() {
    var url = location.href;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0, result = {}; i < qs.length; i++) {
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = qs[i][1];
    }
    return result;
}

$(document).ready(function () {

    if (/mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase())) {
        $("#rooms").removeAttr("disabled").attr("readonly", "readonly");
    }

    // mainpage
    $("a.fancy").fancybox({
        maxWidth: 800,
        maxHeight: 600,
        fitToView: false,
        width: '70%',
        height: '70%',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none'
    });
    $("a.suggest").on('click', function () {
        $("input[name='destination']").val($(this).data("name")).data("selected", $(this).data("name")).data("keyword", $(this).data("keyword")).data("type", $(this).data("type"));
        return false;
    });

    //  destinations
    $(".destinations .go").each(function (n, el) {
        if (n < 7) {
            $(".active-destinations").append($(el)[0].outerHTML);
        } else {
            $(".destinations-container").css({
                'width': $(".active-destinations").width() + 'px',
                'height': '420px',
                'display': 'block'
            });
        }
        $(".active-destinations .go:first").addClass("large");
    });
    $(".active-destinations-above").css({
        'top': $(".active-destinations").offset().top + 'px',
        'position': 'absolute',
        'display': 'none'
    })

    $(".flipit").on("click", function () {
        var dir = $(this).data("dir");
        var pos = parseInt($(".active-destinations").data("pos"), 10);
        var items = $(".destinations .go");
        if ($(".destinations").hasClass("active") == true)
            return false;
        var cnt = items.length;
        $(".active-destinations-above").html("");

        $(".destinations").addClass("active");

        if (dir == "left") {
            for (i = 1; i <= 7; i++) {
                var xpos = pos - i;
                if (xpos <= 0) {
                    xpos = cnt - Math.abs(xpos);
                }
                $(".active-destinations").data("pos", xpos);
                addGo(xpos);
            }
            $(".active-destinations-above .go:first").addClass("large");
        } else {
            for (i = 1; i <= 7; i++) {
                var xpos = pos + 7 + i;
                if (xpos > cnt) {
                    xpos = xpos - cnt;
                }
                $(".active-destinations").data("pos", xpos);
                addGo(xpos);
            }
            $(".active-destinations-above .go:first").addClass("large");
        }



        $(".active-destinations .go__bottom").hide();
        $(".active-destinations-above .go__bottom").show();

        $(".active-destinations-above").fadeIn(600, function () {
            $(".active-destinations").html($(".active-destinations-above").html()).show();
            $(".active-destinations-above").html("").hide();
            $(".destinations").removeClass("active");
        });

        return false;
    });


    //  tracking
    var tracking = get_query();
    for (i in tracking) {
        if (i == "label") {
            $.cookie("etrack", tracking[i], {expires: 7, path: '/'});
        }
    }

    $(".sw li").click(function () {
        $(this).parent().find(".is-active").removeClass("is-active");
        $(this).addClass("is-active");
        $(".sw__tab").addClass("hidden");
        $(".sw__tab[data-tabid='" + $(this).data("tabid") + "']").removeClass("hidden");
        return false;
    });
    $(document).delegate(".smart-link", "click", function () {
        $("body > *").fadeOut(400, function () {
            $("body").css('background', 'none');
        });
        $("body").append('<center style="position: absolute;top:20%;left:49%;"><div id="floatingBarsG"><div class="blockG" id="rotateG_01"></div><div class="blockG" id="rotateG_02"></div><div class="blockG" id="rotateG_03"></div><div class="blockG" id="rotateG_04"></div><div class="blockG" id="rotateG_05"></div><div class="blockG" id="rotateG_06"></div><div class="blockG" id="rotateG_07"></div><div class="blockG" id="rotateG_08"></div></div></center>');
        $("body").append("<form method=\"post\" action=\"/hotels/r/\" id=\"fh\"><input type=\"hidden\" name=\"key\" value=\"" + $(this).data("key") + "\"></form>");
        $("#fh").submit();
        return false;
    });
    $(".datepicker").each(function (n, el) {
        $(el).datepicker(
                {
                    dateFormat: "d M yy, D",
                    monthNames: monthes,
                    monthNamesShort: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
                    dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                    dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                    minDate: '0d',
                    maxDate: '+1Y',
                    defaultDate: +2,
                    firstDay: 1,
                    showAnim: '',
                    numberOfMonths: 2,
                    gotoCurrent: true,
                    onSelect: function (selectedDate) {
                        var din = $("#datein").datepicker("getDate");
                        var dout = $("#dateout").datepicker("getDate");
                        if (this.id == "datein") {
                            if ($("#dateout").val()) {
                                if (dout < din) {
                                    var tempStartDate = new Date(din);
                                    var default_end = new Date(tempStartDate.getFullYear(), tempStartDate.getMonth(), tempStartDate.getDate() + 1);
                                    $("#dateout").datepicker('setDate', default_end);
                                }
                            }
                            $("#datein").removeClass("input-error");
                            $("#dateout").datepicker("option", "defaultDate", din);
                            setTimeout(function () {
                                $("#dateout").focus();
                            }, 50);
                        } else {
                            $("#dateout").removeClass("input-error");
                            if ($("#datein").val()) {
                                var dout = $("#dateout").datepicker("getDate");
                                var din = $("#datein").datepicker("getDate");
                                if (dout < din) {
                                    var tempStartDate = new Date(dout);
                                    var default_end = new Date(tempStartDate.getFullYear(), tempStartDate.getMonth(), tempStartDate.getDate() - 1);
                                    $("#datein").datepicker('setDate', default_end);
                                }
                            }
                        }
                        if (din && dout && $(".input.js-people").val() == "") {
                            $(".input.js-people").val($(".input.js-people").attr("placeholder"));
                        }
                        $.cookie(this.id, $(this).datepicker('getDate'));
                    },
                    beforeShow: function () {
                        if (this.id == "dateout") {
                            $("#dateout").datepicker(
                                    "option",
                                    "minDate",
                                    "1d");
                        }
                        $(".form__people .people").removeClass("is-open");
                    },
                    beforeShowDay:
                            function (date)
                            {
                                var p_date = $.datepicker.formatDate("dd.mm.yy", $("#datein").datepicker('getDate'));
                                var t_date = $.datepicker.formatDate("dd.mm.yy", date);
                                var e_date = $.datepicker.formatDate("dd.mm.yy", $("#dateout").datepicker('getDate'));
                                if ((p_date && (t_date === p_date)) || (e_date && (e_date == t_date)))
                                {
                                    return [true, 'choosed', 'Дата заезда'];
                                }
                                if ($("#dateout").val() && $("#datein").val()) {
                                    var dout = $("#dateout").datepicker("getDate");
                                    var din = $("#datein").datepicker("getDate");
                                    if (date > din && date < dout) {
                                        return [true, 'ui-state-highlight', ''];
                                    }
                                }
                                //.log(date);
                                return [true, ''];
                            }
                }
        );
    });
    $(document).delegate(".ui-state-default", 'mouseenter', function (e) { // delegating on the mouseenter event which jQuery patches to be a cross-browser event, and only targeting clickable dates
        var date = getDate($(this));
        var dout = $("#dateout").datepicker("getDate");
        var din = $("#datein").datepicker("getDate");

        if (din) {
            highlightDates(date, din);
        }
        if (dout && !din) {
            highlightDates(date, dout);
        }
    });

    if ($.cookie(' datein')) {
        $("#datein").datepicker("setDate", new Date($.cookie('datein')));
        $("#dateout").datepicker("option", "minDate", new Date(new Date($.cookie('datein')) + 86400000));
    }

    if ($.cookie(' dateout')) {
        $("#dateout").datepicker("setDate", new Date($.cookie(' dateout')));
    }

    $(".form__dateicon").on('click', function () {
        if ($(this).prev().hasClass("disabled") == true)
            return false;
        $(this).prev().datepicker("show");
        return false;
    });
    $(".js-people, .form__peoplearrow").on('click', function () {
        if ($(this).parent().find(".people").hasClass("is-open")) {
            $(".form__people.people").removeClass("is-open");
            $(".js-people").focus();
        } else {
            $(".form__people .people").addClass("is-open");
            $(".js-people").blur();
        }
        return false;
    });


    $(document).on('click', function () {
        $(".form__people .people, .drop").removeClass("is-open");
        $(".form__people .cntdrop").remove();
    });



    //  dropdown
    $(document).on('click', function () {
        $(".form__people .people, .drop").removeClass("is-open");
    });
    $(".form__people .people li").on('click', function () {
        $("input.js-people").attr('placeholder', $.trim($(this).text())).val($.trim($(this).text())).data('adult', $(this).data("adult")).data('rooms', $(this).data("rooms"));
        $(".form__people .form__peopleicon").removeClass("icon11 icon21 icon31 icon41 icon22 iconmore").addClass($(this).find("i").attr("class"));
        if ($(this).data("adult") == "0" && $(this).data("rooms") == "0") {
            $(".form__moarpeople").show();
        } else {
            $(".form__moarpeople").hide();
        }
    });
    //  more rooms
    $(document).delegate(".form__moarselect input.js-select, .form__moarselect .form__arrow", "click", function () {
        $(".drop").removeClass("is-open");
        $(this).closest(".form__select").find(".drop").toggleClass("is-open");
        return false;
    });
    $("a.form__clonemoar").on('click', function () {
        $($(".hidden.moar_tpl").html()).insertAfter($(".form__moarpeople fieldset:last"));
        $(".form__moarpeople fieldset:last").find("legend span").html($(".form__moarpeople fieldset").length);
        return false;
    });
    $(document).delegate("a.form__removeme", "click", function () {
        $(this).closest("fieldset").remove();
        $(".form__moarpeople fieldset").each(function (n, el) {
            $(el).find("legend span").html(n + 1);
        });
        return false;
    });
    $(document).delegate(".form__moarselect .drop li", "click", function () {
        $(this).closest(".drop").removeClass("is-open");
        $(this).closest(".form__select").find(".input.js-select").val($(this).text());
        if ($(this).closest('ul').hasClass("ch_ul") == true) {
            var ch = parseInt($(this).text(), 10);
            if (ch != 0) {
                var html = "";
                for (i = 1; i <= ch; i++) {
                    html = html + "<input title=\"Максимальный возраст детей 16 лет\" class=\"input input_small child\" type=\"text\" value=\"\">";
                }
                $(this).closest('fieldset').find(".form__age").show().find(".ages").html(html);
            } else {
                $(this).closest('fieldset').find(".form__age").hide().find(".ages").html("");
            }
        }
        return false;
    });

    //  restrict children age
    $(document).delegate(".input.input_small.child", "blur", function () {
        var el = $(this);
        var age = parseInt(el.val(), 10);
        if (age > 16) {
            el.val(16);
            el.closest(".form__moar").find(".form__error").show();
        }
    });
    //  submit
    $(".form__submit a").on('click', function () {
        var url = "http://www.hotels.epronto.ru/" + ($("#dateunknown").is(":checked") == false ? ($("input[name='destination']").data('type') != "hotels" ? "SearchResults.aspx" : "SearchTermTypeRedirection.ashx") : "SearchTermTypeRedirection.ashx") + "?languageCode=RU&currencyCode=RUB&useStored=false" + ($("input[name='destination']").data('type') == "hotels" ? "&destination=" + $("input[name='destination']").data('keyword') : "");
        $(".input-error").removeClass("input-error");
        if ($("input[name='destination']").data('keyword') == "") {
            if ($.trim($("input[name='destination']").val()) != "") {
                var url = "http://www.hotels.epronto.ru/Search.aspx?search=" + $("input[name='destination']").val() + "&languageCode=RU&currencyCode=RUB&useStored=false";
            } else {
                $("input[name='destination']").addClass("input-error");
            }
        } else {
            if ($("input[name='destination']").data('type') != "hotels") {
                url = url + "&destination=" + $("input[name='destination']").data('keyword');
            }
        }
        if ($("input[name='destination']").data('selected') != $("input[name='destination']").val() && $.trim($("input[name='destination']").val()) != "" && $(".bc").length == 0) {
            var url = "http://www.hotels.epronto.ru/Search.aspx?search=" + $("input[name='destination']").val() + "&languageCode=RU&currencyCode=RUB&useStored=false";
        }



        if ($("#datein").val() == "") {
            $("#datein").addClass("input-error");
        }
        if ($("#dateout").val() == "") {
            $("#dateout").addClass("input-error");
        }
        if ($("#dateout").hasClass("input-error") == false && $("#datein").hasClass("input-error") == false) {
            var checkin = $("#datein").datepicker('getDate');
            var checkout = $("#dateout").datepicker('getDate');
            url = url + "&checkin=" + checkin.getFullYear() + "-" + (checkin.getMonth() < 9 ? "0" + (checkin.getMonth() + 1) : checkin.getMonth() + 1) + "-" + (checkin.getDate() < 9 ? "0" + (checkin.getDate()) : checkin.getDate()) + "&checkout=" + checkout.getFullYear() + "-" + (checkout.getMonth() < 9 ? "0" + (checkout.getMonth() + 1) : checkout.getMonth() + 1) + "-" + (checkout.getDate() < 9 ? "0" + (checkout.getDate()) : checkout.getDate());
        }

        if ($(".input.js-people").data("adult") == "0" && $(".input.js-people").data("rooms") == "0") {
            //  custom
            url = url + "&Rooms=" + $(".form__moarpeople fieldset").length;
            $(".form__moarpeople fieldset").each(function (n, el) {
                url = url + "&adults_" + (n + 1) + "=" + $(el).find(".adults").val() + "&childAges_" + (n + 1) + "=";
                var ages = "";
                $(el).find(".child").each(function (x, y) {
                    ages = ages + (ages == "" ? "" : ",") + $(y).val();
                });
                url = url + encodeURIComponent(ages);
            });
        } else {
            url = url + "&Rooms=" + ($(".input.js-people").data("rooms") ? $(".input.js-people").data("rooms") : 1);
            if ($(".input.js-people").data("rooms") == "1") {
                url = url + "&adults_1=" + $(".form__people .input.js-people").data("adult");
            } else {
                url = url + "&adults_1=2&adults_2=2";
            }
        }

        if ($(".input-error").length == 0) {
            url = url + "&Label=s_" + ($.cookie("etrack") ? $.cookie("etrack") : $("body").data("label") + "SRC");
            window.location = url;
        }
        return false;
    });

    $(".header__in .menu").on('click', function () {
        $("body").toggleClass("is-menu");
        return false;
    });

    //  search 
    if ($("input[name='destination']").length) {
        $("input[name='destination']").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "http://www.hotelscombined.com/AutoUniversal.ashx",
                    dataType: "jsonp",
                    data: {
                        search: request.term,
                        languageCode: 'RU',
                        limit: 8
                    },
                    success: function (data) {
                        $(".form__hotelsearch").removeClass("ico_search_loading");
                        response(data);
                    }
                });
            },
            minLength: 3,
            open: function (event, ui) {
                $(".ui-autocomplete").css({
                    top: (parseInt($(".ui-autocomplete").css('top'), 10) + 5) + 'px'
                });
                $(".hc_t_newType:first").css({
                    'border': '0px solid red'
                });
            },
            search: function (event, ui) {
                $(".form__hotelsearch").addClass("ico_search_loading");
            },
            select: function (event, ui) {
                $(".ui-autocomplete-input").data('keyword', ui.item.label);
                $("input[name='destination']").data('type', ui.item.t);
                $("input[name='destination']").data('selected', ui.item.value);
                $("input[name='datein']").focus();
            },
            maxItemsToShow: 8,
            selectOnly: true
        }).data("ui-autocomplete")._renderItem = function (ul, item) {
            var result = "";
            var current_type = "";
            ul.addClass("ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all hc_f_t_ac");
            for (i in item) {
                if (item[i].cc) {
                    item[i].value = item[i].n + (item[i].p[0] ? ", " + " " + item[i].p[0] : "");
                    item[i].label = item[i].k;
                    var newtype = false;

                    if (current_type != item[i].t) {
                        current_type = item[i].t;
                        newtype = true;
                    }

                    $("<li class=\"ui-menu-item hc_t_" + item[i].t + (newtype ? " hc_t_newType" : "") + "\">").append("<a class=\"ui-corner-all\">" +
                            (newtype ? "<span class=\"hc_icon\"></span><em>" + item[i].tn + "</em>" : "") +
                            //  name
                                    (item[i].p[0] ? (item[i].n ? (item[i].t == "cities" || item[i].t == "towns" ? "<b>" : "") + item[i].n + (item[i].t == "cities" || item[i].t == "towns" ? "</b>" : "") + ', ' : "") : item[i].n) +
                                    //  country
                                            (item[i].p[0] ? (item[i].t == "cities" || item[i].t == "towns" ? "" : "<b>") + item[i].p[0] + (item[i].t == "cities" || item[i].t == "towns" ? "" : "</b>") : '') +
                                            //  hotels
                                            ' <span class="hc_e_numHtls">(' + item[i].h + ')</span>' +
                                            "</a>").data("ui-autocomplete-item", item[i])
                                    .appendTo(ul);
                        }
                    }
                    return ul;
                };
            }
            $("input[name='destination']").bind('focus', function () {
                $(this).autocomplete("search");
            });
        });


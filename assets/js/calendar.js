$( document ).ready(function() {
	$(".reservationCalendar").datepicker({
		showOtherMonths:true
		,selectOtherMonths:true
		,numberOfMonths:(browser.mobile?1:3)
		,minDate:0
		
	}
	,$.datepicker.regional["cs"]
	);
	//readFile();
	calendarShowReservation();
});

function calendarShowReservation()
{
	jQuery.get('assets/data/obsazenost.html', function (data) {
			//alert(data);
			//process text file line by line
			var lns = data.split("\n");
			$.each(lns, function (i, ln) {
				if (i > 0) {
					var bS = ln.split("-")[0];
					var eS = ln.split("-")[1];
					var bD = bS.split(".")[0];
					var bM = bS.split(".")[1];
					var bY = bS.split(".")[2];
					var eD = eS.split(".")[0];
					var eM = eS.split(".")[1];
					var eY = eS.split(".")[2];

					var bDT = new Date(bY, bM - 1, bD);
					var eDT = new Date(eY, eM - 1, eD);
					var dCnt = (eDT.getTime() - bDT.getTime()) / 1000 / 3600 / 24;

					for (let i = 0; i < dCnt; i++)
					{
						var dDT = new Date(bDT);
						dDT.setDate(dDT.getDate() + i);
						if (i == 0)
							$("#reservationCalendar1").find("td[data-month='" + (dDt.getMonth()) + "'][data-year='" + (dDt.getFullYear()) + "']").find("a[data-date='" + (dDt.getDay()) + "']").addClass("calendarReservationBegin");
					}

                }
			});
	});

	/*$("#reservationCalendar1").find("td[data-month='0'][data-year='2023']").find("a[data-date='24']").addClass("calendarReservationBegin");
	$("#reservationCalendar1").find("td[data-month='0'][data-year='2023']").find("a[data-date='25']").addClass("calendarReservationContinue");
	$("#reservationCalendar1").find("td[data-month='0'][data-year='2023']").find("a[data-date='26']").addClass("calendarReservationChange");
	$("#reservationCalendar1").find("td[data-month='0'][data-year='2023']").find("a[data-date='27']").addClass("calendarReservationEnd");*/
}

function readFile(){
  var div = $('#reservationCalendar');
  // Getting elements from server and saving the in the variable data
  $.get( "assets/data/obsazenost.html", function(response) {
    $(div).html(data);
});
}

function leftFunction() {
    jQuery.get('/assets/data/obsazenost.html', function(data) {
        var count = data;
        alert(count);
    }).done(function() {
        scrolling = true;
        if (number == 0) {
            alert("The number can't be smaler then 0");
            return;
        }
    });
    number--;
    document.getElementById("myImage").src = "latest" + number + ".jpg";
}

/* Czech initialisation for the jQuery UI date picker plugin. */
/* Written by Tomas Muller (tomas@tomas-muller.net). */
( function( factory ) {
	"use strict";

	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "../widgets/datepicker" ], factory );
	} else {

		// Browser globals
		factory( jQuery.datepicker );
	}
} )( function( datepicker ) {
"use strict";

datepicker.regional.cs = {
	closeText: "Zavřít",
	prevText: "Dříve",
	nextText: "Později",
	currentText: "Nyní",
	monthNames: [ "leden", "únor", "březen", "duben", "květen", "červen",
	"červenec", "srpen", "září", "říjen", "listopad", "prosinec" ],
	monthNamesShort: [ "led", "úno", "bře", "dub", "kvě", "čer",
	"čvc", "srp", "zář", "říj", "lis", "pro" ],
	dayNames: [ "neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota" ],
	dayNamesShort: [ "ne", "po", "út", "st", "čt", "pá", "so" ],
	dayNamesMin: [ "ne", "po", "út", "st", "čt", "pá", "so" ],
	weekHeader: "Týd",
	dateFormat: "dd.mm.yy",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: "" };
datepicker.setDefaults( datepicker.regional.cs );

return datepicker.regional.cs;

} );


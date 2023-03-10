$( document ).ready(function() {
	$(".reservationCalendar").datepicker({
		showOtherMonths:true
		,selectOtherMonths:true
		,numberOfMonths:(browser.mobile?1:3)
		,minDate: 0
		, onSelect: function (date, datepicker) { calendarShowReservation(); }
		,onUpdateDatepicker: function (datepicker) { calendarShowReservation(); }
	}
	,$.datepicker.regional["cs"]
	);
	//readFile();
	
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
					var dCnt = ((eDT.getTime() - bDT.getTime()) / 1000 / 3600 / 24) + 1;

					for (let i = 0; i < dCnt; i++)
					{
						var dDT = new Date(bDT);
						dDT.setDate(dDT.getDate() + i);
						if (i == 0)
							$("#reservationCalendar1").find("td[data-month='" + (dDT.getMonth()) + "'][data-year='" + (dDT.getFullYear()) + "']").find("a[data-date='" + (dDT.getDate()) + "']").addClass("calendarReservationBegin");
						else if (i == (dCnt - 1))
							$("#reservationCalendar1").find("td[data-month='" + (dDT.getMonth()) + "'][data-year='" + (dDT.getFullYear()) + "']").find("a[data-date='" + (dDT.getDate()) + "']").addClass("calendarReservationEnd");
						else
							$("#reservationCalendar1").find("td[data-month='" + (dDT.getMonth()) + "'][data-year='" + (dDT.getFullYear()) + "']").find("a[data-date='" + (dDT.getDate()) + "']").addClass("calendarReservationContinue");
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
	closeText: "Zav????t",
	prevText: "D????ve",
	nextText: "Pozd??ji",
	currentText: "Nyn??",
	monthNames: [ "leden", "??nor", "b??ezen", "duben", "kv??ten", "??erven",
	"??ervenec", "srpen", "z??????", "????jen", "listopad", "prosinec" ],
	monthNamesShort: [ "led", "??no", "b??e", "dub", "kv??", "??er",
	"??vc", "srp", "z????", "????j", "lis", "pro" ],
	dayNames: [ "ned??le", "pond??l??", "??ter??", "st??eda", "??tvrtek", "p??tek", "sobota" ],
	dayNamesShort: [ "ne", "po", "??t", "st", "??t", "p??", "so" ],
	dayNamesMin: [ "ne", "po", "??t", "st", "??t", "p??", "so" ],
	weekHeader: "T??d",
	dateFormat: "dd.mm.yy",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: "" };
datepicker.setDefaults( datepicker.regional.cs );

return datepicker.regional.cs;

} );


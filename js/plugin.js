
(function($){
	$.fn.pickyourdate=function(options){

		//options
		var settings = {'format':'MM/DD/YYYY'}
		if(options){
			$.extend(settings,options);
		}

		//caching DOM
		var $date_field = $(this);
		
		//generating necessary html
		var content = "<div class='calendar-wrap'>" + "<div class='date-info'>";
		content = content + "<div class='month'></div>" + "<div class='year'></div>";
		content = content + "<div class='prev'>1</div>" + "<div class='next'>3</div>";
		content = content + "</div>" + "</div>" + "</div>";
		$date_field.after(content);

		//declaring global variables
		var current_date;
		var current_year;
		var current_month_no;
		var week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
		var month_short = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var month = ['January','Februay','March','April','May','June','July','August','September','October','November','December'];


		//this is the function for producing calendar
		function createCalendar(year,month_no){
		
			var total_days = new Date(year,month_no+1,0).getDate();
			var day_no = new Date(year,month_no,1).getDay();
			
			//creating first row
			var calendar = "<table class='calendar'>";
			calendar = calendar +"<tr>";
			for (var i = 0;i<week.length;i++){
				calendar = calendar + "<th>" + week[i] + "</th>";
			}
			calendar = calendar + "</tr>";

			//creating second row
			for(var i = 0 ;i<day_no;i++){calendar = calendar + "<td class='empty'></td>";}
			count = 1;
			for(;i < 7;i++){
				var value = month_no+1 + "/" + count + "/" + year;
				calendar = calendar + "<td class='not-empty'"+"value="+value+">" + count + "</td>";
				count++;
			}

			//creating other rows
			for(var i = 0;i<5;i++){
				if(count > total_days)break;
				calendar = calendar + "<tr>";	
				for(var j = 0;j < 7;j++){
					var value = month_no+1 + "/"+count + "/" + year;
					calendar = calendar + "<td class='not-empty'"+"value="+value+">" + count + "</td>";
					count++;
					if(count > total_days)break;
				}
				calendar = calendar + "</tr>";	
			}
			
			calendar = calendar + "</table>";
			$(".calendar-wrap .calendar").remove();
			$(".calendar-wrap").append(calendar);
		}


		//handling focus in event of the element
		$date_field.click(function(evt){
			alert(new Date($(this).val()));
			if(jQuery.trim($(this).val())==""){
				//getting current date
				 current_date = new Date();
				 current_year = current_date.getFullYear();
				 current_month_no = current_date.getMonth();
				 $(".date-info .month").html(month[current_month_no]);
				 $(".date-info .year").html(current_year);
				//calling the function createCalendar
				createCalendar(current_year,current_month_no);
				$(".calendar-wrap").show();
			}else{
				 current_date = new Date($(this).val());
				 current_year = current_date.getFullYear();
				 current_month_no = current_date.getMonth();
				 $(".date-info .month").html(month[current_month_no]);
				 $(".date-info .year").html(current_year);
				//calling the function createCalendar
				createCalendar(current_year,current_month_no);
				$(".calendar-wrap").show();
			}
			evt.stopPropagation();
		});

		//handling keyup events
		$date_field.keyup(function(evt){
			
			if(jQuery.trim($(this).val())==""){
				//getting current date
				 current_date = new Date();
				 current_year = current_date.getFullYear();
				 current_month_no = current_date.getMonth();
				 $(".date-info .month").html(month[current_month_no]);
				 $(".date-info .year").html(current_year);
				//calling the function createCalendar
				createCalendar(current_year,current_month_no);
				$(".calendar-wrap").show();
			}else{
				 current_date = new Date($(this).val());
				 current_year = current_date.getFullYear();
				 current_month_no = current_date.getMonth();
				 $(".date-info .month").html(month[current_month_no]);
				 $(".date-info .year").html(current_year);
				//calling the function createCalendar
				createCalendar(current_year,current_month_no);
				$(".calendar-wrap").show();
			}
			evt.stopPropagation();
		});

		//hides the calendar on document click
		$(document).click(function(){
			$(".calendar-wrap").hide();
		});

		//onclick on the date set the value to textfield
		$(document).on("click",".calendar td.not-empty",function(){
			$date_field.val($(this).attr("value"));
		});

		//previous month
		$(document).on("click",".date-info .prev",function(){
			current_month_no = current_month_no - 1;
			if(current_month_no<0){
				current_month_no = 11;
				current_year = current_year - 1;
			}
			$(".date-info .month").html(month[current_month_no]);
			$(".date-info .year").html(current_year);
			createCalendar(current_year,current_month_no);
			
		});

		//next month
		$(document).on("click",".date-info .next",function(){
			current_month_no = current_month_no + 1;
			if(current_month_no>11){
				current_month_no = 0;
				current_year = current_year + 1;
			}
			$(".date-info .month").html(month[current_month_no]);
			$(".date-info .year").html(current_year);
			createCalendar(current_year,current_month_no);
			
		});

		//stopPropagation for
		$(document).on("click",".date-info",function(evt){
			evt.stopPropagation();
		});
	}
})(jQuery);

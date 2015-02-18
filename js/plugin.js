
(function($){
	$.fn.pickyourdate=function(options){

		//options
		var settings = {"separator":"/"}
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
		var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		var days_per_month = [31,28,31,30,31,30,31,31,30,31,30,31];

		//this is the function for producing calendar
		function createCalendar(year,month_no){
		
			var total_days = new Date(year,month_no+1,0).getDate();
			var day_no = new Date(year,month_no,1).getDay();
			
			//creating first row
			var calendar = "<table class='calendar'>";
			calendar = calendar + "<tr>";
			for (var i = 0;i<week.length;i++){
				calendar = calendar + "<th>" + week[i] + "</th>";
			}
			calendar = calendar + "</tr>";

			//creating second row
			for(var i = 0 ;i<day_no;i++){calendar = calendar + "<td class='empty'></td>";}
			count = 1;
			for(;i < 7;i++){
				var value = month_no + 1 + settings['separator'] + count + settings['separator'] + year;
				calendar = calendar + "<td class='not-empty'"+"value="+value+">" + count + "</td>";
				count++;
			}

			//creating other rows
			for(var i = 0;i<5;i++){
				if(count > total_days)break;
				calendar = calendar + "<tr>";	
				for(var j = 0;j < 7;j++){
					var value =  month_no + 1 + settings['separator'] + count + settings['separator'] + year;
					calendar = calendar + "<td class='not-empty'"+"value="+value+">" + count + "</td>";
					count++;
					if(count > total_days)break;
				}
				calendar = calendar + "</tr>";	
			}
			
			calendar = calendar + "</table>";
			$date_field.next().find(".calendar").remove();
			$date_field.next().append(calendar);
		}


		//handling focus in event of the element
		$date_field.click(function(evt){
			
			if(jQuery.trim($(this).val())==""){
				//getting current date
				 current_date = new Date();
				 current_year = current_date.getFullYear();
				 current_month_no = current_date.getMonth();
				 $date_field.next().find(".date-info .month").html(month[current_month_no]);
				 $date_field.next().find(".date-info .year").html(current_year);
				//calling the function createCalendar
				createCalendar(current_year,current_month_no);
				$date_field.next().show();
				$date_field.next().css('margin-left',$date_field.position().left-8 +"px");
			}else{

				 var temp_date = $date_field.val().split(settings['separator']);
				 var temp_month = 0;
				 var temp_day = 0;
				 var temp_year = 0;
				 if(temp_date.length == 3 && temp_date[0]!="" && temp_date[1] != "" && temp_date[2] != ""){				 
				 	temp_month = temp_date[0];
				 	temp_day = temp_date[1];
				 	temp_year = temp_date[2];
				 	if(temp_month > 12){
				 		temp_month = 12;
				 	}
				 	check_day = days_per_month[temp_month-1];
				 	if (temp_month == 2 && ((temp_year%400 == 0) || (temp_year%100 == 0) || (temp_year%4 == 0))){
				 		check_day = check_day + 1;
				 	}
				 	if(temp_day > check_day){
				 		temp_day = check_day;
				 	}
				 	current_date = new Date(temp_month + '/' + temp_day + '/' + temp_year);
				 	current_year = current_date.getFullYear();
					current_month_no = current_date.getMonth();
					$date_field.next().find(".date-info .month").html(month[current_month_no]);
					$date_field.next().find(".date-info .year").html(current_year);
					//calling the function createCalendar
					createCalendar(current_year,current_month_no);
					$date_field.next().show();
					$date_field.next().css('margin-left',$date_field.position().left-8 +"px");
				 }
				
			}
			
		});

		//handling keyup events
		$date_field.keyup(function(evt){
			
			if(jQuery.trim($(this).val()) == ""){
				//getting current date
				 current_date = new Date();
				 current_year = current_date.getFullYear();
				 current_month_no = current_date.getMonth();
				 $date_field.next().find(".date-info .month").html(month[current_month_no]);
				 $date_field.next().find(".date-info .year").html(current_year);
				//calling the function createCalendar
				createCalendar(current_year,current_month_no);
				$date_field.next().show();
				$date_field.next().css('margin-left',$date_field.position().left +"px");
			}else{

				 var temp_date = $date_field.val().split(settings['separator']);
				 var temp_month = 0;
				 var temp_day = 0;
				 var temp_year = 0;
				 if(temp_date.length == 3 && temp_date[0]!="" && temp_date[1] != "" && temp_date[2] != ""){
				 
				 	temp_month = temp_date[0];
				 	temp_day = temp_date[1];
				 	temp_year = temp_date[2];
				 	if(temp_month > 12){
				 		temp_month = 12;
				 	}
				 	check_day = days_per_month[temp_month-1];
				 	if (temp_month == 2 && ((temp_year%400 == 0) || (temp_year%100 == 0) || (temp_year%4 == 0))){
				 		check_day = check_day + 1;
				 	}
				 	if(temp_day > check_day){
				 		temp_day = check_day;
				 	}
				 	current_date = new Date(temp_month + '/' + temp_day + '/' + temp_year);

				 	current_year = current_date.getFullYear();
					current_month_no = current_date.getMonth();
					$date_field.val(temp_month + settings['separator'] + current_date.getDate() + settings['separator'] + temp_year);
					$date_field.next().find(".date-info .month").html(month[current_month_no]);
					$date_field.next().find(".date-info .year").html(current_year);

					//calling the function createCalendar
					createCalendar(current_year,current_month_no);
					$date_field.next().show();
					$date_field.next().css('margin-left',$date_field.position().left-8 +"px");
				 }
				 
			}
			
		});

		//hides the calendar on document click
		$(document).click(function(event){
			
			if(event.target != $date_field[0]){		
				$date_field.next().hide();
			}
		});
		

		//onclick on the date set the value to textfield
		$(document).on("click",".calendar td.not-empty",function(){
			if($date_field.next().find("table")[0] == $(this).closest("table")[0])
				$date_field.val($(this).attr("value"));
		});

		//previous month
		$(document).on("click",".date-info .prev",function(){
			if ($date_field.next().find(".date-info .prev")[0] == $(this)[0]){
				current_month_no = current_month_no - 1;
				if(current_month_no<0){
					current_month_no = 11;
					current_year = current_year - 1;
				}
				$date_field.next().find(".date-info .month").html(month[current_month_no]);
				$date_field.next().find(".date-info .year").html(current_year);
				createCalendar(current_year,current_month_no);
		    }
			
		});

		//next month
		$(document).on("click",".date-info .next",function(){
			if ($date_field.next().find(".date-info .next")[0] == $(this)[0]){
				current_month_no = current_month_no + 1;
				if(current_month_no>11){
					current_month_no = 0;
					current_year = current_year + 1;
				}
				$date_field.next().find(".date-info .month").html(month[current_month_no]);
				$date_field.next().find(".date-info .year").html(current_year);
				createCalendar(current_year,current_month_no);
		    }
			
		});

		//stopPropagation for
		$(document).on("click",".date-info",function(evt){
			evt.stopPropagation();
		});
	}
})(jQuery);

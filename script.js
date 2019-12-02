var theId = ""
$(document).ready(function() {
    var url_string =  window.location.href
    var url = new URL(url_string);
    theId = url.searchParams.get("id");

    var  bg_color = url.searchParams.get("bg_color");
    var  header_color = url.searchParams.get("header_color");
    var  text_color = url.searchParams.get("text_color");
    var  font_family = url.searchParams.get("font_family");
    var  font_weight = url.searchParams.get("font_weight");
    var  font_size = url.searchParams.get("font_size");

    //console.log(bg_color + "here...");
   
    //file:///home/ender/Desktop/iframe/index.html?id=28&bg_color=FFECF2&header_color=EFA2C1&font_family=Droid%20Serif&font-weight=400&font_size=13px   (example usage)
   $('#my-iframe').css("background", "#" + bg_color);
   $('#th').css("background", "#" + header_color);
   $(".buy_link_btn").css("background", "#" + header_color);
   $('#th').css("color", "#" + text_color);

   $('#my-iframe').css("font-family", font_family);
   $('#my-iframe').css("font-weight", font_weight);
   $('#my-iframe').css("font-size", font_size);

    fetchStatistics();
    fetchDescription();
    fetchSummary();
});

function fetchSummary() {
    $.ajax({
        url:"https://adspaces.co.zw/api/summary/detail/" + theId,
        type:"GET",
        success:function(response) {
            response = JSON.parse(response);
            title = response[0].title;
            summary = response[0].summary
            summasry_length = summary.length
            summary = summary.substring(32, summary.length - 11);
            $("#summary").text(summary);
       },
       error:function(){
       }
      });
}

function  fetchStatistics(){
    $.ajax({
        url:"https://adspaces.co.zw/api/statistics/detail/" + theId,
        type:"GET",
        success:function(response) {
            response = JSON.parse(response);
            output = []

            for (i = 0; i < response.length; i++) {  
                output.push(response[i].name)
            }
            $("#audience").text(output[0]);
            $("#twitter").text(output[1]);
            $("#facebook").text(output[2]);
            tmp = output[2];
            console.log("|" + tmp + "|");
            if(!output[0]) {
             $("#audience_container").hide();   
            }
            if(!output[1]) {
            $("#tw_container").hide();   
            }
            if(!output[2]) {
                $("#fb_container").hide();   
            }
       },
       error:function(){
       }
      });
}

function fetchDescription(){
    $.ajax({
        url:"https://adspaces.co.zw/api/mediakit/detail/" + theId,
        type:"GET",
        success:function(response) {
            response = JSON.parse(response);
            console.log(response);
            output = [];
            for (i = 0; i < response.length; i++) {  
                name = response[i].name
                file_type = response[i].file_type
                description = response[i].description
                price = response[i].price
                model = response[i].model
                row_id = response[i].id
                this_arr = [name, file_type, description, price, model];
                output.push(this_arr);
                item_no = i + 1
                var $row = $("#table_item").clone();
                $("#the_table").append($row);
                $("p.number", $row).text(item_no);
                $("p.t_name", $row).text(name);
                $("span.t_price", $row).text(price);
                $("p.t_model", $row).text(model);
                $("a.buy_link", $row).attr("href", "https://www.adspaces.co.zw/book/detail/" + theId + "/" + row_id);
                $row.show();
                $("#th").show();
            }
       },
       error:function(){
       }
      });
}


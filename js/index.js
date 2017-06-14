"use strict";

$(function(){ 

  $.get("html/main.html",function(data){
    $("#main").html(data);
  });

});
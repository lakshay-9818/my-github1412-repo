$(document).ready(function(){

    

    $("#a1").click(function(){
        $("#a3").removeClass("active");
        $("#edit").removeClass("active");        

        $("#a1").addClass("active");
        $("#profile").addClass("active");
    });

    $("#a3").click(function(){
        $("#a1").removeClass("active");
        $("#profile").removeClass("active");
        $("#a3").addClass("active");
        $("#edit").addClass("active");
      });
  
});



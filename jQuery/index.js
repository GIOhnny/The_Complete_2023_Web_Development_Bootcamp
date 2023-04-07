// Only if we used the script in head and not at the end of the file
// $(document).ready(function() {
//     $("h1").css("color", "red");
// });

$("button").on("click", function() {
    $("h1").animate({opacity: 0.5});
});
$(document).ready(function () {
    $('#lotto_types').change(function () {
        if ($(this).val() == '5') {
            $('.lotto6').css("visibility", "hidden");
            $('.lotto5').css("visibility", "visible");
        } else if ($(this).val() == '6') {
            $('.lotto5').css("visibility", "hidden");
            $('.lotto6').css("visibility", "visible");
        } else if ($(this).val() == 'none') {
            $('.lotto5').css("visibility", "hidden");
            $('.lotto6').css("visibility", "hidden");
        }
    })
})
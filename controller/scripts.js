$(document).ready(function () {
    $('#lotto_types').change(function () {
        if ($(this).val() == '5') {
            $('.lotto6').css("visibility", "hidden");
            $('.skandi').css("visibility", "hidden");
            $('.lotto5').css("visibility", "visible");
            $('.skandiv').css("visibility", "hidden");
            $('.inputs-title').css("visibility", "visible");
        } else if ($(this).val() == '6') {
            $('.lotto5').css("visibility", "hidden");
            $('.skandi').css("visibility", "hidden");
            $('.lotto6').css("visibility", "visible");
            $('.skandiv').css("visibility", "hidden");
            $('.inputs-title').css("visibility", "visible");
        } else if ($(this).val() == 'skandi') {
            $('.skandi').css("visibility", "visible");
            $('.lotto5').css("visibility", "hidden");
            $('.lotto6').css("visibility", "hidden");
            $('.skandiv').css("visibility", "visible");
            $('.inputs-title').css("visibility", "visible");
        } else if ($(this).val() == 'none') {
            $('.lotto5').css("visibility", "hidden");
            $('.lotto6').css("visibility", "hidden");
            $('.skandi').css("visibility", "hidden");
            $('.skandiv').css("visibility", "hidden");
            $('.inputs-title').css("visibility", "hidden");
        }
    })

    $('[name="machine_checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            $('#hand').attr('disabled', true);
        } else {
            $('#hand').attr('disabled', false);
        }
    });

    $('[name="hand_checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            $('#machine').attr('disabled', true);
        } else {
            $('#machine').attr('disabled', false);
        }
    });

    $('.send-button').click(function () {
        let selected_option = $('#lotto_types').val();
        let lotto5Array = [];
        let lotto6Array = [];
        let skandiArray = [];
        const numberPattern = /^[0-9,]*$/;

        if (selected_option == '5') {
            $('input[name^="input_number_lotto5"]').each(function () {
                lotto5Array.push($(this).val());
            });

            let lotto5ArrayString = '';
            let emptyCounter = 0;

            lotto5Array.map(number => {
                if (number == '') {
                    emptyCounter++;
                } else {
                    lotto5ArrayString += number + ','
                }
            });

            if (emptyCounter > 0) {
                Swal.fire({
                    title: 'Töltsd ki az összes mezőt!',
                    icon: 'info',
                    confirmButtonColor: '#19b243',
                    confirmButtonText: 'Értem'
                }).then((result) => {
                });

            } else {
                lotto5ArrayString = lotto5ArrayString.slice(0, -1);

                if (!(numberPattern.test(lotto5ArrayString))) {
                    Swal.fire({
                        title: 'A mezők csak számot tartalmazhatnak!',
                        icon: 'info',
                        confirmButtonColor: '#19b243',
                        confirmButtonText: 'Értem'
                    }).then((result) => {
                    });
                } else {
                    Swal.fire({
                        title: 'A nyerőszámaid:',
                        text: lotto5ArrayString,
                        icon: 'info',
                        confirmButtonColor: '#19b243',
                        confirmButtonText: 'Értem'
                    }).then((result) => {
                    });
                }
            }

        } else if (selected_option == '6') {
            $('input[name^="input_number_lotto6"]').each(function () {
                lotto6Array.push($(this).val());
            });

            let lotto6ArrayString = '';
            let emptyCounter = 0;

            lotto6Array.map(number => {
                if (number == '') {
                    emptyCounter++;
                } else {
                    lotto6ArrayString += number + ','
                }
            });

            if (emptyCounter > 0) {
                Swal.fire({
                    title: 'Töltsd ki az összes mezőt!',
                    icon: 'info',
                    confirmButtonColor: '#19b243',
                    confirmButtonText: 'Értem'
                }).then((result) => {
                });
            } else {
                lotto6ArrayString = lotto6ArrayString.slice(0, -1);

                if (!(numberPattern.test(lotto6ArrayString))) {
                    Swal.fire({
                        title: 'A mezők csak számot tartalmazhatnak!',
                        icon: 'info',
                        confirmButtonColor: '#19b243',
                        confirmButtonText: 'Értem'
                    }).then((result) => {
                    });
                } else {
                    Swal.fire({
                        title: 'A nyerőszámaid:',
                        text: lotto6ArrayString,
                        icon: 'info',
                        confirmButtonColor: '#19b243',
                        confirmButtonText: 'Értem'
                    }).then((result) => {
                    });
                }
            }

        } else if (selected_option == 'skandi') {
            $('input[name^="input_number_skandi"]').each(function () {
                skandiArray.push($(this).val());
            });

            let skandiArrayString = '';
            let emptyCounter = 0;

            skandiArray.map(number => {
                if (number == '') {
                    emptyCounter++;
                } else {
                    skandiArrayString += number + ','
                }
            });

            if (emptyCounter > 0) {
                Swal.fire({
                    title: 'Töltsd ki az összes mezőt!',
                    icon: 'info',
                    confirmButtonColor: '#19b243',
                    confirmButtonText: 'Értem'
                }).then((result) => {
                });
            } else {
                skandiArrayString = skandiArrayString.slice(0, -1);

                if (!(numberPattern.test(skandiArrayString))) {
                    Swal.fire({
                        title: 'A mezők csak számot tartalmazhatnak!',
                        icon: 'info',
                        confirmButtonColor: '#19b243',
                        confirmButtonText: 'Értem'
                    }).then((result) => {
                    });
                } else {
                    Swal.fire({
                        title: 'A nyerőszámaid:',
                        text: skandiArrayString,
                        icon: 'info',
                        confirmButtonColor: '#19b243',
                        confirmButtonText: 'Értem'
                    }).then((result) => {
                    });
                }
            }
        }
    });
});
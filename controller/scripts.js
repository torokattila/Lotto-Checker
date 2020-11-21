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

    $('input').keyup(function () {
        let index = $(this).index("input");
        if (this.value.length == this.maxLength) {
            $("input:eq(" + (index + 1) + ")").focus();
        }
    });

    $('.lotto5_input').keyup(function () {
        const numberPattern = /^[0-9,]*$/;

        if (!(numberPattern.test($(this).val()))) {
            $('.validation-message').fadeIn();
        } else {
            $('.validation-message').fadeOut();
        }
    });

    $('.lotto6_input').keyup(function () {
        const numberPattern = /^[0-9,]*$/;

        if (!(numberPattern.test($(this).val()))) {
            $('.validation-message').fadeIn();
        } else {
            $('.validation-message').fadeOut();
        }
    });

    $('.skandi_input').keyup(function () {
        const numberPattern = /^[0-9,]*$/;

        if (!(numberPattern.test($(this).val()))) {
            $('.validation-message').fadeIn();
        } else {
            $('.validation-message').fadeOut();
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
                let lottoNumbersFromPage = [];
                const url = 'https://www.lottoszamok.net/otoslotto/';
                let sameNumbersArray = [];
                let sameNumbersArraySet = new Set();

                xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", 'https://cors-anywhere.herokuapp.com/' + url, false);
                xmlhttp.send();
                parser = new DOMParser();
                const dom = parser.parseFromString(xmlhttp.responseText, "text/html");
                const listElements = dom.querySelectorAll('.szamok_nagy ul li span').values();

                for (value of listElements) {
                    lottoNumbersFromPage.push(value.innerText);
                }

                sameNumbersArray = lotto5Array.filter(obj => {
                    return lottoNumbersFromPage.indexOf(obj) !== -1;
                });

                sameNumbersArray.forEach(number => {
                    sameNumbersArraySet.add(number);
                });

                sameNumbersArraySet = Array.from(sameNumbersArraySet);

                if (!(numberPattern.test(lotto5ArrayString))) {
                    Swal.fire({
                        title: 'A mezők csak számot tartalmazhatnak!',
                        icon: 'info',
                        confirmButtonColor: '#19b243',
                        confirmButtonText: 'Értem'
                    }).then((result) => {
                    });
                } else {
                    if (sameNumbersArraySet.length == 0) {
                        Swal.fire({
                            html: '<h1>Sajnos nem találtál el egy számot sem! :(</h1><h2>A heti lottószámok:</h2>' + lottoNumbersFromPage + '<br>' + '<h2>A saját számaid:</h2><p>' + lotto5ArrayString + '</p>',
                            icon: 'info',
                            confirmButtonColor: '#19b243',
                            confirmButtonText: 'Értem'
                        }).then((result) => {
                        });
                    } else if (sameNumbersArraySet.length == 5) {
                        Swal.fire({
                            html: '<h1>Gratulálunk telitalálatod van!</h1><h2>A heti lottószámok:</h2>' + lottoNumbersFromPage + '<br>' + '<h2>A saját számaid:</h2><p>' + lotto5ArrayString + '</p>',
                            icon: 'success',
                            confirmButtonColor: '#19b243',
                            confirmButtonText: 'Értem'
                        }).then((result) => {
                        });
                    } else {
                        Swal.fire({
                            html: '<h1>Gratulálunk ' + sameNumbersArraySet.length + ' találatod van!</h1><p>A találataid: ' + sameNumbersArraySet + '</p><h2>A heti lottószámok:</h2>' + lottoNumbersFromPage + '<br>' + '<h2>A saját számaid:</h2><p>' + lotto5ArrayString + '</p>',
                            icon: 'success',
                            confirmButtonColor: '#19b243',
                            confirmButtonText: 'Értem'
                        }).then((result) => {
                        });
                    }

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
                let lottoNumbersFromPage = [];
                const url = 'https://www.lottoszamok.net/hatoslotto/';
                let sameNumbersArray = [];
                let sameNumbersArraySet = new Set();

                xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", 'https://cors-anywhere.herokuapp.com/' + url, false);
                xmlhttp.send();
                parser = new DOMParser();
                const dom = parser.parseFromString(xmlhttp.responseText, "text/html");
                const listElements = dom.querySelectorAll('.szamok_nagy ul li span').values();

                for (value of listElements) {
                    lottoNumbersFromPage.push(value.innerText);
                }

                sameNumbersArray = lotto6Array.filter(obj => {
                    return lottoNumbersFromPage.indexOf(obj) !== -1;
                });

                sameNumbersArray.forEach(number => {
                    sameNumbersArraySet.add(number);
                });

                sameNumbersArraySet = Array.from(sameNumbersArraySet);

                if (!(numberPattern.test(lotto6ArrayString))) {
                    Swal.fire({
                        title: 'A mezők csak számot tartalmazhatnak!',
                        icon: 'info',
                        confirmButtonColor: '#19b243',
                        confirmButtonText: 'Értem'
                    }).then((result) => {
                    });
                } else {
                    if (sameNumbersArraySet.length == 0) {
                        Swal.fire({
                            html: '<h1>Sajnos nem találtál el egy számot sem! :(</h1><h2>A heti lottószámok:</h2>' + lottoNumbersFromPage + '<br>' + '<h2>A saját számaid:</h2><p>' + lotto6ArrayString + '</p>',
                            icon: 'info',
                            confirmButtonColor: '#19b243',
                            confirmButtonText: 'Értem'
                        }).then((result) => {
                        });
                    } else if (sameNumbersArraySet.length == 6) {
                        Swal.fire({
                            html: '<h1>Gratulálunk telitalálatod van!</h1><h2>A heti lottószámok:</h2>' + lottoNumbersFromPage + '<br>' + '<h2>A saját számaid:</h2><p>' + lotto6ArrayString + '</p>',
                            icon: 'success',
                            confirmButtonColor: '#19b243',
                            confirmButtonText: 'Értem'
                        }).then((result) => {
                        });
                    } else {
                        Swal.fire({
                            html: '<h1>Gratulálunk ' + sameNumbersArraySet.length + ' találatod van!</h1><p>A találataid: ' + sameNumbersArraySet + '</p><h2>A heti lottószámok:</h2>' + lottoNumbersFromPage + '<br>' + '<h2>A saját számaid:</h2><p>' + lotto6ArrayString + '</p>',
                            icon: 'success',
                            confirmButtonColor: '#19b243',
                            confirmButtonText: 'Értem'
                        }).then((result) => {
                        });
                    }
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

            const url = 'https://www.lottoszamok.net/skandinav-lotto/';
            xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", 'https://cors-anywhere.herokuapp.com/' + url, false);
            xmlhttp.send();
            parser = new DOMParser();
            const dom = parser.parseFromString(xmlhttp.responseText, "text/html");
            const listElements = dom.querySelectorAll('.szamok_nagy ul li').values();
            let machineArray = [];
            let handArray = [];

            for (value of listElements) {
                if (value.innerText == 'Gépi:') {
                    continue;
                } else {
                    machineArray.push(value.innerText);
                    if (value.innerText == 'Kézi:') {
                        break;
                    }
                }
            }

            machineArray.pop();

            for (value of listElements) {
                handArray.push(value.innerText);
            }

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

                    if ($('[name="machine_checkbox"]').is(':checked')) {
                        let sameNumbersArray = [];
                        let sameNumbersArraySet = new Set();

                        sameNumbersArray = skandiArray.filter(obj => {
                            return machineArray.indexOf(obj) !== -1;
                        });

                        sameNumbersArray.forEach(number => {
                            sameNumbersArraySet.add(number);
                        });

                        sameNumbersArraySet = Array.from(sameNumbersArraySet);

                        if (sameNumbersArraySet.length == 0) {
                            Swal.fire({
                                html: '<h1>Sajnos nem találtál el egy számot sem! :(</h1><h2>A heti lottószámok:</h2>' + machineArray + '<br>' + '<h2>A saját számaid:</h2><p>' + skandiArrayString + '</p>',
                                icon: 'info',
                                confirmButtonColor: '#19b243',
                                confirmButtonText: 'Értem'
                            }).then((result) => {
                            });
                        } else if (sameNumbersArraySet.length == 7) {
                            Swal.fire({
                                html: '<h1>Gratulálunk telitalálatod van!</h1><h2>A heti lottószámok:</h2>' + machineArray + '<br>' + '<h2>A saját számaid:</h2><p>' + skandiArrayString + '</p>',
                                icon: 'success',
                                confirmButtonColor: '#19b243',
                                confirmButtonText: 'Értem'
                            }).then((result) => {
                            });
                        } else {
                            Swal.fire({
                                html: '<h1>Gratulálunk ' + sameNumbersArraySet.length + ' találatod van!</h1><p>A találataid: ' + sameNumbersArraySet + '</p><h2>A heti lottószámok:</h2>' + machineArray + '<br>' + '<h2>A saját számaid:</h2><p>' + skandiArrayString + '</p>',
                                icon: 'success',
                                confirmButtonColor: '#19b243',
                                confirmButtonText: 'Értem'
                            }).then((result) => {
                            });
                        }
                    }

                    if ($('[name="hand_checkbox"]').is(':checked')) {
                        let sameNumbersArray = [];
                        let sameNumbersArraySet = new Set();

                        sameNumbersArray = skandiArray.filter(obj => {
                            return handArray.indexOf(obj) !== -1;
                        });

                        sameNumbersArray.forEach(number => {
                            sameNumbersArraySet.add(number);
                        });

                        sameNumbersArraySet = Array.from(sameNumbersArraySet);

                        if (sameNumbersArraySet.length == 0) {
                            Swal.fire({
                                html: '<h1>Sajnos nem találtál el egy számot sem! :(</h1><h2>A heti lottószámok:</h2>' + handArray + '<br>' + '<h2>A saját számaid:</h2><p>' + skandiArrayString + '</p>',
                                icon: 'info',
                                confirmButtonColor: '#19b243',
                                confirmButtonText: 'Értem'
                            }).then((result) => {
                            });
                        } else if (sameNumbersArraySet.length == 7) {
                            Swal.fire({
                                html: '<h1>Gratulálunk telitalálatod van!</h1><h2>A heti lottószámok:</h2>' + handArray + '<br>' + '<h2>A saját számaid:</h2><p>' + skandiArrayString + '</p>',
                                icon: 'success',
                                confirmButtonColor: '#19b243',
                                confirmButtonText: 'Értem'
                            }).then((result) => {
                            });
                        } else {
                            Swal.fire({
                                html: '<h1>Gratulálunk ' + sameNumbersArraySet.length + ' találatod van!</h1><p>A találataid: ' + sameNumbersArraySet + '</p><h2>A heti lottószámok:</h2>' + handArray + '<br>' + '<h2>A saját számaid:</h2><p>' + skandiArrayString + '</p>',
                                icon: 'success',
                                confirmButtonColor: '#19b243',
                                confirmButtonText: 'Értem'
                            }).then((result) => {
                            });
                        }
                    }
                }
            }
        }
    });
});
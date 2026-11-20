function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}

function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

function modo_diestro_zurdo(){
    // Modo diestro por defecto; se guarda la elección del jugador
    let diestro = true;
    try { diestro = localStorage.getItem('mano') !== 'zurdo'; } catch (e) {}
    $('body').toggleClass('diestro', diestro);

    $('#mano').on('click', function () {
        diestro = !diestro;
        $('body').toggleClass('diestro', diestro);
        try { localStorage.setItem('mano', diestro ? 'diestro' : 'zurdo'); } catch (e) {}
    });
}

// Modo depuración: añade ?debug a la URL
if (new URLSearchParams(location.search).has('debug')) {
    $('body').addClass('debug');
    $(document).on('mousemove touchstart touchmove', function (e) {
        const p = e.touches ? e.touches[0] : e;
        const carta = $(document.elementFromPoint(p.clientX, p.clientY)).closest('.old-card');
        $('.debug-hit').not(carta).removeClass('debug-hit');
        carta.addClass('debug-hit');
    });
}

$(document).ready(function () {
    let z_index = 10;

    modo_diestro_zurdo();
    
    var tapCard = document.createElement('audio');
    tapCard.controls = true;
    tapCard.src = 'mp3/Deal-Single.mp3';

    var whooshCard = document.createElement('audio');
    whooshCard.controls = true;
    whooshCard.src = 'mp3/Deal-Single-Whoosh.mp3';

    let deck_of_cards = Array.from({ length: 52 }, (_, i) => i + 1);

    let used_deck_of_cards = [];
    let remaining_deck_of_cards = Array.from(deck_of_cards);
    //let remaining_deck_of_cards = Object.assign({}, deck_of_cards);

    var drag_options = {
        containment: "body"
        , zIndex: 1999
        , connectToSortable: ".sortable"
        , connectToDroppable: '.droppable'
        //,stack: ".old-card"
        , revert: "invalid"
        //,cursor: "grabbing"
        //,helper: 'clone'
        , start: function () {

            $(this).draggable("option", "cursorAt", {
                //left: Math.floor(this.clientWidth / 2),
                //top: Math.floor(this.clientHeight / 2)
            });
            z_index = z_index + 1;

           // //console.log($(this).css("z-index"));

            $(this).css("cursor", "grabbing");

            $(this).addClass("old-card-dragging-shadow");
            $(this).removeClass("old-card-shadow");
            whooshCard.play();
        }
        , stop: function () {
            $(this).removeClass("old-card-dragging-shadow");
            $(this).css({ zIndex: z_index });
            $(this).css("cursor", "grab");
            tapCard.play();
        }
    };

    // Guarda la sección oculta original de cada carta para poder devolverla al mazo
    $(".old-card").each(function () {
        $(this).data("origen", $(this).parent());
    });

    // Muestra tantos dorsos como cartas queden (máx. 5) y marca el mazo vacío
    function actualizarMazo() {
        /*
        let n = remaining_deck_of_cards.length;
        $(".old-card-back").each(function (i) {
            $(this).toggle(i < n);
        });
        $("#mazo").toggleClass("mazo-vacio", n === 0);
        */
        let n = remaining_deck_of_cards.length;
        let hayDescubiertas = $(".displayed-deck > .old-card").length > 0;
        $(".old-card-back").each(function (i) {
            $(this).toggle(i < n);
        });
        $("#mazo")
            .toggleClass("mazo-vacio", n === 0 && hayDescubiertas)
            .toggleClass("mazo-agotado", n === 0 && !hayDescubiertas);
    }

    // Devuelve bocabajo al mazo las cartas que siguen en .displayed-deck
    function reciclarMazo() {
        let cartas = $(".displayed-deck > .old-card");
        if (cartas.length === 0) {
            return;
        }
        cartas.each(function () {
            let card = $(this);
            let id = parseInt(card.attr("id").replace("card_", ""));
            remaining_deck_of_cards.push(id);
            used_deck_of_cards = arrayRemove(used_deck_of_cards, id);
            card.css({ top: "", left: "", zIndex: "" })
                .appendTo(card.data("origen"));
        });
        whooshCard.play();
        actualizarMazo();
    }

    //let count_new_cards = 0;
    $("#mazo").click(function () {

        let n_remaining_cards = remaining_deck_of_cards.length;
        //console.log("n_remaining_cards", n_remaining_cards);
        if (n_remaining_cards === 0) {
            reciclarMazo();
            return;
        }

        //console.log("cartas por usar:", remaining_deck_of_cards);

        let selected_index = getRandomArbitrary(0, n_remaining_cards);
        let selected_id = remaining_deck_of_cards.at(selected_index);


        if (typeof selected_id === 'undefined') {
            console.error("random index: ", selected_index);
        } else {
            //console.log("random index: ", selected_index);
        }
        //console.log("absolute card: ", selected_id);

        let selected_card = $('#card_' + selected_id);

        remaining_deck_of_cards.splice(selected_index, 1);

        used_deck_of_cards.push(parseInt(selected_id));

        //console.log("cartas usadas ya:", used_deck_of_cards);

        selected_card.appendTo(".displayed-deck");

        selected_card.css('position', 'absolute');

        selected_card.css('left', 'unset');
        // Siempre por encima de cualquier carta ya movida (las arrastradas usan z_index)
        z_index = z_index + 1;
        selected_card.css('z-index', z_index);
        selected_card.css('display', 'block');

        actualizarMazo();

    });

    $(".old-card").draggable(drag_options);

    // Fix out-of-containment glitch
    // $($drag.draggable('option').containment).on('mouseleave', () => $drag.trigger('mouseup')); 

    const ESCALON = matchMedia('(pointer: coarse)').matches ? '30%' : '20%';
    //const ESCALON_PALO = matchMedia('(pointer: coarse)').matches ? '17%' : '7%';
    let arr_card_number_names = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];


    $('.droppable .old-card').each((i, f) => console.log(
        f.id, '|', f.style.cssText, '| figure:', Math.round(f.getBoundingClientRect().height),
        '| picture:', Math.round(f.querySelector('picture').getBoundingClientRect().height)));

    $(".droppable-ordered").droppable({
        accept: function (drag) {
            //".old-card"
            //insert your code here
            //you can modify the draggable's properties by using $(drag)
            var card = $(drag);
            ////console.log(card);

            var type_card = card.children().attr('class');
            var attr_type_card = type_card.split('-');
            type_card = type_card.replaceAll(attr_type_card[0] + '-', '');

            ////console.log("type_card: ", type_card);
            var suit = $(this).attr('data-suit');
            ////console.log("accepted suit: ", suit);

            if (type_card !== suit) {
                //if(type_card!=='game-nooses'){
                return false;
            }

            ////console.log("this ordered stack: ", $(this).attr('id'));
            var this_id = $(this).attr('id');
            //$(this).css({filter: 'grayscale(0)',});
            var cardsInColumn = parseInt($('#' + this_id).find('.old-card-placed').length);
            ////console.log("cardsInColumn: ", cardsInColumn);



            //console.warn('attr_type_card[0]', attr_type_card[cardsInColumn]);
            // console.warn('arr_card_number_names[' + cardsInColumn + ']', arr_card_number_names[cardsInColumn]);

            if (attr_type_card[0] === arr_card_number_names[cardsInColumn]) {

                return true;
            }


            return false;
        },
        //revert: "invalid",
        classes: {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function (event, ui) {
            $(this).addClass("ui-state-highlight");
            var card = $(ui.draggable);
            var column = $(this);
            //console.log("column: ", column.attr('id'));
            //console.error("drop to column:", column);
            var cardsInColumn = column.find('.old-card-placed');
            //console.log("cardsInColumn: ", cardsInColumn.length);
            var n_cards = cardsInColumn.length;
            
            var top_position = (3 * n_cards) + 'px';
            
            if (n_cards > 11) {// >1 deja 3 cartas dentro. 
                $(this).droppable("disable");
            }

            ////console.log("top_position: ",top_position);
            ////console.log("card: ", card.attr('id'));

            var type_card = card.children().attr('class');
            var attr_type_card = type_card.split('-');
            type_card = type_card.replaceAll(attr_type_card[0] + '-', '');

            ////console.log("type_card: ", type_card);

            if (type_card === 'game-nooses') {
                //return "invalid";   
            }


            card.detach()
                .appendTo(column.last());

            card.removeClass();
            card.addClass('old-card-placed');
            card.draggable('disable');

            column.css({
                filter: 'grayscale(0)',
            });

            card.css({
                top: top_position,
                left: 'unset',
            });

        }
    });

    $(".droppable").droppable({
        //accept: ".old-card",
        accept: function (drag) {
            var card = $(drag);
            var column = $(this);
            ////console.log(card);

            var type_card = card.children().attr('class');
            var attr_type_card = type_card.split('-');
            type_card = type_card.replaceAll(attr_type_card[0] + '-', '');

            ////console.log("type_card: ", type_card);

            var cardsInColumn = column.find('.old-card');
            var n_cards = cardsInColumn.length;

            if (n_cards > 0) {
                var lastCard = column.find('.old-card:last');
                ////console.log("last_card", lastCard.attr('id'));

                var last_type_card = lastCard.children().attr('class');
                ////console.log(last_type_card);
                var last_attr_type_card = last_type_card.split('-');
                ////console.log(last_attr_type_card);
                var number_actual_card = arr_card_number_names.indexOf(attr_type_card[0]);
                var number_last_card = arr_card_number_names.indexOf(last_attr_type_card[0]);
                //console.warn("cards to place:", number_actual_card + '->' + number_last_card);

                last_type_card = last_type_card.replaceAll(last_attr_type_card[0] + '-', '');

                suit_colors = {
                    'game-nooses': 'blue',
                    'hound-tethers': 'blue',
                    'horns': 'red',
                    'dog-collars': 'red'
                }

                //console.warn("suits to place:", last_type_card + '->' + type_card);

                //si la carta anterior es mayor que la que se va a poner
                //si la diferencia de número sólo es de 1
                //si el palo es de color diferente (azul !== rojo)
                if (number_actual_card < number_last_card
                    && number_last_card - number_actual_card === 1
                    && suit_colors[type_card] !== suit_colors[last_type_card]) {

                    return true;

                } else {
                    return false;
                }

            }
            return true;
        },
        revert: "invalid",
        classes: {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function (event, ui) {
            $(this).addClass("ui-state-highlight");
            var card = $(ui.draggable);
            var column = $(this);

            var cardsInColumn = column.find('.old-card');
            if (cardsInColumn.length == 0) {
                card.detach()
                    .appendTo(column);

                card.css({
                    top: 0,
                    left: 'unset',
                });


            } else {
                ////console.log("positon top: ", $(this).position().top);
                card.detach()
                    .appendTo(cardsInColumn.last());

                card.css({
                    top: ESCALON, // proporcional al alto de la carta
                    left: 'unset',

                });
            }

        }
    });

});
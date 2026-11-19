<!DOCTYPE html>
<html lang="en" dir="ltr" class="">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Flemish Hunting Card Game - Solitaire</title>
    <meta name="title" content="Card Game" />
    <meta name="description" content="" />
    <meta name="author" content="Gordan N. Cajic" />

    <!-- ⚡️ 🥝 🍕 🍉 🌜 🌞 🌚🌵🌷 🍄🦝 🦋 💡 💎 🎁 👽 🤰🏻 🚻 🃏 -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 20 20'><text x='0' y='16'>🃏</text></svg>" />

    <link rel="stylesheet" href="css/normalize.css" />
    <link rel="stylesheet" href="css/tarot.css" />
    <link rel="stylesheet" href="css/flemish-hunting-deck.css" />
</head>

<body>
    <article>
        <section id="mazo" class="">
            <?php
            $remaining_cards = 5;
            $pos = $remaining_cards * $remaining_cards;
            for ($deck = 0; $deck < $remaining_cards; $deck++) {
                $pos = $pos - $remaining_cards;
                print '<figure id="old-card-back-' . ($deck + 1) . '" class="old-card-back old-card-shadow" title="back of the card"  style="position:absolute;z-index:' . $deck . ';top:' . $pos . 'px;"><picture class="back-card"></picture></figure>';
            }
            ?>
        </section>

        <section class="displayed-deck"></section>
        <section class="" style="visibility: hidden;"></section>
        <section id="ordered-game-nooses" class="droppable-ordered" data-suit="game-nooses"></section>
        <section id="ordered-hound-tethers" class="droppable-ordered" data-suit="hound-tethers"></section>
        <section id="ordered-horns" class="droppable-ordered" data-suit="horns"></section>
        <section id="ordered-dog-collars" class="droppable-ordered" data-suit="dog-collars"></section>

        <section class="droppable"></section>
        <section class="droppable"></section>
        <section class="droppable"></section>
        <section class="droppable"></section>
        <section class="droppable"></section>
        <section class="droppable"></section>
        <section class="droppable"></section>
    </article>

    <main class="flex-wrap">
        <?php
        $arr_suit = ['game nooses', 'hound tethers', 'horns', 'dog collars'];
        $arr_suit_class = ['game-nooses', 'hound-tethers', 'horns', 'dog-collars'];

        $arr_cards = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];

        $id_card = 0;
        for ($suit = 0; $suit < 4; $suit++) {
            $suit_name = $arr_suit[$suit];
            $suit_classname =  $arr_suit_class[$suit];
            print '<section class="flex-wrap suit-' . $suit_classname . '">';
            for ($card = 0; $card < 13; $card++) {
                $id_card++;
                $card_name = $arr_cards[$card];
                print '<figure id="card_' . $id_card . '" class="old-card old-card-shadow" data-title="' . $card_name . ' of ' . $suit_name . '" title="' . $card_name . ' of ' . $suit_name . '" ><picture class="' . $card_name . '-' . $suit_classname . '" ></picture></figure>';
            }
            print '</section>';
        }

        ?>
    </main>

    <!-- hay otro solitario que usa jquery, es FreeCell: https://github.com/gitbrent/FreecellJS/-->
    <script src="js/jquery-4.1.0.min.js"></script>
    <script src="js/jquery-ui-1.14.2.custom.min.js"></script>
    <script src="js/jquery.ui.touch-punch.min.js"></script>
    <script src="js/tarot.js"></script>
</body>
</html>
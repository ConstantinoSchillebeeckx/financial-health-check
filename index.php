<!doctype html>

<html lang="en">

    <head>

        <!-- CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="../slide_flow_dev/css/styles.css" />


        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body>

        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-8 col-sm-offset-2" id="slides">
                </div>
            </div>
        </div>

    </body>


    <!-- JS -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://d3js.org/d3.v3.min.js"></script>
    <script type="text/javascript" src="../slide_flow_dev/js/main.js"></script>

    <script> 
        // simple PHP directory scan for JSON files
        var json = 
        <?php
            $dir = 'dat/';
            $files = array_values( array_diff( scandir($dir), array('..', '.') ) ); 
            echo json_encode( preg_filter('/^/', $dir, $files) );
        ?> 
    </script>

    <script>
        jQuery( document ).ready(function() {
            var deck = new SlideDeck('#slides', json);
            console.log(deck)
            deck.show();
        });
    </script>

</html>

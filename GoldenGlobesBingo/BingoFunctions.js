Array.prototype.has=function(v){
    for (i=0;i<this.length;i++){
        if (this[i]==v) return true;
    }
    return false;
}

$(document).ready(function(){
        var masks = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096,
                     8192, 16384, 32768, 65536, 131072, 262144, 524288,
                     1048576, 2097152, 4194304, 8388608, 16777216]

        var terms = ["Tom Hanks reaction shot", "Tripping on the stage", "F-Bombs in Wolf of Wall St", "Bleeped out profanity", "Wardrobe malfunction",
                      "Shots of people drinking", "Effusive love for Emma Thompson", "Kevin Spacey aside to camera", "Jennifer Lawrence being awesome", "Joke about falling in love with a computer",
                      "Reaction shot to the one person not laughing", "The realization Bryan Cranston is actually funny", "Someone stumbling drunk in the back rows", "Will Ferrel inexplicably in character as Ron Burgundy", "Impromptu Saturday Night Live reunion",
                      "Trash-talking other nominees", "Technical difficulties...", "Interacting with the audience",
                      "George Clooney's new date", "Accidental photo-bombing", 
                      "Totally on-purpose photo-bombing", "Totally inappropriate joke", "A Rob Ford joke",
                      "Losing nominee makes a face"];

        var dialog_bingo = $("#dialog-bingo").dialog({modal: true, resizable: false, autoOpen: false});
        var lines = [false, false, false, false, false];
        var columns = [false, false, false, false, false];
        var diagonals = [false, false];
        var number_bingos = Number.MAX_VALUE;

        init();

        function init() {
            var seed = window.location.hash.replace(/-.*/, '');

            if(seed == '#735078') {
                window.location = window.location.pathname;
            } else if (seed == '') {
                seed = '#' + Math.floor(Math.random() * 1000000);
                window.location = window.location + seed;
            }

            var mask = parseInt(window.location.hash.replace(seed + '-', ''), 16);
            maskTocard(mask);

            checkBingo();
            number_bingos = getNumberBingos();

            //$('#new-card').attr('href', window.location.href.replace(/#.*/g, ''));
            $('#new-card').click(function(){                      
                window.location = window.location.pathname;
            });

            fillCards(seed);
        }

        function cardToMask() {
            var mask = 0;

            for (var i = 0; i <= 24; i++) {
                if ($('#cell'+i).hasClass('active'))
                    mask |= masks[i];
            }

            return mask;
        }

        function maskTocard(mask) {
            for (var i = 0; i <= 24; i++) {
                if (mask & masks[i])
                    $('#cell'+i).addClass('active');
            }
        }

        function fillCards(seed){
            Math.seedrandom(seed);
            var shuffle = function() { return 0.5 - Math.random(); };
            var terms_shuffled = terms.sort(shuffle);

            for(var i = 0; i<=24; i++){
                if (i != 12){
                    $('#cell'+i).html(terms[i]);
                } else {
                    $('#cell'+i).addClass('active');    
                }
            }
            q = i-1;
            $('#cell'+ q).html(terms[12]);
        }

        function bingo() {
            if (number_bingos >= getNumberBingos())
                return;
            number_bingos = getNumberBingos();

            var lines_message = getNumberlines() > 0 ? getNumberlines() + " line(s)" : "";
            var columns_message = getNumbercolumns() > 0 ? getNumbercolumns() + " column(s)" : "";
            var diag_message = getNumberdiagonal() > 0 ? getNumberdiagonal() + " diagonal(s)" : "";
            var result_message = "";
            if (columns_message && diag_message && lines_message)
                result_message += lines_message + " and " + columns_message + " and " + diag_message;
            else if (lines_message && columns_message)
                result_message += lines_message + " and " + columns_message;
            else if (lines_message && diag_message)
                result_message += lines_message + " and " + diag_message;
            else if (columns_message && diag_message)
                result_message += columns_message + " and " + diag_message;
            else
                result_message += lines_message + columns_message + diag_message;

            var tweet_message = "Bingo! I just got " + result_message + " on #CanadaComBingo!";
            var dialog_message = "<p>Congratulations! You made " + result_message + "!<br/>";

            if (number_bingos == 12) {
                tweet_message = "BINGO! You finished the whole card! #RobFordBingo";
                dialog_message = "<p><strong>Congratulations!</strong> You've completed a whole card!<br/>";
            }

            tweet_message += " o.canada.com/entertainment/celebrity/the-golden-globe-awards-play-golden-globes-bingo-with-canada-com/";
            tweet_message = urlencode(tweet_message);
            var tweet_url = "https://twitter.com/intent/tweet?status=" + tweet_message + "&via=@TheCanadaCom";

            var facebook_dialog = '<a href="http://www.facebook.com/sharer.php?u=o.canada.com/entertainment/celebrity/the-golden-globe-awards-play-golden-globes-bingo-with-canada-com/&t=I%20just%20got%20a%20BINGO!" target="new"><img src="http://0.tqn.com/d/homerenovations/1/0/B/b/-/-/FacebookLogo35x35.jpg" alt="Facebook" align="middle" width="35"></a>';
            var twitterimage = "https://blog.twitter.com/sites/all/themes/gazebo/img/twitter-bird-white-on-blue.png"
            var facebookimage = "http://0.tqn.com/d/homerenovations/1/0/B/b/-/-/FacebookLogo35x35.jpg"
            dialog_message += '<p>Share the good news!</p><p><a href=' + tweet_url + ' target="new"><img src="' + twitterimage + '" alt="Twitter" width="35" align="middle"></a>    ' + facebook_dialog + '</p>';
            $('#dialog-bingo').html(dialog_message);

            dialog_bingo.dialog('open');
            
        }

        function getNumberBingos() {
            return getNumberlines() + getNumbercolumns() + getNumberdiagonal();
        }

        function getNumberlines() {
            var result = 0;
            for (var i = 0; i < lines.length; i++)
                if (lines[i])
                    result++;

            return result;
        }

        function getNumbercolumns() {
            var result = 0;
            for (var i = 0; i < columns.length; i++)
                if (columns[i])
                    result++;

            return result;
        }
        
        function getNumberdiagonal(){
            var result = 0;
            for (var i = 0; i < diagonals.length; i++)
                if (diagonals[i])
                    result++;
                                 
            return result;
        }

        function urlencode(str) {
            str = (str+'').toString();
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
                                           replace(/\)/g, '%29').replace(/\*/g, '%2A');
        }

        function checkBingo() {
            for (var i = 0; i <= 4; i++) {
                lines[i] = true;
                for (var j = i; j <= 24; j += 5) {
                    if (!($('#cell'+j).hasClass('active')))
                        lines[i] = false;
                }
            }

            for (var i = 0; i <= 20; i += 5) {
                columns[i / 5] = true;
                for (var j = i; j <= i + 4; j++) {
                    if (!($('#cell'+j).hasClass('active')))
                        columns[i / 5] = false;
                }
            }
            
                    diagonals[0] = true;
                    for (var j = 0; j <= 24; j += 6) {
                    if (!($('#cell'+j).hasClass('active')))
                        diagonals[0] = false;
                  }
                    diagonals[1] = true;
                    for (var j = 4; j <= 20; j += 4) {
                    if (!($('#cell'+j).hasClass('active')))
                        diagonals[1] = false;
                    }
                
            

            if (lines.has(true) || columns.has(true) || diagonals.has(true))
                bingo();
        }
        
        $('#bingoHolder td').click(function(){
                $(this).toggleClass('active');
                $('#cell12').addClass('active');
                var mask = cardToMask().toString(16);
                var href_without_mask = window.location.href.replace(/-.*/g, '');
                window.location.href = href_without_mask + '-' + mask;

                checkBingo();
                
         });


        
        $('.button').button();
        
});
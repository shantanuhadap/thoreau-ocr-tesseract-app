function searchWord(event) {
    var lineBefore = '';
    var lines = text.split("\n");
    var results = '';
    count = 0;
    for (var i = 0; i < lines.length; i++) {
        line = lines[i];
        words = line.split(" ");
        for (var j = 0; j < words.length; j++) {
            word = words[j];
            searchWord = document.getElementById("searchWord").value;
            if (word.toLowerCase().trim() == searchWord.toLowerCase().trim()) {
                count++;
                //div =document.getElementById("myTextArea");
                //para = lineBefore  + line + lines[i+1];
                //str = "<div class='post-preview'><a><h2 class='post-title'>"+para+"</h2></a><p class='post-meta'>Posted by<a href='#'>Start Bootstrap</a>on September 18, 2019</p></div>";
                //div.insertAdjacentHTML( 'beforeend', str );
            }
        }
        lineBefore = line;
    }
    document.getElementById("lineCount").innerText(count + " instances found");
    event.preventDefault();
}

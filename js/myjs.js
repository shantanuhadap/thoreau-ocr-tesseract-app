var text = 'text';

function onFileLoad(elementId, event) {
    text = event.target.result;
}
function onChooseFile(event, onLoadFileHandler) {
    if (typeof window.FileReader !== 'function')
        throw ("The file API isn't supported on this browser.");
    let input = event.target;
    if (!input)
        throw ("The browser does not properly implement the event object");
    if (!input.files)
        throw ("This browser does not support the `files` property of the file input.");
    if (!input.files[0])
        return undefined;
    let file = input.files[0];
    let fr = new FileReader();
    fr.onload = onLoadFileHandler;
    fr.readAsText(file);
}
function searchWordDocument(event){
         
    var lineBefore = '';
    var lines = text.split("\n");
    var results = '';
	const regex = RegExp('Page-*');
    var count =0;
    document.getElementById("unordlist").innerHTML =  "";        

	var page="";
	
    for(var i = 0;i < lines.length;i++){
        
        line = lines[i];
        words = line.split(" ");
		
        for(var j = 0;j < words.length;j++){

            word = words[j];
            searchWord = document.getElementById("searchKey").value;
			
			if(word.match("Page-*")!=null){
				page=word;
			}
			
            if(word.toLowerCase().trim()==searchWord.toLowerCase().trim())
            {

                count++;
                para = lineBefore  + line + lines[i+1];
                str = 
                "<li class='job-listing d-block d-sm-flex pb-3 align-items-center'> \
                <div style='padding:15px'> \
                    <p style='color:#000000'>"+para+"</p> \
					<p>"+page+"</p> \
                </div> \
                </li>";
                
                document.getElementById("unordlist").innerHTML +=  str;
                
            }

 
        }

        lineBefore = line;
    }

    document.getElementById("lineCount").innerHTML = count+" instances found";

    // event.preventDefault(); 

    if(count>0)
    {
        document.getElementById("saveBtn").style.visibility="visible";  
    }
    else
    {
        document.getElementById("saveBtn").style.visibility="hidden";  
    }

    }

    function Export2Doc(element, filename = ''){
        var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
        var postHtml = "</body></html>";
        var html = preHtml+document.getElementById(element).innerHTML+postHtml;
    
        var blob = new Blob(['\ufeff', html], {
            type: 'application/msword'
        });
        
        // Specify link url
        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
        
        // Specify file name
        filename = filename?filename+'.doc':'document.doc';
        
        // Create download link element
        var downloadLink = document.createElement("a");
    
        document.body.appendChild(downloadLink);
        
        if(navigator.msSaveOrOpenBlob ){
            navigator.msSaveOrOpenBlob(blob, filename);
        }else{
            // Create a link to the file
            downloadLink.href = url;
            
            // Setting the file name
            downloadLink.download = filename;
            
            //triggering the function
            downloadLink.click();
        }
        
        document.body.removeChild(downloadLink);
    }


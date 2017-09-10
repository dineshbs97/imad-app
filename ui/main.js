 
 // Counter code
 var button = document.getElementById('counter');
  
  button.onclick = function () {
  
      //Create a request object
      var request = new XMLHttpRequest();
      
      // capture the request and store in a variable
      request.onsteadystatechange = function () {
                  if(request.readystate===XMLHttpRequest.Done){
                            //Take some action
                            if(request.status===200){
                               var counter = request.responseText;
                               var span = document.getElementById('count');
                               span.innerHTML = counter.toString();
                            }
                        }
            //Not yet Done
          };
      //Make the Request
      request.open('GET','http://dineshbs97.imad.hasura-app.io', true);
      request.send( null );
    
  };
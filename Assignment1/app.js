
var a = [7000,7001,7002,7003,7004,7005, 7006, 7007, 7008, 7009, 7010];

function myFunction(){

  const element = document.getElementById("key").value;

  switch(element){
    case element.includes(',') : 
          var number = element.split(',').map(function(b){
              parseInt(b)
          }); 
        number.forEach(function(c){
          if(a.indexOf(c) !== -1){
        alert("entered number is correct");          
        } else {
          alert ("entered number is incorrect");
        }
        })
        break;
      
    case element.includes('-') : 
      var range = element.split('-');
      for(var i=range[0]; i < range[1]; i++){
        
        var number = element.split(',').map(function(b){
              parseInt(b)
          }); 
        number.forEach(function(c){
          if(a.indexOf(c) !== -1){
        alert("entered number is correct");          
        } else {
          alert ("entered number is incorrect");
        }
        })
      
      }
      break;
      
      default :  if(a.indexOf(parseInt(element)) !== -1)
      {
        alert("entered number is correct");          
        } else {
          alert ("entered number is incorrect");
      } 
  }
}
  

  
  
  
  
  
  
  
  
  
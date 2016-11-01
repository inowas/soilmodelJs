<!DOCTYPE html>
<meta charset="utf-8"/>
<html>
<body>

<p id="demo">Display the result here.</p>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script>
function dataFromFormular(formula){
    var output=[];
    for(var x=-1;x<1;x++){
      var f0=[]
      output.push(f0);
      for(var y=-1;y<1;y++){
          f0.push(formula(x,y));
      }
    }
    return output;
  }
document.getElementById("demo").innerHTML = dataFromFormular(function(x,y){
          return Math.sin(Math.sqrt(x*x+y*y)/5*Math.PI)*50;
        });

function datafromCSV(){
var datao = [];
d3.csv("cities.csv", function(d) {
  return {
    city : d.city,
    state : d.state,
    population : +d.population,
    land_area : +d["land area"]
  };
}, function(data) {
  datao = data;
});
return datao;
}
document.getElementById("demo").innerHTML = datafromCSV();

</script>

</body>
</html>
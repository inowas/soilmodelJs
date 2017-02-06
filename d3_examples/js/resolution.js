/**
 * Created by raman on 05/02/2017.
 */
function resolution(dataset, alter, method) {
    var output=[];
    var xlength = dataset.length;
    var x_add= (xlength-(xlength%30))/10;
    for (var x= 0;x<xlength; x=x+x_add){
        var fo=[];
        var ylength = dataset[0].length;
        var y_add= (ylength-(ylength%30))/10;
        output.push(fo);
        for (var y= 0; y<ylength;y=y+y_add){
            var f1= dataset[x];
            var val = 0.;
            if (method == "mean") {
                for (var i = y; i < y + y_add; i = i + 1) {
                    val = val + f1[i];
                }
                fo.push(-(val/y_add)+alter);
            } else if (method == "highest") {
                for (var j = y; j < y + y_add; j = j + 1) {
                    if (Math.abs(f1[j]) > Math.abs(val)) {val = f1[j]};
                }
                fo.push(-val+alter);
            } else {
                fo.push(-f1[y] + alter);
            }
        }
    }
    return output;
}


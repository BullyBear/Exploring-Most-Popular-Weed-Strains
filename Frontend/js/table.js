

// table();


function table() {


console.log("table");


d3.selectAll("#myTable")
            .style("opacity", 1);

d3.selectAll("#country")
            .style("opacity", 1);

d3.selectAll("#state")
            .style("opacity", 1);

d3.selectAll("#city")
            .style("opacity", 1);

d3.selectAll("#hybridButton")
            .style("opacity", 1);

d3.selectAll("#sativaButton")
            .style("opacity", 1);

d3.selectAll("#indicaButton")
            .style("opacity", 1);

d3.selectAll("#sliderLabel")
            .style("opacity", 1);

d3.selectAll("#sliderAmount")
            .style("opacity", 1);

d3.selectAll("#slider-range")
            .style("opacity", 1);

d3.selectAll("#myInput")
            .style("opacity", 1);


var colorScheme = d3.scale.ordinal()
// var colorScheme = d3.scaleOrdinal()
                    .domain(["USA", "PRI", "CAN"])
                    .range(["#d52922", "#d69105", "#4b7ba1"]);


var jobsCsvData = null;

// d3.csv("master_info_final_v12_conversion.csv").then(function(data) {
d3.csv("/Backend/python_scripts/assets/data/master_info_final_v12_conversion.csv", function(data) {


  // Read in Data
  data.forEach(function(d) {
        d["index"] = d["index"];
        d["name"] = d["name"];
        d["review_count"] = +d["review_count"];
        d["review_count_final"] = +d["review_count_final"];
        d["phenotype"] = d["phenotype"];
        d["thc"] = +d["thc"];
        d["cbd"] = +d["cbd"];
        d["imgurl"] = d["imgurl"];
        d["img_url_two"] = d["img_url_two"];
        d["herbal"] = d["herbal"];
        d["peppery"] = d["peppery"];
        d["pine"] = d["pine"];
        d["hotspot"] = d["hotspot"];
        d["latitude"] = +d["latitude"];
        d["longitude"] = +d["longitude"];
        d["city"] = d["city"];
        d["state"] = d["state"];
        d["country"] = d["country"];
        d["zip"] = +d["zip"];
        d["address_total"] = d["address_total"];
        d["address_blank"] = +d["address_blank"];
        d["ADHD"] = +d["ADHD"];
        d["Anorexia"] = +d["Anorexia"];
        d["Anxiety"] = +d["Anxiety"];
        d["Anxious"] = +d["Anxious"];
        d["Anxiety_Combined"] = +d["Anxiety_Combined"];
        d["Aroused"] = +d["Aroused"];
        d["Arthritis"] = +d["Arthritis"];
        d["Asthma"] = +d["Asthma"];
        d["Cancer"] = +d["Cancer"];
        d["Cramps"] = +d["Cramps"];
        d["Creative"] = +d["Creative"];
        d["Depression"] = +d["Depression"];
        d["Dizzy"] = +d["Dizzy"];
        d["Energetic"] = +d["Energetic"];
        d["Epilepsy"] = +d["Epilepsy"];
        d["Euphoric"] = +d["Euphoric"];
        d["Fatigue"] = +d["Fatigue"];
        d["Fibromyalgia"] = +d["Fibromyalgia"];
        d["Focused"] = +d["Focused"];
        d["Giggly"] = +d["Giggly"];
        d["Happy"] = +d["Happy"];
        d["Happy_Modified"] = +d["Happy_Modified"];
        d["Headache"] = +d["Headache"];
        d["Headaches"] = +d["Headaches"];
        d["Headache_Combined"] = +d["Headache_Combined"];
        d["Hungry"] = +d["Hungry"];
        d["Hypertension"] = +d["Hypertension"];
        d["Inflammation"] = +d["Inflammation"];
        d["Insomnia"] = +d["Insomnia"];
        d["Migraines"] = +d["Migraines"];
        d["Nausea"] = +d["Nausea"];
        d["PMS"] = +d["PMS"];
        d["PTSD"] = +d["PTSD"];
        d["Pain"] = +d["Pain"];
        d["Paranoid"] = +d["Paranoid"];
        d["Relaxed"] = +d["Relaxed"];
        d["Seizures"] = +d["Seizures"];
        d["Sleepy"] = +d["Sleepy"];
        d["Spasticity"] = +d["Spasticity"];
        d["Stress"] = +d["Stress"];
        d["Talkative"] = +d["Talkative"];
        d["Tingly"] = +d["Tingly"];
        d["Uplifted"] = +d["Uplifted"];
        d["Appetite"] = +d["Appetite"];
        d["Disease"] = +d["Disease"];
        d["Headaches"] = +d["Headaches"];
        d["Disorder"] = +d["Disorder"];
        d["Eyes"] = +d["Eyes"];
        d["Injury"] = +d["Injury"];
        d["Mouth"] = +d["Mouth"];
        d["Pressure"] = +d["Pressure"];
        d["Sclerosis"] = +d["Sclerosis"];
        d["Spasms"] = +d["Spasms"];
});


  JobsCsvData = data;





////////////////////////////////////////////////// Create Dropdowns



 var nestedTwo = d3.nest()
    .key(function(d) {
      // return d.COMPANY;
      return d.country;
    })
    .key(function(d) {
      // return d.CATEGORY;
      return d.state;
    })
    .key(function(d) {
      // return d.SOC_TITLE;
      return d.city;
    })
    .entries(data);

  console.log('nestedTwo', nestedTwo);


  function updateLocationValues(g) {
    var filtered = filtered2[0].values.filter(function(d) {
        return d.key == g;
      });

      var options5 = d3.select("#select5")
        .selectAll("option")
        .data(filtered[0].values.map(function(d) {
        //.data(filtered3[0].values.map(function(d) {
          return d.key;
        }));

      options5.exit().remove();

      // options5.enter()
      //   .append("option")
      //   .merge(options5)
      //   .text(function(d) {
      //     return d;
      //   });
      //   tabulate(data);

      options5.enter()
        .append("option");

      options5.attr("id", "options5")
        .text(function(d) {
          return d;
        });
        tabulate(data);

  }


  // Set up data selection box for group1
  var select3 = d3.select("#country-dropdown")
    .append("select")
    .attr("class", "selectTable")
    .attr("id", "select3")
    .on("change", function() {

      // Change the selection box for group2, dependent on the group1 selection
      var g = this.value;
      filtered2 = nestedTwo.filter(function(d) {
        return d.key == g;
      });

      var options4 = d3.select("#select4")
        .selectAll("option")
        .data(filtered2[0].values.map(function(d) {
        //.data(filtered2[0].values.map(function(d) {
          return d.key;
        }));

      options4.exit().remove();

      // options4.enter()
      //   .append("option")
      //   .merge(options4)
      //   .text(function(d) {
      //     return d;
      //   });

      options4.enter()
        .append("option");

      options4.attr("id", "options4")
        .text(function(d) {
          return d;
        });


       updateLocationValues($('#select4').val());

    });



  // Options for group 1 selection menu
  var options3 = d3.select("#select3")
    .selectAll("option")
    .data(nestedTwo.map(function(d) {
      return d.key;
    })).enter()
    .append("option")
    .text(function(d) {
      return d;
    });



  // Setup initial selection box for group 2
  //var select4 = d3.select("#selectButton")
  var select4 = d3.select("#state-dropdown")
    .append("select")
    .attr("class", "selectTable")
    .attr("id", "select4")
    .on("change", function(){
       // Change the selection box for group2, dependent on the group1 selection
      var g = this.value;
      updateLocationValues(g);
    });



  var select5 = d3.select("#city-dropdown")
  //var select5 = d3.select("#selectButton")
    .append("select")
    .attr("class", "selectTable")
    .attr("id", "select5")
    //.on("change", onchange);
    .on("change", tabulate);



  // Initial options for group 2 selection menu
  var filtered2 = nestedTwo.values.filter(function(d) {
  // var filtered2 = nestedTwo.filter(function(d) {
    return d.key == "USA";
  });



  var filtered3 = filtered2[0].values.filter(function(d) {
    return d.key == "AK";
  });




  var options4 = d3.select("#select4")
    .selectAll("option")
    .data(filtered2[0].values.map(function(d) {
      return d.key;
    })).enter()
    .append("option")
    .text(function(d) {
      return d;
    });

 var options5 = d3.select("#select5")
    .selectAll("option")
    .data(filtered3[0].values.map(function(d) {
      return d.key;
    })).enter()
    .append("option")
    .text(function(d) {
      return d;
    });



///////////////////////////////////////////////////////////////////// Render Table



// var cityTitleMetrics = d3.nest()
//             // .key(function(d) { return d.SOC_TITLE; })
//             .key(function(d) { return d.city; })
//             .rollup(function(v) {
//               return {
//                  count: v.length,
//                  min: d3.min(v, function(d) { return d.MIN; }),
//                  // q1: d.QONE,
//                  // q2: d.QTWO,
//                  // q3: d.QTHREE,
//                 mean: d3.mean(v, function(d) { return d.MEAN; }),
//                 max: d3.max(v, function(d) { return d.MAX; })
//               };
//             })
//             .entries(data);




var allGroupTwo = d3.map(data, function(d){return(d.city)}).keys()
var allGroupThree = d3.map(data, function(d){return(d.name)}).keys()



console.log('allGroupTwo[0]', allGroupTwo[0]);
console.log('allGroupThree[0]', allGroupThree[0]);




function formatKey(value, key) {
    // if (['JOB_TITLE', 'COUNT'].indexOf(key) > -1 || value === ' - ') {
    // if (['name', 'review_count_final'].indexOf(key) > -1 || value === ' - ') {
    //     return value;
    // }
    // return '$ ' + value.toLocaleString('en');
    return value.toLocaleString('en');
}


//function tabulate(data, newColumn) {
function tabulate(data, columns) {
    var country = $('#select3').val();
    var state = $('#select4').val();
    var city = $('#select5').val();
    var rows = [];
    var intMax = 9007199254740991
    var sumRow = {
        // 'JOB_TITLE': socTitle,
        // 'COUNT': 0,
        // 'MIN': intMax,
        // 'QONE': intMax,
        // 'QTWO': intMax,
        // 'MEAN': 0,
        // 'QTHREE': intMax,
        // 'MAX': 0
        'name': city,
        'review_count_final': 0,
        'rating': intMax,
        'phenotype': "",
        'thc': intMax,
        'cbd': intMax,
        'ADHD': intMax,
        'Anorexia': intMax,
        'Anxiety': intMax,
        'Anxious': intMax,
        'Aroused': intMax,
        'Arthritis': intMax,
        'Asthma': intMax,
        'Cancer': intMax,
        'Cramps': intMax,
        'Creative': intMax,
        'Depression': intMax,
        'Dizzy': intMax,
        'Energetic': intMax,
        'Epilepsy': intMax,
        'Euphoric': intMax,
        'Fatigue': intMax,
        'Fibromyalgia': intMax,
        'Focused': intMax,
        'Giggly': intMax,
        'Happy': intMax,
        'Headache': intMax,
        'Headaches': intMax,
        'Hungry': intMax,
        'Hypertension': intMax,
        'Inflammation': intMax,
        'Insomnia': intMax,
        'Migraines': intMax,
        'Nausea': intMax,
        'PMS': intMax,
        'PTSD': intMax,
        'Pain': intMax,
        'Paranoid': intMax,
        'Relaxed': intMax,
        'Seizures': intMax,
        'Sleepy': intMax,
        'Spasticity': intMax,
        'Stress': intMax,
        'Talkative': intMax,
        'Tingly': intMax,
        'Uplifted': intMax,
        'Appetite': intMax,
        'Disease': intMax,
        'Disorder': intMax,
        'Eyes': intMax,
        'Injury': intMax,
        'Mouth': intMax,
        'Pressure': intMax,
        'Sclerosis': intMax,
        'Spasms': intMax
    };

    JobsCsvData.forEach(function(row) {
        if (row['country'] === country && row['state'] === state && row['city'] === city) {
            rows.push(row);

            // sumRow.COUNT += row.COUNT;
            sumRow.review_count_final =+ row.review_count_final;

            // ['MIN', 'QONE', 'QTWO', 'QTHREE'].forEach(function(key) {
            ['rating', 'phenotype', 'thc', 'cbd', 'ADHD', 'Anorexia', 'Anxiety', 'Anxious', 'Aroused', 'Arthritis', 'Asthma', 'Cancer', 'Cramps', 'Creative',
            'Depression', 'Dizzy', 'Energetic', 'Epilepsy', 'Euphoric', 'Fatigue', 'Fibromyalgia', 'Focused', 'Giggly', 'Happy', 'Headache', 'Headaches',
            'Hungry', 'Hypertension', 'Inflammation', 'Insomnia', 'Migraines', 'Nausea', 'PMS', 'PTSD', 'Pain', 'Paranoid', 'Relaxed', 'Seizures', 'Sleepy',
            'Spasticity', 'Stress', 'Talkative', 'Tingly', 'Uplifted', 'Appetite', 'Disease', 'Disorder', 'Eyes', 'Injury', 'Mouth', 'Pressure',
            'Sclerosis', 'Spasms'].forEach(function(key) {

                if (row[key] < sumRow[key]) {
                    sumRow[key] = row[key]
                }

            });

            // sumRow.MEAN += row['MEAN'];
            // if (row.MAX > sumRow.MAX) {
            //     sumRow.MAX = row.MAX;
            // }
        }
    });

    // if (rows.length > 0) {
    // sumRow.MEAN = Math.round(sumRow.MEAN / rows.length);
    // }



    // rows.unshift(sumRow);                  // ADD BACK IN ? 

    $('.csv-data-body').html('');

    rows.forEach(function(row, index) {
        var content = '<tr>';
        // if (index == 0) {
        //   backgroundColor = colorScheme($('#select3').val())
        //     content = '<tr style="background:' + backgroundColor + '">'
           
        // }

        // ['JOB_TITLE', 'COUNT', 'MIN', 'QONE', 'QTWO', 'MEAN', 'QTHREE', 'MAX'].forEach(function(key) {
            ['name', 'review_count_final', 'rating', 'phenotype', 'thc', 'cbd', 'ADHD', 'Anorexia', 'Anxiety', 'Anxious', 'Aroused', 'Arthritis', 'Asthma', 'Cancer', 'Cramps', 'Creative',
            'Depression', 'Dizzy', 'Energetic', 'Epilepsy', 'Euphoric', 'Fatigue', 'Fibromyalgia', 'Focused', 'Giggly', 'Happy', 'Headache', 'Headaches',
            'Hungry', 'Hypertension', 'Inflammation', 'Insomnia', 'Migraines', 'Nausea', 'PMS', 'PTSD', 'Pain', 'Paranoid', 'Relaxed', 'Seizures', 'Sleepy',
            'Spasticity', 'Stress', 'Talkative', 'Tingly', 'Uplifted', 'Appetite', 'Disease', 'Disorder', 'Eyes', 'Injury', 'Mouth', 'Pressure',
            'Sclerosis', 'Spasms'].forEach(function(key) {

          value = ' - ';

          // if (row.COUNT > 1 || ['MEAN', 'JOB_TITLE', 'COUNT'].indexOf(key) > -1) {
          // if (row.review_count_final > 1) {
          if (row.review_count_final >=1) {
            value = row[key];
          }

            content += '<td>' + formatKey(value, key) + '</td>';
        });
        content += '</tr>'
        $('.csv-data-body').append(content);
    })
}



tabulate(data);
//tabulate(data, ['JOB_TITLE', 'COUNT', 'MIN', 'QONE', 'QTWO', 'QTHREE', 'MEAN', 'MAX']);



})



}; //table




//////////////////////////////////// BUTTONS

$("#hybridButton").click(function () {
    var rows = $(".csv-data-body").find("tr").hide();
    rows.filter(":contains('Hybrid')").show();
 });

$("#sativaButton").click(function () {
    var rows = $(".csv-data-body").find("tr").hide();
    rows.filter(":contains('Sativa')").show();
 });

$("#indicaButton").click(function () {
    var rows = $(".csv-data-body").find("tr").hide();
    rows.filter(":contains('Indica')").show();
 });

/////////////////////////////////// SLIDER

$(document).ready(function() {
  $(function() {
    $( "#slider-range, #slider-range2" ).slider({
      range: true,
      min: 0,
      max: 35,
      values: [ 10, 25 ],
      slide: function( event, ui ) {
        // in this function we can define what happens when a user changes the sliders
        $( "#sliderAmount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
       
        var table = document.getElementById("myTable");
        for (var i = 1, row; row = table.rows[i]; i++) {
        // for (var i = 0, row; row = table.rows[i]; i++) {
           //iterate through rows (we SKIP the first row: counter starts at 1!)
           // for (var j = 0, col; col = row.cells[j]; j++) {
            for (var j = 4, col; col = row.cells[j]; j++) {
               //iterate through columns: if first column not in range: HIDE, else SHOW
               
               // if (j == 0) {             // if first column
                if (j == 4) {
                   if ($(col).html() >= ui.values[ 0 ] && $(col).html() <= ui.values[ 1 ]) {
                       // if in interval
                       $(row).show();
                   } else {
                       $(row).hide();
                   }
               }
           }  
        }          
      }
    });
     
    $( "#sliderAmount" ).val($( "#slider-range" ).slider( "values", 0 ) +
      " - " + $( "#slider-range" ).slider( "values", 1 ) );
  });
});




/////////////////////////////////// SEARCH

function mySearch() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }      
  }
}






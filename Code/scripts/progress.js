

var week_datasets = [];
var week_labels = [];
var temp_dataset = [1, 2, 3];

window.onload = function () {
  $(".loading").css("display", "grid");
  initApp("progress");
};

firebase.auth().onAuthStateChanged(function (user) {
  var d = new Date();
  var current_month = d.getMonth() + 1;
  var current_date = d.getDate();
  var current_year = d.getFullYear();
  var full_current_date = d.getMonth();
  if (current_date < 10) {
    current_date = "0" + current_date;
  }
  if (current_month < 10) {
    current_month = "0" + current_month;
  }
  //var week_label = [];
  //Go in the month branch and get the weeks as default
  if (user) {
    var route = current_year + "/" + current_month + "/";
    var dbRef = database.ref("Users/" + user.uid + "/Macros/");
    var get_label = dbRef.child(route).limitToLast(7);

    get_label
      .once("value", function (snapshot) {
        snapshot.forEach(function (child) {
          week_labels.push(child.key);
        });
        console.log(week_labels)
      })
      .then(function () {
        for (i = 0; i < 7; i++) {
          get_label = dbRef.child(route + week_labels[i]);
          get_label.once("value", function (snapshot) {
            snapshot.forEach(function (child) {
              week_datasets.push(child.val());
            });
          });
        }
      })
      
  }
});
function print(){
  console.log("finish")
}

if(week_labels[0] < 10){
          console.log("less than 10")
        }
        $("#week").click(function () {
          var data = myChart.config.data;
          data.datasets[0].data = week_datasets;
          data.labels = week_labels;
          myChart.update();
        });
        $("#month").click(function () {
          var chart_labels = [
            "00:00",
            "03:00",
            "06:00",
            "09:00",
            "12:00",
            "15:00",
            "18:00",
            "21:00",
          ];
          var data = myChart.config.data;
          data.datasets[0].data = temp_dataset;
          data.labels = chart_labels;
          myChart.update();
        });
        var ctx = document.getElementById("myChart").getContext("2d");
        var config = {
          type: "line",
          data: {
            labels: week_labels,
            datasets: [
              {
                data: week_datasets,
                label: "",
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
          },
        };
        var myChart = new Chart(ctx, config);
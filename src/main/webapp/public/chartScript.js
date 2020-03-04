


var colours = [
    'rgb(0, 152, 224, 0.8)',
    'rgb(94, 188, 219, 0.8)',
    'rgb(241, 221, 132, 0.8)',
    'rgb(245, 181, 135, 0.8)',
    'rgb(247, 137, 121, 0.8)',
    'rgb(184, 99, 119, 0.8)'
];
var border_colours = [
    '#0098E0',
    '#3C778B',
    '#F1DD84',
    '#F5B587',
    '#F78979',
    '#B86377'
];

var text_colour  = "#404040";

var ctx = document.getElementById('myChart');
var ctx2 = document.getElementById('chart-area');
var ctx3 = document.getElementById('chart-area2');
var ctx4 = document.getElementById('bubble-chart');

var ctx5 = document.getElementById('module-pie');
var ctx6 = document.getElementById('module-bar');



    
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['NG - E', 'D', 'C', 'B', 'A'],
        datasets: [{
            label: 'Grade Break down',
            data: [2, 8, 13, 20, 13],
            backgroundColor: colours,
            borderColor: border_colours,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontColor: text_colour
                }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontColor: text_colour
                }
            }]
        },
        legend: {
            labels: {
                fontColor: text_colour
            }
        }
    }
});


var myPieChart = new Chart(ctx2, {
    type: 'pie',
   data: {
        labels: ['Male', 'Female', 'Other'],
        datasets: [{
            label: '# of Votes',
            data: [25, 15, 13],
            backgroundColor: colours,
            borderColor: border_colours,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontColor: text_colour
                }
            }]
        },
        legend: {
            labels: {
                fontColor: text_colour
            }
        }
    }
});



var myDoughnutChart = new Chart(ctx3, {
    type: 'doughnut',
   data: {
        labels: ['Male', 'Female', 'Other'],
        datasets: [{
            label: '# of Votes',
            data: [25, 15, 13],
            backgroundColor: colours,
            borderColor: border_colours,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontColor: text_colour
                }
            }]
        },
        legend: {
            labels: {
                fontColor: text_colour
            }
        }
    }
});



var myBubbleChart = new Chart(ctx4,  {
    type: 'bubble',
    data: {
      labels: "Computer Science",
      datasets: [
        {
          label: ["China"],
          backgroundColor: getcolour(0),
          borderColor: getcolour(0),
          data: [{
            x: 190,
            y: 5.245,
            r: 18
          }]
        }, {
          label: ["India"],
          backgroundColor: getcolour(1),
          borderColor: getcolour(1),
          data: [{
            x: 200,
            y: 7.526,
            r: 20
          }]
        }, {
          label: ["Ireland"],
          backgroundColor: getcolour(2),
          borderColor: getcolour(2),
          data: [{
            x: 250,
            y: 6.994,
            r: 24
          }]
        }, {
          label: ["Poland"],
          backgroundColor: getcolour(3),
          borderColor: getcolour(3),
          data: [{
            x: 100,
            y: 5.921,
            r: 15
          }]
        }
      ]
    },
    options: {
      title: {
        display: false,
        text: 'Nationalities in Computer Science'
      }, scales: {
        yAxes: [{ 
          scaleLabel: {
            display: false,
          }
        }],
        xAxes: [{ 
          scaleLabel: {
            display: true,
            // labelString: "Population"
          }
        }]
      }
    }
});


var moduleDoughnutChart = new Chart(ctx5, {
    type: 'doughnut',
   data: {
        labels: ['Male', 'Female', 'Other'],
        datasets: [{
            label: '# of Votes',
            data: [25, 15, 13],
            backgroundColor: colours,
            borderColor: border_colours,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontColor: text_colour
                }
            }]
        },
        legend: {
            labels: {
                // This more specific font property overrides the global property
                fontColor: text_colour
            }
        }
    }
});

var moduleBarChart = new Chart(ctx6, {
    type: 'bar',
    data: {
        labels: ['[NG, F, E]', '[D-, D, D+]', '[C-, C, C+]', '[B-, B, B+]', '[A-, A, A+]'],
        datasets: [{
            label: 'Grade Break down',
            data: [2, 8, 13, 20, 13],
            backgroundColor: colours,
            borderColor: border_colours,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontColor: text_colour
                }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontColor: text_colour
                }
            }]
        },
        legend: {
            labels: {
                fontColor: text_colour
            }
        }
    }
});
function getcolour(num){
    return colours[num];
}
window.onload = function() {
    window.myPie = this.myChart;
    window.myPie = this.myPieChart;
    window.myPie = this.myDoughnutChart;
    window.myPie = this.myBubbleChart;
    window.myPie = this.moduleDoughnutChart;
    window.myPie = this.moduleBarChart;
 };


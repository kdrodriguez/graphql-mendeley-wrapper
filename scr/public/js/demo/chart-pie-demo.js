// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var NumQuery = document.getElementById("NumQuery").innerHTML;
var NumMut = document.getElementById("NumMut").innerHTML;
var PorcentajeQuery = ((NumQuery*100)/(parseInt(NumQuery,10)+parseInt(NumMut,10))).toFixed(2);
var PorcentajeMutation = ((NumMut*100)/(parseInt(NumQuery,10)+parseInt(NumMut,10))).toFixed(2);

var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["QUERIES%", "MUTATIONS%"],
    datasets: [{
      data: [PorcentajeQuery, PorcentajeMutation],
      backgroundColor: ['#4e73df', '#1cc88a'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});

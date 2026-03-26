/* ============================================================
   script.js — Sales Analytics Dashboard
   Full Stack Development Assignment

   This file contains:
   1. Live Clock
   2. Chart.js Global Defaults
   3. Line Chart   — Monthly Revenue & Orders
   4. Doughnut Chart — Sales by Category
   5. Bar Chart    — Weekly Sales
   6. Radar Chart  — Traffic Sources
   7. Horizontal Bar Chart — Delivery Performance
   ============================================================ */


/* ============================================================
   1. LIVE CLOCK
   Updates the clock in the header every 1 second.
   ============================================================ */
function updateClock() {
  const now = new Date(); // get the current date and time
  document.getElementById('liveClock').textContent = now.toLocaleString('en-IN', {
    day:    '2-digit',
    month:  'short',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

updateClock();                   // run immediately on page load
setInterval(updateClock, 1000); // then run every 1000ms = 1 second


/* ============================================================
   2. CHART.JS GLOBAL DEFAULTS
   These settings apply to ALL charts automatically.
   ============================================================ */
Chart.defaults.color       = '#7a829e';          // default text color on charts
Chart.defaults.font.family = "'DM Sans', sans-serif"; // font for all chart labels
Chart.defaults.font.size   = 12;


/* ============================================================
   3. LINE CHART — Monthly Revenue & Orders
   Shows TWO lines on the same chart (dual Y-axis).
   ============================================================ */

// Step 1: Get the canvas element from HTML
const lineCtx = document.getElementById('lineChart').getContext('2d');

// Step 2: Create gradient fill under the Revenue line
const revGrad = lineCtx.createLinearGradient(0, 0, 0, 260);
revGrad.addColorStop(0, 'rgba(240,192,64,0.25)'); // yellow at top
revGrad.addColorStop(1, 'rgba(240,192,64,0)');    // transparent at bottom

// Step 3: Create gradient fill under the Orders line
const ordGrad = lineCtx.createLinearGradient(0, 0, 0, 260);
ordGrad.addColorStop(0, 'rgba(91,142,240,0.2)'); // blue at top
ordGrad.addColorStop(1, 'rgba(91,142,240,0)');   // transparent at bottom

// Step 4: Create the chart
new Chart(lineCtx, {
  type: 'line',                          // chart type
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // X-axis labels
    datasets: [
      {
        label: 'Revenue (₹ Lakhs)',       // legend name
        data: [6.2, 7.8, 7.1, 8.9, 9.4, 8.8], // Y values
        borderColor: '#f0c040',           // line color
        backgroundColor: revGrad,        // fill under the line
        borderWidth: 2.5,
        pointBackgroundColor: '#f0c040', // dot color on data points
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,                    // 0 = sharp, 1 = very curved
        fill: true,
        yAxisID: 'y1'                    // uses the LEFT Y-axis
      },
      {
        label: 'Orders',
        data: [1100, 1380, 1250, 1680, 1980, 1950],
        borderColor: '#5b8ef0',
        backgroundColor: ordGrad,
        borderWidth: 2.5,
        pointBackgroundColor: '#5b8ef0',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
        yAxisID: 'y2'                    // uses the RIGHT Y-axis
      }
    ]
  },
  options: {
    responsive: true,
    interaction: { mode: 'index', intersect: false }, // show both tooltips together
    plugins: {
      legend: {
        position: 'top',
        labels: { usePointStyle: true, padding: 16, boxWidth: 8 }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' }  // faint grid lines
      },
      y1: {
        type: 'linear',
        position: 'left',                            // Revenue axis on LEFT
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { callback: v => '₹' + v + 'L' }    // format: ₹8.9L
      },
      y2: {
        type: 'linear',
        position: 'right',                           // Orders axis on RIGHT
        grid: { drawOnChartArea: false },            // no duplicate grid lines
        ticks: { callback: v => v.toLocaleString() }
      }
    }
  }
});


/* ============================================================
   4. DOUGHNUT CHART — Sales by Category
   Shows each category as a slice of a ring/donut.
   ============================================================ */
new Chart(document.getElementById('doughnutChart'), {
  type: 'doughnut',
  data: {
    labels: ['Electronics', 'Fashion', 'Beauty', 'Sports', 'Home & Kitchen'],
    datasets: [{
      data: [38, 24, 16, 12, 10],    // percentage values (should total 100)
      backgroundColor: [
        '#f0c040',  // yellow
        '#5b8ef0',  // blue
        '#e05a7a',  // pink
        '#44d49a',  // green
        '#a78bfa'   // purple
      ],
      borderColor: '#181c26',         // card background — creates gap between slices
      borderWidth: 3,
      hoverOffset: 8                  // slice pops out on hover
    }]
  },
  options: {
    responsive: true,
    cutout: '68%',                    // how big the "hole" is (higher = thinner ring)
    plugins: {
      legend: {
        position: 'bottom',
        labels: { usePointStyle: true, padding: 12, boxWidth: 8 }
      },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.label}: ${ctx.parsed}%` // shows "Electronics: 38%"
        }
      }
    }
  }
});


/* ============================================================
   5. BAR CHART — Weekly Sales (Units Sold)
   Vertical bars, one per week.
   ============================================================ */
new Chart(document.getElementById('barChart'), {
  type: 'bar',
  data: {
    labels: ['Wk1','Wk2','Wk3','Wk4','Wk5','Wk6','Wk7','Wk8'],
    datasets: [{
      label: 'Units Sold',
      data: [320, 480, 410, 590, 680, 520, 740, 630],
      backgroundColor: 'rgba(91,142,240,0.75)', // bar fill color
      borderColor: '#5b8ef0',                   // bar border color
      borderWidth: 1.5,
      borderRadius: 6,        // rounded top corners on bars
      borderSkipped: false    // round all corners
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }  // hide legend (only one dataset)
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.04)' } },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { stepSize: 100 }
      }
    }
  }
});


/* ============================================================
   6. RADAR CHART — Traffic Sources
   Spider-web shape showing performance across 6 categories.
   ============================================================ */
new Chart(document.getElementById('radarChart'), {
  type: 'radar',
  data: {
    labels: ['Instagram', 'Google', 'Direct', 'Email', 'YouTube', 'Referral'],
    datasets: [{
      label: 'Sessions (hundreds)',
      data: [85, 92, 60, 45, 70, 38],
      backgroundColor: 'rgba(224,90,122,0.2)',  // shaded area inside the web
      borderColor: '#e05a7a',                    // outline of the web
      pointBackgroundColor: '#e05a7a',           // dots at each corner
      borderWidth: 2,
      pointRadius: 4
    }]
  },
  options: {
    responsive: true,
    scales: {
      r: {
        angleLines: { color: 'rgba(255,255,255,0.07)' }, // spoke lines
        grid:        { color: 'rgba(255,255,255,0.07)' }, // ring lines
        pointLabels: { font: { size: 11 } },
        ticks: { backdropColor: 'transparent', stepSize: 20 }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }
});


/* ============================================================
   7. HORIZONTAL BAR CHART — Delivery Performance
   Stacked bars going left-to-right (horizontal).
   indexAxis: 'y' is what makes it horizontal!
   ============================================================ */
new Chart(document.getElementById('hBarChart'), {
  type: 'bar',
  data: {
    labels: ['Electronics', 'Fashion', 'Beauty', 'Sports', 'Home'],
    datasets: [
      {
        label: 'Delivered %',
        data: [94, 91, 97, 88, 95],
        backgroundColor: 'rgba(68,212,154,0.7)',  // green
        borderRadius: 4
      },
      {
        label: 'Returned %',
        data: [6, 9, 3, 12, 5],
        backgroundColor: 'rgba(224,90,122,0.7)',  // pink
        borderRadius: 4
      }
    ]
  },
  options: {
    indexAxis: 'y',       // KEY SETTING: makes bars horizontal instead of vertical
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { usePointStyle: true, padding: 12, boxWidth: 8 }
      }
    },
    scales: {
      x: {
        stacked: true,    // stack Delivered + Returned bars together
        grid: { color: 'rgba(255,255,255,0.05)' },
        max: 100,
        ticks: { callback: v => v + '%' }  // show "94%" instead of "94"
      },
      y: {
        stacked: true,
        grid: { color: 'rgba(255,255,255,0.04)' }
      }
    }
  }
});
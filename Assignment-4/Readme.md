Assignment Summary
This is an E-Commerce Sales Analytics Dashboard — a single-page web application that displays business performance data through interactive charts and tables. A manager or business owner can open this page and instantly see how their online store is performing: total revenue, order counts, best-selling products, delivery success rates, and where their customers are coming from — all in one place, visually.

Technologies Used
HTML5 forms the structure — every card, table, and chart container is an HTML element. CSS3 handles all the visual styling: the dark theme, card layouts using CSS Grid, hover animations, and the responsive design that adapts the layout for phones and tablets. JavaScript (ES6) runs all the logic — creating charts, updating the live clock every second, and handling interactions. Chart.js 4.4 is the charting library that does the heavy lifting of drawing five different chart types on HTML <canvas> elements. Google Fonts provides the two typefaces used (Syne for headings, DM Sans for body text), loaded via a CDN link.
No backend, no database, no framework — this is a pure front-end project, which means it runs entirely in the browser.

System Architecture
Here's how all the pieces fit together:
<img width="845" height="683" alt="image" src="https://github.com/user-attachments/assets/4e3b8810-b11f-45f6-abb6-c6a813478aee" />
How It All Flows — In Plain English
When a user opens index.html in their browser, this is what happens in order:
1 — HTML loads first. The browser reads index.html top to bottom. It finds the <link> tag pointing to style.css and the <script> tag pointing to Chart.js (fetched from the internet) and fetches both.
2 — CSS is applied. style.css is applied immediately — the dark background, the card layout, the fonts all appear before any JavaScript runs.
3 — JavaScript runs last. The <script src="script.js"> tag is placed at the very bottom of index.html on purpose — so the HTML structure exists before the script tries to find elements like document.getElementById('lineChart'). If it ran at the top, those elements wouldn't exist yet and the charts would fail to render.
4 — Chart.js draws on the canvas. Each new Chart(...) call in script.js finds a <canvas> element in the HTML, calculates pixel coordinates for every data point, and paints the chart directly onto it.
5 — The clock ticks. setInterval(updateClock, 1000) keeps running in the background, updating the clock display every second for as long as the page is open.

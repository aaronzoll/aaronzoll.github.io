---
layout: widget
title: "Pixel Data Explorer"
widget_src: "/widgets/pixel-explorer_code.html"
widget_height: 1900
widget_height_mobile: 2300
back_url: "/teaching/data-analytics/"
back_label: "Data Analytics Workshop"
---

### Pixels are data

A digital photo is a grid of pixels, and each pixel stores three numbers from 0 to 255: how much red, green, and blue light to mix. So \\((0, 0, 0)\\) is black, \\((255, 255, 255)\\) is white, and \\((255, 0, 0)\\) is pure red. That means a photo 300 pixels wide and 200 tall is really a dataset with 60,000 data points, each with three variables. Hover over the image to read any pixel. The **Red only** button shows each pixel's red number as a shade of gray, so the image is bright wherever there is a lot of red.

### Histograms

With this much data, we can't look at every number, so we count instead. A histogram splits the possible values into bins and draws one bar per bin, with height equal to the number of pixels in that bin. By default each pixel's value is its brightness, the average of its three numbers. When you hover over the image, the dashed line shows where that pixel lands in the histogram, and clicking a bar lights up every pixel in that bin.

Try sliding the bin width. Narrow bins show a lot of detail but look jagged, and wide bins are smooth but hide detail. Notably, narrow bins can always be added together to make wide bins, but wide bins can't be split back apart. Also notice that a histogram forgets *where* each pixel is: shuffle the pixels around and the histogram doesn't change at all. That is why lighting up a bar can be surprising.

### Average color

The bar chart has one bar for each of red, green, and blue, with height equal to that component's average over every pixel. This is a chart for categories, the same kind we use to compare groups on Day 7, and the table compares the averages across all the images. Keep in mind that the average color can be a color that no pixel in the image actually has.

Under **Mix a pixel**, multiplying all three numbers by the same amount keeps their ratios the same, so the color keeps its hue and only gets brighter or darker. That is, until one number reaches 255 and gets capped. After that, the ratios change and so does the color. Try it with a large scale and watch the color drift.

### Scatter plots and correlation

In the scatter plot, each point is one pixel, placed by two of its numbers, say red horizontally and green vertically. In most photos the points cluster around an upward line: a pixel that is bright in red tends to be bright in green too, since lighting makes all three go up and down together. This is a strong positive correlation, measured by the correlation \\(r\\) from Day 5, which here uses every pixel in the image. Turn on the best-fit line to see the line it measures against. Then compare with **Color bars**, whose pure colors break this pattern. As always, \\(r\\) only measures how *line-like* the points are, so it is worth looking at the plot and not just the number.

### Your own data

Upload any photo to explore it the same way. Everything above is computed from the table under **Pixel data (CSV)**, one row per pixel. Paste it into Excel and you can make each of these charts yourself (the Excel notes walk through how).

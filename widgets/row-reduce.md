---
layout: widget
title: "Gaussian Elimination"
widget_src: "/widgets/row-reduce_code.html"
widget_height: 900
widget_height_mobile: 720
back_url: "/teaching/lade/"
back_label: "LADE"
---

Above, I provide practice row reducing a matrix by hand. You may apply one elementary operation at a time. Note, these preserve all the solutions as we are not changing the underlying system. For example, swapping rows simply just changes the order of the equations we want to simultaneously satisfy. Adding a row to another gives a new equation that must satisfy the same system (and undoing this would revert to the original system, so they must be equivalent).

The operation counter tracks how many steps you have used. Try to be the systemetic approach, which algorithmically solves the system and gives a "par" number of operations. Clicking **Show solution** walks through that systematic
reduction step by step.

The status panel reports the rank, the pivot and free columns/variables,
and whether the system is consistent. Not that when the rank is less than the number of columns, there must be free variables, and hence there must be infinite solutions.

The matrix dimensions and the rank are yours to set, which is the point. You have the freedom to set the problem's difficult, and you can play around to see how adjusting the rank changes the underlying structure. 

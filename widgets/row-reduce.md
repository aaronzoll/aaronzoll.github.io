---
layout: widget
title: "Gaussian Elimination"
widget_src: "/widgets/row-reduce_code.html"
widget_height: 760
widget_height_mobile: 720
back_url: "/teaching/lade/"
back_label: "LADE"
---

Above, I provide practice row reducing a matrix by hand. Start by choosing a difficulty: the number of equations, the number of unknowns, and the rank (i.e. the number of final pivot columns, more on this later). The par shown is the fewest row operations needed to reach reduced row echelon form from that starting matrix, so it doubles as a rough measure of how much work the system will take. If you have a particular system in mind (say, from a homework problem), choose "Custom" instead and type its augmented matrix in directly.

Once you press play, you may apply one elementary operation at a time. Note, these preserve all the solutions as we are not changing the underlying system. For example, swapping rows simply just changes the order of the equations we want to simultaneously satisfy. Adding a row to another gives a new equation that must satisfy the same system (and undoing this would revert to the original system, so they must be equivalent).

When you think the matrix is in reduced row echelon form, submit it. If it is, you will see the solution set read off the reduced matrix along with how your move count compares to par; if not, you will be told which condition still fails. Try to be systematic, which algorithmically solves the system and gives a "par" number of operations. Clicking "Show solution" walks through that systematic reduction step by step without disturbing your own work.

The matrix dimensions and the rank are yours to set, which is the point. You have the freedom to set the problem's "difficulty", and you can play around to see how adjusting the rank changes the underlying structure (and number of computations needed to reduce the matrix). Note that when the rank is less than the number of unknowns, there must be free variables, so there must be infinitely many solutions.

Calchemy™ -- Math Magic
=======================

Calchemy™ is an exciting [not-so-new](https://github.com/rtestardi/calchemy/wiki/The-History-of-Calchemy%E2%84%A2%2C-1988-to-Present)
units calculator which allows you to perform dimensional arithmetic, analysis, and conversions using any standard units.
Calchemy "understands" the relationships between these units and performs conversions for you automatically as needed.
It also checks your equations to ensure that they are always dimensionally correct.

**Calchemy now runs as javascript, entirely in your web browser -- just open [calchemy.html](https://rtestardi.github.io/calchemy/calchemy.html) and start having fun!**
(For the latest and greatest development bits that may still have significant bugs, you can open [calchemy_dev.html](https://rtestardi.github.io/calchemy/calchemy_dev.html).)
Calchemy does not send any of your information or equations or results over the Internet.
Calchemy can run entirely offline if you copy calchemy.html to a local folder.
Calchemy does not use cookies, though it does use "other site data" in your browser for persistence of the History List.

N.B. The persistent history list is cleared when you clear your browser cookies and other site data.

You can verify Calchemy's operation by clicking the "Test" button.

Always double-check your answers!

## Files in the [GitHub Repository](https://github.com/rtestardi/calchemy)

* calchemy.html -- released bits, single file, including merged html, database, and engine
* calchemy_dev.html -- bits under development, html only
* database_dev.js -- bits under development, database only
* demo_dev.html -- demo bits showing interface to database and engine
* elements.js -- optional runtime database with element properties
* engine_dev.js -- bits under development, engine only
* flexcase.js -- optional runtime database to relax SI upper case abbreviation requirements
* materials.js -- optional runtime database with material properties
* publish.ps1 -- script to merge calchemy_dev.html, database_dev.js, and engine_dev.js into calchemy.html
* solarsys.js -- optional runtime database with solar system units

The following examples provide a brief introduction to some of Calchemy's features.

## Basic Features

To perform a simple unit conversion, such as 3 meters converted to inches, you could enter the equation:

[**3 meter ? inch**](https://rtestardi.github.io/calchemy/calchemy.html?3%20meter%20%3F%20inch)

Calchemy would respond:

**= 118.110 inch**

To calculate the required horsepower for a motor which could raise a 2000 lbf elevator to the top of a 10 story building (assuming 12 feet per story) in 1 minute,
you could enter the equation:

[**2000 lbf * (10 * 12 feet) / (1 minute) ? horsepower**](https://rtestardi.github.io/calchemy/calchemy.html?2000%20lbf%20*%20%2810%20*%2012%20feet%29%20/%20%281%20minute%29%20%3F%20horsepower)

Indicating that you want to multiply 2000 pounds force by 10 times 12 feet, divide that by 1 minute, and then express the final result in horsepower.
Calchemy would respond:

**= 7.27273 horsepower**

If, on the other hand, you had made a mistake in the original equation and left out the "/ (1 minute)":

[**2000 lbf * (10 * 12 feet) ? horsepower**](https://rtestardi.github.io/calchemy/calchemy.html?2000%20lbf%20*%20%2810%20*%2012%20feet%29%20%3F%20horsepower)

Calchemy would have responded with a Dimensional Mismatch indication containing:

**Time^-1**

Indicating that the left hand side of the equation was missing a factor of 1/Time -- the equation was not dimensionally correct, and therefore, could not be evaluated.

Calchemy can also be used as a simple dimensionless calculator by eliminating the "?" and result unit from the equation. For example, you could enter the equation:

[**2+3\*5**](https://rtestardi.github.io/calchemy/calchemy.html?2+3*5)

Calchemy would respond with the algebraically correct answer:

**= 17**

## Advanced Features

You could also enter the original equation in the following less explicit form:

[**2000 lb; 10 stories; 12 feet/story; 1 minute ? horsepower**](https://rtestardi.github.io/calchemy/calchemy.html?2000%20lb%3B%2010%20stories%3B%2012%20feet/story%3B%201%20minute%20%3F%20horsepower)

Indicating that you want to "combine" 2000 pounds, 10 stories, 12 feet/story, and 1 minute in such a way that the equation is dimensionally correct,
and then express the final result in horsepower. Calchemy would again respond:

*&gt; 2000 poundf * 10 stories * (12 foot / stories) / (1 minute) ? horsepower*
<br>**= 7.27273 horsepower**

Notice above that Calchemy will always show you how it is interpreting your equations, with a line that begins with "&gt;".

This example illustrates the following features:

### Solve By Dimensional Analysis
The ";" operator tells Calchemy to use dimensional analysis to determine whether its operands should be in the numerator or the denominator of the equation.
In this example, Calchemy placed the first three operands in the numerator and the last operand in the denominator.
This allows you to be less involved with the actual mechanics of the equations.

### Overloaded Units
The "lb" unit is an overloaded unit, meaning that it has more than one common definition.
It is primarily defined as "lbm" (pounds mass) and secondarily defined as "lbf" (pounds force).
Calchemy automatically uses the appropriate definition, again based on dimensional analysis.
In this example, Calchemy used "lbf". This allows you to naturally use units with multiple common definitions.

### Free Units
The "stories" and "story" units are called free units.
Free units are units which are not actually understood by Calchemy, except in that they are new and unique dimensions which must "cancel out" in the end.
This allows you to enter equations in a more natural format.

### Pluralized Units
The "stories" and "story" units also illustrate that Calchemy understands basic pluralization rules for units. This, again, allows you to enter equations in a more natural format.

## For More Information

Visit us on the web at: [http://www.calchemy.com/](http://www.calchemy.com/)

Copyright © 1988-2023 Ken Burgess and Rich Testardi.

LoadRuntimeDatabase("solarsys.js", `
CATEGORY solarsys

___PUSH solarsys

sun_mass = 1.99E+30 kilogramm #mass of the sun
sun_diam = 1.39E+09 meter #mean diameter of the sun

moon_mass = 7.36E+22 kilogramm #mass of the moon
moon_diam = 3.48E+06 meter #mean diameter of moon
moon_dist = 3.85E+08 meter #mean distance earth to moon

mercury_mass = 3.25E+23 kilogramm #mass of mercury
mercury_diam = 5140 kilometer #mean diameter of mercury
mercury_dist = 5.79E+10 meter #mean distance mercury to sun

venus_mass = 4.86E+24 kilogramm #mass of venus
venus_diam = 12620 kilometer #mean diameter of venus
venus_dist = 1.08E+11 meter #mean distance venus to sun

earth_mass = 5.975E+24 kilogramm #mass of the earth
earth_diam = 1.2756E+07 meter #mean diameter of the earth
earth_dist = 1.496E+11 meter #mean distance earth to sun

mars_mass = 6.33E+23 kilogramm #mass of mars
mars_diam = 6860 kilometer #mean diameter of mars
mars_dist = 2.28E+11 meter #mean distance mars to sun

jupiter_mass = 1.88E+27 kilogramm #mass of jupiter
jupiter_diam = 143600 kilometer #mean diameter of jupiter
jupiter_dist = 7.78E+11 meter #mean distance jupiter to sun

saturn_mass = 5.62E+26 kilogramm #mass of saturn
saturn_diam = 120600 kilometer #mean diameter of saturn
saturn_dist = 1.43E+12 meter #mean distance saturn to sun

uranus_mass = 8.60E+25 kilogramm #mass of uranus
uranus_diam = 53400 kilometer #mean diameter of uranus
uranus_dist = 2.87E+12 meter #mean distance uranus to sun

neptune_mass = 9.98E+25 kilogramm #mass of neptune
neptune_diam = 49700 kilometer #mean diameter of neptune
neptune_dist = 4.50E+12 meter #mean distance neptune to sun

pluto_mass = 5.9E+24 kilogramm #mass of pluto
pluto_diam = 12700 kilometer #mean diameter of pluto
pluto_dist = 5.91E+12 meter #mean distance pluto to sun

___POP solarsys

TEST 1|= 1
TEST 1|= 1
TEST 1|= 1
TEST 1|= 1
TEST sun_mass? | = 1.99e+30 kilogramm
`);

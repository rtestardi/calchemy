LoadRuntimeDatabase("solarsys.js", `
CATEGORY solarsys

solarsys:sun_mass = 1.99E+30 kilogramm #mass of the sun
solarsys:sun_diam = 1.39E+09 meter #mean diameter of the sun

solarsys:moon_mass = 7.36E+22 kilogramm #mass of the moon
solarsys:moon_diam = 3.48E+06 meter #mean diameter of moon
solarsys:moon_dist = 3.85E+08 meter #mean distance earth to moon

solarsys:mercury_mass = 3.25E+23 kilogramm #mass of mercury
solarsys:mercury_diam = 5140 kilometer #mean diameter of mercury
solarsys:mercury_dist = 5.79E+10 meter #mean distance mercury to sun

solarsys:venus_mass = 4.86E+24 kilogramm #mass of venus
solarsys:venus_diam = 12620 kilometer #mean diameter of venus
solarsys:venus_dist = 1.08E+11 meter #mean distance venus to sun

solarsys:earth_mass = 5.975E+24 kilogramm #mass of the earth
solarsys:earth_diam = 1.2756E+07 meter #mean diameter of the earth
solarsys:earth_dist = 1.496E+11 meter #mean distance earth to sun

solarsys:mars_mass = 6.33E+23 kilogramm #mass of mars
solarsys:mars_diam = 6860 kilometer #mean diameter of mars
solarsys:mars_dist = 2.28E+11 meter #mean distance mars to sun

solarsys:jupiter_mass = 1.88E+27 kilogramm #mass of jupiter
solarsys:jupiter_diam = 143600 kilometer #mean diameter of jupiter
solarsys:jupiter_dist = 7.78E+11 meter #mean distance jupiter to sun

solarsys:saturn_mass = 5.62E+26 kilogramm #mass of saturn
solarsys:saturn_diam = 120600 kilometer #mean diameter of saturn
solarsys:saturn_dist = 1.43E+12 meter #mean distance saturn to sun

solarsys:uranus_mass = 8.60E+25 kilogramm #mass of uranus
solarsys:uranus_diam = 53400 kilometer #mean diameter of uranus
solarsys:uranus_dist = 2.87E+12 meter #mean distance uranus to sun

solarsys:neptune_mass = 9.98E+25 kilogramm #mass of neptune
solarsys:neptune_diam = 49700 kilometer #mean diameter of neptune
solarsys:neptune_dist = 4.50E+12 meter #mean distance neptune to sun

solarsys:pluto_mass = 5.9E+24 kilogramm #mass of pluto
solarsys:pluto_diam = 12700 kilometer #mean diameter of pluto
solarsys:pluto_dist = 5.91E+12 meter #mean distance pluto to sun

TEST 1|= 1
TEST 1|= 1
TEST 1|= 1
TEST 1|= 1
TEST sun_mass? | = 1.99e+30 kilogramm
`);

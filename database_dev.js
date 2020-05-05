var database =`
CATEGORY SI
CATEGORY Prefix
CATEGORY Physical_constant
CATEGORY Common
CATEGORY Number
CATEGORY Angle
CATEGORY Energy
CATEGORY Torque
CATEGORY Advanced
CATEGORY Physical_property
CATEGORY Water
CATEGORY Ice
CATEGORY Air
CATEGORY Batteries
CATEGORY Speed_sound
CATEGORY Frequency
CATEGORY Angular_velocity

BASE MASS
BASE LENGTH
BASE TIME
BASE TEMP
BASE STORAGE
BASE MONEY
BASE CURRENT
BASE SUBSTANCE

PREFIX Prefix:Y,yotta=1E+24
PREFIX Prefix:Z,zetta=1E+21
PREFIX Prefix:E,exa=1E+18
PREFIX Prefix:P,peta=1E+15
PREFIX Prefix:T,tera=1E+12
PREFIX Prefix:G,giga=1E+09
PREFIX Prefix:M,mega=1E+06
PREFIX Prefix:k,kilo=1E+03
PREFIX Prefix:h,hecto=1E+02
PREFIX Prefix:da,deka=1E+01
PREFIX Prefix:d,deci=1E-01
PREFIX Prefix:c,centi=1E-02
PREFIX Prefix:m,milli=1E-03
PREFIX Prefix:u,micro=1E-06
PREFIX Prefix:n,nano=1E-09
PREFIX Prefix:p,pico=1E-12
PREFIX Prefix:f,femto=1E-15
PREFIX Prefix:a,atto=1E-18
PREFIX Prefix:z,zepto=1E-21
PREFIX Prefix:y,yocto=1E-24

PREFIX Prefix:Ki,kibi=1024 #storage
PREFIX Prefix:Mi,mebi=1024^2 #storage
PREFIX Prefix:Gi,gibi=1024^3 #storage
PREFIX Prefix:Ti,tebi=1024^4 #storage
PREFIX Prefix:Pi,pebi=1024^5 #storage
PREFIX Prefix:Ei,exbi=1024^6 #storage
PREFIX Prefix:Zi,zebi=1024^7 #storage
PREFIX Prefix:Yi,yobi=1024^8 #storage

Number:pi=3.14159265358979323
Number:e=2.71828182845904523

#Primary
*Common,SI:m,meter*,metre*=LENGTH
*Common,SI:gm,gramm,g,gram*=MASS
*Common,SI:s,second*,sec*=TIME
Common,SI:deltaK,deltak=TEMP #interval (T-T0) Kelvin
*Common,Angle:rad,radian*=1
*Common:bit*,b = STORAGE
Common:$,dollar*=MONEY
*Common,SI:A,amp*,ampere*=CURRENT
*Advanced,SI:mol,mole*=SUBSTANCE
*Common,SI,Frequency,Angular_velocity:Hz,hertz=2pi rad/s

#Secondary
*Common,SI:L,liter*,litre*,l=1 cubic dm #was 1.000028 before 1964
*Common,SI:N,newton*=1 kgm m/s^2
*Common,SI,Energy:J,joule*=1 N m
*Common,SI:W,watt*=1 J/s
*Common,SI:Pa,pascal=1 N/square m
*Common,SI:C,coulomb*=A s
*Common,SI:V,volt*=1 J/C
*Common,SI:ohm*=1 V/A
*Common,SI:F,farad*=1 C/V
*Common,SI:H,henry*=1 s^2/F
*Common,SI:Wb,weber*=1 V s
*Common,SI:T,tesla*=1 Wb/m^2
*Common:gamma*=1E-09 Wb/m^2
Common:mho*=1 A/V
Common:maxwell*=1E-08 Wb #CGS
*Common:gauss=0.0001 Wb/m^2 #CGS

DERIVED Mass=kilogramm
DERIVED Length=meter
DERIVED Time=second
DERIVED Temperature=deltaK
DERIVED Storage=bit
DERIVED Area=meter^2
DERIVED Volume=liter
DERIVED Speed=meter per second
DERIVED Acceleration=meter per second^2
DERIVED Force=newton
DERIVED Energy=joule
AMBIGUOUS Torque=newton meter
DERIVED Power=watt
DERIVED Pressure=pascal
DERIVED Frequency=hertz
AMBIGUOUS Angular_velocity=radian per second
DERIVED Angular_acceleration=radian per second^2
DERIVED Density=kilogramm per liter
DERIVED Flow=liter per second
DERIVED Heat_latent_m=joule per kilogramm
AMBIGUOUS Heat_latent_v=joule per liter
DERIVED Specific_heat_m=joule per (kilogramm*deltaK)
DERIVED Specific_heat_v=joule per (liter*deltaK)
AMBIGUOUS Heat_vaporization_m=joule per kilogramm
AMBIGUOUS Heat_vaporization_v=joule per liter
AMBIGUOUS Heat_fusion_m=joule per kilogramm
AMBIGUOUS Heat_fusion_v=joule per liter
DERIVED Thermal_conductivity=watt per (meter*deltaK)
DERIVED Viscosity=pascal*second #(dynamic)
DERIVED Current=ampere
DERIVED Charge=coulomb
DERIVED Voltage=volt
DERIVED Resistance=ohm
DERIVED Capacitance=farad
DERIVED Inductance=henry
DERIVED Magnetic_flux=weber
DERIVED Magnetic_flux_density=tesla
DERIVED Substance=mole
DERIVED Energy_flux=joule per meter^2
DERIVED Molar_heat=joule per mole
DERIVED Molar_heat_capacity=joule per (mole*deltaK)
DERIVED Line_density=kilogramm per meter
DERIVED Kinematic_viscosity=meter^2 per second
AMBIGUOUS Heat_combustion_m=joule per kilogramm
AMBIGUOUS Heat_combustion_v=joule per liter
DERIVED Fuel_efficiency=kilometer per liter
DERIVED Momentum=kilogramm meter per second
AMBIGUOUS Stiffness=newton per meter
AMBIGUOUS Radius=meter
AMBIGUOUS Height=meter

Physical_constant:c,speed_of_light=2.99792458E+08 m/s #speed of light in vacuum
Physical_constant:grav,gravity=9.80665 m/s^2 #standard acceleration of gravity

Number:percent*,%=1/100
Number:dozen*=12
Number:gross=144
Number:karat*=1/24 #purity of gold (24 karat is pure)
Number:ppm*=1E-06 #parts per million
Number:million = 1E+06 #multiplier (1 000 000) as used in the U.S.
Number:billion = 1E+09 #multiplier (1 000 000 000) as used in the U.S.
Number:trillion = 1E+12 #multiplier (1 000 000 000 000) as used in the U.S.
Number:quadrillion = 1E+15 #multiplier (1E+15) as used in the U.S.
Number:quintillion = 1E+18 #multiplier (1E+18) as used in the U.S.
Number:milliard = 1E+09 #multiplier (1 000 000 000) as used in the U.K.
Number:billion_long = 1E+12 #multiplier (1 000 000 000 000) as used in the U.K.
Number:trillion_long = 1E+18 #multiplier (1E+18) as used in the U.K.
Number:quadrillion_long = 1E+24 #multiplier (1E+24) as used in the U.K.
Number:quintillion_long = 1E+30 #multiplier (1E+30) as used in the U.K.

Common,Angle:cycle*=2pi
Common,Angle:rev*,revolution*=2pi
Common,Angle:deg,degree*=(1/180) pi rad
Common,Angle:grad,grade=0.9 deg
Common,Angle:arcmin=(1/60)deg
Common,Angle:arcsec=(1/60)arcmin

#Time
Common,SI:min*,minute*=60 s
Common,SI:hr*,hour*=60 min
Common,SI:day*=24 hr
Common:yr*,year*=365 day
Common:mo*,month*=(1/12)yr
Common:wk*,week*=7 day
Common:decade*=10 yr
Common:century*=100 yr
Common:millennium*=1000 yr
Common:aeon*=1E+09 yr
Common:fortnight*=14 day

#Length
*Common:micron*=1 um
Common:angstrom*=1E-10 m
Common:fermi*=1E-15 m
*Common:parsec*=3.0857E+16 m
Common:au=1.49598E+11 m
Common:mile_nautical=1852 m
Common:in,inch*=2.54 cm
Common:mil* =(1/1000)in
Common:ft,foot,feet=12 in
Common:yd*,yard*=3 ft
Common:mi,mile*=5280 ft #(U.S. statute)
Common:link*=7.92 in #Surveyor's
Common:chain*=100 link #Surveyor's
Common:pole*,perch*,rod*=5.5 yd
Common:fathom*=6 ft
Common:league*=3 mi
Common:furlong*=220 yd
Common:lyr*,lightyear*=1 c*365.25 day
Common:lightsecond*=1 c*s

#Mass
Common:lbm,poundm,lb*,pound*=453.592 gm
Common:ozm,ouncem,oz*,ounce*=(1/16) lbm
Common:slug*=14593.9 gm
Common:grain*=(1/7000)lbm
Common:dwt,pennyweight=24 grain #troy
Common:cwt,hundredweight=100 lbm #avoirdupois
Common:ct,carat*=200 mgm #mass of gems
*Common,Physical_constant:amu,dalton*=1.66054E-24 gm #unified atomic mass unit
Common:tonm,ton*=2000 lbm
Common:tonm_long,ton_long=2240 lbm #imperial (U.K.)
*Common,SI:tonnem,tonm_metric,tonne*,ton_metric=1E+06 gm # metric ton

#Force
Common:pdl,poundal*=1 ft lbm/s^2
Common:kip*=1000 lbm*grav
Common:dyne*=1E-05 N
Common:pond*=1 gm*grav
*Common:gf,gramf,g,gram*=1 gm*grav
Common:lbf,poundf,lb*,pound*=1 lbm*grav
Common:ozf,ouncef,oz*,ounce*=1 ozm*grav
Common:tonf,ton*=1 tonm*grav
Common:tonf_long,ton_long=2240 lbm*grav #imperial (U.K.)
*Common,SI:tonnef*,tonf_metric,tonne*,ton_metric=1E+06 gm*grav # metric ton

#Area
Common:ha,hectare*=10000 square m
Common:sqin=1 square in
Common:sqft=1 square ft
Common:sqyd=1 square yd
Common:sqmi=1 square mi
Common:sqcm=0.01 m * 0.01 m
Common:sqmm=0.001 m * 0.001 m
Common:section*=1 sqmi #land measure
Common:ac,acre*=10 square chain #land measure

#Volume
Common:cc*=1 cubic cm
Common:cuin=1 cubic in
Common:cuft=1 cubic ft
Common:cuyd=1 cubic yd
Common:stere=1 cubic m #volume of wood
Common:gal*,gallon*=231 cubic in
Common:qt*,quart*=(1/4)gal
Common:pt*,pint*=(1/8) gal
Common:floz,ouncefl,oz*,ounce*=(1/128)gal
Common:bu,bushel*=2150.42 cuin
Common:peck*=(1/4)bu
Common:cord*=128 cuft #volume of wood
Common:bdft,bd_foot,bd_feet=144 cuin #wood
Common:bbl,barrel_oil=42 gal #crude oil
Common:cup*=(1/4)qt
Common:tbsp,tablespoon*=(1/2)floz
Common:tsp,teaspoon*=(1/6)floz

#Speed
Common:kt,knot*=1 mile_nautical/hr
Common:ips=1 in/s
Common:ipm=1 in/min
Common:fps=1 ft/s
Common:fpm=1 ft/min
Common:mph=1 mi/hr
Common:kph=1 km/hr

#Acceleration
Common:galileo*=0.01 m/s^2

#Pressure
*Common:torr=(101325/760)Pa
*Common:bar=100000 Pa
Common:mb=mbar #pressure in millibar
Common:atm,atmosphere*=101325 Pa #standard atmospheric pressure
Common:psi=1 lbf/square in
Common:ksi=1000 lbf/square in
Common:mmhg,mmHg=133.3224 Pa #pressure (barometric)
Common:inhg,inHg=mmhg * in/mm
Common:Hg=mmhg/mm #density of mercury for pressure calculations
Common:inwc,inWc,inH2O=248.84 Pa #inches water column at 60 degF
Common:H2O=inwc/in #density of water for pressure calculations

#Energy
*Common,SI,Energy:eV,electronvolt*=1.60218E-19 J
*Common,Energy:cal,calorie*=4.184 J
*Common,Energy:Wh,wh=3600 J #watt hour
Common,Energy:cal_food,foodcal,Cal,Calorie*=1 kcal #food package label energy
Common,Energy:Btu*,btu*=1055.06 J #international table
Common,Energy:therm*=1.05480E+08 J #CNG industry
Common,Energy:quad*=1.055E+18 J
*Common,Energy:ton_explosive=4.184E+09 J #of TNT
Common,Energy:erg*=1E-07 J #CGS

#Torque
Common,Torque:inlb*=1 in lbf
Common,Torque:ftlb*=1 ft lbf

#Power
Common:va,VA =1 W
Common:hp,horsepower,HP=550 ft lbf/s
Common:ton_refrig=200 Btu/min #cooling equipment capacity

#Flow
Common:cfs=1 cuft/s
Common:cfm=1 cuft/min
Common:cfh=1 cuft/hr
Common:gps=1 gal/s
Common:gpm=1 gal/min
Common:gph=1 gal/hr

#Temperature
Common:deltaR,deltar=(1/1.8)deltaK #interval (T-T0) Rankine
Common:deltaC,deltac=1 deltaK #interval (T-T0) Celsius
Common:deltaF,deltaf=(1/1.8)deltaK #interval (T-T0) Fahrenheit
Common:degK,degk=1 deltaK #absolute Kelvin
Common:degR,degr=1 deltaR #absolute Rankine
Common:degC,degc=1 deltaC #absolute Celsius, with caution
Common:degF,degf=1 deltaF #absolute Fahrenheit, with caution
Common:absC,absc=1 deltaC #absolute Celsius, without caution
Common:absF,absf=1 deltaF #absolute Fahrenheit, without caution

#Frequency
Common,Frequency,Angular_velocity:rpm*=rev/min
Common,Frequency,Angular_velocity:cps=cycle/s
Common,Frequency,Angular_velocity:rps=rev/s

#Storage
*Common:byte*,Byte*,B,char*=8 bit #computer storage

#Money
Common:cent*=0.01 $ #U.S.

Common:mpg=1 mi/gal
Common:rvalue=1(sqft deltaF)/(Btu/hr) #thermal insulation
Common:uvalue=1(Btu/hr)/(sqft deltaF) #inverse of Rvalue
*Common:baud,bps=1 bit/s #DataComm

Physical_constant:G,grav_const=6.67259E-11 N m^2/(kgm)^2 #gravitational constant
Physical_constant:rm_e,mass_electron=9.10939E-31 kgm #rest mass electron
Physical_constant:rm_p,mass_proton=1.67262E-27 kgm #rest mass proton
Physical_constant:rm_n,mass_neutron=1.67493E-27 kgm #rest mass neutron

Physical_constant:qe,electron_charge*=1.602176634E-19 A s
Physical_constant:mu0,permeability_vac=4 pi*1E-07 H/m
Physical_constant:e0,permittivity_vac=8.85419E-12 F/m

# ADVANCED.UNI

Advanced,Number:bakers_dozen=13
Advanced,Number:ream*=500 #paper
Advanced,Number:proof=1/200 #alcoholic content

Advanced:shake*=1E-08 s
Advanced:year_solar=3.15569E+07 s #mean solar
Advanced:cron*=3.156E+13 s

Advanced:mile_int=1609.34 m
Advanced:rowland*=angstrom
Advanced:point*=3.5146E-04 m #as used in printing
Advanced:pica*=12 point #as used in printing
Advanced:caliber=0.01 in #gun bore diameter
Advanced:bolt*=40 yd #cloth measure

Advanced:dram*,drachm*=27.3438 grain #avoirdupois
Advanced:ounce_troy=480 grain
Advanced:pound_troy=5760 grain
Advanced:cwt_long=112 lbm #imperial
Advanced:stone*=14 lbm
Advanced:ton_assay=29.1667 gm #refined from ore

Advanced:sthen*=1E+08 dyne

Advanced:circ_inch*=(pi/4)sqin #area 1 inch diam
Advanced:circ_mil*=pi*2.5E-07 sqin #area 1 mil diam
Advanced,SI:barn*=1E-28 m^2
Advanced:shed*=1E-24 barn

Advanced:ton_ship=40 cuft #sea freight
Advanced:ton_reg=100 cuft #capacity of ships
Advanced:ton_disp=35 cuft #size of ships
Advanced:gill*=(1/32)gal
Advanced:fluid_dram*,fldr=(1/1024)gal
Advanced:minim*=(1/60)fluid_dram
Advanced:quart_dry=(1/32)bu
Advanced:pint_dry=(1/64)bu
Advanced:barrel_dry=7056 cuin #U.S. fruit, veggies etc.
Advanced:gal_imp=277.42 cuin #U.K.
Advanced:quart_imp=(1/4)gal_imp #U.K.
Advanced:pint_imp=(1/8)gal_imp #U.K.
Advanced:floz_imp=(1/160)gal_imp #U.K.
Advanced:gill_imp=5 floz_imp # U.K.
Advanced:bushel_imp=2219.36 cuin #U.K.
Advanced:peck_imp=(1/4)bushel_imp #U.K.

Advanced:benz=1 m/s
Advanced:leo*=10 m/s^2

Advanced,Pressure:barye*,barie*=0.1 Pa
Advanced,Pressure:baryl=1 dyne/square cm
Advanced,Pressure:pieze,pz=10000 dyne/square cm

Advanced,Energy:therm_eec=1.05506E+08 J #European Economic Community
Advanced,Energy:chu*=1.8 Btu #centigrade heat unit
Advanced,Energy:thermie*=1E+06 cal #U.K.
Advanced,Energy:rydberg*=13.6054 eV

Advanced:frigorie*=50 Btu/min #cooling equipment (Europe)

Advanced:poise=0.1 Pa s #CGS
Advanced:reyn*=1 (lbf/sqin)s
Advanced:stokes=0.0001 m^2/s

*Advanced,Frequency:Ci,curie*,ci=3.7E+10/s #of radioactivity
Advanced,Frequency:Bq,becquerel*,bq=1/s #of radioactivity

Advanced:denier=1 gm/(9000 m) #textiles
Advanced:drex=1E-04 gm/m #textiles
Advanced:tex=1E-03 gm/m #textiles
Advanced:poumar=1 lbm/(1E+06 yd) #textiles

Advanced:langley*=41840 J/m^2

Advanced:gib*=1 cal/mol

Advanced:clausius=1 J/(mol deltaK)
Advanced:entropy_unit=1 cal/(mol deltaK)

Advanced:rhe*=10/(Pa s) #inverse dynamic viscosity
Advanced:diopter*,dioptre*=1/m
Advanced:kayser*=100/m

Advanced,Physical_constant:plancks_const=6.626070E-34 J s
Advanced,Physical_constant:avogadros_num=6.02214076E+23/mol
Advanced,Physical_constant:boltzmann_const=1.380649E-23 J/deltaK
Advanced,Physical_constant:stef_boltz_const=5.67051E-08 W/(m^2 deltaK^4)
Advanced,Physical_constant:rydberg_const=1.09737E+07/m
Advanced,Physical_constant:V0,vol_gas_const=22.4141 L/mol
Advanced,Physical_constant:R,mol_gas_const,r=8.31451 J/(mol deltaK)
Advanced,Physical_constant:dVcs=9192631770 Hz #transition freq of caesium 133
# Advanced,Physical_constant:Kcd=683 lm/W #luminous efficacy of light at freq = 540E12 Hz

Advanced:year_sidereal=3.15582E+07 s
Advanced:day_sidereal=8.61641E+04 s
Advanced:hr_sidereal=(1/24)day_sidereal
Advanced:min_sidereal=(1/60)hr_sidereal
Advanced:sec_sidereal=(1/60)min_sidereal
Advanced:lunour*=3543.67 s # 1/30 of the time between new moons (30 lunour = 1 synodic month)
Advanced:lune*=24 lunour
Advanced:blink*=0.864 s

Advanced:league_naut=3 mile_nautical
Advanced:chain_naut=4.572 m
Advanced:cable_length=120 fathom
Advanced:link_eng=12 in #Ramden's
Advanced:chain_eng=100 link_eng #Ramden's
Advanced:hank =840 yd #cloth
Advanced:finger=(7/8) in
Advanced:hand=4 in
Advanced:pace=0.762 m #military
Advanced:span=9 in
Advanced:barleycorn=(1/3)in
Advanced:cubit=21.8 in #biblical, range 17 to 22 inch

Advanced:cental*=100 lbm #U.K.
Advanced:quintal_imp=45.3592 kgm #U.K.
Advanced:quintal*=100 kgm
Advanced:dram_apoth=60 grain
Advanced:ounce_apoth=480 grain
Advanced:pound_apoth=5760 grain
Advanced:scruple*=20 grain
Advanced:brieze=1 gm
Advanced:hyl=9.80665 gm

Advanced:township*=36 section
Advanced:rood*=40 pole^2 #U.K.
Advanced:hide*=4.04686E+05 m^2

Advanced:hogshead*=63 gal
Advanced:butt_beer=0.490978 m^3
Advanced:butt_wine=0.954412 m^3
Advanced:bucket*=0.0181844 m^3
Advanced:bodge*=2.27305E-03 m^3
Advanced:chaldron*=1.26861 m^3
Advanced:coomb*,comb*=4 bu
Advanced:perche*=0.700841 m^3 #masonry
Advanced:puncheon*=0.327319 m^3
Advanced:raummeter*,festmeter*=1 m^3
Advanced:trug*=0.024246 m^3
Advanced:sack*=3 bu #many other defs
Advanced:amagat*=0.022414 m^3
Advanced:anker*=0.0378735 m^3
Advanced:aum*=0.136383 m^3
Advanced:jar*=0.113652 m^3
Advanced:kanne*=1E-03 m^3
Advanced:noggin*=1.42065E-04 m^3
Advanced:pipe*=0.477206 m^3
Advanced:pottle*=2.27304E-03 m^3

Advanced,Energy:cal_mean=4.19002 J
Advanced,Energy:cal_thermochem=4.184 J
Advanced,Energy:btu_mean=1055.87 J
Advanced,Energy:btu_thermochem=1054.35 J
Advanced,Energy:duty*=1.35582 J

Advanced:hp_metric=75 kgf m/s
Advanced:hp_boiler=9809.50 W #bigger that hp
Advanced:hp_electric=746.0 W
Advanced:hp_water=746.043 W
Advanced:manpower=(1/10)hp

Advanced:admiralty_knot*=6080 ft/hr
Advanced:kine*=0.01 m/s

Advanced:celo*=0.3048 m/s^2

Advanced:pli*=17.8580 kgm/m

# PHYSPROP.UNI

Water:d_sea_water=1.025 gm/cc
Water:d_water=1 gm/cc #@ 4 degC
Water,Thermal_conductivity:tc_water=0.6 W/(m deltaK) #@ 20 degC
Water,Viscosity:visc_water=0.001 Pa s #dynamic @ 20 degC
Water,Speed_sound:ss_water=1497 m/s #@ 20 degC
Water,Specific_heat_m:shm_water,sh_water=1 cal/(gm deltaK) #mean
Water,Specific_heat_v:shv_water,sh_water=shm_water*d_water
Water,Heat_fusion_m:hfm_water,hf_water=144 Btu/lbm
Water,Heat_fusion_v:hfv_water,hf_water=hfm_water*d_water
Water,Heat_vaporization_m:hvm_water,hv_water=956 Btu/lbm
Water,Heat_vaporization_v:hvv_water,hv_water=hvm_water*d_water

Ice:d_ice=0.92 gm/cc
Ice,Specific_heat_m:shm_ice,sh_ice=0.47 Btu/(lbm deltaF)
Ice,Specific_heat_v:shv_ice,sh_ice=shm_ice*d_ice #by volume
Ice,Thermal_conductivity:tc_ice=2.18 W/(m deltaC)

Air:d_air=0.0012928 gm/cc #@ 1 atm, 0degC
Air,Thermal_conductivity:tc_air=0.0242 W/(m deltaK) #@ 0 degC
Air,Viscosity:visc_air=1.78E-05 Pa s #dynamic @ 20 degC
Air,Speed_sound:ss_air=1128.86 ft/s #@ 20 degC, 50% RH
Air,Specific_heat_m:shm_air,sh_air=0.24 cal/(gm deltaK) #@ 0 degC
Air,Specific_heat_v:shv_air,sh_air=shm_air*d_air #@ 1 atm, 0 degC

Physical_property:d_aluminum=2.702 gm/cc
Physical_property:d_copper=8.92 gm/cc
Physical_property:d_gold=19.3 gm/cc
Physical_property:d_iron=7.86 gm/cc
Physical_property:d_lead=11.34 gm/cc
Physical_property:d_silver=10.5 gm/cc
Physical_property:d_brick=2.0 gm/cc #hard
Physical_property:d_concrete=2.3 gm/cc #with stone, sand
Physical_property:d_clay=1.8 gm/cc #damp, plastic
Physical_property:d_glass=2.6 gm/cc
Physical_property:d_sand=100 lbm/ft^3
Physical_property:d_granite=175 lbm/ft^3
Physical_property:d_diamond=3.3 gm/cc
Physical_property:d_mercury=13.5951 gm/cc

Physical_property,Specific_heat_m:shm_aluminum=0.215 cal/(gm deltaC)
Physical_property,Specific_heat_m:shm_copper=0.092 cal/(gm deltaC)
Physical_property,Specific_heat_m:shm_gold=0.03 cal/(gm deltaC)
Physical_property,Specific_heat_m:shm_iron=0.108 cal/(gm deltaC)
Physical_property,Specific_heat_m:shm_lead=0.03 cal/(gm deltaC)
Physical_property,Specific_heat_m:shm_mercury=0.140 J/(gm deltaC)
Physical_property,Specific_heat_m:shm_silver=0.235 J/(gm deltaC)
Physical_property,Specific_heat_m:shm_brick=0.22 Btu/(lbm deltaF)
Physical_property,Specific_heat_m:shm_concrete=0.156 Btu/(lbm deltaF)
Physical_property,Specific_heat_m:shm_glass=0.199 Btu/(lbm deltaF)
Physical_property,Specific_heat_m:shm_sand=0.195 Btu/(lbm deltaF)
Physical_property,Specific_heat_m:shm_wood=0.65 Btu/(lbm deltaF)
Physical_property,Specific_heat_m:shm_gasoline=0.53 Btu/(lbm deltaF)
Physical_property,Specific_heat_m:shm_kerosene=0.48 Btu/(lbm deltaF)

Physical_property,Heat_vaporization_m:hvm_gasoline,hv_gasoline=116 Btu/lbm
Physical_property,Heat_vaporization_m:hvm_kerosene,hv_kerosene=86 Btu/lbm
Physical_property,Heat_vaporization_m:hvm_ethanol,hv_ethanol=367 Btu/lbm
Physical_property,Heat_vaporization_m:hvm_methanol,hv_methanol=482 Btu/lbm

Physical_property,Heat_fusion_m:hfm_aluminum=171 Btu/lbm
Physical_property,Heat_fusion_m:hfm_copper=88.2 Btu/lbm
Physical_property,Heat_fusion_m:hfm_gold=28.7 Btu/lbm
Physical_property,Heat_fusion_m:hfm_iron=117 Btu/lbm
Physical_property,Heat_fusion_m:hfm_lead=10 Btu/lbm
Physical_property,Heat_fusion_m:hfm_mercury=5.0 Btu/lbm

Physical_property,Thermal_conductivity:tc_aluminum=238 W/(m deltaC)
Physical_property,Thermal_conductivity:tc_copper=397 W/(m deltaC)
Physical_property,Thermal_conductivity:tc_gold=318 W/(m deltaC)
Physical_property,Thermal_conductivity:tc_iron=79.5 W/(m deltaC)
Physical_property,Thermal_conductivity:tc_lead=34.7 W/(m deltaC)
Physical_property,Thermal_conductivity:tc_mercury=8.34 W/(m deltaC)
Physical_property,Thermal_conductivity:tc_silver=428 W/(m deltaC)
Physical_property,Thermal_conductivity:tc_brick=0.58 W/(m deltaC)
Physical_property,Thermal_conductivity:tc_concrete=1 W/(m deltaC) #stone, sand
Physical_property,Thermal_conductivity:tc_glass=0.72 W/(m deltaC) #plate
Physical_property,Thermal_conductivity:tc_wood=0.11 W/(m deltaC) #across grain (pine)
Physical_property,Thermal_conductivity:tc_glasswool=0.042 W/(m deltaC)
Physical_property,Thermal_conductivity:tc_styrofoam=0.036 W/(m deltaC)
Physical_property,Thermal_conductivity:tc_earth=1 W/ (m deltaC) #40% water
Physical_property,Thermal_conductivity:tc_sand=0.33 W/(m deltaC) #dry
Physical_property,Thermal_conductivity:tc_gravel=0.38 W/(m deltaC) #dry
Physical_property,Thermal_conductivity:tc_diamond=554 W/(m deltaC)

Physical_property:sun_power=3.92E+26 W #total
Physical_property:solar_const=1340 W/m^2 #at Earths surface

Physical_property:d_gasoline=0.67 gm/cc #liquid
Physical_property:d_kerosene=0.819 gm/cc #liquid
Physical_property:d_propane_gas=0.00183 gm/cc #gas
Physical_property:d_propane_liq=0.5 gm/cc #liquid
Physical_property:d_oil=0.875 gm/cc #liquid
Physical_property:d_coal=0.7 gm/cc #bulk
Physical_property:d_methanol=0.810 gm/cc #liquid
Physical_property:d_ethanol=0.791 gm/cc #liquid
Physical_property:d_wood=0.55 gm/cc #solid (pine)

Physical_property,Heat_combustion_m:hcm_gasoline=20750 Btu/lbm
Physical_property,Heat_combustion_v:hcv_gasoline=d_gasoline*hcm_gasoline
Physical_property,Heat_combustion_m:hcm_kerosene=19810 Btu/lbm
Physical_property,Heat_combustion_v:hcv_kerosene=d_kerosene*hcm_kerosene
Physical_property,Heat_combustion_m:hcm_propane_liq=21249 Btu/lbm
Physical_property,Heat_combustion_v:hcv_propane_liq=d_propane_liq*hcm_propane_liq
Physical_property,Heat_combustion_v:hcv_propane_gas=d_propane_gas*hcm_propane_liq
Physical_property,Heat_combustion_v:hcv_natural_gas=1000 Btu/cubic ft
Physical_property,Heat_combustion_m:hcm_oil=18500 Btu/lbm #crude oil
Physical_property,Heat_combustion_v:hcv_oil=d_oil*hcm_oil #crude oil
Physical_property,Heat_combustion_m:hcm_coal=13000 Btu/lbm
Physical_property,Heat_combustion_v:hcv_coal=d_coal*hcm_coal
Physical_property,Heat_combustion_m:hcm_methanol=9600 Btu/lbm
Physical_property,Heat_combustion_v:hcv_methanol=d_methanol*hcm_methanol
Physical_property,Heat_combustion_m:hcm_ethanol=12800 Btu/lbm
Physical_property,Heat_combustion_v:hcv_ethanol=d_ethanol*hcm_ethanol
Physical_property,Heat_combustion_m:hcm_wood=8750 Btu/lbm #most kinds (dry)
Physical_property,Heat_combustion_v:hcv_wood=d_wood*hcm_wood #pine

# CAPACITY OF BATTERIES
Physical_property,Batteries:e_carb_aaa=2268 J
Physical_property,Batteries:e_carb_aa=5832 J
Physical_property,Batteries:e_carb_c=15120 J
Physical_property,Batteries:e_carb_d=38880 J
Physical_property,Batteries:e_carb_n=2376 J
Physical_property,Batteries:e_carb_9v=14580 J
Physical_property,Batteries:e_alk_aaa=5062 J
Physical_property,Batteries:e_alk_aa=11556 J
Physical_property,Batteries:e_alk_c=32400 J
Physical_property,Batteries:e_alk_d=72900 J
Physical_property,Batteries:e_alk_g=477900 J
Physical_property,Batteries:e_alk_n=4374 J
Physical_property,Batteries:e_alk_9v=19245 J
Physical_property,Batteries:e_nicd_aaa=777 J
Physical_property,Batteries:e_nicd_aa=2160 J
Physical_property,Batteries:e_nicd_subc=5184 J
Physical_property,Batteries:e_nicd_c=5184 J
Physical_property,Batteries:e_nicd_d=17280 J
Physical_property,Batteries:e_nicd_n=648 J
Physical_property,Batteries:e_nicd_9v=2419 J

TEST 1|= 1
TEST 1|= 1
TEST 1|= 1
TEST 1|= 1
TEST e_nicd_9v? | = 2419 joule, = 2419 newton meter
`;

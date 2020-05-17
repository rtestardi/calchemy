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

PREFIX Prefix:yotta,Y=1E+24
PREFIX Prefix:zetta,Z=1E+21
PREFIX Prefix:exa,E=1E+18
PREFIX Prefix:peta,P=1E+15
PREFIX Prefix:tera,T=1E+12
PREFIX Prefix:giga,G=1E+09
PREFIX Prefix:mega,M=1E+06
PREFIX Prefix:kilo,k=1E+03
PREFIX Prefix:hecto,h=1E+02
PREFIX Prefix:deka,da=1E+01
PREFIX Prefix:deci,d=1E-01
PREFIX Prefix:centi,c=1E-02
PREFIX Prefix:milli,m=1E-03
PREFIX Prefix:micro,u=1E-06
PREFIX Prefix:nano,n=1E-09
PREFIX Prefix:pico,p=1E-12
PREFIX Prefix:femto,f=1E-15
PREFIX Prefix:atto,a=1E-18
PREFIX Prefix:zepto,z=1E-21
PREFIX Prefix:yocto,y=1E-24

PREFIX Prefix:kibi,Ki=1024 #storage
PREFIX Prefix:mebi,Mi=1024^2 #storage
PREFIX Prefix:gibi,Gi=1024^3 #storage
PREFIX Prefix:tebi,Ti=1024^4 #storage
PREFIX Prefix:pebi,Pi=1024^5 #storage
PREFIX Prefix:exbi,Ei=1024^6 #storage
PREFIX Prefix:zebi,Zi=1024^7 #storage
PREFIX Prefix:yobi,Yi=1024^8 #storage

Number:pi=3.14159265358979323
Number:e=2.71828182845904523

#Primary
*Common,SI:meter*,m,metre*=LENGTH
*Common,SI:gramm,gm,g,gram*=MASS
*Common,SI:second*,s,sec*=TIME
Common,SI:deltaK,deltak=TEMP #interval (T-T0) Kelvin
*Common,Angle:radian*,rad=1
*Common:bit*,b=STORAGE
Common:dollar*,$=MONEY
*Common,SI:ampere*,A,amp*=CURRENT
*Advanced,SI:mole*,mol=SUBSTANCE
*Common,SI,Frequency,Angular_velocity:hertz,Hz=2pi radian/second

#Secondary
*Common,SI:liter*,L,litre*,l=1 cubic decimeter #was 1.000028 before 1964
*Common,SI:newton*,N=1 kilogramm meter/second^2
*Common,SI,Energy:joule*,J=1 newton meter
*Common,SI:watt*,W=1 joule/second
*Common,SI:pascal*,Pa,=1 newton/square meter
*Common,SI:coulomb*,C=ampere second
*Common,SI:volt*,V=1 joule/coulomb
*Common,SI:ohm*=1 volt/ampere
*Common,SI:farad*,F=1 coulomb/volt
*Common,SI:henry*,H=1 second^2/farad
*Common,SI:weber*,Wb=1 volt second
*Common,SI:tesla*,T=1 weber/meter^2
*Common:gamma*=1E-09 weber/meter^2
Common:mho*=1 ampere/volt
Common:maxwell*=1E-08 weber #CGS
*Common:gauss=0.0001 weber/meter^2 #CGS

DERIVED Mass=kilogramm
DERIVED Length=meter
DERIVED Time=second
DERIVED Temperature=deltaK
DERIVED Storage=bit
DERIVED Area=meter^2
DERIVED Volume=liter
DERIVED Speed=meter/second
DERIVED Acceleration=meter/second^2
DERIVED Force=newton
DERIVED Energy=joule
AMBIGUOUS Torque=newton meter
DERIVED Power=watt
DERIVED Pressure=pascal
DERIVED Frequency=hertz
AMBIGUOUS Angular_velocity=radian/second
DERIVED Angular_acceleration=radian/second^2
DERIVED Density=kilogramm/liter
DERIVED Flow=liter/second
DERIVED Heat_latent_m=joule/kilogramm
AMBIGUOUS Heat_latent_v=joule/liter
DERIVED Specific_heat_m=joule/(kilogramm*deltaK)
DERIVED Specific_heat_v=joule/(liter*deltaK)
AMBIGUOUS Heat_vaporization_m=joule/kilogramm
AMBIGUOUS Heat_vaporization_v=joule/liter
AMBIGUOUS Heat_fusion_m=joule/kilogramm
AMBIGUOUS Heat_fusion_v=joule/liter
DERIVED Thermal_conductivity=watt/(meter*deltaK)
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
DERIVED Energy_flux=joule/meter^2
DERIVED Molar_heat=joule/mole
DERIVED Molar_heat_capacity=joule/(mole*deltaK)
DERIVED Line_density=kilogramm/meter
DERIVED Kinematic_viscosity=meter^2/second
AMBIGUOUS Heat_combustion_m=joule/kilogramm
AMBIGUOUS Heat_combustion_v=joule/liter
DERIVED Fuel_efficiency=kilometer/liter
DERIVED Momentum=kilogramm meter/second
AMBIGUOUS Stiffness=newton/meter
AMBIGUOUS Radius=meter
AMBIGUOUS Height=meter

Physical_constant:speed_of_light,c=2.99792458E+08 meter/second #speed of light in vacuum
Physical_constant:gravity,grav=9.80665 meter/second^2 #standard acceleration of gravity

Number:percent*,%=1/100
Number:dozen*=12
Number:gross=144
Number:karat*=1/24 #purity of gold (24 karat is pure)
Number:ppm*=1E-06 #parts per million
Number:million=1E+06 #multiplier (1 000 000) as used in the U.S.
Number:billion=1E+09 #multiplier (1 000 000 000) as used in the U.S.
Number:trillion=1E+12 #multiplier (1 000 000 000 000) as used in the U.S.
Number:quadrillion=1E+15 #multiplier (1E+15) as used in the U.S.
Number:quintillion=1E+18 #multiplier (1E+18) as used in the U.S.
Number:milliard=1E+09 #multiplier (1 000 000 000) as used in the U.K.
Number:billion_long=1E+12 #multiplier (1 000 000 000 000) as used in the U.K.
Number:trillion_long=1E+18 #multiplier (1E+18) as used in the U.K.
Number:quadrillion_long=1E+24 #multiplier (1E+24) as used in the U.K.
Number:quintillion_long=1E+30 #multiplier (1E+30) as used in the U.K.

Common,Angle:cycle*=2pi
Common,Angle:revolution*,rev*=2pi
Common,Angle:degree*,deg=(1/180) pi radian
Common,Angle:grade,grad=0.9 degree
Common,Angle:arcmin=(1/60)degree
Common,Angle:arcsec=(1/60)arcmin

#Time
Common,SI:minute*,min*=60 second
Common,SI:hour*,hr*=60 minute
Common,SI:day*=24 hour
Common:year*,yr*=365 day
Common:month*,mo*=(1/12)year
Common:week*,wk*=7 day
Common:decade*=10 year
Common:century*=100 year
Common:millennium*=1000 year
Common:aeon*=1E+09 year
Common:fortnight*=14 day

#Length
*Common:micron*=1E-6 meter
Common:angstrom*=1E-10 meter
Common:fermi*=1E-15 meter
*Common:parsec*=3.0857E+16 meter
Common:au=1.49598E+11 meter
Common:mile_nautical=1852 meter
Common:inch*,in=2.54 centimeter
Common:mil*=(1/1000)inch
Common:foot,ft,feet=12 inch
Common:yard*,yd*=3 foot
Common:mile*,mi=5280 foot #(U.S. statute)
Common:link*=7.92 inch #Surveyor's
Common:chain*=100 link #Surveyor's
Common:pole*,perch*,rod*=5.5 yard
Common:fathom*=6 foot
Common:league*=3 mile
Common:furlong*=220 yard
Common:lightyear*,lyr*=1 speed_of_light*365.25 day
Common:lightsecond*=1 speed_of_light*second

#Mass
Common:poundm,lbm,lb*,pound*=453.592 gramm
Common:ouncem,ozm,oz*,ounce*=(1/16) poundm
Common:slug*=14593.9 gramm
Common:grain*=(1/7000)poundm
Common:pennyweight,dwt=24 grain #troy
Common:hundredweight,cwt=100 poundm #avoirdupois
Common:carat*,ct=200 milligramm #mass of gems
*Common,Physical_constant:amu=1.66054E-24 gramm #unified atomic mass unit
Common:tonm,ton*=2000 poundm
Common:tonm_long,ton_long=2240 poundm #imperial (U.K.)
*Common,SI:tonnem,tonm_metric,tonne*,ton_metric=1E+06 gramm #metric ton

#Force
Common:poundal*,pdl=1 foot poundm/second^2
Common:kip*=1000 poundm*gravity
Common:dyne*=1E-05 newton
Common:pond*=1 gramm*gravity
*Common:gramf,gf,g,gram*=1 gramm*gravity
Common:poundf,lbf,lb*,pound*=1 poundm*gravity
Common:ouncef,ozf,oz*,ounce*=1 ouncem*gravity
Common:tonf,ton*=1 tonm*gravity
Common:tonf_long,ton_long=2240 poundm*gravity #imperial (U.K.)
*Common,SI:tonnef*,tonf_metric,tonne*,ton_metric=1E+06 gramm*gravity #metric ton

#Area
Common:hectare*,ha=10000 square meter
Common:sqin=1 square inch
Common:sqft=1 square foot
Common:sqyd=1 square yard
Common:sqmi=1 square mile
Common:sqcm=0.01 meter * 0.01 meter
Common:sqmm=0.001 meter * 0.001 meter
Common:section*=1 sqmi #land measure
Common:acre*,ac=10 square chain #land measure

#Volume
Common:cc*=1 cubic centimeter
Common:cuin=1 cubic inch
Common:cuft=1 cubic foot
Common:cuyd=1 cubic yard
Common:stere=1 cubic meter #volume of wood
Common:gallon*,gal*=231 cubic inch
Common:quart*,qt*=(1/4)gallon
Common:pint*,pt*=(1/8) gallon
Common:ouncefl,ozfl,floz,oz*,ounce*=(1/128)gallon
Common:bushel*,bu=2150.42 cuin
Common:peck*=(1/4)bushel
Common:cord*=128 cuft #volume of wood
Common:bd_foot,bdft,bd_feet=144 cuin #wood
Common:barrel_oil,bbl=42 gallon #crude oil
Common:cup*=(1/4)quart
Common:tablespoon*,tbsp=(1/2)ouncefl
Common:teaspoon*,tsp*=(1/6)ouncefl

#Speed
Common:knot*,kt=1 mile_nautical/hour
Common:ips=1 inch/second
Common:ipm=1 inch/minute
Common:fps=1 foot/second
Common:fpm=1 foot/minute
Common:mph=1 mile/hour
Common:kph=1 kilometer/hour

#Acceleration
Common:galileo*=0.01 meter/second^2

#Pressure
*Common:torr=(101325/760)pascal
*Common:bar=100000 pascal
Common:mb=millibar #pressure in millibar
Common:atmosphere*,atm=101325 pascal #standard atmospheric pressure
Common:psi=1 poundf/square inch
Common:ksi=1000 poundf/square inch
Common:mmHg,mmhg=133.3224 pascal #pressure (barometric)
Common:inHg,inhg=mmHg * inch/millimeter
Common:Hg,hg=mmHg/millimeter #density of mercury for pressure calculations
Common:inWc,inwc,inH2O=248.84 pascal #inches water column at 60 degF
Common:H2O=inWc/inch #density of water for pressure calculations

#Energy
*Common,SI,Energy:electronvolt*,eV=1.60218E-19 joule
*Common,Energy:calorie*,cal=4.184 joule
*Common,Energy:watthour*,Wh,wh=3600 joule #watt hour
Common,Energy:foodcal,cal_food,Cal,Calorie*=1 kilocalorie #food package label energy
Common,Energy:Btu*,btu*=1055.06 joule #international table
Common,Energy:therm*=1.05480E+08 joule #CNG industry
Common,Energy:quad*=1.055E+18 joule
*Common,Energy:ton_explosive=4.184E+09 joule #of TNT
Common,Energy:erg*=1E-07 joule #CGS

#Torque
Common,Torque:inlb*=1 inch poundf
Common,Torque:ftlb*=1 foot poundf

#Power
Common:VA,va=1 watt
Common:horsepower,hp,HP=550 foot poundf/second
Common:ton_refrig=200 Btu/minute #cooling equipment capacity

#Flow
Common:cfs=1 cuft/second
Common:cfm=1 cuft/minute
Common:cfh=1 cuft/hour
Common:gps=1 gallon/second
Common:gpm=1 gallon/minute
Common:gph=1 gallon/hour

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
Common,Frequency,Angular_velocity:rpm*=revolution/minute
Common,Frequency,Angular_velocity:cps=cycle/second
Common,Frequency,Angular_velocity:rps=revolution/second

#Storage
*Common:Byte*,byte*,B,char*=8 bit #computer storage

#Money
Common:cent*=0.01 dollar #U.S.

Common:mpg=1 mile/gallon
Common:rvalue=1(sqft deltaF)/(Btu/hour) #thermal insulation
Common:uvalue=1(Btu/hour)/(sqft deltaF) #inverse of Rvalue
*Common:baud,bps=1 bit/second #DataComm

Physical_constant:grav_const,G=6.67259E-11 newton meter^2/(kilogramm)^2 #gravitational constant
Physical_constant:mass_electron,rm_e=9.10939E-31 kilogramm #rest mass electron
Physical_constant:mass_proton,rm_p=1.67262E-27 kilogramm #rest mass proton
Physical_constant:mass_neutron,rm_n=1.67493E-27 kilogramm #rest mass neutron

Physical_constant:electron_charge*,qe=1.602176634E-19 ampere second
Physical_constant:permeability_vac,mu0=4 pi*1E-07 henry/meter
Physical_constant:permittivity_vac,e0=8.85419E-12 farad/meter

# ADVANCED.UNI

Advanced,Number:bakers_dozen=13
Advanced,Number:ream*=500 #paper
Advanced,Number:proof=1/200 #alcoholic content

Advanced:shake*=1E-08 second
Advanced:year_solar=3.15569E+07 second #mean solar
Advanced:cron*=3.156E+13 second

Advanced:mile_int=1609.34 meter
Advanced:rowland*=angstrom
Advanced:point*=3.5146E-04 meter #as used in printing
Advanced:pica*=12 point #as used in printing
Advanced:caliber=0.01 inch #gun bore diameter
Advanced:bolt*=40 yard #cloth measure

Advanced:dram*,drachm*=27.3438 grain #avoirdupois
Advanced:ounce_troy=480 grain
Advanced:pound_troy=5760 grain
Advanced:cwt_long=112 poundm #imperial
Advanced:stone*=14 poundm
Advanced:ton_assay=29.1667 gramm #refined from ore

Advanced:sthen*=1E+08 dyne

Advanced:circ_inch*=(pi/4)sqin #area 1 inch diam
Advanced:circ_mil*=pi*2.5E-07 sqin #area 1 mil diam
Advanced,SI:barn*=1E-28 meter^2
Advanced:shed*=1E-24 barn

Advanced:ton_ship=40 cuft #sea freight
Advanced:ton_reg=100 cuft #capacity of ships
Advanced:ton_disp=35 cuft #size of ships
Advanced:gill*=(1/32)gallon
Advanced:fluid_dram*,fldr=(1/1024)gallon
Advanced:minim*=(1/60)fluid_dram
Advanced:quart_dry=(1/32)bushel
Advanced:pint_dry=(1/64)bushel
Advanced:barrel_dry=7056 cuin #U.S. fruit, veggies etc.
Advanced:gal_imp=277.42 cuin #U.K.
Advanced:quart_imp=(1/4)gal_imp #U.K.
Advanced:pint_imp=(1/8)gal_imp #U.K.
Advanced:floz_imp=(1/160)gal_imp #U.K.
Advanced:gill_imp=5 floz_imp #U.K.
Advanced:bushel_imp=2219.36 cuin #U.K.
Advanced:peck_imp=(1/4)bushel_imp #U.K.

Advanced:benz=1 meter/second
Advanced:leo*=10 meter/second^2

Advanced,Pressure:barye*,barie*=0.1 pascal
Advanced,Pressure:baryl=1 dyne/square centimeter
Advanced,Pressure:pieze,pz=10000 dyne/square centimeter

Advanced,Energy:therm_eec=1.05506E+08 joule #European Economic Community
Advanced,Energy:chu*=1.8 Btu #centigrade heat unit
Advanced,Energy:thermie*=1E+06 calorie #U.K.
Advanced,Energy:rydberg*=13.6054 electronvolt

Advanced:frigorie*=50 Btu/minute #cooling equipment (Europe)

Advanced:poise=0.1 pascal second #CGS
Advanced:reyn*=1 (poundf/sqin)second
Advanced:stokes=0.0001 meter^2/second

*Advanced,Frequency:curie*,Ci,ci=3.7E+10/second #of radioactivity
Advanced,Frequency:becquerel*,Bq=1/second #of radioactivity

Advanced:denier=1 gramm/(9000 meter) #textiles
Advanced:drex=1E-04 gramm/meter #textiles
Advanced:tex=1E-03 gramm/meter #textiles
Advanced:poumar=1 poundm/(1E+06 yard) #textiles

Advanced:langley*=41840 joule/meter^2

Advanced:gib*=1 calorie/mole

Advanced:clausius=1 joule/(mole deltaK)
Advanced:entropy_unit=1 calorie/(mole deltaK)

Advanced:rhe*=10/(pascal second) #inverse dynamic viscosity
Advanced:dioptre*,diopter*=1/meter
Advanced:kayser*=100/meter

Advanced,Physical_constant:plancks_const=6.626070E-34 joule second
Advanced,Physical_constant:avogadros_num=6.02214076E+23/mole
Advanced,Physical_constant:boltzmann_const=1.380649E-23 joule/deltaK
Advanced,Physical_constant:stef_boltz_const=5.67051E-08 watt/(meter^2 deltaK^4)
Advanced,Physical_constant:rydberg_const=1.09737E+07/meter
Advanced,Physical_constant:vol_gas_const,V0,=22.4141 liter/mole
Advanced,Physical_constant:mol_gas_const,R,r=8.31451 joule/(mole deltaK)
Advanced,Physical_constant:dVcs=9192631770 hertz #transition freq of caesium 133

Advanced:year_sidereal=3.15582E+07 second
Advanced:day_sidereal=8.61641E+04 second
Advanced:hr_sidereal=(1/24)day_sidereal
Advanced:min_sidereal=(1/60)hr_sidereal
Advanced:sec_sidereal=(1/60)min_sidereal
Advanced:lunour*=3543.67 second #1/30 of the time between new moons (30 lunour = 1 synodic month)
Advanced:lune*=24 lunour
Advanced:blink*=0.864 second

Advanced:league_naut=3 mile_nautical
Advanced:chain_naut=4.572 meter
Advanced:cable_length=120 fathom
Advanced:link_eng=12 inch #Ramden's
Advanced:chain_eng=100 link_eng #Ramden's
Advanced:hank=840 yard #cloth
Advanced:finger=(7/8) inch
Advanced:hand=4 inch
Advanced:pace=0.762 meter #military
Advanced:span=9 inch
Advanced:barleycorn=(1/3)inch
Advanced:cubit=21.8 inch #biblical, range 17 to 22 inch

Advanced:cental*=100 poundm #U.K.
Advanced:quintal_imp=45.3592 kilogramm #U.K.
Advanced:quintal*=100 kilogramm
Advanced:dram_apoth=60 grain
Advanced:ounce_apoth=480 grain
Advanced:pound_apoth=5760 grain
Advanced:scruple*=20 grain
Advanced:brieze=1 gramm
Advanced:hyl=9.80665 gramm

Advanced:township*=36 section
Advanced:rood*=40 pole^2 #U.K.
Advanced:hide*=4.04686E+05 meter^2

Advanced:hogshead*=63 gallon
Advanced:butt_beer=0.490978 meter^3
Advanced:butt_wine=0.954412 meter^3
Advanced:bucket*=0.0181844 meter^3
Advanced:bodge*=2.27305E-03 meter^3
Advanced:chaldron*=1.26861 meter^3
Advanced:coomb*,comb*=4 bushel
Advanced:perche*=0.700841 meter^3 #masonry
Advanced:puncheon*=0.327319 meter^3
Advanced:raummeter*,festmeter*=1 meter^3
Advanced:trug*=0.024246 meter^3
Advanced:sack*=3 bushel #many other defs
Advanced:amagat*=0.022414 meter^3
Advanced:anker*=0.0378735 meter^3
Advanced:aum*=0.136383 meter^3
Advanced:jar*=0.113652 meter^3
Advanced:kanne*=1E-03 meter^3
Advanced:noggin*=1.42065E-04 meter^3
Advanced:pipe*=0.477206 meter^3
Advanced:pottle*=2.27304E-03 meter^3

Advanced,Energy:cal_mean=4.19002 joule
Advanced,Energy:cal_thermochem=4.184 joule
Advanced,Energy:btu_mean=1055.87 joule
Advanced,Energy:btu_thermochem=1054.35 joule
Advanced,Energy:duty*=1.35582 joule

Advanced:hp_metric=75 kilogramf meter/second
Advanced:hp_boiler=9809.50 watt #bigger that hp
Advanced:hp_electric=746.0 watt
Advanced:hp_water=746.043 watt
Advanced:manpower=(1/10)horsepower

Advanced:admiralty_knot*=6080 foot/hour
Advanced:kine*=0.01 meter/second

Advanced:celo*=0.3048 meter/second^2

Advanced:pli*=17.8580 kilogramm/meter

# PHYSPROP.UNI

Water:d_sea_water=1.025 gramm/cc
Water:d_water=1 gramm/cc #@ 4 degC
Water,Thermal_conductivity:tc_water=0.6 watt/(meter deltaK) #@ 20 degC
Water,Viscosity:visc_water=0.001 pascal second #dynamic @ 20 degC
Water,Speed_sound:ss_water=1497 meter/second #@ 20 degC
Water,Specific_heat_m:shm_water,sh_water=1 calorie/(gramm deltaK) #mean
Water,Specific_heat_v:shv_water,sh_water=shm_water*d_water
Water,Heat_fusion_m:hfm_water,hf_water=144 Btu/poundm
Water,Heat_fusion_v:hfv_water,hf_water=hfm_water*d_water
Water,Heat_vaporization_m:hvm_water,hv_water=956 Btu/poundm
Water,Heat_vaporization_v:hvv_water,hv_water=hvm_water*d_water

Ice:d_ice=0.92 gramm/cc
Ice,Specific_heat_m:shm_ice,sh_ice=0.47 Btu/(poundm deltaF)
Ice,Specific_heat_v:shv_ice,sh_ice=shm_ice*d_ice #by volume
Ice,Thermal_conductivity:tc_ice=2.18 watt/(meter deltaC)

Air:d_air=0.0012928 gramm/cc #@ 1 atm, 0degC
Air,Thermal_conductivity:tc_air=0.0242 watt/(meter deltaK) #@ 0 degC
Air,Viscosity:visc_air=1.78E-05 pascal second #dynamic @ 20 degC
Air,Speed_sound:ss_air=1128.86 foot/second #@ 20 degC, 50% RH
Air,Specific_heat_m:shm_air,sh_air=0.24 calorie/(gramm deltaK) #@ 0 degC
Air,Specific_heat_v:shv_air,sh_air=shm_air*d_air #@ 1 atm, 0 degC

Physical_property:d_aluminum=2.702 gramm/cc
Physical_property:d_copper=8.92 gramm/cc
Physical_property:d_gold=19.3 gramm/cc
Physical_property:d_iron=7.86 gramm/cc
Physical_property:d_lead=11.34 gramm/cc
Physical_property:d_silver=10.5 gramm/cc
Physical_property:d_brick=2.0 gramm/cc #hard
Physical_property:d_concrete=2.3 gramm/cc #with stone, sand
Physical_property:d_clay=1.8 gramm/cc #damp, plastic
Physical_property:d_glass=2.6 gramm/cc
Physical_property:d_sand=100 poundm/foot^3
Physical_property:d_granite=175 poundm/foot^3
Physical_property:d_diamond=3.3 gramm/cc
Physical_property:d_mercury=13.5951 gramm/cc

Physical_property,Specific_heat_m:shm_aluminum=0.215 calorie/(gramm deltaC)
Physical_property,Specific_heat_m:shm_copper=0.092 calorie/(gramm deltaC)
Physical_property,Specific_heat_m:shm_gold=0.03 calorie/(gramm deltaC)
Physical_property,Specific_heat_m:shm_iron=0.108 calorie/(gramm deltaC)
Physical_property,Specific_heat_m:shm_lead=0.03 calorie/(gramm deltaC)
Physical_property,Specific_heat_m:shm_mercury=0.140 joule/(gramm deltaC)
Physical_property,Specific_heat_m:shm_silver=0.235 joule/(gramm deltaC)
Physical_property,Specific_heat_m:shm_brick=0.22 Btu/(poundm deltaF)
Physical_property,Specific_heat_m:shm_concrete=0.156 Btu/(poundm deltaF)
Physical_property,Specific_heat_m:shm_glass=0.199 Btu/(poundm deltaF)
Physical_property,Specific_heat_m:shm_sand=0.195 Btu/(poundm deltaF)
Physical_property,Specific_heat_m:shm_wood=0.65 Btu/(poundm deltaF)
Physical_property,Specific_heat_m:shm_gasoline=0.53 Btu/(poundm deltaF)
Physical_property,Specific_heat_m:shm_kerosene=0.48 Btu/(poundm deltaF)

Physical_property,Heat_vaporization_m:hvm_gasoline,hv_gasoline=116 Btu/poundm
Physical_property,Heat_vaporization_m:hvm_kerosene,hv_kerosene=86 Btu/poundm
Physical_property,Heat_vaporization_m:hvm_ethanol,hv_ethanol=367 Btu/poundm
Physical_property,Heat_vaporization_m:hvm_methanol,hv_methanol=482 Btu/poundm

Physical_property,Heat_fusion_m:hfm_aluminum=171 Btu/poundm
Physical_property,Heat_fusion_m:hfm_copper=88.2 Btu/poundm
Physical_property,Heat_fusion_m:hfm_gold=28.7 Btu/poundm
Physical_property,Heat_fusion_m:hfm_iron=117 Btu/poundm
Physical_property,Heat_fusion_m:hfm_lead=10 Btu/poundm
Physical_property,Heat_fusion_m:hfm_mercury=5.0 Btu/poundm

Physical_property,Thermal_conductivity:tc_aluminum=238 watt/(meter deltaC)
Physical_property,Thermal_conductivity:tc_copper=397 watt/(meter deltaC)
Physical_property,Thermal_conductivity:tc_gold=318 watt/(meter deltaC)
Physical_property,Thermal_conductivity:tc_iron=79.5 watt/(meter deltaC)
Physical_property,Thermal_conductivity:tc_lead=34.7 watt/(meter deltaC)
Physical_property,Thermal_conductivity:tc_mercury=8.34 watt/(meter deltaC)
Physical_property,Thermal_conductivity:tc_silver=428 watt/(meter deltaC)
Physical_property,Thermal_conductivity:tc_brick=0.58 watt/(meter deltaC)
Physical_property,Thermal_conductivity:tc_concrete=1 watt/(meter deltaC) #stone, sand
Physical_property,Thermal_conductivity:tc_glass=0.72 watt/(meter deltaC) #plate
Physical_property,Thermal_conductivity:tc_wood=0.11 watt/(meter deltaC) #across grain (pine)
Physical_property,Thermal_conductivity:tc_glasswool=0.042 watt/(meter deltaC)
Physical_property,Thermal_conductivity:tc_styrofoam=0.036 watt/(meter deltaC)
Physical_property,Thermal_conductivity:tc_earth=1 watt/ (meter deltaC) #40% water
Physical_property,Thermal_conductivity:tc_sand=0.33 watt/(meter deltaC) #dry
Physical_property,Thermal_conductivity:tc_gravel=0.38 watt/(meter deltaC) #dry
Physical_property,Thermal_conductivity:tc_diamond=554 watt/(meter deltaC)

Physical_property:sun_power=3.92E+26 watt #total
Physical_property:solar_const=1340 watt/meter^2 #at Earths surface

Physical_property:d_gasoline=0.67 gramm/cc #liquid
Physical_property:d_kerosene=0.819 gramm/cc #liquid
Physical_property:d_propane_gas=0.00183 gramm/cc #gas
Physical_property:d_propane_liq=0.5 gramm/cc #liquid
Physical_property:d_oil=0.875 gramm/cc #liquid
Physical_property:d_coal=0.7 gramm/cc #bulk
Physical_property:d_methanol=0.810 gramm/cc #liquid
Physical_property:d_ethanol=0.791 gramm/cc #liquid
Physical_property:d_wood=0.55 gramm/cc #solid (pine)

Physical_property,Heat_combustion_m:hcm_gasoline=20750 Btu/poundm
Physical_property,Heat_combustion_v:hcv_gasoline=d_gasoline*hcm_gasoline
Physical_property,Heat_combustion_m:hcm_kerosene=19810 Btu/poundm
Physical_property,Heat_combustion_v:hcv_kerosene=d_kerosene*hcm_kerosene
Physical_property,Heat_combustion_m:hcm_propane_liq=21249 Btu/poundm
Physical_property,Heat_combustion_v:hcv_propane_liq=d_propane_liq*hcm_propane_liq
Physical_property,Heat_combustion_v:hcv_propane_gas=d_propane_gas*hcm_propane_liq
Physical_property,Heat_combustion_v:hcv_natural_gas=1000 Btu/cubic foot
Physical_property,Heat_combustion_m:hcm_oil=18500 Btu/poundm #crude oil
Physical_property,Heat_combustion_v:hcv_oil=d_oil*hcm_oil #crude oil
Physical_property,Heat_combustion_m:hcm_coal=13000 Btu/poundm
Physical_property,Heat_combustion_v:hcv_coal=d_coal*hcm_coal
Physical_property,Heat_combustion_m:hcm_methanol=9600 Btu/poundm
Physical_property,Heat_combustion_v:hcv_methanol=d_methanol*hcm_methanol
Physical_property,Heat_combustion_m:hcm_ethanol=12800 Btu/poundm
Physical_property,Heat_combustion_v:hcv_ethanol=d_ethanol*hcm_ethanol
Physical_property,Heat_combustion_m:hcm_wood=8750 Btu/poundm #most kinds (dry)
Physical_property,Heat_combustion_v:hcv_wood=d_wood*hcm_wood #pine

# CAPACITY OF BATTERIES
Physical_property,Batteries:e_carb_aaa=2268 joule
Physical_property,Batteries:e_carb_aa=5832 joule
Physical_property,Batteries:e_carb_c=15120 joule
Physical_property,Batteries:e_carb_d=38880 joule
Physical_property,Batteries:e_carb_n=2376 joule
Physical_property,Batteries:e_carb_9v=14580 joule
Physical_property,Batteries:e_alk_aaa=5062 joule
Physical_property,Batteries:e_alk_aa=11556 joule
Physical_property,Batteries:e_alk_c=32400 joule
Physical_property,Batteries:e_alk_d=72900 joule
Physical_property,Batteries:e_alk_g=477900 joule
Physical_property,Batteries:e_alk_n=4374 joule
Physical_property,Batteries:e_alk_9v=19245 joule
Physical_property,Batteries:e_nicd_aaa=777 joule
Physical_property,Batteries:e_nicd_aa=2160 joule
Physical_property,Batteries:e_nicd_subc=5184 joule
Physical_property,Batteries:e_nicd_c=5184 joule
Physical_property,Batteries:e_nicd_d=17280 joule
Physical_property,Batteries:e_nicd_n=648 joule
Physical_property,Batteries:e_nicd_9v=2419 joule

TEST 1|= 1
TEST 1|= 1
TEST 1|= 1
TEST 1|= 1
TEST e_nicd_9v? | = 2419 joule, = 2419 newton meter
`;

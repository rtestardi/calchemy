var database =`
CATEGORY SI
CATEGORY Prefix
CATEGORY Number
CATEGORY Angle
CATEGORY Frequency
CATEGORY Angular_velocity
CATEGORY Energy
CATEGORY Torque
CATEGORY Physical_constant
CATEGORY Physical_property
CATEGORY Water
CATEGORY Ice
CATEGORY Air
CATEGORY Batteries
CATEGORY Speed_sound
CATEGORY Warn_angle
CATEGORY Warn_temperature

BASE PI #must be first
BASE RADIAN #must be second
BASE MASS
BASE LENGTH
BASE TIME
BASE TEMP
BASE STORAGE
BASE MONEY
BASE CURRENT
BASE SUBSTANCE

___PUSH Prefix,SI
PREFIX yotta,Y=1E+24
PREFIX zetta,Z=1E+21
PREFIX exa,E=1E+18
PREFIX peta,P=1E+15
PREFIX tera,T=1E+12
PREFIX giga,G=1E+09
PREFIX mega,M=1E+06
PREFIX kilo,k=1E+03
PREFIX hecto,h=1E+02
PREFIX deka,da=1E+01
PREFIX deci,d=1E-01
PREFIX centi,c=1E-02
PREFIX milli,m=1E-03
PREFIX micro,u=1E-06
PREFIX nano,n=1E-09
PREFIX pico,p=1E-12
PREFIX femto,f=1E-15
PREFIX atto,a=1E-18
PREFIX zepto,z=1E-21
PREFIX yocto,y=1E-24
___POP SI
PREFIX kibi,Ki=1024 #storage
PREFIX mebi,Mi=1024^2 #storage
PREFIX gibi,Gi=1024^3 #storage
PREFIX tebi,Ti=1024^4 #storage
PREFIX pebi,Pi=1024^5 #storage
PREFIX exbi,Ei=1024^6 #storage
PREFIX zebi,Zi=1024^7 #storage
PREFIX yobi,Yi=1024^8 #storage
___POP Prefix
___VERIFY

___PUSH Number
pi=3.14159265358979323 PI
pi_as_number,pin=3.14159265358979323
e=2.71828182845904523
___POP Number
___VERIFY

#Primary
___PUSH SI
*meter*,m,metre*=LENGTH
*gramm,gm,g,gram*=MASS
*second*,s,sec*=TIME
deltaK,deltak=TEMP #interval (T-T0) Kelvin
*ampere*,A,amp*=CURRENT
*mole*,mol=SUBSTANCE
*Angle,Warn_angle:radian*,rad=1 RADIAN
*Frequency,Warn_angle:hertz,Hz=1/second
___POP SI
*bit*,b=STORAGE
dollar*,$=MONEY
___VERIFY

#Secondary
___PUSH SI
*newton*,N=1 kilogramm meter/second^2
*Energy:joule*,J=1 newton meter
*watt*,W=1 joule/second
*pascal*,Pa,=1 newton/square meter
*coulomb*,C=ampere second
*volt*,V=1 joule/coulomb
*ohm*=1 volt/ampere
*siemens,S=1 ampere/volt
*farad*,F=1 coulomb/volt
*henry*,H=1 second^2/farad
*weber*,Wb=1 volt second
*tesla*,T=1 weber/meter^2
___POP SI
*liter*,L,litre*,l=1 cubic decimeter #was 1.000028 before 1964
*mho*=1 ampere/volt
*maxwell*,Mx=1E-08 weber #CGS
*gauss=0.0001 weber/meter^2 #CGS
*oersted,Oe=79.57747 ampere/meter
*Byte*,byte*,B,char*=8 bit #computer storage
*gamma*=1E-09 weber/meter^2
___VERIFY

#Angle or Number
___PUSH Warn_angle,Angle
cycle_as_angle,cyclea,cycle*=2 pi_as_number radian
revolution_as_angle,revolutiona,revolution*,rev_as_angle,reva,rev*=2 pi_as_number radian
___POP Angle
___PUSH Number
cycle_as_number,cyclen,cycle*=1
revolution_as_number,revolutionn,revolution*,rev_as_number,revn,rev*=1
___POP Number,Warn_angle
___VERIFY

DERIVED Mass=kilogramm
DERIVED Length=meter
DERIVED Time=second
DERIVED Temperature=deltaK
DERIVED Storage=Byte
DERIVED Network_bandwidth=megabit/second
AMBIGUOUS Storage_bandwidth=megabyte/second
DERIVED Area=meter^2
DERIVED Volume=liter
DERIVED Speed=meter/second
DERIVED Acceleration=meter/second^2
DERIVED Force=newton
DERIVED Energy=joule
AMBIGUOUS Torque=newton meter
DERIVED Power=watt
DERIVED Pressure=pascal
DERIVED Warn_angle:Frequency=hertz
AMBIGUOUS Warn_angle:Angular_velocity=radian/second
DERIVED Warn_angle:Angular_acceleration=radian/second^2
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
DERIVED Money=dollar

___PUSH Number
percent,%=1/100
permille=1/1000
permyriad=1/10000
ppm*=1E-06 #parts per million
ppb*=1E-09 #parts per billion
ppt*=1E-12 #parts per trillion
ppq*=1E-15 #parts per quadrillion
dozen*=12
gross=144
karat*=1/24 #purity of gold (24 karat is pure)
one=1 #multiplier (1) as used in the U.S.
ten=10 #multiplier (10) as used in the U.S.
hundred=100 #multiplier (100) as used in the U.S.
thousand=1E3 #multiplier (1 000) as used in the U.S.
million=1E+06 #multiplier (1 000 000) as used in the U.S.
billion=1E+09 #multiplier (1 000 000 000) as used in the U.S.
trillion=1E+12 #multiplier (1 000 000 000 000) as used in the U.S.
quadrillion=1E+15 #multiplier (1E+15) as used in the U.S.
quintillion=1E+18 #multiplier (1E+18) as used in the U.S.
milliard=1E+09 #multiplier (1 000 000 000) as used in the U.K.
billion_long=1E+12 #multiplier (1 000 000 000 000) as used in the U.K.
trillion_long=1E+18 #multiplier (1E+18) as used in the U.K.
quadrillion_long=1E+24 #multiplier (1E+24) as used in the U.K.
quintillion_long=1E+30 #multiplier (1E+30) as used in the U.K.
___POP Number
___VERIFY

___PUSH Physical_constant,SI
dVcs=9192631770/second #transition freq of caesium 133
speed_of_light,c,light,lightspeed=2.99792458E+08 meter/second #speed of light in vacuum
plancks_const,h=6.626070E-34 joule second
electron_charge*,qe=1.602176634E-19 ampere second
boltzmann_const,k=1.380649E-23 joule/deltaK
avogadros_num,Na=6.02214076E+23/mole
___POP SI
gravity,grav=9.80665 meter/second^2 #standard acceleration of Earth's gravity
stef_boltz_const=5.67051E-08 watt/(meter^2 deltaK^4)
rydberg_const=1.09737E+07/meter
volumetric_gas_constant,V0,=22.4141 liter/mole 
molecular_gas_constant,R,r=8.31451 joule/(mole deltaK)
___POP Physical_constant
___VERIFY

___PUSH Angle
degree*,deg*=(1/180) pi_as_number radian
grade,grad=0.9 degree
arcmin*=(1/60)degree
arcsec*=(1/60)arcmin
___POP Angle
___VERIFY

#Time
minute*,min*=60 second
hour*,hr*=60 minute
day*=24 hour
year*,yr*=365 day
month*,mo*=(1/12)year
week*,wk*=7 day
decade*=10 year
century*=100 year
millennium*=1000 year
aeon*=1E+09 year
fortnight*=14 day
svedberg*=1E-13 second #Sedimentation Coefficient

#Length
*micron*=1E-06 meter
angstrom*=1E-10 meter
fermi*=1E-15 meter
*parsec*=3.0857E+16 meter
au=1.49598E+11 meter
mile_nautical,nmi=1852 meter
inch*,in=2.54 centimeter
mil*=(1/1000)inch
foot,ft,feet=12 inch
yard*,yd*=3 foot
mile*,mi=5280 foot #(U.S. statute)
link*=7.92 inch #Surveyor's
chain*=100 link #Surveyor's
pole*,perch*,rod*=5.5 yard
fathom*=6 foot
league*=3 mile
furlong*=220 yard
lightyear*,lyr*=1 speed_of_light*365.25 day
lightsecond*=1 speed_of_light*second

#Mass
poundm,lbm,lb*,pound*=453.592 gramm
ouncem,ozm,oz*,ounce*=(1/16) poundm
slug*=14593.9 gramm
grain*=(1/7000)poundm
pennyweight,dwt=24 grain #troy
hundredweight,cwt=100 poundm #avoirdupois
carat*,ct=200 milligramm #mass of gems
*Physical_constant:amu,dalton=1.66053906660E-24 gramm #unified atomic mass unit
tonm,ton*=2000 poundm
tonm_long,ton_long=2240 poundm #imperial (U.K.)
*tonnem,tonm_metric,tonne*,ton_metric=1E+06 gramm #metric ton

#Force
poundal*,pdl=1 foot poundm/second^2
kip*=1000 poundm*gravity
dyne*=1E-05 newton
*pond*=1 gramm*gravity
*gramf,gf,g,gram*=1 gramm*gravity
poundf,lbf,lb*,pound*=1 poundm*gravity
ouncef,ozf,oz*,ounce*=1 ouncem*gravity
tonf,ton*=1 tonm*gravity
tonf_long,ton_long=2240 poundm*gravity #imperial (U.K.)
*tonnef*,tonf_metric,tonne*,ton_metric=1E+06 gramm*gravity #metric ton

#Area
are=100 square meter
decare,daa,dunam,stremma=1000 square meter
hectare*,ha=10000 square meter
sqin=1 square inch
sqft=1 square foot
sqyd=1 square yard
sqmi=1 square mile
sqcm=0.01 meter * 0.01 meter
sqmm=0.001 meter * 0.001 meter
section*=1 sqmi #land measure
acre*,ac=10 square chain #land measure

#Volume
cc*=1 cubic centimeter
cuin=1 cubic inch
cuft=1 cubic foot
cuyd=1 cubic yard
stere=1 cubic meter #volume of wood
gallon*,gal*=231 cubic inch
quart*,qt*=(1/4)gallon
pint*,pt*=(1/8) gallon
ouncefl,ozfl,floz,oz*,ounce*=(1/128)gallon
bushel*,bu=2150.42 cuin
peck*=(1/4)bushel
cord*=128 cuft #volume of wood
board_feet,bd_foot,bd_feet,bdft=144 cuin #wood
barrel_oil,bbl=42 gallon #crude oil
cup*=(1/4)quart
tablespoon*,tbsp=(1/2)ouncefl
teaspoon*,tsp*=(1/6)ouncefl

#Speed
knot*,kt,kn=1 mile_nautical/hour
ips=1 inch/second
ipm=1 inch/minute
fps=1 foot/second
fpm=1 foot/minute
mph=1 mile/hour
kph=1 kilometer/hour
mach=340 meter/second

#Acceleration
galileo*=0.01 meter/second^2

#Pressure
___PUSH Pressure
*torr=(101325/760)pascal
*bar=100000 pascal
metre_sea_water,msw=10 kilopascal
mb=millibar #pressure in millibar
atmosphere*,atm=101325 pascal #standard atmospheric pressure
psi=1 poundf/square inch
ksi=1000 poundf/square inch
mmHg,mmhg=133.3224 pascal #pressure (barometric)
inHg,inhg=mmHg * inch/millimeter
Hg,hg=mmHg/millimeter #density of mercury for pressure calculations
inWc,inwc,inH2O=248.84 pascal #inches water column at 60 degF
H2O=inWc/inch #density of water for pressure calculations
barye*,barie*=0.1 pascal
baryl=1 dyne/square centimeter
pieze,pz=10000 dyne/square centimeter
___POP Pressure
___VERIFY

#Energy
___PUSH Energy
*electronvolt*,eV=1.60218E-19 joule
*calorie*,cal=4.184 joule
*watthour*,Wh,wh=3600 joule #watt hour
foodcal,cal_food,Cal,Calorie*=1 kilocalorie #food package label energy
Btu*,BTU*,btu*=1055.06 joule #international table
therm*=105.4804E+06 joule #US
quad*=1.05505585262E+18 joule
erg*=1E-07 joule #CGS
*ton_explosive,tTNT=4.184E+09 joule #ton of TNT equivalent
*BOE,boe=6.12E+09 joule #barrel of oil equivalent
*TOE,toe=41.868E+09 joule #tonne of oil equivalent
*TCE,tce=29.288E+09 joule #tonne of oil equivalent
___POP Energy
___VERIFY

#Torque
___PUSH Torque
inlb*=1 inch poundf
ftlb*=1 foot poundf
___POP Torque
___VERIFY

#Power
VA,va,var,VAR=1 watt #may be reactive power
horsepower,hp,HP=550 foot poundf/second
ton_refrig,ton_ac=200 Btu/minute #cooling equipment capacity

#Flow
cfs=1 cuft/second
cfm=1 cuft/minute
cfh=1 cuft/hour
gps=1 gallon/second
gpm=1 gallon/minute
gph=1 gallon/hour
gpd=1 gallon/day
lps=1 liter/second
lpm=1 liter/minute
lph=1 liter/hour
sverdrup*,Sv =1E6 cubic meter/second #oceanography

#Temperature
deltaR,deltar=(1/1.8)deltaK #interval (T-T0) Rankine
deltaC,deltac=1 deltaK #interval (T-T0) Celsius
deltaF,deltaf=(1/1.8)deltaK #interval (T-T0) Fahrenheit
*degK,degk=1 deltaK #absolute Kelvin
*degR,degr=1 deltaR #absolute Rankine
___PUSH Warn_temperature
*degC,degc=1 deltaC #absolute Celsius, with caution
*degF,degf=1 deltaF #absolute Fahrenheit, with caution
absC,absc=1 deltaC #absolute Celsius, with caution
absF,absf=1 deltaF #absolute Fahrenheit, with caution
___POP Warn_temperature
___VERIFY

#Angular_velocity or Frequency
___PUSH Warn_angle,Angular_velocity
rpm_as_angular_velocity,rpma*,rpm*=revolution_as_angle/minute
rps_as_angular_velocity,rpsa*,rps*=revolution_as_angle/second
cps_as_angular_velocity,cpsa*,cps*=cycle_as_angle/second
cpd_as_angular_velocity,cpda*,cpd*=cycle_as_angle/day
___POP Angular_velocity
___PUSH Frequency
rpm_as_frequency,rpmf*,rpm*=revolution_as_number/minute
rps_as_frequency,rpsf*,rps*=revolution_as_number/second
cps_as_frequency,cpsf*,cps*=cycle_as_number/second
cpd_as_frequency,cpdf*,cpd*=cycle_as_number/day
___POP Frequency,Warn_angle
___VERIFY

#Money
cent*=0.01 dollar #U.S.

mpg=1 mile/gallon
rvalue,Rvalue,rval,Rval=1(sqft deltaF)/(Btu/hour) #thermal insulation
uvalue,Uvalue,uval,Uval=1(Btu/hour)/(sqft deltaF) #inverse of Rvalue
*bit_per_second,baud,bps=1 bit/second #DataComm

___PUSH Physical_constant
grav_const,G=6.67259E-11 newton meter^2/(kilogramm)^2 #gravitational constant
mass_electron,rm_e=9.10939E-31 kilogramm #rest mass electron
mass_proton,rm_p=1.67262E-27 kilogramm #rest mass proton
mass_neutron,rm_n=1.67493E-27 kilogramm #rest mass neutron

permeability_vac,mu0=4 pi_as_number*1E-07 henry/meter
permittivity_vac,e0=8.85419E-12 farad/meter
___POP Physical_constant
___VERIFY

___PUSH Number
bakers_dozen=13
ream*=500 #paper
proof=1/200 #alcoholic content
___POP Number
___VERIFY

shake*=1E-08 second
year_solar=3.15569E+07 second #mean solar
cron*=3.156E+13 second

mile_int=1609.34 meter
rowland*=angstrom
point*=3.5146E-04 meter #as used in printing
pica*=12 point #as used in printing
caliber=0.01 inch #gun bore diameter
bolt*=40 yard #cloth measure

dram*,drachm*=27.3438 grain #avoirdupois
ounce_troy=480 grain
pound_troy=5760 grain
cwt_long=112 poundm #imperial
stone*=14 poundm
ton_assay=29.1667 gramm #refined from ore

sthen*=1E+08 dyne

circ_inch*=(pi_as_number/4)sqin #area 1 inch diam
circ_mil*=pi_as_number*2.5E-07 sqin #area 1 mil diam
barn*=1E-28 meter^2
shed*=1E-24 barn
outhouse*=1E-06 barn

ton_ship=40 cuft #sea freight
ton_reg=100 cuft #capacity of ships
ton_disp=35 cuft #size of ships
gill*=(1/32)gallon
fluid_dram*,fldr=(1/1024)gallon
minim*=(1/60)fluid_dram
quart_dry=(1/32)bushel
pint_dry=(1/64)bushel
barrel_dry=7056 cuin #U.S. fruit, veggies etc.
gal_imp=277.42 cuin #U.K.
quart_imp=(1/4)gal_imp #U.K.
pint_imp=(1/8)gal_imp #U.K.
floz_imp=(1/160)gal_imp #U.K.
gill_imp=5 floz_imp #U.K.
bushel_imp=2219.36 cuin #U.K.
peck_imp=(1/4)bushel_imp #U.K.

benz=1 meter/second
leo*=10 meter/second^2

Energy:therm_eec=1.05506E+08 joule #European Economic Community
Energy:chu*=1.8 Btu #centigrade heat unit
Energy:thermie*=4.1868E+06 joule #U.K.
Energy:rydberg*=13.6054 electronvolt

frigorie*=50 Btu/minute #cooling equipment (Europe)

poise=0.1 pascal second #CGS
reyn*=1 (poundf/sqin)second
stokes=0.0001 meter^2/second

*Frequency:curie*,Ci,ci=3.7E+10/second #of radioactivity
*SI,Frequency:becquerel*,Bq=1/second #of radioactivity
*SI:katal,kat=mole/second

denier=1 gramm/(9000 meter) #textiles
drex=1E-04 gramm/meter #textiles
tex=1E-03 gramm/meter #textiles
poumar=1 poundm/(1E+06 yard) #textiles

langley*=41840 joule/meter^2

gib*=1 calorie/mole

clausius=1 joule/(mole deltaK)
entropy_unit=1 calorie/(mole deltaK)

rhe*=10/(pascal second) #inverse dynamic viscosity
dioptre*,diopter*=1/meter
kayser*=100/meter

year_sidereal=3.15582E+07 second
day_sidereal=8.61641E+04 second
hr_sidereal=(1/24)day_sidereal
min_sidereal=(1/60)hr_sidereal
sec_sidereal=(1/60)min_sidereal
lunour*=3543.67 second #1/30 of the time between new moons (30 lunour = 1 synodic month)
lune*=24 lunour
blink*=0.864 second

league_naut=3 mile_nautical
chain_naut=4.572 meter
cable_length=120 fathom
link_eng=12 inch #Ramden's
chain_eng=100 link_eng #Ramden's
hank*=840 yard #cloth
finger*=(7/8) inch
hand*=4 inch
pace=0.762 meter #military
span=9 inch
barleycorn*=(1/3)inch
cubit*=21.8 inch #biblical, range 17 to 22 inch

cental*=100 poundm #U.K.
quintal_imp=45.3592 kilogramm #U.K.
quintal*=100 kilogramm
dram_apoth=60 grain
ounce_apoth=480 grain
pound_apoth=5760 grain
scruple*=20 grain
brieze=1 gramm
hyl=9.80665 gramm

township*=36 section
rood*=40 pole^2 #U.K.
hide*=4.04686E+05 meter^2

hogshead*=63 gallon
butt_beer=0.490978 meter^3
butt_wine=0.954412 meter^3
bucket*=0.0181844 meter^3
bodge*=2.27305E-03 meter^3
chaldron*=1.26861 meter^3
coomb*,comb*=4 bushel
perche*=0.700841 meter^3 #masonry
puncheon*=0.327319 meter^3
raummeter*,festmeter*=1 meter^3
trug*=0.024246 meter^3
sack*=3 bushel #many other defs
amagat*=0.022414 meter^3
anker*=0.0378735 meter^3
aum*=0.136383 meter^3
jar*=0.113652 meter^3
kanne*=1E-03 meter^3
noggin*=1.42065E-04 meter^3
pipe*=0.477206 meter^3
pottle*=2.27304E-03 meter^3

Energy:cal_mean=4.19002 joule
Energy:cal_thermochem=4.184 joule
Energy:btu_mean=1055.87 joule
Energy:btu_thermochem=1054.35 joule
Energy:duty*=1.35582 joule

hp_metric=75 kilogramf meter/second
hp_boiler=9809.50 watt #bigger that hp
hp_electric=746.0 watt
hp_water=746.043 watt
manpower=(1/10)horsepower

admiralty_knot*=6080 foot/hour
kine*=0.01 meter/second

celo*=0.3048 meter/second^2

pli*=17.8580 kilogramm/meter

# PHYSPROP.UNI

___PUSH Water
d_sea_water=1.025 gramm/cc
d_water=1 gramm/cc #@ 4 degC
Thermal_conductivity:tc_water=0.6 watt/(meter deltaK) #@ 20 degC
Viscosity:visc_water=0.001 pascal second #dynamic @ 20 degC
Speed_sound:ss_water=1497 meter/second #@ 20 degC
Specific_heat_m:shm_water,sh_water=1 calorie/(gramm deltaK) #mean
Specific_heat_v:shv_water,sh_water=shm_water*d_water
Heat_fusion_m:hfm_water,hf_water=144 Btu/poundm
Heat_fusion_v:hfv_water,hf_water=hfm_water*d_water
Heat_vaporization_m:hvm_water,hv_water=956 Btu/poundm
Heat_vaporization_v:hvv_water,hv_water=hvm_water*d_water
___POP Water
___VERIFY

___PUSH Ice
d_ice=0.92 gramm/cc
Specific_heat_m:shm_ice,sh_ice=0.47 Btu/(poundm deltaF)
Specific_heat_v:shv_ice,sh_ice=shm_ice*d_ice #by volume
Thermal_conductivity:tc_ice=2.18 watt/(meter deltaC)
___POP Ice
___VERIFY

___PUSH Air
d_air=0.0012928 gramm/cc #@ 1 atm, 0degC
Thermal_conductivity:tc_air=0.0242 watt/(meter deltaK) #@ 0 degC
Viscosity:visc_air=1.78E-05 pascal second #dynamic @ 20 degC
Speed_sound:ss_air=1128.86 foot/second #@ 20 degC, 50% RH
Specific_heat_m:shm_air,sh_air=0.24 calorie/(gramm deltaK) #@ 0 degC
Specific_heat_v:shv_air,sh_air=shm_air*d_air #@ 1 atm, 0 degC
___POP Air
___VERIFY

___PUSH Physical_property

d_aluminum=2.702 gramm/cc
d_copper=8.92 gramm/cc
d_gold=19.3 gramm/cc
d_iron=7.86 gramm/cc
d_lead=11.34 gramm/cc
d_silver=10.5 gramm/cc
d_brick=2.0 gramm/cc #hard
d_concrete=2.3 gramm/cc #with stone, sand
d_clay=1.8 gramm/cc #damp, plastic
d_glass=2.6 gramm/cc
d_sand=100 poundm/foot^3
d_granite=175 poundm/foot^3
d_diamond=3.3 gramm/cc
d_mercury=13.5951 gramm/cc

___PUSH Specific_heat_m
shm_aluminum=0.215 calorie/(gramm deltaC)
shm_copper=0.092 calorie/(gramm deltaC)
shm_gold=0.03 calorie/(gramm deltaC)
shm_iron=0.108 calorie/(gramm deltaC)
shm_lead=0.03 calorie/(gramm deltaC)
shm_mercury=0.140 joule/(gramm deltaC)
shm_silver=0.235 joule/(gramm deltaC)
shm_brick=0.22 Btu/(poundm deltaF)
shm_concrete=0.156 Btu/(poundm deltaF)
shm_glass=0.199 Btu/(poundm deltaF)
shm_sand=0.195 Btu/(poundm deltaF)
shm_wood=0.65 Btu/(poundm deltaF)
shm_gasoline=0.53 Btu/(poundm deltaF)
shm_kerosene=0.48 Btu/(poundm deltaF)
___POP Specific_heat_m

___PUSH Heat_vaporization_m
hvm_gasoline,hv_gasoline=116 Btu/poundm
hvm_kerosene,hv_kerosene=86 Btu/poundm
hvm_ethanol,hv_ethanol=367 Btu/poundm
hvm_methanol,hv_methanol=482 Btu/poundm
___POP Heat_vaporization_m

___PUSH Heat_fusion_m
hfm_aluminum=171 Btu/poundm
hfm_copper=88.2 Btu/poundm
hfm_gold=28.7 Btu/poundm
hfm_iron=117 Btu/poundm
hfm_lead=10 Btu/poundm
hfm_mercury=5.0 Btu/poundm
___POP Heat_fusion_m

___PUSH Thermal_conductivity
tc_aluminum=238 watt/(meter deltaC)
tc_copper=397 watt/(meter deltaC)
tc_gold=318 watt/(meter deltaC)
tc_iron=79.5 watt/(meter deltaC)
tc_lead=34.7 watt/(meter deltaC)
tc_mercury=8.34 watt/(meter deltaC)
tc_silver=428 watt/(meter deltaC)
tc_brick=0.58 watt/(meter deltaC)
tc_concrete=1 watt/(meter deltaC) #stone, sand
tc_glass=0.72 watt/(meter deltaC) #plate
tc_wood=0.11 watt/(meter deltaC) #across grain (pine)
tc_glasswool=0.042 watt/(meter deltaC)
tc_styrofoam=0.036 watt/(meter deltaC)
tc_earth=1 watt/ (meter deltaC) #40% water
tc_sand=0.33 watt/(meter deltaC) #dry
tc_gravel=0.38 watt/(meter deltaC) #dry
tc_diamond=554 watt/(meter deltaC)
___POP Thermal_conductivity

sun_power=3.92E+26 watt #total
solar_const=1340 watt/meter^2 #at Earths surface

d_gasoline=0.67 gramm/cc #liquid
d_kerosene=0.819 gramm/cc #liquid
d_propane_gas=0.00183 gramm/cc #gas
d_propane_liq=0.5 gramm/cc #liquid
d_oil=0.875 gramm/cc #liquid
d_coal=0.7 gramm/cc #bulk
d_methanol=0.810 gramm/cc #liquid
d_ethanol=0.791 gramm/cc #liquid
d_wood=0.55 gramm/cc #solid (pine)

Heat_combustion_m:hcm_gasoline=20750 Btu/poundm
Heat_combustion_v:hcv_gasoline=d_gasoline*hcm_gasoline
Heat_combustion_m:hcm_kerosene=19810 Btu/poundm
Heat_combustion_v:hcv_kerosene=d_kerosene*hcm_kerosene
Heat_combustion_m:hcm_propane_liq=21249 Btu/poundm
Heat_combustion_v:hcv_propane_liq=d_propane_liq*hcm_propane_liq
Heat_combustion_v:hcv_propane_gas=d_propane_gas*hcm_propane_liq
Heat_combustion_v:hcv_natural_gas=1000 Btu/cubic foot
Heat_combustion_m:hcm_oil=18500 Btu/poundm #crude oil
Heat_combustion_v:hcv_oil=d_oil*hcm_oil #crude oil
Heat_combustion_m:hcm_coal=13000 Btu/poundm
Heat_combustion_v:hcv_coal=d_coal*hcm_coal
Heat_combustion_m:hcm_methanol=9600 Btu/poundm
Heat_combustion_v:hcv_methanol=d_methanol*hcm_methanol
Heat_combustion_m:hcm_ethanol=12800 Btu/poundm
Heat_combustion_v:hcv_ethanol=d_ethanol*hcm_ethanol
Heat_combustion_m:hcm_wood=8750 Btu/poundm #most kinds (dry)
Heat_combustion_v:hcv_wood=d_wood*hcm_wood #pine

# CAPACITY OF BATTERIES
___PUSH Batteries
e_carb_aaa=2268 joule
e_carb_aa=5832 joule
e_carb_c=15120 joule
e_carb_d=38880 joule
e_carb_n=2376 joule
e_carb_9v=14580 joule
e_alk_aaa=5062 joule
e_alk_aa=11556 joule
e_alk_c=32400 joule
e_alk_d=72900 joule
e_alk_g=477900 joule
e_alk_n=4374 joule
e_alk_9v=19245 joule
e_nicd_aaa=777 joule
e_nicd_aa=2160 joule
e_nicd_subc=5184 joule
e_nicd_c=5184 joule
e_nicd_d=17280 joule
e_nicd_n=648 joule
e_nicd_9v=2419 joule
___POP Batteries

___POP Physical_property
___VERIFY

TEST 1|= 1
TEST 1|= 1
TEST 1|= 1
TEST 1|= 1
TEST e_nicd_9v? | = 2419 joule, = 2419 newton meter
`;

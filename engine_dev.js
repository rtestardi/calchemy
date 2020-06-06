// Calchemy (tm); Math Magic; http://www.calchemy.com
// Copyright (c) 1988-2020 Ken Burgess and Rich Testardi.

// This is the calchemy engine; it loads the database one line at a time and then runs user command lines one at a time, returning their output.

// regular expressions for string identification
// XXX -- token can use typeof for value; something for function call; anything for operator?
const value_regexp_ch =       /[0-9.]/;
const value_regexp =          /[0-9]*\.?[0-9]*([eE][-+]?[0-9]+)?/;
const value_regexp_head =    /^[0-9]*\.?[0-9]*([eE][-+]?[0-9]+)?/;
const value_regexp_tail =     /[0-9]*\.?[0-9]*([eE][-+]?[0-9]+)?$/;
const value_regexp_cap =  /[(]([0-9]*\.?[0-9]*([eE][-+]?[0-9]+)?)[)][^^]/g;
const unit_regexp_ch =        /[_A-Za-z$%]/;
const unit_regexp =           /[_A-Za-z$%][_A-Za-z0-9$%]*/;
const unit_regexp_head =     /^[_A-Za-z$%][_A-Za-z0-9$%]*/;
const unit_regexp_tail =      /[_A-Za-z$%][_A-Za-z0-9$%]*$/;
const xunit_regexp_head =    /^[_A-Za-z$%][_A-Za-z0-9$%:]*/;
const xunit_regexp_tail =     /[_A-Za-z$%][_A-Za-z0-9$%:]*$/;
const unit_regexp_all =      /^[_A-Za-z$%][_A-Za-z0-9$%]*$/;
const unit_regexp_cap =   /[(]([_A-Za-z$%][_A-Za-z0-9$%]*)[)][^^]/g;
const operator_regexp_ch =    /[-+*/^;?()\[\]{},:=~|]/;
const opens = "([{";
const closes = ")]}";
const semicolon_alternates = "@&#!";  // prefix alternate = ~
const functions = { "square":1, "cubic":1, "sqrt":1, "sin":1, "cos":1, "tan":1, "asn":1, "acs":1, "atn":1, "ln":1, "log":1, "exp":1, "per":1 };

// this is our units database
var nextbaseunit = 0;
var freebaseunit = 0;
var units = [];  // Unit
var bases = [];  // Unit
var all_categories = [];  // string
var open_categories = [];  // string
var loading = false;  // while loading the units database, all ambiguities are turned off and primary names must be used
var deriving = false;  // while deriving units, secondary names may also be used
var defining = false;  // while defining, don't record mismatches
var evaluating = false;  // while evaluating units, free units may be used
var testing = false;  // while testing, don't prompt for equation values
var si = false;  // request to display mismatch result in SI format
var storagebase;  // may be undefined
var database_tests = "";

var offset_warn = false;  // degC, absC, degF, absF
var offset_warned = false;
var cycle_warn = false;  // category Angle
var cycle_warned = false;

// these are the results from a command line
var results;  // Unit
var mismatches;  // string
var errors;  // string
var defines;  // boolean
var undefines;  // boolean

function assert(bool)
{
    if (! bool) {
        throw "assertion failed";
    }
}

// return the index of the matching parenthesis in an array of tokens
function MatchParen(tokens, i)
{
    var stack = [];
    var k = opens.indexOf(tokens[i]);
    assert(k != -1);
    stack.push(k);
    for (var j = i+1; j < tokens.length; j++) {
        k = opens.indexOf(tokens[j]);
        if (k != -1) {
            stack.push(k);
        } else if (tokens[j] == closes[stack[stack.length-1]]) {
            stack.pop();
            if (! stack.length) {
                return j;
            }
        }
    }
    throw "unmatched parenthesis " + opens[stack[stack.length-1]];
}

// add parenthesis around an interpretation if they are not already there
function Parenthesize(interpretation)
{
    if (interpretation[0] == '(' && MatchParen(interpretation, 0) == interpretation.length-1) {
        return interpretation;
    }
    return "(" + interpretation + ")";
}

// *** unit functions *****************************************************************************

class Unit {
    // return an empty or initialized unit
    constructor(names, pluralizables, coefficient, exponents, type, prefixable, categories, definition)
    {
        this.names = (names == undefined) ? [] : names.slice(0);  // array of unit names
        this.pluralizables = (pluralizables == undefined) ? [] : pluralizables.slice(0);  // array of booleans
        this.coefficient = (coefficient == undefined) ? NaN : coefficient;  // floating point
        this.exponents = (exponents == undefined) ? [] : exponents;  // array of integers
        this.type = (type == undefined) ? null : type;  // null || "BASE" || "DERIVED" || "PREFIX"
        this.prefixable = (prefixable == undefined) ? false : prefixable;  // boolean
        this.categories = (categories == undefined) ? [] : categories;  // array of unit category names
        this.definition = (definition == undefined) ? "" : definition;  // string
        this.interpretation = (names == undefined) ? "" : names[0];  // string
        // this.dimension is calculated after instantiation only for SI results
    }

    // pi analysis; check if orders of PI and RADIAN are within limits
    PiAnalysis()
    {
        // if exponents are beyond PI and RADIAN...
        if (this.exponents.length > 1) {
            if (this.exponents[0] && this.exponents[1]) {
                return false;
            }
        }
        return true;
    }

    // test if scalar zero
    Zero()
    {
        if (this.coefficient) {
            return false;
        }
        for (var i = 0; i < this.exponents.length; i++) {
            if (this.exponents[i]) {
                return false;
            }
        }
        return true;
    }

    // test if dimensions are compatible
    Compatible(unit, invert)
    {
        if (! unit) {
            return true;
        }
        // dynamically expand exponents arrays as needed
        var maxbaseunits = Math.max(this.exponents.length, unit.exponents.length);
        for (var i = this.exponents.length; i < maxbaseunits; i++) {
            this.exponents[i] = 0;
        }
        for (i = unit.exponents.length; i < maxbaseunits; i++) {
            unit.exponents[i] = 0;
        }

        // for all exponents beyond PI and RADIAN...
        for (i = 2; i < this.exponents.length; i++) {
            // if the exponent does not match...
            if (this.exponents[i] != (invert?-1:1)*unit.exponents[i]) {
                // units are incompatible
                return false;
            }
        }

        // units are compatible
        return true;
    }

    // perform an operation on a unit and return the resulting result
    Operate(op, rhs, derivedok)
    {
        var unit = new Unit();

        // dynamically expand exponents arrays as needed
        var maxbaseunits = Math.max(this.exponents.length, rhs.exponents.length);
        for (var i = this.exponents.length; i < maxbaseunits; i++) {
            this.exponents[i] = 0;
        }
        for (i = rhs.exponents.length; i < maxbaseunits; i++) {
            rhs.exponents[i] = 0;
        }

        if (! testing && derivedok != true) {
            // XXX -- can we get rid of this code path difference for testing???
            if (this.type == "DERIVED") {
                throw "specify value for " + this.names[0];
            }
            if (op != ':' && op != '^' && rhs.type == "DERIVED") {
                throw "specify value for " + rhs.names[0];
            }
        }

        // if we are not loading the database...
        if (! loading) {
            var display = null;
            var dividing = false;
            var multiplying = false;
            var adding = false;
            switch (op) {
                case '~':
                    display = "~";
                    multiplying = true;
                    break;
                case '>':
                    display = '+';
                    adding = true;
                    break;
                case '<':
                    display = '-';
                    adding = true;
                    break;
                case '^':
                    display = op;
                    break;
                case ' ':
                    display = op;
                    multiplying = true;
                    break;
                case '*':
                    display = ' ' + op + ' ';
                    multiplying = true;
                    break;
                case "per":
                case '/':
                    display = ' ' + op + ' ';
                    dividing = true;
                    break;
                case '+':
                case '-':
                    display = ' ' + op + ' ';
                    adding = true;
                    break;
                case ':':
                    break;
                case '@':
                    display = " * ";
                    multiplying = true;
                    break;
                case '&':
                    display = " / ";
                    dividing = true;
                    break;
            }

            // format interpretations to display with results
            if ((this.multiplying == true || rhs.multiplying == true) && (multiplying || dividing)) {
                if (this.dividing) {
                    // add the deferred parenthesis for the lhs now, if it differs from the current operation
                    this.interpretation = Parenthesize(this.interpretation);
                }
                if ((rhs.multiplying && ! multiplying) || rhs.dividing) {
                    // add the deferred parenthesis for the rhs now, if it differs from the current operation
                    rhs.interpretation = Parenthesize(rhs.interpretation);
                }
                // continue multiplication or a single division without parenthesis; we'll add them later
                assert(display != null);
                unit.interpretation = this.interpretation + display + rhs.interpretation;
            } else {
                if (op == '?') {
                    // no need for deferred parenthesis at the outermost operation
                    unit.interpretation = this.interpretation + " ? " + rhs.interpretation;
                } else if (op == ':') {
                    // dimensional filter
                    unit.interpretation = this.interpretation;
                } else {
                    var interpretation = this.interpretation;
                    if (this.multiplying || this.dividing || op == '^') {
                        // add the deferred or required parenthesis for the lhs now
                        interpretation = Parenthesize(interpretation);
                    }
                    if (rhs.multiplying || rhs.dividing) {
                        // add the deferred parenthesis for the rhs now
                        rhs.interpretation = Parenthesize(rhs.interpretation);
                    }
                    if (display != null) {
                        // normal infix operations
                        unit.interpretation = interpretation + display + rhs.interpretation;
                        if (adding) {
                            // add required parenthesis now
                            unit.interpretation = Parenthesize(unit.interpretation);
                        }
                    } else if (op == '#') {
                        // solve by dimensional analysis: r/l
                        unit.interpretation = Parenthesize(interpretation) + "^-1 * " + rhs.interpretation;
                    } else if (op == '!') {
                        // solve by dimensional analysis: 1/(lr)
                        unit.interpretation = Parenthesize(interpretation + " * " + rhs.interpretation) + "^-1";
                    } else {
                        assert(0);
                    }
                }
            }

            // remove degenerate parenthesis
            var orig;
            do {
                orig = unit.interpretation;
                unit.interpretation = unit.interpretation.replace(unit_regexp_cap, "$1").replace(value_regexp_cap, "$1");
            } while (orig != unit.interpretation);

            // propagate the need for deferred parenthesis
            assert(! (multiplying && dividing));
            unit.multiplying = multiplying;
            unit.dividing = dividing;
        }

        switch (op) {
            case '^':
                // raise coefficient to dimensionless power; multiply exponents by power
                unit.coefficient = Math.pow(this.coefficient, rhs.coefficient);
                for (i = 0; i < maxbaseunits; i++) {
                    if (rhs.exponents[i]) {
                        throw "non-dimensionless exponent";
                    }
                    unit.exponents[i] = (this.exponents[i] * rhs.coefficient).toPrecision(4) * 1;  // N.B. * 1 returns to float
                    // check for non-integral exponents beyond PI and RADIAN
                    if (i > 1 && unit.exponents[i] != Math.round(unit.exponents[i])) {
                        throw "non-integral exponent";
                    }
                }
                break;

            case '~':  // prefix
            case ' ':  // implicit
            case '*':
            case '@':  // solve by dimensional analysis: l*r
                // multiply coefficients; add exponents
                // if this is an offset temperature being entered, instantly convert from offset temperature to absolute temperature
                var offset = 0;
                if (rhs.names[0] == "absC" || rhs.names[0] == "degC") {
                    offset = 273.15;
                    offset_warn = true;
                } else if (rhs.names[0] == "absF" || rhs.names[0] == "degF") {
                    offset = 459.67;
                    offset_warn = true;
                }
                unit.coefficient = (this.coefficient+offset) * rhs.coefficient;
                for (i = 0; i < maxbaseunits; i++) {
                    unit.exponents[i] = this.exponents[i] + rhs.exponents[i];
                }
                break;

            case "per":  // unit division
            case '/':
            case '&':  // solve by dimensional analysis: l/r
            case '?':
                // divide coefficients; subtract exponents
                unit.coefficient = this.coefficient / rhs.coefficient;
                // if this is an offset temperature being computed, instantly convert from absolute temperature back to offset temperature
                if (rhs.names[0] == "absC" || rhs.names[0] == "degC") {
                    unit.coefficient -= 273.15;
                    offset_warn = true;
                } else if (rhs.names[0] == "absF" || rhs.names[0] == "degF") {
                    unit.coefficient -= 459.67;
                    offset_warn = true;
                }
                for (i = 0; i < maxbaseunits; i++) {
                    unit.exponents[i] = this.exponents[i] - rhs.exponents[i];
                }
                break;

            case '#':  // solve by dimensional analysis: r/l
                // divide coefficients; subtract exponents
                unit.coefficient = rhs.coefficient / this.coefficient;
                for (i = 0; i < maxbaseunits; i++) {
                    unit.exponents[i] = rhs.exponents[i] - this.exponents[i];
                }
                break;

            case '!':  // solve by dimensional analysis: 1/(lr)
                // divide coefficients; subtract exponents
                unit.coefficient = 1 / (this.coefficient * rhs.coefficient);
                for (i = 0; i < maxbaseunits; i++) {
                    unit.exponents[i] = - this.exponents[i] - rhs.exponents[i];
                }
                break;

            case '>':  // unary
            case '+':
                // add coefficients for compatible exponents
                if (! this.Zero() && ! this.Compatible(rhs, false)) {
                    throw "addition of dissimilar units";
                }
                unit.coefficient = this.coefficient + rhs.coefficient;
                unit.exponents = rhs.exponents;
                break;

            case '<':  // unary
            case '-':
                // subtract coefficients for compatible exponents
                if (! this.Zero() && ! this.Compatible(rhs, false)) {
                    throw "subtraction of dissimilar units";
                }
                unit.coefficient = this.coefficient - rhs.coefficient;
                unit.exponents = rhs.exponents;
                break;

            case ':':
                // filter out different dimensions
                if (! this.Compatible(rhs, false)) {
                    if (this.type == "BASE") {
                        throw "specify value for " + this.names[0];  //OK
                    } else {
                        throw "incompatible units :" + rhs.names[0];  //OK
                    }
                }
                unit.coefficient = this.coefficient;
                unit.exponents = this.exponents;
                break;

            default:
                throw "unknown operator " + op;
                //break;
        }

        return unit;
    }

    // look for an ambiguous/compatible unit (so we don't define one ambiguously unintentionally)
    Ambiguous()
    {
        for (var i = 0; i < units.length; i++) {
            if (units[i].type == "DERIVED") {
                if (this.Compatible(units[i], false)) {
                    return units[i];
                }
            }
        }
        return null;
    }

    // format a unit as a dimension string
    Dimension(question)
    {
        var strings = [];

        // look for single dimension matches, possibly inverted
        var i;
        var cont = false;
        var string = (question?"Dimensional Mismatch ":"") + "[";

        // for uninverted and then inverted...
        for (var invert = 0; invert < 2; invert++) {
            // report ^-1 if the number of inversions is odd
            var xor = Boolean(question)!=Boolean(invert);
            // for all units...
            for (i = 0; i < units.length; i++) {
                // if this unit is a dimension...
                if (units[i].type == "DERIVED") {
                    // if this unit is a compatible dimension...
                    if (this.Compatible(units[i], xor)) {
                        // format its name
                        if (cont) {
                            // "or" if more than one
                            string += " or ";
                        }
                        string += units[i].names[0] + (invert?"^-1":"");
                        cont = true;
                     }
                }
            }
        }

        // if we found a single dimension match...
        if (cont) {
            // return it
            string += "]";
            strings.push("> " + Simplify(this.interpretation));
            strings.push(string);
            return strings;
        }

        // otherwise, we have to match individual base dimensions and powers

        // for each base unit beyond PI and RADIAN...
        for (i = 2; i < nextbaseunit; i++) {
            // if the exponent is non-0...
            var remaining = this.exponents[i]*(question?-1:1);
            if (remaining) {
                // format its name
                if (cont) {
                    // multiply if more than one
                    string += "*";
                }
                string += bases[i].names[0] + (remaining!=1?"^"+remaining:"");
                cont = true;
            }
        }

        string += "]";

        // return the individual base dimensions and powers
        strings.push("> " + Simplify(this.interpretation));
        strings.push(string);
        return strings;
    }

    // format a unit as an SI result string
    SI()
    {
        // look for a single dimension match, possibly inverted
        var i;
        var denom;
        var result;
        var results = [];

        // for uninverted and then inverted...
        for (var invert = 0; invert < 2; invert++) {
            // for all units...
            for (i = 0; i < units.length; i++) {
                // if this unit is a derived unit...
                if (units[i].type == "DERIVED") {
                    // if this unit is a compatible derived unit...
                    if (this.Compatible(units[i], invert)) {
                        // calculate the SI result in terms of the derived unit
                        denom = units[i].Operate('^', Value(invert?-1:1), true);
                        denom.interpretation = "[" + units[i].names[0] + "]" + (invert?"^-1":"");
                        result = this.Operate('?', denom, true);
                        result.dimension = (invert?"(":"") + units[i].definition.replace(/.*= */, "").replace(/ *[#].*/, "").trim() + (invert?")^-1":"");
                        if (result.PiAnalysis()) {
                            // we have a winner
                            results.push(result);
                            if (units[i].categories.includes("Warn_angle")) {
                                cycle_warn = true;
                            }
                        }
                    }
                }
            }
            // if we found a result...
            if (results.length) {
                // N.B. if we match an uninverted dimension, skip the inverted ones
                // return it
                return results;
            }
        }

        // otherwise, we have to match individual base dimensions and powers

        denom = null;
        var string =  "";
        // for each exponent beyond PI and RADIAN...
        for (i = 2; i < this.exponents.length; i++) {
            // if the exponent is non-0...
            if (this.exponents[i]) {
                // find the derived unit for the exponent
                var exponent = this.exponents[i];
                for (var ii = 0; ii < units.length; ii++) {
                    if (units[ii].type == "DERIVED" && bases[i].Compatible(units[ii], false)) {
                        // and divide the overall result by the derived unit
                        var term;
                        if (exponent == 1) {
                            term = units[ii];
                        } else {
                            term = units[ii].Operate('^', Value(this.exponents[i]), true);
                        }
                        if (! denom) {
                            denom = term;
                        } else {
                            // multiply if more than one term
                            denom = denom.Operate('*', term, true);
                            string += "*";
                        }
                        // format the derived unit name
                        string += units[ii].definition.replace(/.*= */, "") + (exponent!=1?"^"+exponent:"");
                        break;
                    }
                }
                // if we did not find a derived unit...
                if (ii == units.length) {
                    throw "missing DERIVED unit for " + bases[i].names[0];
                }
            }
        }

        // return the overall coefficient and individual base dimensions and powers
        if (! denom) {
            denom = Value(1).Operate('^', Value(1), true);
        }
        denom.interpretation = "";
        result = this.Operate('?', denom, true);
        result.dimension = string;
        results.push(result);
        return results;
    }
}

// define a new base unit in the units database
function DefineBaseUnit(names, pluralizable)
{
    // pick a new exponent
    var unit = new Unit(names, [pluralizable], 1, [], "BASE", false, [], "");
    for (var i = 0; i < nextbaseunit; i++) {
        unit.exponents[i] = 0;
    }
    // set just this exponent to 1
    unit.exponents[nextbaseunit] = 1;
    bases[nextbaseunit] = unit;
    nextbaseunit++;
    // make the unit (mostly) immutable
    Object.freeze(unit);
    units.push(unit);
    // return the unit
    return unit;
}

// return a primary unit from the units database
// N.B. caller must throw!
function LookupUnit(name)
{
    // if this is a precomputed unit to make loading faster
    if (name[0] == 'x' && name.match(/^xx[0-9]/)) {
        // no need to search, just return the unit
        return units[name.replace(/^xx/, "")];
    }
    // otherwise, for all units...
    for (var i = 0; i < units.length; i++) {
        var unit = units[i];
        // for all appropriate unit names...
        for (var j = 0; j < unit.names.length; j++) {
            // if the name matches...
            if (name == unit.names[j]) {
                // return the unit
                return unit;
            }
            if (loading && ! deriving) {
                // be quick
                break;
            }
            if (unit.type == "PREFIX") {
                break;
            }
        }
    }
    // unit not found
    return null;
}

// return a prefix and a primary unit from the units database
function LookupPrefixedUnit(name)
{
    // for all unit names...
    for (var ii = 0; ii < units.length; ii++) {
        // if this is a prefix...
        if (units[ii].type == "PREFIX") {
            var storage = units[ii].names[0].slice(2) == "bi";  // storage prefix
            // for all prefix names...
            for (var jj = 0; jj < units[ii].names.length; jj++) {
                var prefix = units[ii].names[jj];
                // if the specified name matches the prefix...
                if (name[0] == prefix[0] && name.indexOf(prefix) == 0 && name.length > prefix.length) {
                    // prefix match
                    var remain = name.slice(prefix.length);
                    // for all unit names...
                    for (var i = 0; i < units.length; i++) {
                        // if this unit is prefixable...
                        if (units[i].prefixable) {
                            if (storage && (units[i].exponents.length < storagebase || units[i].exponents[storagebase] == 0)) {
                                // not storage
                                continue;
                            }
                            // for all unit names...
                            for (var j = 0; j < units[i].names.length; j++) {
                                // if the remainder of the specified name matches the unit...
                                if (remain == units[i].names[j]) {
                                    // return the prefix and unit
                                    return [units[ii], units[i]];
                                }
                                if (loading && ! deriving) {
                                    // be quick
                                    break;
                                }
                            }
                        }
                    }
                }
                if (loading && ! deriving) {
                    // be quick
                    break;
                }
            }
        }
    }
    // prefix and unit not found
    throw "undefined unit " + name;
}

// *** expression evaluation **********************************************************************

// return a literal value as a unit
function Value(token)
{
    var unit = new Unit([token]);
    unit.coefficient = Number(token);
    if (isNaN(unit.coefficient)) {
        throw "bad value " + token;  //OK
    }
    return unit;
}

// operator precedences
var prec = {
    '~':    3,  // left-to-right associativity  (prefix multiplication)
    '>':    2,  // right-to-left associativity  (unary +)
    '<':    2,  // right-to-left associativity  (unary -)
    '^':    1,  // right-to-left associativity
    ' ':    0,  // left-to-right associativity  (implied multiplication)
    "per": -1,  // left-to-right associativity  (unit division)
    '*':   -1,  // left-to-right associativity
    '/':   -1,  // left-to-right associativity
    '+':   -2,  // left-to-right associativity
    '-':   -2,  // left-to-right associativity
    ':':   -3,  // left-to-right associativity  (dimensional filter)
    '@':   -4,  // left-to-right associativity  (solve by dimensional analysis: l*r)
    '&':   -4,  // left-to-right associativity  (solve by dimensional analysis: l/r)
    '#':   -4,  // left-to-right associativity  (solve by dimensional analysis: r/l)
    '!':   -4,  // left-to-right associativity  (solve by dimensional analysis: 1/(lr))
    '?':   -5,  // left-to-right associativity
    "zz":  -7,
};

// operator associativities
var right = "<>^";

// clean low precedence operators off the stack and push a new operator on the stack if needed and set the next result
function CleanAndPush(stack, result, op, next)
{
    assert(prec.hasOwnProperty(op));

    // handle stacked operator precedence and associativity; clean stack as needed
    if (result != null) {
        while (stack.length) {
            // get the top operation on the stack
            var stacked = stack[stack.length-1];
            // if the operator has right-to-left associativity, pop if the operator precedence is greater-than the current precedence;
            // otherwise, pop if the operator precedence is greater-than-or-equal-to the current precedence
            var pop = (right.indexOf(stacked.op) != -1) ? (stacked.prec > prec[op]) : (stacked.prec >= prec[op]);

            if (! pop) {
                // we're done popping
                break;
            }
            // pop and clean
            stacked = stack.pop();
            result = stacked.result.Operate(stacked.op, result);
        }
    }

    // if we are still evaluating (and not finalizing the stack)...
    if (op != "zz") {
        // if there is a previous result...
        if (result != null) {
            // push the previous result and a new operator on the stack
            stack.push({ result: result, op: op, prec: prec[op] });
        }

        // and set the current result
        result = next;
    }

    // return the current result
    return result;
}

// evaluate a single expression in an array of tokens and return a single result
function EvaluateTokens(tokens)
{
    var j;
    var subtokens;
    var stack = [];
    var result = null;

    // for all tokens in the equation...
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        // if the token is a function call...
        if (functions.hasOwnProperty(token)) {
            if (token == "per") {
                // unit division
                result = CleanAndPush(stack, result, token, null);
            } else {
                var unit;
                if (tokens.length > i+1 && opens.indexOf(tokens[i+1]) != -1) {
                    // power, trig, log, etc. followed by parenthetical expression
                    j = MatchParen(tokens, i+1);
                    subtokens = tokens.slice(i+2, j);
                    unit = EvaluateTokens(subtokens);
                    i = j;
                } else if (tokens.length > i+3 && tokens[i+2] == '~') {
                    // power, trig, log, etc. followed by prefixed unit
                    unit = EvaluateTokens([tokens[i+1], '~', tokens[i+3]]);
                    i = i+3;
                } else if (tokens.length > i+1) {
                    // power, trig, log, etc. followed by unit or number
                    unit = EvaluateTokens([tokens[i+1]]);
                    i = i+1;
                } else {
                    throw "missing argument " + tokens[i];
                }
                result = CleanAndPush(stack, result, ' ', unit);
                if (token == "square") {
                    result = CleanAndPush(stack, result, '^', Value("2"));
                } else if (token == "cubic") {
                    result = CleanAndPush(stack, result, '^', Value("3"));
                } else if (token == "sqrt") {
                    result = CleanAndPush(stack, result, '^', Value("0.5"));
                } else {
                    var interpretation = token + "{" + result.interpretation + "}";
                    // check that argument is dimensionless beyond PI and RADIAN...
                    for (j = 2; j < result.exponents.length; j++) {
                        if (result.exponents[j]) {
                            throw "non-dimensionless argument";  //OK
                        }
                    }
                    if (token == "sin") {
                        result = Value(Math.sin(result.coefficient));
                    } else if (token == "cos") {
                        result = Value(Math.cos(result.coefficient));
                    } else if (token == "tan") {
                        result = Value(Math.tan(result.coefficient));
                    } else if (token == "asn") {
                        // range -1..1
                        result = Value(Math.asin(result.coefficient));
                    } else if (token == "acs") {
                        // range -1..1
                        result = Value(Math.acos(result.coefficient));
                    } else if (token == "atn") {
                        result = Value(Math.atan(result.coefficient));
                    } else if (token == "ln") {
                        result = Value(Math.log(result.coefficient));
                    } else if (token == "log") {
                        result = Value(Math.log(result.coefficient)/Math.log(10));
                    } else if (token == "exp") {
                        result = Value(Math.exp(result.coefficient));
                    } else {
                        throw "bad function " + token;
                    }
                    result.interpretation = interpretation;
                }
            }

        // otherwise, if the token opens a parenthetical expression...
        } else if (opens.indexOf(token) != -1) {
            // parenthetical expression
            j = MatchParen(tokens, i);
            subtokens = tokens.slice(i+1, j);
            result = CleanAndPush(stack, result, ' ', EvaluateTokens(subtokens));
            i = j;

        // otherwise, if the token is a numeric value...
        } else if (token[0].match(value_regexp_ch)) {
            // value
            result = CleanAndPush(stack, result, ' ', Value(token));

        // otherwise, if the token is a symbolic unit value...
        } else if (token[0].match(unit_regexp_ch)) {
            // look for an unprefixed unit
            var next = LookupUnit(token);
            var op = ' ';
            // if not found...
            if (! next) {
                // look for a prefixed unit
                var prefixunit = LookupPrefixedUnit(token);
                next = prefixunit[0];
                op = '~';
                result = CleanAndPush(stack, result, op, next);
                next = prefixunit[1];
            }
            if (next.categories.includes("Warn_angle")) {
                cycle_warn = true;
            }
            result = CleanAndPush(stack, result, op, next);

        // otherwise, if the token is an arithmetic operator...
        } else if (prec.hasOwnProperty(token)) {
            // operator
            if (result == null) {
                if (token == '+') {
                    // unary +
                    result = Value("0");
                    token = '>';
                } else if (token == '-') {
                    // unary -
                    result = Value("0");
                    token = '<';
                } else {
                    throw "expected a value before " + token;
                }
            }
            result = CleanAndPush(stack, result, token, null);

        } else {
            throw "bad token " + token;
        }
    }

    if (result == null) {
        throw "missing expression";
    }

    // finalize the stack, popping all remaining operations
    result = CleanAndPush(stack, result, "zz", null);
    assert(! stack.length);

    return result;
}

// simplify an equation interpretation
function Simplify(interpretation)
{
    // XXX -- alternate parens; remove redundant parens
    if (interpretation[0] == '(' && MatchParen(interpretation, 0) == interpretation.length-1) {
        interpretation = interpretation.slice(1, interpretation.length-1);
    }
    return interpretation.replace(/[{]/g, "(").replace(/[}]/g, ")");
}

// *** expression alternation *********************************************************************

// expand a free unit to singular form(s)
function Singulars(name)
{
    var names = [name];
    if (name.match(/..s$/)) {
        if (name.match(/.ves$/)) {
            names.push(name.replace(/ves$/, "f"));
            names.push(name.replace(/ves$/, "fe"));
        } else if (name.match(/.ies$/)) {
            names.push(name.replace(/ies$/, "y"));
        } else if (name.match(/.(s|sh|ch|x|z)es$/)) {
            names.push(name.replace(/es$/, ""));
        } else {
            names.push(name.replace(/s$/, ""));
        }
    }
    return names;
}

// compare a possibly prefix or plural unit to a singular unit name from the database
function MatchPrefixPlural(name, i, j, search)
{
    var singular = units[i].names[j];
    if (name == singular || (search && singular.toLowerCase().match("^" + name))) {
        return true;
    }
    if (units[i].pluralizables == null || ! units[i].pluralizables[j] || name[name.length-1] != 's' || search) {
        return false;
    }
    if (singular.match(/.f$/)) {
        if (name.replace(/ves$/, "f") == singular) {
            return true;
        }
    }
    if (singular.match(/.fe$/)) {
        if (name.replace(/ves$/, "fe") == singular) {
            return true;
        }
    }
    if (singular.match(/.y$/)) {
        if (name.replace(/ies$/, "y") == singular) {
            return true;
        }
    }
    if (singular.match(/(s|sh|ch|x|z)$/)) {
        if (name.replace(/es$/, "") == singular) {
            return true;
        }
    }
    if (name.replace(/s$/, "") == singular) {
        return true;
    }
    return false;
}

// return all the primary and secondary units that match a name
// XXX -- figure out how to factor this with the other Lookup functions!
function LookupUnits(name, prefixable, search)
{
    var j;
    var unit;
    var more = [];

    // if this is a precomputed unit to make loading faster
    if (name[0] == 'x' && name.match(/^xx[0-9]/)) {
        // no need to search, just return the unit
        more.push(name);
    } else {
        // check for a unit
        var name2;
        if (search) {
            name2 = name.toLowerCase();
        } else {
            name2 = name;
        }
        
        // for all units...
        for (var i = 0; i < units.length; i++) {
            unit = units[i];
            // if we are not looking only for prefixable units or the unit actually is prefixable...
            if (! prefixable || unit.prefixable) {
                // for all appropriate unit names...
                for (j = 0; j < unit.names.length; j++) {
                    // if the unit name matches, by prefix or by plural...
                    if ((name2[0] == unit.names[j][0] || search) && MatchPrefixPlural(name2, i, j, search)) {
                        // record a matching unit
                        if (search) {
                            more.push(unit.names[j]);
                        } else {
                            // use a precomputed unit to make subsequent searching faster
                            more.push("xx"+i);
                        }
                    }
                    if (unit.type == "PREFIX") {
                        break;
                    }
                }
            }
        }

        // check for a prefix and a unit

        // for all unit names...
        for (var ii = 0; ii < units.length; ii++) {
            unit = units[ii];
            // if this is a prefix...
            if (unit.type == "PREFIX") {
                var storage = unit.names[0].slice(2) == "bi";  // storage prefix
                // for all prefix names...
                for (var jj = 0; jj < unit.names.length; jj++) {
                    var prefix = unit.names[jj];
                    // if the specified name matches the prefix...
                    if (name[0] == prefix[0] && name.indexOf(prefix) == 0 && name.length > prefix.length) {
                        // prefix match
                        var remain = name2.slice(prefix.length);
                        // for all unit names...
                        for (i = 0; i < units.length; i++) {
                            var unit2 = units[i];
                            // if this unit is prefixable...
                            if (unit2.prefixable) {
                                if (storage && (unit2.exponents.length < storagebase || unit2.exponents[storagebase] == 0)) {
                                    // not storage
                                    continue;
                                }
                                // for all unit names...
                                for (j = 0; j < unit2.names.length; j++) {
                                    // if the remainder of the specified name matches the unit, by prefix or by plural...
                                    if ((remain[0] == unit2.names[j][0] || search) && MatchPrefixPlural(remain, i, j, search)) {
                                        // record a matching prefix and unit
                                        if (search) {
                                            more.push(unit.names[jj]+unit2.names[j]);
                                        } else {
                                            // use a precomputed unit to make subsequent searching faster
                                            more.push("xx"+ii + '~' + "xx"+i);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // if we found one or more interpretations of the unit...
    if (more.length) {
        return more;
    }

    if (! evaluating) {
        throw "undefined unit " + name;
    }

    // define a free unit to use for the remainder of the expression
    unit = DefineBaseUnit(Singulars(name), true);
    return [unit.names[0]];
}

// call EvaluateTokens() for each possible alternation of tokens at or beyond n
function AlternateTokens(tokens, n)
{
    // for each token past where our callers have already alternated...
    var j;
    var subtokens;
    for (var i = n; i < tokens.length; i++) {
        // if we are alternating...
        if (tokens[i] == ';') {
            // solve by dimensional analysis alternation
            subtokens = tokens.slice(0);
            // for each alternate operator of ';'...
            for (j = 0; j < semicolon_alternates.length; j++) {
                subtokens[i] = semicolon_alternates[j];
                // recurse for remaining tokens
                AlternateTokens(subtokens, i+1);
            }
            return;
        } else if (tokens[i][0].match(unit_regexp_ch) && ! functions.hasOwnProperty(tokens[i])) {
            // ambiguous unit names alternation
            var spliced = false;
            subtokens = tokens.slice(0);
            var prefixable = i && tokens[i-1] == '~';
            // look up all interpretations of the unit
            var ambiguous = LookupUnits(tokens[i], prefixable, false);
            // for each interpretation of the unit...
            for (j = 0; j < ambiguous.length; j++) {
                // if this is a prefixed unit...
                if (ambiguous[j].match('~')) {
                    // split the unit into prefix and unit
                    var prefixunit = ambiguous[j].split('~');
                    if (! spliced) {
                        // grow the subtokens array once as needed
                        subtokens.splice(i, 0, prefixunit[0], '~');
                        spliced = true;
                    } else {
                        subtokens[i] = prefixunit[0];
                    }
                    subtokens[i+2] = prefixunit[1];
                } else {
                    subtokens[i] = ambiguous[j];
                }
                // recurse for remaining tokens
                AlternateTokens(subtokens, i+1);
            }
            return;
        }
    }

    try {
        // evaluate a single expression in an array of tokens and return a single result
        var result = EvaluateTokens(tokens);

        // check if the evaluation resulted in a dimensionless exponent beyond PI and RADIAN
        if (evaluating) {
            for (j = result.exponents.length-1; j >= 2; j--) {
                if (result.exponents[j]) {
                    break;
                }
            }
        } else {
            j = -1;
        }
        // if the evaluation resulted in a dimensionless exponent...
        if (j <= 1 && ! si) {
            if (! result.PiAnalysis()) {
                throw "unexpected exponents of pi and radian; use pi_as_number or pin to escape";  //OK
            }

            // dimensionless results are top priority
            results.push(result);

        // otherwise, if the evaluation resulted in a mismatch of non-free units...
        } else if (j < freebaseunit) {
            // second priority are mismatches or SI or dimension calculations

            var strings = [];
            var question = tokens.includes('?');

            // if "expression ? unit" was entered...
            if (question) {
                // the user requested a unit and we mismatched; show what was missing as "1/dimension"
                strings = result.Dimension(question);

            // otherwise, if "expression ?" was entered...
            } else if (si) {
                // the user requested an SI result; show the SI result as "coefficient dimension"
                results = results.concat(result.SI());

            // "expression" was entered...
            } else {
                // the user requested a dimension; show what was evaluated as "dimension"
                strings = result.Dimension(question);
            }

            // record the result as a mismatch
            // XXX -- generate merged mismatches and interpretations
            for (var k = 0; k < strings.length; k++) {
                if (! mismatches.includes(strings[k])) {
                    if (! defining) {
                        mismatches.push(strings[k]);
                    }
                }
            }

        // third priority are errors
        } else {
            // the evaluation resulted in a mismatch of a free unit
            if (! errors.includes("uncanceled free unit " + bases[j].names[0])) {
                errors.push("uncanceled free unit " + bases[j].names[0]);
            }
        }
    } catch (error) {
        if (! errors.includes(error)) {
            errors.push(error);
        }
    }
}

// *** command line *******************************************************************************

// tokenize a command line
function TokenizeLine(input)
{
    var test = input.match(/^TEST/);
    if (! test) {
        // remove comments except for TEST lines
        input = input.replace(/[#|].*/, "").trim();
    }

    var token;
    var tokens = [];
    var equal = false;
    var question = false;
    // for all letters in the command line...
    for (var i = 0; i < input.length; i++) {
        var ch = input[i];

        // if the letter is the start of a numeric value...
        if (ch.match(value_regexp_ch)) {
            // value
            token = input.slice(i).match(value_regexp_head)[0];
            i += token.length-1;

        // otherwise, if the letter is the start of a symbolic unit (or function call name)...
        } else if (ch.match(unit_regexp_ch)) {
            // unit
            token = input.slice(i).match(unit_regexp_head)[0];
            i += token.length-1;

        // otherwise, if the letter is an arithmetic operator...
        } else if (ch.match(operator_regexp_ch)) {
            // operator
            token = ch;
            if (ch == '=') {
                if (equal && ! test) {
                    throw "= may only occur once";
                }
                equal = true;
            }
            if (ch == '?') {
                if (question) {
                    throw "? may only occur once";
                }
                question = true;
            }
        } else if (ch == ' ') {
            continue;
        } else {
            throw "token error " + ch;
        }
        tokens.push(token);
    }

    return tokens;
}

// parse and run a command line
function ParseTokens(tokens, line)
{
    var i;
    var j;
    var k;
    var unit;
    if (tokens.length) {
        // if we are defining a base unit...
        if (tokens[0] == "BASE") {
            if (tokens.length != 2) {
                throw "missing unit";
            }
            DefineBaseUnit([tokens[1]], false);

        // otherwise, if we are defining a category...
        } else if (tokens[0] == "CATEGORY") {
            if (tokens.length != 2) {
                throw "missing category";
            }
            if (all_categories.includes(tokens[1])) {
                throw "duplicate category";
            }
            all_categories.push(tokens[1]);

        // otherwise, if we are pushing a category...
        } else if (tokens[0] == "___PUSH") {
            for (i = 1; i < tokens.length; i++) {
                if (tokens[i] != ',') {
                    if (! all_categories.includes(tokens[i]) && ! LookupUnit(tokens[i])) {
                        throw "undefined category " + tokens[i];
                    }
                    if (open_categories.includes(tokens[i])) {
                        throw "category already pushed " + tokens[i];
                    }
                    open_categories.push(tokens[i]);
                }
            }

        // otherwise, if we are popping a category...
        } else if (tokens[0] == "___POP") {
            for (i = 1; i < tokens.length; i++) {
                if (tokens[i] != ',') {
                    if ((j = open_categories.indexOf(tokens[i])) == -1) {
                        throw "category not pushed " + tokens[i];
                    }
                    open_categories.splice(j, 1);
                }
            }

        // otherwise, if we are verifying no categories are pushed...
        } else if (tokens[0] == "___VERIFY") {
            if (open_categories.length) {
                throw "categories pushed: " + open_categories.toString();
            }

        // otherwise, if we are running test code...
        } else if (tokens[0] == "TEST") {
            if (tokens[1] == "categories") {
                document.getElementById("equation").value = "";
                Units();
            } else if (tokens[1] == "byname") {
                document.getElementById("equation").value = tokens[2];
                Units();
            } else if (tokens[1] == "bycategory") {
                // XXX -- how to test this thru UI hyperlink?
                ShowUnitsByCategory(tokens[2], false);
            } else if (tokens[1] == "bydimension") {
                // XXX -- how to test this thru UI hyperlink?
                ShowUnitsByCategory(tokens[2], true);
            } else if (tokens[1] == "details") {
                document.getElementById("equation").value = tokens[2];
                Details();
            } else if (tokens[1] == "throw") {
                throw "unknown test throw";
            } else {
                // remember this entire database test for later
                database_tests += line.replace(/^TEST */, "") + '\n';
            }

        // otherwise, if we are defining or undefining a unit...
        } else if ((k = tokens.indexOf('=')) != -1) {
            var type = null;
            var remainder;
            var unambiguous = false;
            if (tokens[0] == "AMBIGUOUS") {
                type = "DERIVED";
                remainder = line.replace(/^AMBIGUOUS/, "").trim();
                i = 1;
            } else if (tokens[0] == "DERIVED") {
                type = tokens[0];
                remainder = line.replace(/^DERIVED/, "").trim();
                i = 1;
                unambiguous = true;
            } else if (tokens[0] == "PREFIX") {
                type = tokens[0];
                remainder = line.replace(/^PREFIX/, "").trim();
                i = 1;
            } else {
                remainder = line.replace(/^ *[*]/, "").trim();
                i = 0;
            }
            var prefixable = tokens[i][0] == '*';
            var names = [];
            var pluralizables = [];
            var categories = open_categories.slice(0);

            // gather categories and names...
            for (; i < tokens.length; i++) {
                if (tokens[i] == '=') {
                    // end of names
                    break;
                } else if (tokens[i] == ':') {
                    // end of categories
                    for (j = 0; j < names.length; j++) {
                        if (categories.includes(names[j])) {
                            throw "category already pushed " + names[j];
                        }
                        if (! all_categories.includes(names[j]) && ! LookupUnit(names[j])) {
                            throw "undefined category " + names[j];
                        }
                        categories.push(names[j]);
                    }
                    names = [];
                    pluralizables = [];
                    continue;
                } else if (tokens[i] == ',') {
                    // next name or category
                    continue;
                } else if (tokens[i] == '*') {
                    // name is pluralizable
                    if (names.length) {
                        pluralizables[names.length-1] = true;
                    }
                } else if (tokens[i][0].match(unit_regexp_ch)) {
                    // record the name
                    names.push(tokens[i]);
                    pluralizables.push(false);
                } else {
                    throw "unexpected " + tokens[i];
                }
            }
            if (! i) {
                throw "missing name";
            }
            var subtokens = tokens.slice(i+1);

            // form the definition, including open and explicit categories
            var definition = prefixable?"*":"";
            if (type) {
                definition += type + " ";
            }
            if (categories.length) {
                definition += categories.join(",");
                definition += ":";
            }
            definition += remainder.replace(/[^:]*:/, "").trim();  // N.B. excludes prefixable and categories

            // if we have an expression...
            if (k+1 < tokens.length && tokens[k+1] != ':') {
                // define unit names
                // if we are loading the database...
                if (loading) {
                    deriving = (type == "DERIVED");
                    try {
                        // evaluate a single interpretation to be quick
                        results.push(EvaluateTokens(subtokens));
                        if (deriving) {
                            // XXX -- how can we test this after load?
                            var ambiguous = results[0].Ambiguous();
                            if (unambiguous && ambiguous) {
                                throw "ambiguous derived unit " + names[0] + " with " + ambiguous.names[0];
                            } else if (! unambiguous && ! ambiguous) {
                                throw "unambiguous ambiguous unit " + names[0];
                            }
                        }
                    } catch (error) {
                        if (! errors.includes(error)) {
                            errors.push(error);
                        }
                    } finally {
                        deriving = false;
                    }
                } else {
                    defining = true;
                    try {
                        // evaluate all interpretations to be thorough
                        AlternateTokens(subtokens, 0);
                    } finally {
                        defining = false;
                    }
                }

                // for all results...
                for (j = 0; j < results.length; j++) {
                    // define a new unit!
                    unit = new Unit(names, pluralizables, results[j].coefficient, results[j].exponents, type, prefixable, categories, definition);
                    // if we are not loading the database...
                    if (! loading) {
                        if (! mismatches.includes("> " + Simplify(results[j].interpretation))) {
                            // record the interpretation of the definition
                            mismatches.push("> " + Simplify(results[j].interpretation));
                        }
                    }
                    Object.freeze(unit);
                    units.push(unit);
                    defines = true;
                }
                if (defines) {
                    results = [];
                }
            } else {
                // undefine unit names
                var filter = null;
                // if a filtering dimension is specified...
                if (k+1 < tokens.length && tokens[k+1] == ':') {
                    // evaluate the dimension
                    var dimtokens = tokens.slice(k+2);
                    try {
                        filter = EvaluateTokens(dimtokens);
                    } catch (error) {
                        throw "bad unit filter";
                    }
                }

                undefines = true;
                // for all units...
                // N.B. when undefining, we iterate from end to start so we can delete unit or name array elements and not affect subsequent indexes
                for (i = units.length-1; i >= 0; i--) {
                    // if the unit is compatible with the filter and is not a base/derived/ambiguous/prefix unit...
                    if (units[i].Compatible(filter, false) && units[i].type == null) {
                        // for all unit names...
                        for (j = units[i].names.length-1; j >= 0; j--) {
                            // for all names being undefined...
                            for (k = 0; k < names.length; k++) {
                                // if the unit name matches...
                                if (units[i].names[j] == names[k]) {
                                    // delete the unit name!
                                    units[i].names.splice(j, 1);
                                    units[i].pluralizables.splice(j, 1);
                                }
                            }
                            // if we deleted all names from a unit...
                            if (units[i].names.length == 0) {
                                // delete the unit itself!
                                units.splice(i, 1);
                            }
                        }
                    }
                }
            }

        } else {
            // we are evaluating an expression with free units
            evaluating = true;
            freebaseunit = nextbaseunit;
            var length = units.length;

            try {
                // evaluate all interpretations to be thorough
                AlternateTokens(tokens, 0);
            } finally {
                // discard free units
                nextbaseunit = freebaseunit;
                while (units.length > length) {
                    units.pop();
                }
                evaluating = false;
            }
        }
    }
}

// load the units database
function LoadDatabase(database)
{
    open_categories = [];

    // split the database into lines
    var lines = database.split(/[\r\n]+/);

    // for each line of the database...
    for (var i = 0; i < lines.length; i++) {
        // tokenize, parse, and run the command line
        //console.log(lines[i]);
        results = [];
        mismatches = [];
        errors = [];
        defines = false;
        undefines = false;
        try {
            ParseTokens(TokenizeLine(lines[i]), lines[i]);
        } catch (error) {
            throw "exception: " + lines[i] + " : " + error;
        }

        if (results.length) {
            throw "unexpected result: " + lines[i] + " : " + (results[0].coefficient.toPrecision(6) * 1);  // N.B. * 1 removes trailing 0's from toPrecision();
        }
        if (mismatches.length) {
            for (var j = mismatches.length-1; j >= 0; j--) {
                if (mismatches[j].match(/^[>] /)) {
                    mismatches.splice(j, 1);
                }
            }
            if (mismatches.length) {
                throw "unexpected mismatch: " + lines[i] + " : " + mismatches.toString();
            }
        }
        if (errors.length) {
            throw "unexpected error: " + lines[i] + " : " + errors.toString();
        }
    }

    // identify our "special" base units
    for (i = 0; i < bases.length; i++) {
        if (bases[i].names[0] == "STORAGE") {
            // we only allow binary prefixes on storage units
            storagebase = i;
        }
    }

    if (open_categories.length) {
        throw "categories not popped: " + open_categories.toString();
    }
}

// low quality results contain mix of angles and numbers; high quality results do not contain solve by dimensional analysis ^-1
function Quality(interpretation)
{
    if (interpretation.match(/_as_number/) || interpretation.match(/_as_frequency/)) {
        if (interpretation.match(/_as_angle/) || interpretation.match(/_as_angular_velocity/)) {
            return 0;  // low
        }
    }
    if (interpretation.match(/[^][-]1/)) {
        return 1;  // medium
    }
    return 2;  // high
}

// run a command line and return the output as an array of strings and a success bool
function RunLine(line)
{
    var output = [];
    var success = true;

    // capture the result dimension
    var question = line.indexOf('?');
    var dimension;
    if (question == -1) {
        dimension = "";
    } else {
        dimension = " " + line.slice(question+1).replace(/[#].*/, "").trim();
    }

    // tokenize, parse, and run the command line
    results = [];
    mismatches = [];
    errors = [];
    defines = false;
    undefines = false;

    si = false;
    var tokens = TokenizeLine(line);
    // remove trailing '?' for si or filter request
    if (tokens.length > 0 && tokens[tokens.length-1] == '?') {
        si = true;
        tokens.pop();
    }

    ParseTokens(tokens, line);

    // if we got one or more valid (dimensionally consistent, and hence now dimensionless) results...
    if (results.length) {
        var j;
        var k;
        var answers = [];
        var interpretations = [];

        // format the results we will output, appending the captured dimension we parsed from the command line
        for (j = 0; j < results.length; j++) {
            var string = "= " + (results[j].coefficient.toPrecision(6) * 1) + (si?" "+results[j].dimension:dimension);  // N.B. * 1 removes trailing 0's from toPrecision()
            var answer = answers.indexOf(string);
            if (answer == -1) {
                interpretations[answers.length] = [Simplify(results[j].interpretation)];
                answers.push(string);
            } else {
                // sort interpretations by answer
                if (! interpretations[answer].includes(Simplify(results[j].interpretation))) {
                    interpretations[answer].push(Simplify(results[j].interpretation));
                }
            }
        }

        var minimum = 0;
        for (j = 0; j < answers.length; j++) {
            for (k = 0; k < interpretations[j].length; k++) {
                if (Quality(interpretations[j][k]) > 0) {
                    // we won't print low quality results at all if there are any non-low quality results
                    minimum = 1;
                }
            }
        }

        // generate merged answers and interpretations
        for (j = 0; j < answers.length; j++) {
            var best = 0;
            var current;
            for (k = 0; k < interpretations[j].length; k++) {
                if ((current = Quality(interpretations[j][k])) > best) {
                    // we won't print medium quality interpretations if there are high-quality interpretations
                    best = current;
                }
            }
            if (best >= minimum) {
                for (k = 0; k < interpretations[j].length; k++) {
                    if (Quality(interpretations[j][k]) >= best) {
                        output.push("> " + interpretations[j][k]);
                    }
                }
                output.push(answers[j]);
            }
        }

    // otherwise, if we defined a unit or got one or more dimensional mismatches (or SI results)...
    } else if (defines || mismatches.length) {
        // use the mismatches (or SI results) as the results we will output
        output = mismatches;
        if (defines) {
            output.push("defined");
        }

    // otherwise, if we undefined units...
    } else if (undefines) {
        output = ["undefined"];

    // otherwise, if we caught one or more exceptions as errors...
    } else if (errors.length) {
        output = errors;
        success = false;
    }

    // return an array of strings and a success bool
    return { output:output, success:success };
}

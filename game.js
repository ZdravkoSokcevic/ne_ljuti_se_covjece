//window.onload = whoo_plays;
window.onload = function() {
        var s = document.getElementById('main');
        s.style.position = 'absolute';
        s.style.top = (window.innerHeight / 2 - 165) + 'px';
        s.style.left = (window.innerWidth / 2 - 165) + 'px';
    }
    /// RANDOM CUBE
var random;
///  COLOR OBJECTS
var re1 = {
    start: 0,
    end: 40,
    current: 0,
    color: "red",
    pos_in_table: "home"
};
var re2 = {
    start: 0,
    end: 40,
    current: 0,
    color: "red",
    pos_in_table: "home"
};
var re3 = {
    start: 0,
    end: 40,
    current: 0,
    color: "red",
    pos_in_table: "home"
};
var re4 = {
    start: 0,
    end: 40,
    current: 0,
    color: "red",
    pos_in_table: "home"
};
/// GREEN
var gr1 = {
    start: 10,
    end: 51,
    current: 0,
    color: "green",
    pos_in_table: "home"
};
var gr2 = {
    start: 10,
    end: 51,
    current: 0,
    color: "green",
    pos_in_table: "home"
};
var gr3 = {
    start: 10,
    end: 51,
    current: 0,
    color: "green",
    pos_in_table: "home"
};
var gr4 = {
    start: 10,
    end: 51,
    current: 0,
    color: "green",
    pos_in_table: "home"
};
/// BLUE

var bl1 = {
    start: 30,
    end: 71,
    current: 0,
    color: "blue",
    pos_in_table: "home"
};
var bl2 = {
    start: 30,
    end: 71,
    current: 0,
    color: "blue",
    pos_in_table: "home"
};
var bl3 = {
    start: 30,
    end: 71,
    current: 0,
    color: "blue",
    pos_in_table: "home"
};
var bl4 = {
    start: 30,
    end: 71,
    current: 0,
    color: "blue",
    pos_in_table: "home"
};
/// YELLOW

var ye1 = {
    start: 20,
    end: 61,
    current: 0,
    color: "yellow",
    pos_in_table: "home"
};
var ye2 = {
    start: 20,
    end: 61,
    current: 0,
    color: "yellow",
    pos_in_table: "home"
};
var ye3 = {
    start: 20,
    end: 61,
    current: 0,
    color: "yellow",
    pos_in_table: "home"
};
var ye4 = {
    start: 20,
    end: 61,
    current: 0,
    color: "yellow",
    pos_in_table: "home"
};
var players = {
        reds: [re1, re2, re3, re4],
        greens: [gr1, gr2, gr3, gr4],
        blues: [bl1, bl2, bl3, bl4],
        yellows: [ye1, ye2, ye3, ye4],
        current: ""
    }
    /// ON WHICH FIELD YOU CLICK
$(".fields").click(function() {
        console.log("Stisnuo si: " + this.id);
    })
    /// ARRAY OF PLAYERS
var plays = ["red", "green", "yellow", "blue"];
var playss = {
        now: "",
        next: ""
    }
    /// COUNTER WHO PLAYS
var cnt_plys = 0;
/// DETECTING CLICK
var clickk = false;
/// SETTING RANDOM NUMBER BETWEEN 1-6
function random_number() {
    random = Math.floor((Math.random() * 100) % 6 + 1);
    $("#rand_numb").html(random);
    return random;
}
var c;
/// FILL FIELD WHERE IS FIGURE AND ADD CLASS
function fill_field(id, color) {
    $(id).css("background-color", color);
    $(id).addClass(color + 's');
}
/// SPINNING NUMBERS
var click = 0;
var spin;
$("#btn_generate").click(function() {
    klick();
});

function klick() {
    click++;
    if (!clickk) {
        if (click % 2) {
            spin = setInterval(random_number, 10);
            clickk = false;
        }
        if (!(click % 2)) {
            clearInterval(spin);
            whoo_plays();
            clickk = true;
        }
    }
};
/// WHICH PLAYER PLAYS NOW
function whoo_plays() {
    playss.now = plays[cnt_plys % 4];
    players.current = playss.now;
    $("#now").css("background-color", playss.now);
    random !== 6 ? cnt_plys++ : cnt_plys;
}
///FIND OUT ID
$(".fields").click(function() {
    ///console.log(this.id);
    let has_class_home = $("#" + this.id).hasClass("home");
    let if_pl_now = $("#" + this.id).hasClass(playss.now + 's');
    if (has_class_home && if_pl_now)
        home_click(this.id);
    if ((!has_class_home && clickk) && if_pl_now) {
        let object = detect_obj(this.id); /// OVDJE JE GRESKA SA FIELD CLICK
        console.log("OBJECT JE :" + object);
        let free = check_free(object, playss.current);
        let pos_to_fill = (eval(object).current + eval(object).start + random) % 40;
        (!(pos_to_fill % 40)) ? pos_to_fill = 40: pos_to_fill;
        let curr_pos = (eval(object).current + eval(object).start) % 40;
        (curr_pos % 40) ? curr_pos: cur_pos = 40;
        ///     COLOR OF ELEMENT WHERE IS SURPOSE TO MOVE
        let mov_field_col = what_class_he_have('field-' + pos_to_fill);
        console.log("move field has " + mov_field_col);
        if (free || (mov_field_col == playss.now)) {
            fill_field("#field-" + pos_to_fill, playss.now);
            move_obj_pos(eval(object), random);
            if (check_double_obj(curr_pos) == 'double') {
                remove_color("field-" + curr_pos, playss.now + 's');
            }
        }
        if (!free && (mov_field_col != playss.now)) {
            ///which object is on the that field
            while (!free) {
                let moved_pos = this.id.slice(-2);
                if (parseInt(moved_pos) < 0)
                    moved_pos = this.id.slice(-1);
                console.log("treba se pomjeriti na: " + moved_pos);
                let obj = detect_obj("field-" + moved_pos);
                eat(obj);
                ///real id name return from object
                let id_namee = object_on_that_pos(pos_to_fill);
                fill_field("#" + id_namee);
                let rm_class = $("#field-" + pos_to_fill).css("background-color") + 's';
                remove_color("#" + id_namee, rm_class);
                free = is_obj_on_pos(pos_to_fill);
            }
            remove_color(pos_to_fill, blue);
            fill_field(pos_to_fill, playss.now);
        }
        clickk = false;
    }
});
/// real id name return from object
function id_name(object) {
    for (x = 1; x <= 4; x++) {
        if (object.slice(-1) == x) {
            if (object == "re" + x)
                return "red-" + x;
            else if (object == "gr" + x)
                return "green-" + x;
            else if (object == "bl" + x)
                return "blue-" + x;
            else if (object == "ye" + x)
                return "yellow-" + x;
        }
    }
}
///eat piun
function eat(object) {
    eval(object).current = 0;
}
/// does_id_plays_now
function does_id_plays_now(id) {
    if ($(("#") + id).hasClass(playss.now + 's'))
        return true;
    else return false;
}
///does this class plays now (UNUSED FOR NOW)
// function check_if_this_class_plays_now(class_name) {
//     if ($("." + class_name).hasClass(playss.now + 's'))
//         return true;
//     else return false;
// }
/// DOES HE HAS CLASS ...
function what_class_he_have(id) {
    if ($("#" + id).hasClass("reds"))
        return 'red';
    else if ($("#" + id).hasClass("greens"))
        return 'green';
    else if ($("#" + id).hasClass("blues"))
        return 'blue';
    else if ($("#" + id).hasClass("yellows"))
        return 'yellow';
    else return 'none';
}
///GO FROM HOME
function home_click(id) {
    /// IF !CLICKED
    if (clickk) {
        /// c==name_of_class
        let c = what_class_he_have(id);
        let objj = id_to_obj(id);
        ///sum of positions and random
        let sum = eval(objj).current + eval(objj).start + random;
        /// SAME COLOR FIELD
        let color_field = what_class_he_have('field-' + sum);
        if (check_free(objj, c) || color_field == playss.now) {
            fill_field("#field-" + sum, c);
            remove_color(id, c + 's');
            move_obj_pos(eval(objj), random);
        }
        console.log(c + "s is");
        console.log(id_to_obj(id));
        console.log("boja koja izlazi je: ", c);
        clickk = false;
    }
}
///from rgb to hex
function is_str(numb) {
    return numb.toString(16);
}
/// CHECK IF OBJECTS IS ON THE FIELD
function check_double_obj(position) {
    for (let x = 1; x <= 4; x++) {
        if ((eval("re" + x).current + eval("re" + x).start) == position)
            return 're' + x;
        if ((eval("gr" + x).current + eval("gr" + x).start) == position)
            return 'gr' + x;
        if ((eval("bl" + x).current + eval("bl" + x).start) == position)
            return 'bl' + x;
        if ((eval("ye" + x).current + eval("ye" + x).start) == position)
            return 'ye' + x;
    }
    return 'double';
}
/// CHECK IS FIELD FREE AND FILL FIELD
function check_free(obj, color) {
    ///sum of positions and random
    let sum = (eval(obj).current + eval(obj).start + random) % 40;
    (!(sum % 40)) ? sum = 40: sum;
    console.log("sum je", sum);
    let col = ($('#field-' + sum).css('background-color'));
    let x = "rgb(" + parseInt('97', 16) + ',' + parseInt("e5", 16) + ',' + parseInt("c6", 16) + ")";
    if ($('#field-' + sum).css('background-color') == 'rgb(151, 229, 198)') {
        console.log("USAO DA PROVJERI DA LI JE SLOBODNO I TACNO JE!");
        return true;
    } else {
        console.log("NIJE SLOBODNO!");
        return false;
    }
}
/// REMOVING COLOR FROM FIELD
function remove_color(identif, cl) {
    $("#" + identif).css("background-color", "#97e5c6");
    $("#" + identif).removeClass(cl);
}
///MOVING OBJECT CURRENT POSITION
function move_obj_pos(obj_name, rand) {
    obj_name.current += random;
}
/// ID FROM CLASS HOME TO OBJECT
function id_to_obj(id) {
    return (id.substr(0, 2) + id.charAt(id.length - 1));
}
///DETECTING OBJECT FROM FIELD NUMBER
function is_obj_on_pos(f_number) {
    for (let x = 1; x < 5; x++) {
        let truebility = false;
        ///check who of red is on that position
        let red_c = eval('re' + x).current;
        let red_s = eval('re' + x).start;
        let red_sum = (red_c + red_s) % 40;
        (red_sum % 40) ? red_sum: red_sum = 40;
        ///and green
        let gr_c = eval('gr' + x).current;
        let gr_s = eval('gr' + x).start;
        let gr_sum = (gr_c + gr_s) % 40;
        (gr_sum % 40) ? gr_sum: gr_sum = 40;
        ///and blue
        let bl_c = eval('bl' + x).current;
        let bl_s = eval(('bl' + x)).start;
        let bl_sum = (bl_c + bl_s) % 40;
        (bl_sum % 40) ? bl_sum: bl_sum = 40;
        ///finally yellow
        let ye_c = eval('ye' + x).current;
        let ye_s = eval(('ye' + x)).start;
        let ye_sum = (ye_c + ye_s) % 40;
        (ye_sum % 40) ? ye_sum: ye_sum = 40;
        if (red_sum == f_number)
            truebility = true;
        if (gr_sum == f_number)
            truebility = true;
        if (bl_sum == f_number)
            truebility = true;
        if (gr_sum == f_number)
            truebility = true;
        return truebility;
    }
}
///WHICH OBJECT IS ON THIS FIELD
function object_on_that_pos(position) {
    for (let x = 1; x <= 4; x++) {
        let red_pos = (eval('re' + x).current + eval('re' + x).start) % 40;
        (red_pos % 40) ? red_pos: red_pos = 40;
        let green_pos = (eval('gr' + x).current + eval('gr' + x).start) % 40;
        (green_pos % 40) ? green_pos: green_pos = 40;
        let blue_pos = (eval('bl' + x).current + eval('bl' + x).start) % 40;
        (blue_pos % 40) ? blue_pos: blue_pos = 40;
        let yellow_pos = (eval('ye' + x).current + eval('ye' + x).start) % 40;
        (yellow_pos % 40) ? yellow_pos: yellow_pos = 40;
        if (red_pos == position)
            return 're' + x;
        if (green_pos == position)
            return 'gr' + x;
        if (blue_pos == position)
            return 'bl' + x;
        if (yellow_pos == position)
            return 'ye' + x;
    }
    return 'none';
}
///DETECTING OBJECT
function detect_obj(id) {
    var pla = playss.now.toString() + 's';
    for (let x = 1; x < 5; x++) {
        ///check who of red is on that position
        let red_pos = (eval('re' + x).current + eval('re' + x).start) % 40;
        (red_pos % 40) ? red_pos: red_pos = 40;
        let green_pos = (eval('gr' + x).current + eval('gr' + x).start) % 40;
        (green_pos % 40) ? green_pos: green_pos = 40;
        let blue_pos = (eval('bl' + x).current + eval('bl' + x).start) % 40;
        (blue_pos % 40) ? blue_pos: blue_pos = 40;
        let yellow_pos = (eval('ye' + x).current + eval('ye' + x).start) % 40;
        (yellow_pos % 40) ? yellow_pos: yellow_pos = 40;
        ///check out sum
        ///if <0 that means that is field-1...field9(-1...-9)
        if (parseInt(id.slice(-2)) < 0) {
            if (red_pos == id.slice(-1))
                return ("re" + x);
            if (green_pos == id.slice(-1))
                return ("gr" + x);
            if (blue_pos == id.slice(-1))
                return ("bl" + x);
            if (yellow_pos == id.slice(-1))
                return ("ye" + x);
        } else {
            if (red_pos == id.slice(-2))
                return ("re" + x);
            if (green_pos == id.slice(-2))
                return ("gr" + x);
            if (blue_pos == id.slice(-2))
                return ("bl" + x);
            if (yellow_pos == id.slice(-2))
                return ("ye" + x);
        }
    }
}
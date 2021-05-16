//for map
var map_w, map_h, map_multi, map_image;
var map_avg_top = 250;
var map_avg_left = 250;
//for encounter
var en_addMonster, en_addPlayer;
var en_addGroupPlayer = [];

var listMonster = [];
var listEncounter = [];
var listPlayer = [];
var last_focus = "";

var listExp = [];
listExp.push({CR:"0", EXP:"10"});
listExp.push({CR:"1/8", EXP:"25"});
listExp.push({CR:"1/4", EXP:"50"});
listExp.push({CR:"1/2", EXP:"100"});
listExp.push({CR:"1", EXP:"200"});
listExp.push({CR:"2", EXP:"450"});
listExp.push({CR:"3", EXP:"700"});
listExp.push({CR:"4", EXP:"1,100"});
listExp.push({CR:"5", EXP:"1,800"});
listExp.push({CR:"6", EXP:"2,300"});
listExp.push({CR:"7", EXP:"2,900"});
listExp.push({CR:"8", EXP:"3,900"});
listExp.push({CR:"9", EXP:"5,000"});
listExp.push({CR:"10", EXP:"5,900"});
listExp.push({CR:"11", EXP:"7,200"});
listExp.push({CR:"12", EXP:"8,400"});
listExp.push({CR:"13", EXP:"10,000"});
listExp.push({CR:"14", EXP:"11,500"});
listExp.push({CR:"15", EXP:"13,000"});
listExp.push({CR:"16", EXP:"15,000"});
listExp.push({CR:"17", EXP:"18,000"});
listExp.push({CR:"18", EXP:"20,000"});
listExp.push({CR:"19", EXP:"22,000"});
listExp.push({CR:"20", EXP:"25,000"});
listExp.push({CR:"21", EXP:"33,000"});
listExp.push({CR:"22", EXP:"41,000"});
listExp.push({CR:"23", EXP:"50,000"});
listExp.push({CR:"24", EXP:"62,000"});
listExp.push({CR:"30", EXP:"155,000"});

var listType = [];
listType.push({code:"aberration",name:"Aberration"});
listType.push({code:"beast",name:"Beast"});
listType.push({code:"celestial",name:"Celestial"});
listType.push({code:"construct",name:"Construct"});
listType.push({code:"dragon",name:"Dragon"});
listType.push({code:"elemental",name:"Elemental"});
listType.push({code:"fey",name:"Fey"});
listType.push({code:"fiend",name:"Fiend"});
listType.push({code:"giant",name:"Giant"});
listType.push({code:"humanoid",name:"Humanoid"});
listType.push({code:"monstrosity",name:"Monstrosity"});
listType.push({code:"ooze",name:"Ooze"});
listType.push({code:"plant",name:"Plant"});
listType.push({code:"undead",name:"Undead"});

var listSize = [];
listSize.push({code:"Tiny"});
listSize.push({code:"Small"});
listSize.push({code:"Medium"});
listSize.push({code:"Large"});
listSize.push({code:"Huge"});
listSize.push({code:"Gargantuan"});

var listEncounterDifficulty = [];
listEncounterDifficulty.push({level:1, easy:25, medium:50, hard:75, deadly:100});
listEncounterDifficulty.push({level:2, easy:50, medium:100, hard:150, deadly:200});
listEncounterDifficulty.push({level:3, easy:75, medium:150, hard:225, deadly:400});
listEncounterDifficulty.push({level:4, easy:125, medium:250, hard:375, deadly:500});
listEncounterDifficulty.push({level:5, easy:250, medium:500, hard:750, deadly:1100});
listEncounterDifficulty.push({level:6, easy:300, medium:600, hard:900, deadly:1400});
listEncounterDifficulty.push({level:7, easy:350, medium:750, hard:1100, deadly:1700});
listEncounterDifficulty.push({level:8, easy:450, medium:900, hard:1400, deadly:2100});
listEncounterDifficulty.push({level:9, easy:550, medium:1100, hard:1600, deadly:2400});
listEncounterDifficulty.push({level:10, easy:600, medium:1200, hard:1900, deadly:2800});
listEncounterDifficulty.push({level:11, easy:800, medium:1600, hard:2400, deadly:3600});
listEncounterDifficulty.push({level:12, easy:1000, medium:2000, hard:3000, deadly:4500});
listEncounterDifficulty.push({level:13, easy:1100, medium:2200, hard:3400, deadly:5100});
listEncounterDifficulty.push({level:14, easy:1250, medium:2500, hard:3800, deadly:5700});
listEncounterDifficulty.push({level:15, easy:1400, medium:2800, hard:4300, deadly:6400});
listEncounterDifficulty.push({level:16, easy:1600, medium:3200, hard:4800, deadly:7200});
listEncounterDifficulty.push({level:17, easy:2000, medium:3900, hard:5900, deadly:8800});
listEncounterDifficulty.push({level:18, easy:2100, medium:4200, hard:6300, deadly:9500});
listEncounterDifficulty.push({level:19, easy:2400, medium:4900, hard:7300, deadly:10900});
listEncounterDifficulty.push({level:20, easy:2800, medium:5700, hard:8500, deadly:12700});

var listEncounterMultiply = [];
listEncounterMultiply.push({count:1, multiply:1});
listEncounterMultiply.push({count:2, multiply:1.5});
listEncounterMultiply.push({count:3, multiply:2});
listEncounterMultiply.push({count:7, multiply:2.5});
listEncounterMultiply.push({count:11, multiply:3});
listEncounterMultiply.push({count:15, multiply:4});

$('.frameBattleMap').height(getSizeDocument() - $('.menuBar').height());
$('.popupDiv').css({"maxHeight": (getSizeDocument() - $('.menuBar').height() - 30)});

document.getElementById("inImage").addEventListener("change", readFile);
document.getElementById("inMulti").addEventListener("change", inputMulti);

detailClose();
getSummary();

$(document).on("keydown",function(e) {
    if (e.key == "Escape") {
        detailClose();
    }
});

$("#f_mon_type").empty();
$("#f_mon_type").append("<option value=''>All</option>");
$.map(listType, function(el) {
    $("#f_mon_type").append("<option value='" + el.code + "'>" + el.name + "</option>");
});

$("#f_mon_size").empty();
$("#f_mon_size").append("<option value=''>All</option>");
$.map(listSize, function(el) {
    $("#f_mon_size").append("<option value='" + el.code + "'>" + el.code + "</option>");
});

$("#f_mon_min_cr").empty();
$("#f_mon_max_cr").empty();
$("#f_mon_min_cr").append("<option value=''>All</option>");
$("#f_mon_max_cr").append("<option value=''>All</option>");
$.map(listExp, function(el) {
    $("#f_mon_min_cr").append("<option value='" + el.CR + "'>" + el.CR + "</option>");
    $("#f_mon_max_cr").append("<option value='" + el.CR + "'>" + el.CR + "</option>");
});

$("[id^=f_mon_]").on("keypress",function(e) {
    if(e.which == 13) {
        if(!e.shiftKey) {
            filter_monster();
        } else {
            reset_filter();
        }
    }
});

$("[id^=daen_]").on("keypress",function(e) {
    if(e.which == 13) {
        addingEncounter();
    }
});

$("[id^=deen_]").on("keypress",function(e) {
    if(e.which == 13) {
        editingEncounter();
    }
});

$.getJSON("https://zenithxm.github.io/DNDAPI/Monsters/5e-SRD-Monsters.json", function(data) {
    var temp_file_monsters = data;
    listMonster = [];
    $.each(temp_file_monsters, function(idx, el) {    
        var temp = {id: idx, content: el}
        listMonster.push(temp);
    });
    refreshListMonster(listMonster);
})
//var temp_file_monsters = getMonsters();
// listMonster = [];
// $.each(temp_file_monsters, function(idx, el) {    
//     var temp = {id: idx, content: el}
//     listMonster.push(temp);
// });
// refreshListMonster(listMonster);

var temp_file_player = getPlayers();
listPlayer = [];
$.each(temp_file_player, function(idx, el) {    
    var temp = {id: el.id_player, content: el}
    listPlayer.push(temp);
});
listPlayer.sort(SortByName);
refreshListPlayer(listPlayer);

//common
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function SortByPos(a, b){//besar ke kecil
    var aPos = parseInt(a.pos);
    var bPos = parseInt(b.pos);
    return ((aPos < bPos) ? 1 : ((aPos > bPos) ? -1 : 0));
}

function SortByName(a, b){
    var aPos = a.content.name;
    var bPos = b.content.name; 
    return ((aPos < bPos) ? -1 : ((aPos > bPos) ? 1 : 0));
}

function asd(qwe) {
    if(asd != null) {
        alert(qwe);
    }
}

function checkPlayerExist(id) {
    var isExist = false;
    $.map(listEncounter, function(el) {
        (el.idx_mons == id && el.from == "Player" && el.type != "npc" ? isExist = true : null);
    });
    return isExist;
}

function getEXP(CR) {
    var temp_exp = "0";
    $.map(listExp, function(el) {
        if (el.CR == CR)
            temp_exp = el.EXP;
    });
    return temp_exp;
}

function totalEXP(isformat) {
    var result = 0;
    $.map(listEncounter, function(el) {
        result += parseInt(el.exp.replace(",", ""));
    }); 
    return (isformat ? numberWithCommas(result) : result);
}

function totalEXPDead(isformat) {
    var result = 0;
    $.map(listEncounter, function(el) {
        if (el.from == "Monster" && el.hit_points == 0) {
            result += parseInt(el.exp.replace(",", ""));
        }
    }); 
    return (isformat ? numberWithCommas(result) : result);
}

function getMultiply() {
    var sum = 0;
    $.map(listEncounter, function(el) {
        if (el.from == "Monster") {
            sum++;
        }
    });

    var multiply = 1;
    $.map(listEncounterMultiply, function(el) {
        if (el.count <= sum) {
            multiply = el.multiply;
        }
    });
    return parseFloat(multiply);
}

function getSummary() {
    var v_multiply = getMultiply();
    var v_totalEXP = totalEXP(false);
    var v_totalEXPDead = totalEXPDead(false);
    var v_adjEXP = v_multiply * v_totalEXP;

    var list_player_encounter = listEncounter.filter(function(el) {
        return (el.from == "Player");
    });

    var easy = 0;
    var medium = 0;
    var hard = 0;
    var deadly = 0;

    var each_EXP = Math.round(v_totalEXP/list_player_encounter.length * 100) / 100;
    var each_EXPDead = Math.round(v_totalEXPDead/list_player_encounter.length * 100) / 100;
    
    if (list_player_encounter.length == 0) {
        each_EXP = 0;
        each_EXPDead = 0;
    }

    $.map(list_player_encounter, function(el) {
        var data = listEncounterDifficulty.find(function(el2) {
            return (el2.level == el.challenge_rating);
        });
        easy += data.easy;
        medium += data.medium;
        hard += data.hard;
        deadly += data.deadly;
    });

    var difficulty = "";
    if (v_adjEXP >= deadly) difficulty = "Deadly";
    else if (v_adjEXP >= hard) difficulty = "Hard";
    else if (v_adjEXP >= medium) difficulty = "Medium";
    else if (v_adjEXP >= easy) difficulty = "Easy";
    else difficulty = "Trivial";
                
    $('#countEN').text(listEncounter.length + ' ');
    $('#countPC').text(list_player_encounter.length + ' ');
    $('#countMO').text((listEncounter.length - list_player_encounter.length) + ' ');

    $(".summary").empty();
    $(".summary").append(`
        <table>
            <tr>
                <td>Total EXP</td>
                <td>:</td>
                <td> ` + numberWithCommas(v_totalEXP) + ` (@` + numberWithCommas(each_EXP) + `)</td>
            </tr>
            <tr>
                <td>Total EXP Dead</td>
                <td>:</td>
                <td> ` + numberWithCommas(v_totalEXPDead) + ` (@` + numberWithCommas(each_EXPDead) + `)</td>
            </tr>
            <tr>
                <td>Multiply</td>
                <td>:</td>
                <td> ` + v_multiply + `</td>
            </tr>
            <tr>
                <td>Total Adj EXP</td>
                <td>:</td>
                <td> ` + numberWithCommas(v_adjEXP) + `</td>
            </tr>
            <tr>
                <td>Difficulty</td>
                <td>:</td>
                <td> ` + difficulty + `</td>
            </tr>
        </table>
    `);
    // <p class="summary">easy: ` + easy + `</p>
    //     <p class="summary">medium: ` + medium + `</p>
    //     <p class="summary">hard: ` + hard + `</p>
    //     <p class="summary">deadly: ` + deadly + `</p>
}

function cr_check(a, b) {
    if (a.indexOf("/") > -1) {
        a = a.split("/")[0] / a.split("/")[1];
    }
    if (b.indexOf("/") > -1) {
        b = b.split("/")[0] / b.split("/")[1];
    }
    return parseFloat(a) < parseFloat(b);
}

function showList(code) {
    $('.popupDiv').css({"maxHeight": (getSizeDocument() - $('.menuBar').height() - 30)});
    if (code == 1) {
        $('#divEncounter').toggleClass('hide');
        $('#divPlayer').toggleClass('popupDeeper');
        $('#divMonster').toggleClass('popupDeeper');
        $('#divPlayer').addClass('hide');
        $('#divMonster').addClass('hide');
        $('#divSetting').addClass('hide');
        $('#divSummary').addClass('hide');
    } else if (code == 2) {
        //$('#divEncounter').addClass('hide');
        $('#divPlayer').toggleClass('hide');
        $('#divMonster').addClass('hide');
        $('#divSetting').addClass('hide');
        $('#divSummary').addClass('hide');
    } else if (code == 3) {
        //$('#divEncounter').addClass('hide');
        $('#divPlayer').addClass('hide');
        $('#divMonster').toggleClass('hide');
        $('#divSetting').addClass('hide');
        $('#divSummary').addClass('hide');
    } else if (code == 4) {
        $('#divEncounter').addClass('hide');
        $('#divPlayer').addClass('hide');
        $('#divMonster').addClass('hide');
        $('#divSetting').toggleClass('hide');
        $('#divSummary').addClass('hide');
        $('#divPlayer').removeClass('popupDeeper');
        $('#divMonster').removeClass('popupDeeper');
    } else {
        $('#divEncounter').addClass('hide');
        $('#divPlayer').addClass('hide');
        $('#divMonster').addClass('hide');
        $('#divSetting').addClass('hide');
        $('#divSummary').toggleClass('hide');
        $('#divPlayer').removeClass('popupDeeper');
        $('#divMonster').removeClass('popupDeeper');
    }
}

//setting map
function getSizeDocument(code) {
    var myWidth = 0, myHeight = 0;
    // if( typeof( window.innerWidth ) == 'number' ) {
    //     //Non-IE
    //     myWidth = window.innerWidth;
    //     myHeight = window.innerHeight;
    // } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //     //IE 6+ in 'standards compliant mode'
    //     myWidth = document.documentElement.clientWidth;
    //     myHeight = document.documentElement.clientHeight;
    // } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    //}
    //window.alert( 'Width = ' + myWidth + ', Height = ' + myHeight );
    if (code == 'w') {
        return myWidth;
    } else {
        return myHeight;
    }
}

function readFile() {
    if (this.files && this.files[0]) {
        var FR = new FileReader();
        var img = new Image;
        FR.addEventListener("load", function(e) {
            img.src = FR.result;
            img.onload = function() {
                map_w = img.width;
                map_h = img.height;
                map_multi = 1;
                document.documentElement.style.setProperty('--pw', img.width + 'px');
                document.documentElement.style.setProperty('--ph', img.height + 'px');
                document.documentElement.style.setProperty('--multi', '1');
            };
            map_image = e.target.result;
            document.documentElement.style.setProperty('--bgbm', 'url("' + e.target.result + '")');
        }); 
        FR.readAsDataURL(this.files[0]);
    }
}

function inputMulti() {
    map_multi = $('#inMulti').val() / 100;
    document.documentElement.style.setProperty('--multi', map_multi);
}

function updateAveragePos () {
    if (listEncounter.length >= 1) {
        var temp_top = 0;
        var temp_left = 0;
        $.map(listEncounter, function(el) {
            temp_top += parseFloat(el.top);
            temp_left += parseFloat(el.left);
        });
        map_avg_top = temp_top/listEncounter.length;
        map_avg_left = temp_left/listEncounter.length;

        map_avg_top -= (map_avg_top % 25);
        map_avg_left -= (map_avg_left % 25);
    } else {
        map_avg_top = 250;
        map_avg_left = 250;
    }
}

//encounter
$("#dialogAddEN").dialog({
    autoOpen: false,
    autoResize: true,
    modal: true,
    position: { my: 'top', at: 'top+50' },
    buttons: {
        "Add": addingEncounter,
        Cancel: function() {
            resetDialogBox();
            $("#dialogAddEN").dialog("close");
        }
    },
    close: function() {
    }
});

$("#dialogAddGroupEN").dialog({
    autoOpen: false,
    autoResize: true,
    modal: true,
    position: { my: 'top', at: 'top+50' },
    buttons: {
        "Add": addingGroupEncounter,
        Cancel: function() {
            resetDialogBox();
            $("#dialogAddGroupEN").dialog("close");
        }
    },
    close: function() {
    }
});

$("#dialogEditEN").dialog({
    autoOpen: false,
    autoResize: true,
    modal: true,
    position: { my: 'top', at: 'top+50' },
    buttons: {
        "Save": editingEncounter,
        "Delete": removeEncounter,
        Cancel: function() {
            resetDialogBox();
            $("#dialogEditEN").dialog("close");
        }
    },
    close: function() {
    }
});

function moveAllMinis () {
    var temp_top = parseFloat($('#set_top').val());
    var temp_left = parseFloat($('#set_left').val());
    $.map(listEncounter, function(el) {
        el.top += temp_top * 5;
        el.left += temp_left * 5;
    });

    listEncounter.sort(SortByPos);
    createListEncounter();
}

function focusEncounter(id) {
    $("#M" + id).attr("tabindex",-1).focus();

    // precise auto
    // $('#frame_battle').animate({
    //     scrollTop: $('#M' + id).css('top').replace('px','') - mod_battle_height + ($('#M' + id).height() / 2),
    //     scrollLeft: $('#M' + id).css('top').replace('px','') - mod_battle_width + ($('#M' + id).width() / 2)
    // }, 'fast');
    
    (last_focus != "" ? $("#M" + last_focus).removeClass("minis_highlight") : null);
    $("#M" + id).addClass("minis_highlight");
    last_focus = id;
}

function resetDialogBox () {
    $('#deen_id').text('');
    $('#deen_type').text('');
    $('#deen_initial').val(0);
    $('#deen_curhp').val(0);
    $('#deen_maxhp').val(0);
    $('#deen_heal').val(0);
    $('#deen_damage').val(0);
    $('#deen_ac').val(0);
    
    $('#daen_id').text('');
    $('#daen_type').text('');
    $('#daen_initial').val(0);
    $('#daen_maxhp').val(0);
}

function editEncounter (id) {
    var temp_en;
    $.map(listEncounter, function(el) {
        (el.id == id ? temp_en = el : null);
    });
    $('#deen_id').text(id);
    $('#deen_type').text(temp_en.from);
    $('#deen_initial').val(temp_en.pos);
    $('#deen_curhp').val(temp_en.hit_points);
    $('#deen_maxhp').val(temp_en.max_hit_points);
    $('#deen_heal').val(0);
    $('#deen_damage').val(0);
    $('#deen_ac').val(temp_en.armor_class);
    $('#deen_info').text('Editing ' + temp_en.name);

    $("#dialogEditEN").data('id', id).dialog('open');
}

function editingEncounter () {
    id = $("#dialogEditEN").data('id');
    var temp_en;
    $.map(listEncounter, function(el) {
        (el.id == id ? temp_en = el : null);
    });

    temp_en.pos = parseFloat($('#deen_initial').val());
    temp_en.hit_points = parseInt($('#deen_curhp').val()) + parseInt($('#deen_heal').val()) - parseInt($('#deen_damage').val());
    temp_en.max_hit_points = parseInt($('#deen_maxhp').val());
    temp_en.armor_class = $('#deen_ac').val();
    temp_en.hit_points = (temp_en.hit_points < 0 ? 0 : temp_en.hit_points);
    temp_en.hit_points = (temp_en.hit_points > temp_en.max_hit_points ? temp_en.max_hit_points : temp_en.hit_points);

    listEncounter.sort(SortByPos);
    createListEncounter();
    resetDialogBox();
    $("#dialogEditEN").dialog("close");
}

function addEncounter (id, type) {
    if (type == 'Monster') {
        $.map(listMonster, function(el) {
            (el.id == id ? en_addMonster = el : null);
        });
        $('#daen_maxhp').val(en_addMonster.content.hit_points);
        $('#daen_info').text('Adding ' + en_addMonster.content.name);
    } else {
        $.map(listPlayer, function(el) {
            (el.id == id ? en_addPlayer = el : null);
        });

        if(checkPlayerExist(en_addPlayer.id)) return;

        if (en_addPlayer.content.class == "group") {
            en_addGroupPlayer = [];
            addNewEncounterPlayer(0, 0);
            return;
        }
        $('#daen_maxhp').val(en_addPlayer.content.hit_points);
        $('#daen_info').text('Adding ' + en_addPlayer.content.name);
    }
    $('#daen_id').val(id);
    $('#daen_type').val(type);

    $("#dialogAddEN").dialog("open");
}

function addGroupEncounter () {
    var temp_group = en_addGroupPlayer;
    var temp_group_content = [];
    
    $.map(temp_group, function(el) {
        $.map(listPlayer, function(pl) {
            (pl.id == el ? temp_group_content.push(pl) : null);
        });
    });

    $('#daen_group_form').empty();
    $('#daen_group_form').append(`<table>`);
    $.map(temp_group_content, function(el) {
        $('#daen_group_form').append(`
            <tr>
                <td colspane="2"><h3>` + el.content.name + `</h3></td>
            </tr>
            <tr>
                <td><label>Initiative</label></td>
                <td><label>Max HP</label></td>
            </tr>
            <tr>
                <td><input id="dagen_initial_` + el.id + `" type="number" value="0" /></td>           
                <td><input id="dagen_maxhp_` + el.id + `" type="number" value="` + el.content.hit_points + `"/></td>
            </tr>
        `);
    });
    $('#daen_group_form').append(`</table>`);

    $("[id^=dagen_]").on("keypress",function(e) {
        if(e.which == 13) {
            addingGroupEncounter();
        }
    });

    en_addGroupPlayer = [];
    en_addGroupPlayer = temp_group_content;

    $("#dialogAddGroupEN").dialog("open");
}

function addingEncounter () {
    var type = $('#daen_type').val();
    var id = $('#daen_id').val();
    var maxHP = $('#daen_maxhp').val();
    var initial = parseFloat($('#daen_initial').val());
    //alert(type + " " + maxHP + " " + id);
    if (type == 'Monster') {
        addNewEncounterMonster(initial, maxHP);
    } else {
        addNewEncounterPlayer(initial, maxHP);
    }
    
    resetDialogBox();
    $("#dialogAddEN").dialog("close");
}

function removeEncounter(id) {
    id = $("#dialogEditEN").data('id');
    var temp_en = null;
    $.map(listEncounter, function(el) {
        (el.id == id ? temp_en = el : null);
    });
    listEncounter.splice(listEncounter.indexOf(temp_en), 1);
    listEncounter.sort(SortByPos);
    createListEncounter();
    
    resetDialogBox();
    $("#dialogEditEN").dialog("close");
}

function addingGroupEncounter () {
    $.map(en_addGroupPlayer, function(el) {
        var maxHP = $('#dagen_maxhp_' + el.id).val();
        var initial = parseFloat($('#dagen_initial_' + el.id).val());
        en_addPlayer = el;
        addNewEncounterPlayer(initial, maxHP);
    });

    resetDialogBox();
    $("#dialogAddGroupEN").dialog("close");
}

function addNewEncounterMonster (initial, maxHP) {
    var temp_monster = en_addMonster;
    updateAveragePos();

    var id = new Date().getTime();
    var pos = 0;//listEncounter.length;
    var temp_en = {from:"Monster", id: id, pos: initial, idx_mons: temp_monster.id, 
        type: temp_monster.content.type, 
        name: temp_monster.content.name,
        armor_class: temp_monster.content.armor_class, 
        hit_points: maxHP, 
        max_hit_points: maxHP, 
        speed: temp_monster.content.speed, 
        challenge_rating: temp_monster.content.challenge_rating,
        size: temp_monster.content.size,
        exp: getEXP(temp_monster.content.challenge_rating), 
        top: map_avg_top, left: map_avg_left}

    listEncounter.push(temp_en);
    listEncounter.sort(SortByPos);
    createListEncounter();
}

function addNewEncounterPlayer (initial, maxHP) { 
    var temp_player = en_addPlayer;
    updateAveragePos();

    if(temp_player.content.class == "group") {
        $.map(temp_player.content.member, function(el2) {
            if(!checkPlayerExist(el2.id)) {
                en_addGroupPlayer.push(el2.id);
            }
        });
        addGroupEncounter();
    } else {
        if(checkPlayerExist(temp_player.id)) return;

        var id = new Date().getTime();
        var pos = 0;//listEncounter.length;
        var temp_en = {from:"Player", id: id, pos: initial, idx_mons: temp_player.id, 
            type: temp_player.content.class, 
            name: temp_player.content.name,
            armor_class: temp_player.content.armor_class, 
            hit_points: maxHP, 
            max_hit_points: maxHP, 
            speed: temp_player.content.speed, 
            challenge_rating: temp_player.content.level,
            size: temp_player.content.size,
            exp: "0", 
            top: map_avg_top, left: map_avg_left}

        listEncounter.push(temp_en);
        listEncounter.sort(SortByPos);
        createListEncounter();
    }
}

function createListEncounter () {
    $('#listEncounter').empty();
    $('.battleMap').empty();
    getSummary();            

    var touch = "";
    $.support.touch = 'ontouchend' in document;
    if ($.support.touch) touch = "";

    $.each(listEncounter, function(idx, temp_en) {
        var classLI = `EC ` + temp_en.type.split(" ").join("_") + (temp_en.hit_points <= 0 ? ` dead` : ``) + touch;

        $('#listEncounter').append(`
            <li id="` + temp_en.id + `" class="` + classLI + `">        
                <div class="li_ECico c_btn" onclick="showDetail` + temp_en.from + `(` + temp_en.idx_mons + `)">` + (temp_en.pos) + `</div>
                <div class="li_ECcontent" onclick="focusEncounter(` + temp_en.id + `)">
                    <table>
                        <tr class="c_name">
                            <td colspan="15">` + temp_en.name + `</td>
                            <td colspan="4" style="text-align: right"><span class="c_btn" onclick="editEncounter(` + temp_en.id + `)">` + temp_en.hit_points + `<span class="c_detail">/` + temp_en.max_hit_points + `</span></span></td>
                        </tr>  
                        <tr class="c_detail">
                            <td colspan="19">
                                <i class="demo-icon icon-shield"></i> ` + temp_en.armor_class + ` 
                                <i class="demo-icon icon-gauge"></i> ` + temp_en.speed + `
                            </td>
                        </tr>                                    
                        <tr class="c_detail">
                            <td colspan="19">
                                <div class="c_baseHP">
                                    <div class="c_curHP" style="width: ` + (temp_en.hit_points / temp_en.max_hit_points * 100) + `%"></div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </li>
        `);

        $('.battleMap').append(`
            <div id="M` + temp_en.id + `" class="minis minis_` + temp_en.size + ` ` + temp_en.type.split(" ").join("_") + (temp_en.hit_points <= 0 ? ` Mdead` : ``) + `">
                <div class="minis_ico">` + (temp_en.pos) + `</div>
            </div>
        `);

        $('#M' + temp_en.id).draggable({ 
            grid: [ 5, 5 ], 
            containment: "parent",
            stop: function(){
                var temp_drag_en = listEncounter.find(function(el){
                    return (el.id == temp_en.id)
                });

                var v_top = $(this).css('top').replace("px", "");
                v_top = v_top - (v_top % 25);
                v_top = (v_top < 0 ? 0 : v_top);
                var v_left = $(this).css('left').replace("px", "");
                v_left = v_left - (v_left % 25);
                v_left = (v_left < 0 ? 0 : v_left);
                
                temp_drag_en.top = v_top;
                temp_drag_en.left = v_left;
            }
        });

        $('#M' + temp_en.id).css('position', 'absolute').css('top', temp_en.top).css('left', temp_en.left);
    });
}

//filter monster
function show_filter() {
    $("#detail").show();
    $("#filters").show();
}

function reset_filter() {
    refreshListMonster(listMonster);
    $("#f_mon_name").val("");
    $("#f_mon_type").val("");
    $("#f_mon_size").val("");
    $("#f_mon_min_cr").val("");
    $("#f_mon_max_cr").val("");
}

function filter_monster() {
    var temp_mon_name = $("#f_mon_name").val();
    var temp_mon_type = $("#f_mon_type").val();
    var temp_mon_size = $("#f_mon_size").val();
    var temp_mon_min_cr = $("#f_mon_min_cr").val();
    var temp_mon_max_cr = $("#f_mon_max_cr").val();
    var temp_list_monster = [];
    temp_list_monster = listMonster.filter(function(el){
        if (temp_mon_name != "" && el.content.name.toLowerCase().indexOf(temp_mon_name.toLowerCase()) < 0) {
            return false;
        }
        if (temp_mon_type != "" && el.content.type.toLowerCase() != temp_mon_type.toLowerCase()) {
            return false;
        }
        if (temp_mon_size != "" && el.content.size.toLowerCase() != temp_mon_size.toLowerCase()) {
            return false;
        }
        if (temp_mon_min_cr != "" && cr_check(el.content.challenge_rating, temp_mon_min_cr)) {
            return false;
        }                
        if (temp_mon_max_cr != "" && cr_check(temp_mon_max_cr, el.content.challenge_rating)) {
            return false;
        }
        return true;
    });

    refreshListMonster(temp_list_monster);
}

//monster
function refreshListMonster (list) {
    $('#listMonster').empty();

    var drag = "";
    $.support.touch = 'ontouchend' in document;
    if (!$.support.touch) drag = "";

    $.each(list, function(id, data) {     
        var el = data.content;
        var idx = data.id; 

        $("#listMonster").append(`<li 
            id="` + idx + `" 
            class="` + drag + ` MC ` + el.type.split(" ").join("_") + `">
                <div class="li_MCico c_btn" onclick="showDetailMonster(` + idx + `)"></div>
                <div class="li_MCcontent" onclick="addEncounter(` + idx + `,'Monster')">
                    ` + el.name + `
                </div>
            </li>`);
    });
}

//player
function refreshListPlayer (list) {
    $('#listPlayer').empty();

    var drag = "";
    $.support.touch = 'ontouchend' in document;
    if (!$.support.touch) drag = "";

    $.each(list, function(id, data) {     
        var el = data.content;
        var idx = data.id;

        $("#listPlayer").append(`<li 
            id="` + idx + `" 
            class="` + drag + ` MC ` + el.class.split(" ").join("_") + `">
                <div class="li_MCico c_btn" onclick="showDetailPlayer(` + idx + `)"></div>
                <div class="li_MCcontent" onclick="addEncounter(` + idx + `,'Player')">
                    ` + el.name + `
                </div>
            </li>`);
    });
}

//open detail
function detailClose() {
    $("#detail_content").empty();
    $("#detail").hide();
    $("#filters").hide();
}

function showDetailPlayer(id) {           
    $("#detail_content").empty();

    var temp_player;
    $.map(listPlayer, function(el) {
        (el.id == id ? temp_player = el : null);
    });
    var content = temp_player.content;
    var tidbit = ""

    if (content.damage_vulnerabilities != "" && content.damage_vulnerabilities != "undefined") {
        var temp = '<div class="mon-stat-block__tidbit"><span class="mon-stat-block__tidbit-label">Damage Vulnerabilities</span>'
            + ' <span class="mon-stat-block__tidbit-data">' + content.damage_vulnerabilities + '</span></div>';
        tidbit += temp;
    }
    if (content.damage_resistances != "" && content.damage_resistances != "undefined") {
        var temp = '<div class="mon-stat-block__tidbit"><span class="mon-stat-block__tidbit-label">Damage Resistances</span>'
            + ' <span class="mon-stat-block__tidbit-data">' + content.damage_resistances + '</span></div>';
        tidbit += temp;
    }
    if (content.damage_immunities != "" && content.damage_immunities != "undefined") {
        var temp = '<div class="mon-stat-block__tidbit"><span class="mon-stat-block__tidbit-label">Damage Immunities</span>'
            + ' <span class="mon-stat-block__tidbit-data">' + content.damage_immunities + '</span></div>';
        tidbit += temp;
    }
    if (content.condition_immunities != "" && content.condition_immunities != "undefined") {
        var temp = '<div class="mon-stat-block__tidbit"><span class="mon-stat-block__tidbit-label">Condition Immunities</span>'
            + ' <span class="mon-stat-block__tidbit-data">' + content.condition_immunities + '</span></div>';
        tidbit += temp;
    }
    
    $("#detail_content").append(`<div class="mon-stat-block">
        <div class="mon-stat-block__separator player_card">
            <img class="mon-stat-block__separator-img player_card_img" alt="" src="./resources/images/ico/player/` + content.class + `_bg.png">
            <div class="mon-stat-block__header player_card_name">
                <div class="mon-stat-block__name">
                    ` + content.name + `
                </div>
                <div class="mon-stat-block__meta">` + content.size + ` ` + content.race + ` ` + content.class + `, ` + content.alignment + `</div>
            </div>
        </div>

        <div class="mon-stat-block__separator">
            <img class="mon-stat-block__separator-img" alt="" src="./resources/images/svg/stat-block-header-bar.svg">
        </div>

        <div class="mon-stat-block__attributes">
            <div class="mon-stat-block__attribute">
                <span class="mon-stat-block__attribute-label">Armor Class</span>
                <span class="mon-stat-block__attribute-value">
                    <span class="mon-stat-block__attribute-data-value">
                        ` + content.armor_class + `
                    </span>
                
                    <span class="mon-stat-block__attribute-data-extra">
                        
                    </span> 
                            
                </span>
            </div>
            <div class="mon-stat-block__attribute">
                <span class="mon-stat-block__attribute-label">Hit Points</span>
                <span class="mon-stat-block__attribute-data">
                    <span class="mon-stat-block__attribute-data-value">
                        ` + content.hit_points + `
                    </span>
                    <span class="mon-stat-block__attribute-data-extra">
                        (` + content.hit_dice + `)
                    </span>      
                </span>
            </div>
            <div class="mon-stat-block__attribute">
                <span class="mon-stat-block__attribute-label">Speed</span>
                <span class="mon-stat-block__attribute-data">
                    <span class="mon-stat-block__attribute-data-value">
                            ` + content.speed + `
                    </span>
                </span>
            </div>
            <div class="mon-stat-block__attribute">
                <span class="mon-stat-block__attribute-label">Level</span>
                <span class="mon-stat-block__attribute-data">
                    <span class="mon-stat-block__attribute-data-value">
                            ` + content.level + `
                    </span>
                </span>
            </div>
        </div>
        
        <div class="mon-stat-block__stat-block">
            <div class="mon-stat-block__separator">
                <img class="mon-stat-block__separator-img" alt="" src="./resources/images/svg/stat-block-header-bar.svg">
            </div>
            
            <div class="ability-block">
                <div class="ability-block__stat ability-block__stat--str">
                    <div class="ability-block__heading">STR</div>
                    <div class="ability-block__data">
                        <span class="ability-block__score">` + content.strength + `</span>
                        <span class="ability-block__modifier">(` + (content.strength >= 10 ? `+` : `` ) + Math.floor((content.strength - 10) / 2) + `)</span>
                    </div>
                </div>
                <div class="ability-block__stat ability-block__stat--dex">
                    <div class="ability-block__heading">DEX</div>
                    <div class="ability-block__data">
                        <span class="ability-block__score">` + content.dexterity + `</span>
                        <span class="ability-block__modifier">(` + (content.dexterity >= 10 ? `+` : `` ) + Math.floor((content.dexterity - 10) / 2) + `)</span>
                    </div>
                </div>
                <div class="ability-block__stat ability-block__stat--con">
                    <div class="ability-block__heading">CON</div>
                    <div class="ability-block__data">
                        <span class="ability-block__score">` + content.constitution + `</span>
                        <span class="ability-block__modifier">(` + (content.constitution >= 10 ? `+` : `` ) + Math.floor((content.constitution - 10) / 2) + `)</span>
                    </div>
                </div>
                <div class="ability-block__stat ability-block__stat--int">
                    <div class="ability-block__heading">INT</div>
                    <div class="ability-block__data">
                        <span class="ability-block__score">` + content.intelligence + `</span>
                        <span class="ability-block__modifier">(` + (content.intelligence >= 10 ? `+` : `` ) + Math.floor((content.intelligence - 10) / 2) + `)</span>
                    </div>
                </div>
                <div class="ability-block__stat ability-block__stat--wis">
                    <div class="ability-block__heading">WIS</div>
                    <div class="ability-block__data">
                        <span class="ability-block__score">` + content.wisdom + `</span>
                        <span class="ability-block__modifier">(` + (content.wisdom >= 10 ? `+` : `` ) + Math.floor((content.wisdom - 10) / 2) + `)</span>
                    </div>
                </div>
                <div class="ability-block__stat ability-block__stat--cha">
                    <div class="ability-block__heading">CHA</div>
                    <div class="ability-block__data">
                        <span class="ability-block__score">` + content.charisma + `</span>
                        <span class="ability-block__modifier">(` + (content.charisma >= 10 ? `+` : `` ) + Math.floor((content.charisma - 10) / 2) + `)</span>
                    </div>
                </div>
            </div>
            
            <div class="mon-stat-block__separator">
                <img class="mon-stat-block__separator-img" alt="" src="./resources/images/svg/stat-block-header-bar.svg">
            </div>

            <div class="mon-stat-block__tidbits">        
                ` + tidbit + `
            
                <div class="mon-stat-block__tidbit">
                    <span class="mon-stat-block__tidbit-label">Senses</span>
                    <span class="mon-stat-block__tidbit-data">
                        ` + content.senses + `
                    </span>
                </div>
            
                <div class="mon-stat-block__tidbit">
                    <span class="mon-stat-block__tidbit-label">Languages</span>
                    <span class="mon-stat-block__tidbit-data">
                        ` + content.languages + `
                    </span>
                </div>
            </div>
            
            <div class="mon-stat-block__separator">
                <img class="mon-stat-block__separator-img" alt="" src="./resources/images/svg/stat-block-header-bar.svg">
            </div>
        </div>
    </div>`);

    $("#detail").show();
}

function showDetailMonster(id) {               
    $("#detail_content").empty();

    var temp_monster;
    $.map(listMonster, function(el) {
        (el.id == id ? temp_monster = el : null);
    });
    var content = temp_monster.content;
    var tidbit = ""

    var temp_save_throw = [];
    if (content.strenght_save != null && content.strenght_save != "undefined") {
        temp_save_throw.push("STR +" + content.strenght_save);
    }
    if (content.dexterity_save != null && content.dexterity_save != "undefined") {
        temp_save_throw.push("DEX +" + content.dexterity_save);
    }
    if (content.constitution_save != null && content.constitution_save != "undefined") {
        temp_save_throw.push("CON +" + content.constitution_save);
    }
    if (content.intelligence_save != null && content.intelligence_save != "undefined") {
        temp_save_throw.push("INT +" + content.intelligence_save);
    }
    if (content.wisdom_save != null && content.wisdom_save != "undefined") {
        temp_save_throw.push("WIS +" + content.wisdom_save);
    }
    if (content.charisma_save != null && content.charisma_save != "undefined") {
        temp_save_throw.push("CHA +" + content.charisma_save);
    }
    var save_throw = temp_save_throw.join(", ");
    if (save_throw.split(" ").join("") != "") {
        save_throw = '<div class="mon-stat-block__tidbit"><span class="mon-stat-block__tidbit-label">Saving Throws</span>'
            + ' <span class="mon-stat-block__tidbit-data">' + save_throw + '</span></div>';
    }

    var temp_skills = [];
    if (content.athletics != null && content.athletics != "undefined") {
        temp_skills.push("Athletics +" + content.athletics);
    }
    if (content.acrobatics != null && content.acrobatics != "undefined") {
        temp_skills.push("Acrobatics +" + content.acrobatics);
    }
    if (content.sleight_of_hand != null && content.sleight_of_hand != "undefined") {
        temp_skills.push("Sleight of Hand +" + content.sleight_of_hand);
    }
    if (content.stealth != null && content.stealth != "undefined") {
        temp_skills.push("Stealth +" + content.stealth);
    }
    if (content.arcana != null && content.arcana != "undefined") {
        temp_skills.push("Arcana +" + content.arcana);
    }
    if (content.history != null && content.history != "undefined") {
        temp_skills.push("History +" + content.history);
    }
    if (content.investigation != null && content.investigation != "undefined") {
        temp_skills.push("Investigation +" + content.investigation);
    }
    if (content.nature != null && content.nature != "undefined") {
        temp_skills.push("Nature +" + content.nature);
    }
    if (content.religion != null && content.religion != "undefined") {
        temp_skills.push("Religion +" + content.religion);
    }
    if (content.animal_handling != null && content.animal_handling != "undefined") {
        temp_skills.push("Animal Handling +" + content.animal_handling);
    }
    if (content.insight != null && content.insight != "undefined") {
        temp_skills.push("Insight +" + content.insight);
    }
    if (content.medicine != null && content.medicine != "undefined") {
        temp_skills.push("Medicine +" + content.medicine);
    }
    if (content.perception != null && content.perception != "undefined") {
        temp_skills.push("Perception +" + content.perception);
    }
    if (content.survival != null && content.survival != "undefined") {
        temp_skills.push("Survival +" + content.survival);
    }
    if (content.deception != null && content.deception != "undefined") {
        temp_skills.push("Deception +" + content.deception);
    }
    if (content.intimidation != null && content.intimidation != "undefined") {
        temp_skills.push("Intimidation +" + content.intimidation);
    }
    if (content.performance != null && content.performance != "undefined") {
        temp_skills.push("Performance +" + content.performance);
    }
    if (content.persuasion != null && content.persuasion != "undefined") {
        temp_skills.push("Persuasion +" + content.persuasion);
    }
    var skills = temp_skills.join(", ");
    if (skills.split(" ").join("") != "") {
        skills = '<div class="mon-stat-block__tidbit"><span class="mon-stat-block__tidbit-label">Skills</span>'
            + ' <span class="mon-stat-block__tidbit-data">' + skills + '</span></div>';
    }
    
    tidbit = save_throw + skills;
    if (content.damage_vulnerabilities != "" && content.damage_vulnerabilities != "undefined") {
        var temp = '<div class="mon-stat-block__tidbit"><span class="mon-stat-block__tidbit-label">Damage Vulnerabilities</span>'
            + ' <span class="mon-stat-block__tidbit-data">' + content.damage_vulnerabilities + '</span></div>';
        tidbit += temp;
    }
    if (content.damage_resistances != "" && content.damage_resistances != "undefined") {
        var temp = '<div class="mon-stat-block__tidbit"><span class="mon-stat-block__tidbit-label">Damage Resistances</span>'
            + ' <span class="mon-stat-block__tidbit-data">' + content.damage_resistances + '</span></div>';
        tidbit += temp;
    }
    if (content.damage_immunities != "" && content.damage_immunities != "undefined") {
        var temp = '<div class="mon-stat-block__tidbit"><span class="mon-stat-block__tidbit-label">Damage Immunities</span>'
            + ' <span class="mon-stat-block__tidbit-data">' + content.damage_immunities + '</span></div>';
        tidbit += temp;
    }
    if (content.condition_immunities != "" && content.condition_immunities != "undefined") {
        var temp = '<div class="mon-stat-block__tidbit"><span class="mon-stat-block__tidbit-label">Condition Immunities</span>'
            + ' <span class="mon-stat-block__tidbit-data">' + content.condition_immunities + '</span></div>';
        tidbit += temp;
    }

    var special_ability = "";
    if (content.special_abilities != null && content.special_abilities != "undefined") {
        special_ability = ` <div class="mon-stat-block__description-block"> 
                                <div class="mon-stat-block__description-block-content">`;
        $.map(content.special_abilities, function(el) {
            special_ability += `<p><em><strong>` + el.name + `.</strong></em> ` + el.desc + `</p>`
        });
        special_ability += `    </div>
                            </div>`;
    } else {
        special_ability = "";
    }

    var actions = "";
    if (content.actions != null && content.actions != "undefined") {
        actions = ` <div class="mon-stat-block__description-block"> 
                        <div class="mon-stat-block__description-block-heading">Actions</div>
                        <div class="mon-stat-block__description-block-content">`;
        $.map(content.actions, function(el) {
            actions += `<p><em><strong>` + el.name + `.</strong></em> ` + el.desc + `</p>`
        });
        actions += `    </div>
                    </div>`;
    } else {
        actions = "";
    }

    var reactions = "";
    if (content.reactions != null && content.reactions != "undefined") {
        reactions = ` <div class="mon-stat-block__description-block"> 
                        <div class="mon-stat-block__description-block-heading">Reactions</div>
                        <div class="mon-stat-block__description-block-content">`;
        $.map(content.reactions, function(el) {
            reactions += `<p><em><strong>` + el.name + `.</strong></em> ` + el.desc + `</p>`
        });
        reactions += `    </div>
                    </div>`;
    } else {
        reactions = "";
    }

    var legendary_actions = "";
    if (content.legendary_actions != null && content.legendary_actions != "undefined") {
        legendary_actions = `   <div class="mon-stat-block__description-block"> 
                                    <div class="mon-stat-block__description-block-heading">Legendary Actions</div>
                                    <div class="mon-stat-block__description-block-content">`;
        $.map(content.legendary_actions, function(el) {
            legendary_actions += `<p><em><strong>` + el.name + `.</strong></em> ` + el.desc + `</p>`
        });
        legendary_actions += `      </div>
                                </div>`;
    } else {
        legendary_actions = "";
    }

    var temp_exp = "0";
    temp_exp = getEXP(content.challenge_rating);
    
    $("#detail_content").append(`<div class="mon-stat-block">
        <div class="mon-stat-block__header">
            <div class="mon-stat-block__name">
                ` + content.name + `
            </div>
            <div class="mon-stat-block__meta">` + content.size + ` ` + content.type + `, ` + content.alignment + `</div>
        </div>

        <div class="mon-stat-block__separator">
            <img class="mon-stat-block__separator-img" alt="" src="./resources/images/svg/stat-block-header-bar.svg">
        </div>

        <div class="mon-stat-block__attributes">
            <div class="mon-stat-block__attribute">
                <span class="mon-stat-block__attribute-label">Armor Class</span>
                <span class="mon-stat-block__attribute-value">
                    <span class="mon-stat-block__attribute-data-value">
                        ` + content.armor_class + `
                    </span>
                
                    <span class="mon-stat-block__attribute-data-extra">
                        
                    </span> 
                            
                </span>
            </div>
            <div class="mon-stat-block__attribute">
                <span class="mon-stat-block__attribute-label">Hit Points</span>
                <span class="mon-stat-block__attribute-data">
                    <span class="mon-stat-block__attribute-data-value">
                        ` + content.hit_points + `
                    </span>
                    <span class="mon-stat-block__attribute-data-extra">
                        (` + content.hit_dice + `)
                    </span>      
                </span>
            </div>
            <div class="mon-stat-block__attribute">
                <span class="mon-stat-block__attribute-label">Speed</span>
                <span class="mon-stat-block__attribute-data">
                    <span class="mon-stat-block__attribute-data-value">
                            ` + content.speed + `
                    </span>
                </span>
            </div>
        </div>
        
        <div class="mon-stat-block__stat-block">
            <div class="mon-stat-block__separator">
                <img class="mon-stat-block__separator-img" alt="" src="./resources/images/svg/stat-block-header-bar.svg">
            </div>
            
            <div class="ability-block">
                <div class="ability-block__stat ability-block__stat--str">
                    <div class="ability-block__heading">STR</div>
                    <div class="ability-block__data">
                        <span class="ability-block__score">` + content.strength + `</span>
                        <span class="ability-block__modifier">(` + (content.strength >= 10 ? `+` : `` ) + Math.floor((content.strength - 10) / 2) + `)</span>
                    </div>
                </div>
                <div class="ability-block__stat ability-block__stat--dex">
                    <div class="ability-block__heading">DEX</div>
                    <div class="ability-block__data">
                        <span class="ability-block__score">` + content.dexterity + `</span>
                        <span class="ability-block__modifier">(` + (content.dexterity >= 10 ? `+` : `` ) + Math.floor((content.dexterity - 10) / 2) + `)</span>
                    </div>
                </div>
                <div class="ability-block__stat ability-block__stat--con">
                    <div class="ability-block__heading">CON</div>
                    <div class="ability-block__data">
                        <span class="ability-block__score">` + content.constitution + `</span>
                        <span class="ability-block__modifier">(` + (content.constitution >= 10 ? `+` : `` ) + Math.floor((content.constitution - 10) / 2) + `)</span>
                    </div>
                </div>
                <div class="ability-block__stat ability-block__stat--int">
                    <div class="ability-block__heading">INT</div>
                    <div class="ability-block__data">
                        <span class="ability-block__score">` + content.intelligence + `</span>
                        <span class="ability-block__modifier">(` + (content.intelligence >= 10 ? `+` : `` ) + Math.floor((content.intelligence - 10) / 2) + `)</span>
                    </div>
                </div>
                <div class="ability-block__stat ability-block__stat--wis">
                    <div class="ability-block__heading">WIS</div>
                    <div class="ability-block__data">
                        <span class="ability-block__score">` + content.wisdom + `</span>
                        <span class="ability-block__modifier">(` + (content.wisdom >= 10 ? `+` : `` ) + Math.floor((content.wisdom - 10) / 2) + `)</span>
                    </div>
                </div>
                <div class="ability-block__stat ability-block__stat--cha">
                    <div class="ability-block__heading">CHA</div>
                    <div class="ability-block__data">
                        <span class="ability-block__score">` + content.charisma + `</span>
                        <span class="ability-block__modifier">(` + (content.charisma >= 10 ? `+` : `` ) + Math.floor((content.charisma - 10) / 2) + `)</span>
                    </div>
                </div>
            </div>
            
            <div class="mon-stat-block__separator">
                <img class="mon-stat-block__separator-img" alt="" src="./resources/images/svg/stat-block-header-bar.svg">
            </div>
        </div>

        <div class="mon-stat-block__tidbits">        
            ` + tidbit + `
        
            <div class="mon-stat-block__tidbit">
                <span class="mon-stat-block__tidbit-label">Senses</span>
                <span class="mon-stat-block__tidbit-data">
                    ` + content.senses + `
                </span>
            </div>
        
            <div class="mon-stat-block__tidbit">
                <span class="mon-stat-block__tidbit-label">Languages</span>
                <span class="mon-stat-block__tidbit-data">
                    ` + content.languages + `
                </span>
            </div>
            
            <div class="mon-stat-block__tidbit">
                <span class="mon-stat-block__tidbit-label">Challenge</span>
                <span class="mon-stat-block__tidbit-data">
                    ` + content.challenge_rating + ` (` + temp_exp + ` XP)
                </span>
            </div>
        </div>
        
        <div class="mon-stat-block__separator">
            <img class="mon-stat-block__separator-img" alt="" src="./resources/images/svg/stat-block-header-bar.svg">
        </div>

        <div class="mon-stat-block__description-blocks">
            ` + special_ability + `
            ` + actions + `
            ` + reactions + `
            ` + legendary_actions + `                                     
        </div>
    </div>`);

    $("#detail").show();
}

//document.documentElement.style.setProperty('--w', '100px');
//document.documentElement.style.setProperty('--bgbm', 'url("grid8x8.png")');
//getComputedStyle(document.documentElement).getPropertyValue('--w');
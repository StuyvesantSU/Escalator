var url = "test.py";
var data, c, ctx, gt, gb, bt, bb;

function get() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
	data = req.responseText;
	data = data.substring(1, data.length - 1);
	update();
    }
    req.open('GET', url, true);
    req.send(null);
}

function update() {
    if (data == '') return;

    var status = data.split('');
    for (var i = 0; i < status.length; i++) { 
	if (status[i] == '1' && i % 2 == 0) drawEsc(i/2 + 1, true, gb);
	else if (status[i] == '0' && i % 2 == 0) drawEsc(i/2 + 1, true, bb);
	else if (status[i] == '1' && i % 2 == 1) drawEsc(i/2 + 1, false, gt);
	else drawEsc(i/2 + 1, false, bt);
    }
}

function drawEsc(num, bot, img) {
    num = Math.floor(num);
    var x = (num % 2 == 1 ? 0 : 300) + (bot ? 14 : 0);
    var y = 800 - Math.ceil(num/2)*200 - (num%2==1 ? 0 : 100);

    ctx.drawImage(img, x, y, 200, 200);

    if (bot) {
	x = x + 160;
	y = y + 170;
    } else {
	x = x + 40;
	y = y + 60;
    }
    ctx.fillStyle = "#000000";
    ctx.fillText((bot ? num : num + 2), x, y);
}

window.onload = function() {
    data = "";
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    gt = document.getElementById("gt");
    gb = document.getElementById("gb");
    bt = document.getElementById("bt");
    bb = document.getElementById("bb");
    
    setInterval(get, 1000);
}

var startingclick = true

function startChoose() {
    if (startingclick) {
    let startblock = document.getElementById("startblock");
    
    startblock.style.marginBottom = "50px";
    let level1 = document.createElement("button");
    level1.textContent ="Level 1 (9carte)";
    level1.style.marginInlineStart ="40px"
    startblock.append(level1);
    let level2 = document.createElement("button");
    level2.textContent ="Level 2 (13 carte)";
    level2.style.marginInlineStart ="50px"
    startblock.append(level2);
    let level3 = document.createElement("button");
    level3.textContent ="Level 3 (17 carte)";
    level3.style.marginInlineStart ="50px";
    startblock.append(level3);
    startingclick = false;
    }

}
function sheet_init() {
    document.getElementById("sheet").innerHTML = `<tr class="datrow">
                <th>SMILES</th>
                <th>Molecular Formula</th>
                <th>Atom Count</th>
                <th>Bond Count</th>
                <th>LogP</th>
                <th>TPSA</th>
                <th>Rotatable Bonds Count</th>
                <th>H-bond Donor Count</th>
                <th>H-bond Acceptor Count</th>
            </tr>`
}

var mols = {}
var displayMols = {}

function lazyload() {
    for (let mol of displayMols.splice(0, 30)) {
        document.getElementById("sheet").innerHTML += `<tr class="datrow">
            <td>${mol["SMILES"]}</td>
            <td>${mol["formula"]}</td>
            <td>${mol["num_atoms"]}</td>
            <td>${mol["num_bonds"]}</td>
            <td>${Math.round(mol["LogP"]*1000)/1000}</td>
            <td>${Math.round(mol["TPSA"]*1000)/1000}</td>
            <td>${mol["rotatable_bonds"]}</td>
            <td>${mol["hbond_donors"]}</td>
            <td>${mol["hbond_acceptors"]}</td>
        </tr>`
    }
}

fetch("/api/full").then(
    x => x.text()
).then(
    x => {
        sheet_init()
        mols = JSON.parse(x)
        displayMols = [...mols]
        document.getElementById("querytype").innerHTML = Object.keys(mols[0]).map(y => 
            `<option value="${y}">${y}</option>`)
        lazyload()
        setInterval(() => {
            if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
                lazyload()
            }
        }, 100)
    }
)

function search() {
    let q = document.getElementById("query").value
    let t = document.getElementById("querytype").value
    if (typeof mols[0][t] == "string") {
        displayMols = [...mols].filter(x => x[t] ? x[t].toLowerCase().includes(q.toLowerCase()) : false).toSorted((a, b) => {
            let aa = a[t].toLowerCase()
            let bb = b[t].toLowerCase()
            let qq = q.toLowerCase()
            if (aa.startsWith(qq) && !bb.startsWith(qq)) {
                return -1
            } else if (bb.startsWith(qq) && !aa.startsWith(qq)) {
                return 1
            } else if (a[t].includes(q) && !b[t].includes(q)) {
                return -1
            } else if (b[t].includes(q) && !a[t].includes(q)) {
                return 1
            } else {
                return a.length - b.length
            }
        })
        sheet_init()
        document.getElementById("cle").hidden = false
    } else {
        displayMols = [...mols].filter(x => Math.abs(x[t]-parseFloat(q))/(parseFloat(q)) < 0.1).toSorted((a, b) => {
            let diff = Math.abs(a[t]-parseFloat(q))-Math.abs(b[t]-parseFloat(q))
            if (diff != 0) {
                return diff
            } else {
                return a["SMILES"].length - b["SMILES"].length
            }
        })
        sheet_init()
        document.getElementById("cle").hidden = false
    }
}

function clearSearch() {
    document.getElementById("cle").hidden = true
    displayMols = [...mols]
    sheet_init()
}
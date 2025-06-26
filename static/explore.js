var orderBy = [0,1]
function sheet_init() {
    let columns = ["SMILES", "Molecular Formula", "Atom Count", "Bond Count", "LogP", "TPSA", "Rotatable Bonds Count", "H-bond Donor Count", "H-bond Acceptor Count"]
    let keys = ["SMILES", "formula", "num_atoms", "num_bonds", "LogP", "TPSA", "rotatable_bonds", "hbond_donors", "hbond_acceptors"]
    document.getElementById("sheet").innerHTML = `<tr class="datrow" id="dr"></tr>`
    for (let i = 0; i < columns.length; i++) {
        let col = columns[i]
        let th = document.createElement("th")
        let btn = document.createElement("button")
        btn.innerText = col
        btn.id = `orderby${i}`
        btn.addEventListener("click", () => {
            if (orderBy[0] == i) {
                orderBy[1] *= -1
            } else {
                if (document.getElementById(`orderby${orderBy[0]}`)) {
                    document.getElementById(`orderby${orderBy[0]}`).className = ""
                }
                orderBy = [i, 1]
            }
            btn.className = orderBy[1] > 0 ? "asc" : "desc"
            console.log(mols)
            displayMols = [...mols].toSorted((a,b) => {
                let out = 0
                // SMILES
                if (i == 0) {
                    out = a["SMILES"].length - b["SMILES"].length
                } else if (typeof mols[0][keys[i]] == "string") {
                    try {
                        out = a[keys[i]].localeCompare(b[keys[i]])
                    } catch (e) {
                        out = -1
                    }
                } else {
                    if (a[keys[i]] == undefined) {
                        return 1
                    } else if (b[keys[i]] == undefined) {
                        return -1
                    }
                    out = a[keys[i]] - b[keys[i]]
                }
                return out*Math.sign(orderBy[1])
            })
            sheet_init()
        })
        th.appendChild(btn)
        document.getElementById("dr").appendChild(th)
    }
    document.getElementById(`orderby${orderBy[0]}`).className = orderBy[1] > 0 ? "asc" : "desc"
    lazyload()
}

var mols = {}
var displayMols = {}

function lazyload() {
    for (let mol of displayMols.splice(0, 30)) {
        let dr = document.createElement("tr")
        dr.className = "datrow"
        dr.innerHTML = `<td><div>${mol["SMILES"]}</div></td>
            <td>${mol["formula"]}</td>
            <td>${mol["num_atoms"]}</td>
            <td>${mol["num_bonds"]}</td>
            <td>${Math.round(mol["LogP"]*1000)/1000}</td>
            <td>${Math.round(mol["TPSA"]*1000)/1000}</td>
            <td>${mol["rotatable_bonds"]}</td>
            <td>${mol["hbond_donors"]}</td>
            <td>${mol["hbond_acceptors"]}</td>`
        document.getElementById("sheet").appendChild(dr)
    }
}

fetch("/api/full").then(
    x => x.text()
).then(
    x => {
        mols = JSON.parse(x)
        displayMols = [...mols]
        document.getElementById("querytype").innerHTML = Object.keys(mols[0]).map(y => 
            `<option value="${y}">${y}</option>`)
        sheet_init()
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
        if (document.getElementById(`orderby${orderBy[0]}`)) {
            document.getElementById(`orderby${orderBy[0]}`).className = ""
        }
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
        if (document.getElementById(`orderby${orderBy[0]}`)) {
            document.getElementById(`orderby${orderBy[0]}`).className = ""
        }
        document.getElementById("cle").hidden = false
    }
}

function clearSearch() {
    document.getElementById("cle").hidden = true
    displayMols = [...mols]
    sheet_init()
}
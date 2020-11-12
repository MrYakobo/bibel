const assert = require("assert").strict
const paginate = require("./paginate.js")

var orig =
    "Och så som Mose upphöjde ormen i öknen måste Människosonen bli upphöjd, för att var och en som tror på honom ska ha evigt liv. Så älskade Gud världen att han utgav sin enfödde Son, för att var och en som tror på honom inte ska gå förlorad utan ha evigt liv. Gud har inte sänt sin Son till världen för att döma världen, utan för att världen ska bli frälst genom honom. Den som tror på honom blir inte dömd. Men den som inte tror är redan dömd, eftersom han inte tror på Guds enfödde Sons namn. Och detta är domen: ljuset kom in i världen, men människorna älskade mörkret mer än ljuset eftersom deras gärningar var onda. Den som gör det onda hatar ljuset och kommer inte till ljuset, för att hans gärningar inte ska avslöjas."
var res = paginate(orig, 8, 100)

assert.equal(res.join(" "), orig)

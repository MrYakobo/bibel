# Prioriteter för adminpanelen

1. Stabilitet. I gamla så

- freezar det ibland när man klickar på en slide
    - pga firebase som är slött

- ibland så funkar inte APIet
    - pga inte tillräckligt med tester för att pröva edge cases
    - även UX för att skriva in bibelord

2. Att man kan välja mellan sfb98 och sfb15.

3. Mycket användbart UX. Inget fult, bara snyggt

Prioritera inte bcv_parser. Det förvirrar nog mer än vad det smakar.
Blir svårare att hålla consistent kvalitet bara

# Arkitektur för disp

Lite inne på att göra det här till en supermonolit, och skippa APIet för nu
Det är bara 9MB för att ladda ner både sfb98 och sfb15. Då blir appen mycket rappare också

Det enda display behöver ha är egentligen en kontinuerlig uppdatering från servern om vilket bibelord som gäller.

Just nu är det kitchen sink: admin och klient har alltid tillgång till all data.

Vi kan simplifiera detta:

Man klickar på ett bibelord =>
```
POST /set-slide
{"title": "hej", "text": "tjenis"}
```

Klienten pollar på ett intervall av 500ms till servern

```
GET /get-slide
{"title": "hej", "text": "tjenis"}
```

Skitbra o enkelt. Det här kan man göra i nginx!

```PUT /slide
{"title": "hej", "text": "tjenis"}
```

```GET /slide
{"title": "hej", "text": "tjenis"}
```

Hur bra som helst. Det här borde vara stabilt att köra på raspen!
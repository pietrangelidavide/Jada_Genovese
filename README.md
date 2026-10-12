# Sito di Jada Genovese, make up artist

Sito di una pagina per presentare Jada Genovese: make up, brow e lashes a Monterotondo e a Roma.
Stile editoriale ispirato ai grandi siti di make up: foto a tutta altezza, titoli in Italiana, testo in Outfit, colori presi dalla sua foto (rosa polvere, nero, oro). Nessun logo: il nome è scritto in carattere.
Tema chiaro e scuro in base al telefono o al computer. Nessun servizio esterno: caratteri e foto sono nella cartella.

## Struttura

```
public/index.html     la pagina (testi e sezioni)
public/style.css      colori, caratteri, layout
public/img/           foto (ritagliate, senza il logo di altri centri che si vedeva sulle magliette)
public/fonts/         Italiana e Outfit (licenza OFL)
public/favicon.svg    icona della scheda del browser
public/robots.txt     blocca Google finché il sito è in anteprima
scripts/make-artifact.mjs   crea dist/anteprima.html, la pagina in un solo file da mandare a chi non ha il sito online
wrangler.jsonc        pubblicazione su Cloudflare
```

## Da completare prima di andare online

- Recapiti per prenotare: numero WhatsApp e profilo Instagram. Vanno nella sezione «Contatti» di `public/index.html`, dove c'è il blocco di esempio commentato. Poi si può puntare lì anche il pulsante «Prenota».
- Testi: servizi, «Chi sono» e frasi sul metodo sono bozze, da far rileggere a Jada (elenco dei trattamenti, formazione, anni di esperienza).
- Recensioni delle clienti: solo vere, copiate da Google o da Instagram. Non vanno inventate.
- Partita IVA e dati obbligatori nel piè di pagina, informativa privacy.
- Altre foto (prima/dopo, studio, prodotti) e una foto per la condivisione sui social.
- Togliere `noindex` da `public/index.html` e cancellare `public/robots.txt` quando il sito va sul dominio vero, altrimenti non comparirà su Google.

## Pubblicare su Cloudflare (gratis)

1. Cloudflare → **Workers & Pages** → **Create** → **Import a repository** → scegli questa repo, branch `main`.
2. Nome del progetto: `jada-genovese` (deve coincidere con `name` in `wrangler.jsonc`).
3. Build command vuoto. Deploy command: `npx wrangler deploy`.
4. Dopo il primo deploy il sito è su `https://jada-genovese.<tuo-account>.workers.dev`; ogni push su `main` lo aggiorna.
5. Dominio proprio: Settings → Domains & Routes → Add.

# Pre Barborku ♡ — interaktívne poďakovanie

Jednoduchá statická webstránka s piatimi animovanými scénami. Pripravená pre mobily, bez buildu, backendu, platených služieb, trackovania či externých JavaScriptových knižníc.

## Spustenie

1. Rozbaľ ZIP.
2. Otvor súbor `index.html` v prehliadači. Nie je potrebná inštalácia ani internetové pripojenie.
3. Ak chceš otestovať web cez lokálny HTTP server, v koreňovom priečinku spusti `python -m http.server 8000` a otvor `http://localhost:8000/`.

## Nasadenie

Nahraj celý obsah priečinka (vrátane `assets/`) do koreňového priečinka ľubovoľného statického hostingu (napr. Hostinger `public_html` alebo Vercel static). Nezabudni dodržať relatívne cesty. **Žiadne nasadenie ani nahranie fotiek na internet nebolo vykonané.**

## Fotografia

Hlavný vizuál: `assets/images/barbora-portrait.webp` (optimalizovaná WebP kópia z fotografie dodanej v tomto chate).

Na výmenu fotografie nahraď tento súbor vlastným obrázkom, ideálne rovnakého názvu a formátu. Ak použiješ iný názov/formát, uprav `src` a prípadne `width` a `height` elementu `<img>` v `index.html`. Obrázok používa `object-fit: cover`; jemný výrez môžeš upraviť cez `object-position` v `assets/styles.css` pri `.polaroid__image-frame img`.

Screenshot Instagramu a skupinová fotografia sa v stránke zámerne nepoužili, aby web zostal osobný a neobsahoval zbytočné údaje ďalších ľudí.

## Úpravy textu a odkazu

Texty sa upravujú priamo v `index.html`. Posledné tlačidlo odkazuje na `https://www.instagram.com/duzk.i/`.

## Technické poznámky

- HTML5, CSS3, JavaScript bez knižníc a externých závislostí.
- Rozloženie sa prispôsobuje mobilom a desktopu.
- Interakcie fungujú pomocou myši, dotyku a klávesnice (Enter / Space).
- Nastavenie systému `prefers-reduced-motion` vypína výrazné animácie.
- Bez JavaScriptu zostávajú scény čitateľné pod sebou a Instagram odkaz zostáva bežným klikateľným linkom. Darčekové odhalenie vyžaduje JavaScript.
- Text účtovníctva je len všeobecný; súkromné finančné dáta tu nie sú.

## Súkromie

Fotografia je osobný materiál. **Pred verejným sprístupnením stránky si vyžiadaj jej súhlas s použitím fotografie.** Stránka používa `<meta name="robots" content="noindex,nofollow,noarchive">`, to však **nie je zabezpečenie prístupu** a roboty to nemusia rešpektovať. Na ochranu pred nepovolanými návštevníkmi nastav skutočné heslo/autentifikáciu na hostingu. Nezverejňuj odkaz bez súhlasu dotknutej osoby.

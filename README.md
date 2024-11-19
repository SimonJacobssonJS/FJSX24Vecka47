# Pendlaren

## Vad

Ni ska bygga en webbapp som tar en användares position (longitud och latitud) och sedan hämtar närliggande hållplatser. 
Användaren kan sedan kunna välja en hållplats och se de närmaste avgångarna. Appen ska även vara installerbar med en manifest.json.

## Hur

Observera att ni behöver använda https för att kunna använda geolocation API. Ni behöver skapa ett konto [här]( https://www.trafiklab.se/) och efter det skapa ett projekt för att få en API-nyckel.

### Steg
1. Hämta geolocation med geolocation API
2. Gör ett API-anrop mot ReseRobot - reseplanerare med longitud och latitud.
3. Låt användaren välja en hållplats och spara valet.
4. Gör ett API-anrop mot ReseRobot - stolptidstabeller med id:et på hållplatsen (property **id** i JSON-svaret).
5. Visa avgångarna för användaren.

### Level up

Gör det möjligt att planera en resa mellan två stationer, använd reseplanerar - API:et nedan för detta.

### API:er som behövs:

**Geolocation:** https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

**ResRobot - Hållplatser nära dig:** https://www.trafiklab.se/api/trafiklab-apis/resrobot-v21/nearby-stops/

**ResRobot - stolptidstabeller:** https://www.trafiklab.se/api/trafiklab-apis/resrobot-v21/timetables/

**Level up**

**ResRobot - Reseplanerare:** https://www.trafiklab.se/api/trafiklab-apis/resrobot-v21/route-planner/


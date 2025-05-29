# Wdrożenie JaKupię.pl na Vercel

## Kroki wdrożenia:

### 1. Przygotowanie
- Kod jest już przygotowany do wdrożenia na Vercel
- Konfiguracja `vercel.json` została utworzona
- Skrypty budowania są gotowe

### 2. Wdrożenie na Vercel

#### Opcja A: Przez GitHub (zalecane)
1. Prześlij kod na GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TWOJ-USERNAME/jakupie-pl.git
   git push -u origin main
   ```

2. Przejdź na [vercel.com](https://vercel.com)
3. Zaloguj się/zarejestruj przez GitHub
4. Kliknij "New Project"
5. Wybierz swoje repozytorium GitHub
6. Vercel automatycznie wykryje ustawienia
7. Kliknij "Deploy"

#### Opcja B: Przez Vercel CLI
1. Zainstaluj Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Zaloguj się:
   ```bash
   vercel login
   ```

3. Wdróż projekt:
   ```bash
   vercel
   ```

### 3. Konfiguracja bazy danych
1. W panelu Vercel przejdź do "Settings" > "Environment Variables"
2. Dodaj zmienną `DATABASE_URL` z adresem bazy PostgreSQL
3. Możesz użyć darmowej bazy z:
   - Neon.tech (zalecane)
   - Supabase
   - PlanetScale

### 4. Własna domena
1. Kup domenę (np. jakupie.pl) u rejestratora:
   - home.pl
   - OVH
   - Cloudflare

2. W panelu Vercel:
   - Przejdź do "Settings" > "Domains"
   - Dodaj swoją domenę (np. jakupie.pl)
   - Skopiuj rekordy DNS
   
3. W panelu rejestratora:
   - Dodaj rekordy DNS podane przez Vercel
   - Czekaj 24-48h na propagację

### 5. Sprawdzenie
- Strona będzie dostępna pod: `https://twoj-projekt.vercel.app`
- Po dodaniu domeny: `https://jakupie.pl`

## Funkcje gotowe do użycia:
✅ Rejestracja i logowanie użytkowników  
✅ Dodawanie ogłoszeń z zaawansowanymi filtrami  
✅ Przeglądanie ogłoszeń  
✅ System odpowiedzi na ogłoszenia  
✅ Panel administracyjny  
✅ Tryb ciemny/jasny  
✅ Responsywny design  
✅ Pełne tłumaczenie na język polski  

## Koszty:
- **Vercel**: Darmowy dla małych projektów
- **Domena**: ~30-50 zł/rok
- **Baza danych**: Darmowa (Neon.tech) do 0.5GB

Twoja platforma będzie działać profesjonalnie i będzie dostępna 24/7!
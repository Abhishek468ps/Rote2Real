# Rote2Real – Razorpay payment setup

## Flow
1. `/rote2real/register` -> POST `/api/public/rote2real/register` (saves profile, status PENDING)
2. POST `/api/public/rote2real/create-order` {studentId}  (NEW) -> Razorpay order (amount/currency from server)
3. Razorpay Checkout popup opens in browser
4. POST `/api/public/rote2real/verify-payment` -> signature verified server-side -> status PAID
5. Redirect to `/rote2real/dashboard`
If the popup is closed, the register page shows a "Complete payment" button (resumes the same order).

## Keys you must provide (Razorpay Dashboard -> Account & Settings -> API Keys)
Backend env vars (already referenced in application.properties):
- RAZORPAY_API_KEY      = rzp_test_xxxxx  (Key Id)
- RAZORPAY_KEY_SECRET   = xxxxxxxx        (Key Secret - NEVER put in frontend)
Frontend `.env.local`:
- NEXT_PUBLIC_API_URL=http://localhost:8080
(The Key Id reaches the frontend via the create-order response; nothing else needed.)

## Run (VS Code terminal)
Backend:
  cd backend
  export RAZORPAY_API_KEY=rzp_test_xxx RAZORPAY_KEY_SECRET=xxx   # + DATABASE_*, JWT_SECRET, MAIL_*, GITHUB_ACCESS_TOKEN
  ./mvnw spring-boot:run
Frontend:
  cd frontend
  npm install
  npm run dev
Test card (test mode): 4111 1111 1111 1111, any future expiry, any CVV, OTP 1234 (or use UPI success@razorpay).

## Files changed
- backend: dto/request/Rote2RealCreateOrderRequest.java (new), Rote2RealService, Rote2RealServiceImpl (createPaymentOrder), Rote2RealController (/create-order)
- frontend: lib/api.ts, lib/rote2real.ts (createOrder), app/rote2real/register/page.tsx (checkout flow)

## Notes
- Pricing is in Rote2RealPricingHelper (currently ₹1 India / ~₹10 intl test pricing). Change before going live.
- International currencies (USD/GBP/...) need International Payments enabled on your Razorpay account; otherwise use INR.
- Backend was not compiled in my sandbox (Maven Central blocked) – run `./mvnw test` once.


---
## Windows PowerShell quick start (local DEV)
The original project expects the team's existing database (Flyway starts at V22, baseline 21), so on your own laptop use a separate local database and the `dev` profile.

1. Database (pick ONE):
   - A (Docker):  `.\scripts\start-db.ps1`
   - B (installed PostgreSQL): create an empty database called `rote2real` (pgAdmin -> right click Databases -> Create).
2. Backend (new terminal, project root):  `.\scripts\start-backend.ps1`  (asks DB password + Razorpay TEST keys; nothing is saved)
3. Verify:  `.\scripts\check-backend.ps1`  -> must say OK
4. Frontend (another terminal):  `cd frontend; npm install; npm run dev`  -> http://localhost:3000/rote2real/register

Never use `rzp_live_` keys locally. If a live key/secret or email password was ever pasted anywhere, regenerate it.

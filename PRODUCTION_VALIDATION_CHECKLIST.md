# Production Validation Checklist (Strict Mode)

## 1) Security & RLS

- [ ] Apply migrations through `014_production_hardening_and_scalability.sql`
- [ ] Run `database/RLS_VALIDATION_SNIPPETS.sql` and verify policy/trigger outputs
- [ ] Confirm no `notifications` public insert policy exists
- [ ] Confirm `orders.order_ref` is DB-generated (client payload has no `order_ref`)
- [ ] Confirm blog comments are inserted with `is_approved = false`
- [ ] Confirm moderator/admin can approve/delete comments

## 2) API Strictness

- [ ] No direct `.from()` calls remain in HTML pages
- [ ] Frontend CRUD uses only `assets/js/api/*` modules
- [ ] Admin workflows use `assets/js/admin/*` modules
- [ ] Error handling goes through `PixelOneErrorHandler.handleError`

## 3) Anti-Spam / Abuse

- [ ] Comment honeypot blocks bot submissions (`comment-company` field)
- [ ] Order honeypot blocks bot submissions (`website` field)
- [ ] Rate limits enforced: comments `5/min`, likes `10/min`

## 4) Performance

- [ ] Services list cache TTL 5 min
- [ ] Site content cache TTL 10 min, invalidates on admin save
- [ ] Blog list pagination works with page size 10
- [ ] Admin pagination works for orders/users/comments
- [ ] Images lazy-load enabled across pages

## 5) Edge Function

- [ ] `google-shopping-feed` CORS allows only `https://www.pixelonevisuals.tech`
- [ ] OPTIONS preflight returns `204`
- [ ] Non-allowed origins return `403`

## 6) Build / Deployment

- [ ] Run `npm install`
- [ ] Run `npm run build:css`
- [ ] Verify output file exists: `assets/css/tailwind.output.css`
- [ ] Replace CDN Tailwind on production pages when rollout is ready

## 7) UX / SEO

- [ ] Blog details dynamic meta tags + OG + Twitter tags update per post
- [ ] Blog details JSON-LD (`BlogPosting`) is valid
- [ ] Service details dynamic meta tags + `Service` JSON-LD are valid
- [ ] Home page includes `Organization` JSON-LD

## 8) Final Go-Live Checks

- [ ] No console errors on `index`, `services`, `blog`, `blog-details`, `dashboard`, `admin`
- [ ] No sensitive values logged to console
- [ ] No `SERVICE_ROLE_KEY` exposed in frontend
- [ ] Lighthouse score >= 90 on key pages

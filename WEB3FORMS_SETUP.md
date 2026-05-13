# Contact forms — setup and delivery

## Production (live site)

Forms follow **[FormSubmit’s basic pattern](https://formsubmit.co/)**: `POST` to your address on their host.

```html
<form action="https://formsubmit.co/deepaashok1977@gmail.com" method="POST">
```

Implemented in:

- [`index.html`](index.html) — hero “Get in Touch” form  
- [`contact.html`](contact.html) — full contact form  

**Also set:** `_subject`, `_next` (return to your site after submit), `_captcha=false`, honeypot `_honey`. Submissions go to **`deepaashok1977@gmail.com`**.

### Optional: invisible ID instead of Gmail

After you activate once, FormSubmit may email you a **random string** so you can use  
`action="https://formsubmit.co/THAT_STRING"` instead of exposing your Gmail in HTML — same service, clearer anti-scraping. Until that works reliably, **email in `action`** is officially documented and simplest.

### If “ACTIVATE FORM” opens “Not a valid link”

1. **Gmail desktop** → message **⋮** → **Show original** → find **`<a href="https://formsubmit.co/...">`** → copy **only** that URL into Chrome/Safari.  
2. Submit again from **`https://ashokkaringal.github.io/legal-content-portfolio/`** after deploy and use the **newest** email’s link immediately.  
3. **[FormSubmit Help](https://formsubmit.co/help)** if tokens keep failing.

---

## Legacy: Web3Forms

To revert to Web3Forms: new **`access_key`** from [web3forms.com](https://web3forms.com) for `deepaashok1977@gmail.com`, then `POST` to `https://api.web3forms.com/submit` with hidden `access_key`.

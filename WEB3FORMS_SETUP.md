# Contact forms — setup and delivery

## Production (live site)

The **home hero** form in [`index.html`](index.html) and the **contact** form in [`contact.html`](contact.html) submit to **[FormSubmit](https://formsubmit.co)** using this **invisible form ID** in `action` (no naked Gmail in markup):

`https://formsubmit.co/4f7cb65d643d6a942c190830a04118da`

- **Method:** normal browser **`POST`** (JavaScript does **not** intercept with `fetch`; this matches FormSubmit’s basic HTML flow).
- **After submit:** hidden **`_next`** sends the visitor back to **`index.html?contact=submitted`** or **`contact.html?sent=1`**, and a short script shows the green thank-you text.
- Other hidden fields: **`_subject`**, **`_captcha=false`**, honeypot **`_honey`**.

Submissions are delivered to **`deepaashok1977@gmail.com`** (bound to that ID inside FormSubmit).

### FormSubmit activation (“Activate Form”) issues

Until the form is **activated once**, submits return JSON like *“This form needs Activation…”* and FormSend queues mail.

If the button in FormSubmit’s email shows **“Not a valid link” / “Confirmation token not found”**:

1. **Gmail → open the raw URL**: Desktop web Gmail → message **⋮** → **Show original** → scroll to **`href=`** inside the Activate link → copy **only** the `https://formsubmit.co/...` URL → paste into a normal desktop browser tab. (Outlook iOS/Mac often mangled links similarly — use ”View online” / **Show raw message**.)
2. **Copy link as plain text** (avoid in-app browsers): long‑press → **Copy link address** → paste into Chrome/Safari.
3. **Trigger a fresh activation**: submit once from **`https://ashokkaringal.github.io/legal-content-portfolio/index.html`** (or **`.../contact.html`**) **after deploy**, then activate from the newest email immediately.
4. **FormSubmit Help** [`formsubmit.co/help`](https://formsubmit.co/help) — support can invalidate or reset a bad token.

The **random ID** (`4f7cb65d643d6a942c190830a04118da`) replaces the naked email everywhere in markup; activation still must complete on FormSubmit’s side.

---

## Legacy: Web3Forms (optional reference)

Previously the forms used Web3Forms with an `access_key`. To revert:

1. At [web3forms.com](https://web3forms.com), generate an access key for `deepaashok1977@gmail.com`.
2. Set `action="https://api.web3forms.com/submit"` and restore `<input type="hidden" name="access_key" value="YOUR_KEY">`.
3. Point `fetch()` at the Web3Forms URL and restore their success-shape handling.

An old portfolio key routed mail to **`ashok.karingal@gmail.com`** until we moved off Web3Forms.

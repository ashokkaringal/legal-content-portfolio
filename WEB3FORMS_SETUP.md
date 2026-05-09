# Contact forms — setup and delivery

## Production (live site)

The **home hero** form in [`index.html`](index.html) and the **contact** form in [`contact.html`](contact.html) submit to **[FormSubmit](https://formsubmit.co)** using an **invisible form ID** (no public Gmail in markup):

| Use | URL |
| --- | --- |
| HTML `action=""` / non-JS submit | `https://formsubmit.co/4f7cb65d643d6a942c190830a04118da` |
| JavaScript AJAX `fetch()` | `https://formsubmit.co/ajax/4f7cb65d643d6a942c190830a04118da` |

Submissions deliver to **`deepaashok1977@gmail.com`** (associated with this ID inside FormSubmit). Hidden fields include `_subject`, `_captcha=false`, and `_honey` honeypot.

AJAX requests set **`referrerPolicy: 'unsafe-url'`** so FormSubmit reliably receives full page URLs (helps with spam checks and referrer-based rules).

### FormSubmit activation (“Activate Form”) issues

Until the form is **activated once**, submits return JSON like *“This form needs Activation…”* and FormSend queues mail.

If the button in FormSubmit’s email shows **“Not a valid link” / “Confirmation token not found”**:

1. **Copy the activate link as plain text**: long press / “Copy link” → paste into Chrome/Safari address bar so nothing is clipped.
2. **Try another browser** or **private window** – some mail apps open an embedded browser that mishandles redirects.
3. **Trigger a fresh activation**: after deploy, submit once from **`https://ashokkaringal.github.io/legal-content-portfolio/`** (`index.html` or `contact.html`) and use the **new** email’s link within ~24–48 hours.
4. **Use FormSubmit Help / support** (`https://formsubmit.co/help` → contact) if the link keeps failing; they can resend or unblock the token.

The **random ID** (`4f7cb65d643d6a942c190830a04118da`) replaces the naked email everywhere in markup; activation still must complete on FormSubmit’s side.

---

## Legacy: Web3Forms (optional reference)

Previously the forms used Web3Forms with an `access_key`. To revert:

1. At [web3forms.com](https://web3forms.com), generate an access key for `deepaashok1977@gmail.com`.
2. Set `action="https://api.web3forms.com/submit"` and restore `<input type="hidden" name="access_key" value="YOUR_KEY">`.
3. Point `fetch()` at the Web3Forms URL and restore their success-shape handling.

An old portfolio key routed mail to **`ashok.karingal@gmail.com`** until we moved off Web3Forms.

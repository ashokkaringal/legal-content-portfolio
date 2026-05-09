# Contact forms — setup and delivery

## Production (live site)

The **home hero** form in [`index.html`](index.html) and the **contact** form in [`contact.html`](contact.html) submit to **[FormSubmit](https://formsubmit.co)**:

- Recipient: **`deepaashok1977@gmail.com`** (set in `action` / AJAX URL — not in dashboard secret keys)
- JavaScript POSTs to: `https://formsubmit.co/ajax/deepaashok1977@gmail.com`
- Subjects via hidden `_subject`; captcha reduced with `_captcha=false`; spam honeypot field `_honey`

### One‑time activation (required)

FormSubmit sends **deepaashok1977@gmail.com** an email with **“Activate Form”** after the **first** test submission (or endpoint hit). Until you click that link, the JSON response explains that activation is pending and mail will not relay.

### Why FormSubmit replaced Web3Forms here

Web3Forms delivers only to the mailbox tied to the **`access_key`**. Updating the inbox in Git requires a **new** key from [web3forms.com](https://web3forms.com). FormSubmit endpoints embed the Gmail address directly, so the inbox can be enforced in code.

---

## Legacy: Web3Forms (optional reference)

Previously the forms used Web3Forms with an `access_key`. To use Web3Forms again:

1. At [web3forms.com](https://web3forms.com), generate an access key for `deepaashok1977@gmail.com`.
2. Set `action="https://api.web3forms.com/submit"` and restore `<input type="hidden" name="access_key" value="YOUR_KEY">`.
3. Align your JavaScript `fetch()` URL with the same POST endpoint.

The old portfolio key routed mail to **`ashok.karingal@gmail.com`**; swapping only hidden text fields in HTML **cannot** retarget delivery without rotating that key.


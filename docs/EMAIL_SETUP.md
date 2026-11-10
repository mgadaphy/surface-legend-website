# Surface Legend email: setup with the company Gmail

[Français plus bas](#guide-en-français)

When this is done:

- Mail sent to **info@surfacelegend.com** and **quotes@surfacelegend.com** arrives in the CEO's Gmail.
- The CEO replies **as info@surfacelegend.com** from Gmail, on a computer or the phone.
- The website emails the team about every new enquiry and sends the visitor a confirmation, from **website@surfacelegend.com**.

Everything is free. It takes about an hour, plus up to a day for DNS to settle.

| Piece | Service | Who owns the account |
|---|---|---|
| Receiving at @surfacelegend.com | Cloudflare Email Routing | The Cloudflare account that holds surfacelegend.com |
| Sending from the website and from Gmail | Resend (free plan: 3,000 emails a month, 100 a day when this guide was written) | **A new account in the CEO's name**, so the company owns it |
| Reading and replying | The CEO's Gmail | The CEO |

Before starting, you need: access to Cloudflare, the CEO's Gmail address, and the CEO at hand for two verification codes.

## Part 1. Receive at info@ and quotes@ (Cloudflare, 10 minutes)

1. Cloudflare, open **surfacelegend.com**, then **Email**, **Email Routing**.
2. If it is not on yet: **Get started** or **Enable Email Routing**, then **Add records and enable**. Cloudflare adds its own MX and SPF records.
3. **Destination addresses**, **Add destination address**: enter the CEO's Gmail. Cloudflare emails a verification link to that Gmail; the CEO clicks it.
4. **Routing rules**, **Create address**:
   - `info` → the CEO's Gmail
   - `quotes` → the CEO's Gmail
5. Test: from another email account, write to info@surfacelegend.com. It arrives in the CEO's Gmail within a minute (check Spam the first time and mark it "Not spam").

**Optional:** add more addresses later the same way (for example `academy@`), or switch on **Catch-all** to receive mail sent to any address at the domain.

## Part 2. Let the website send email (Resend, 30 minutes plus DNS)

### 2.1 The account and the domain

1. Go to https://resend.com and **sign up with the CEO's Gmail** (free plan). The founder can be invited later under **Settings**, **Team**.
2. **Domains**, **Add domain**: `surfacelegend.com`.
3. Resend shows three or four DNS records. In Cloudflare, **surfacelegend.com**, **DNS**, **Records**, **Add record**, add **each one exactly as shown**, with the proxy **off** (grey cloud). They usually look like this:

| Type | Name | Content |
|---|---|---|
| TXT | `resend._domainkey` | a long key starting `p=` |
| MX | `send` | `feedback-smtp.….amazonses.com`, priority 10 |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` |

   These records sit on `send` and `resend._domainkey`, so they **do not touch** Email Routing. Receiving keeps working.

4. Recommended: also add a TXT record named `_dmarc` with `v=DMARC1; p=none;`. It tells Gmail and Outlook the domain is managed, which helps delivery.
5. Back in Resend: **Verify DNS records**. It usually turns green within 10 to 30 minutes, sometimes a few hours.

### 2.2 The key for the website

1. Resend, **API Keys**, **Create API key**.
2. Name `surface legend website`, permission **Sending access**, domain `surfacelegend.com`.
3. Copy the key (it starts with `re_`). Resend shows it only once.

### 2.3 Enter it in the admin

1. Sign in at https://surfacelegend.com/admin as **Super Admin**.
2. **Settings**, **Email settings**, **Sending service**: choose **Resend (recommended)**, paste the key, **Save**. The status box then shows "Resend (saved key ending in …)".
3. **Sender:** name `Surface Legend`, address `website@surfacelegend.com`. **Replies go to:** `info@surfacelegend.com`.
4. **Contact form:** the addresses that receive new enquiries (`info@surfacelegend.com` by default; add `quotes@` or a staff address if you like). Keep **Send the visitor a confirmation email** ticked.
5. **Save**, then **Send a test email**. It arrives in your inbox within a minute.
6. Send yourself a message through https://surfacelegend.com/contact. You should get the team notification, the visitor's confirmation, and see the enquiry under **Emails**, **Enquiries**.

If the test says "domain is not verified", wait for step 2.1 to turn green and try again; the key does not need to be pasted again.

## Part 3. Reply as info@surfacelegend.com from Gmail

Gmail sends through Resend, so replies are signed for surfacelegend.com and do not land in spam.

### 3.1 On a computer (once)

1. Resend, **API Keys**, **Create API key**: name `Gmail CEO`, **Sending access**, domain `surfacelegend.com`. Copy it. (A separate key per person means one can be cancelled without touching the website.)
2. Gmail on a computer: **Settings** (gear), **See all settings**, **Accounts and Import**.
3. **Send mail as**, **Add another email address**:
   - Name: `Surface Legend` (or the CEO's name)
   - Email: `info@surfacelegend.com`
   - Keep **Treat as an alias** ticked. **Next step**.
4. SMTP server details:
   - SMTP server: `smtp.resend.com`
   - Port: `465`, **Secured connection using SSL**
   - Username: `resend`
   - Password: the key from step 1
   - **Add account**.
5. Gmail sends a confirmation code to info@surfacelegend.com. Thanks to Part 1 it arrives in this same Gmail: open it and click the link, or type the code.
6. Still in **Accounts and Import**, under **When replying to a message**, choose **Reply from the same address the message was sent to**. Optionally click **make default** next to info@surfacelegend.com.

Repeat steps 3 to 5 for `quotes@surfacelegend.com` if replies should also come from it (the same key works).

### 3.2 On the phone

The Gmail app cannot add a "Send mail as" address, but it uses the one set up on the computer:

- **Replying:** replies to mail that came to info@ go out from info@ automatically (step 6 above).
- **New message:** tap **From** at the top and choose info@surfacelegend.com.

If the address does not appear in the app, pull down to refresh the inbox, or sign out of the account in the app and back in.

## Part 4. Daily use

- Every contact-form message is saved in the admin under **Enquiries**, even if email fails. Reply with **Reply by email** or **Reply on WhatsApp**, then set the status.
- The wording of the emails is in **Emails**, **Email templates**, in English and French.
- **If Resend's daily limit is ever reached:** in **Email settings**, tick **Use backup services** and add a second service (for example Brevo). Its domain must also be verified, and its test button used straight away.

## Troubleshooting

| What you see | What to do |
|---|---|
| Mail to info@ does not arrive | Cloudflare, **Email Routing**: the destination must say "Verified" and the rule must be active. Check Gmail's Spam folder |
| Test email: "domain is not verified" | Finish Part 2.1 and wait until Resend shows it in green |
| Test email: "API key is invalid" | Create a new key in Resend and paste it again in **Email settings** |
| Gmail refuses the SMTP password | Port `465` with SSL, username `resend` (not an email address), and a valid key |
| Emails land in spam | Check that the DKIM record is green in Resend and the `_dmarc` record exists. Avoid all-caps subjects |
| Two SPF records on surfacelegend.com | Keep only one `v=spf1` line on the domain itself; merge them if a service asks for another |

---

## Guide en français

Une fois terminé :

- Le courrier envoyé à **info@surfacelegend.com** et **quotes@surfacelegend.com** arrive dans le Gmail du directeur général.
- Le directeur répond **en tant que info@surfacelegend.com** depuis Gmail, sur ordinateur ou téléphone.
- Le site envoie à l’équipe un e-mail pour chaque nouvelle demande et une confirmation au visiteur, depuis **website@surfacelegend.com**.

Tout est gratuit. Comptez environ une heure, plus jusqu’à une journée pour la propagation DNS.

### Partie 1. Recevoir sur info@ et quotes@ (Cloudflare)

1. Cloudflare, ouvrez **surfacelegend.com**, puis **Email**, **Email Routing**.
2. Si ce n’est pas encore actif : **Get started**, puis **Add records and enable**.
3. **Destination addresses**, **Add destination address** : saisissez le Gmail du directeur. Il clique sur le lien de vérification reçu.
4. **Routing rules**, **Create address** : `info` et `quotes` vers ce Gmail.
5. Testez depuis une autre adresse : le message arrive en moins d’une minute (vérifiez les indésirables la première fois).

### Partie 2. Permettre au site d’envoyer des e-mails (Resend)

1. Créez un compte sur https://resend.com **avec le Gmail du directeur** (offre gratuite).
2. **Domains**, **Add domain** : `surfacelegend.com`. Ajoutez dans Cloudflare (**DNS**, **Records**) chaque enregistrement affiché, proxy **désactivé** (nuage gris). Ajoutez aussi un TXT `_dmarc` avec `v=DMARC1; p=none;`.
3. **Verify DNS records** : attendez le statut vert.
4. **API Keys**, **Create API key** : nom `surface legend website`, **Sending access**. Copiez la clé (elle commence par `re_`).
5. Dans l’administration (super administrateur) : **Paramètres**, **Paramètres e-mail**, choisissez **Resend (recommandé)**, collez la clé, **Enregistrer**, puis **Envoyer un e-mail de test**.
6. Envoyez-vous un message via https://surfacelegend.com/contact pour vérifier la notification, la confirmation et la demande enregistrée.

### Partie 3. Répondre en tant que info@surfacelegend.com depuis Gmail

**Sur ordinateur (une seule fois) :**

1. Resend, **API Keys**, **Create API key** : nom `Gmail CEO`, **Sending access**. Copiez-la.
2. Gmail, **Paramètres**, **Voir tous les paramètres**, **Comptes et importation**.
3. **Envoyer des e-mails en tant que**, **Ajouter une autre adresse e-mail** : nom `Surface Legend`, adresse `info@surfacelegend.com`, laissez **Traiter comme un alias** coché.
4. Serveur SMTP `smtp.resend.com`, port `465` avec **SSL**, nom d’utilisateur `resend`, mot de passe : la clé de l’étape 1.
5. Gmail envoie un code à info@surfacelegend.com, qui arrive dans ce même Gmail grâce à la partie 1. Validez-le.
6. Dans **En réponse à un message**, choisissez **Répondre à partir de l’adresse à laquelle le message a été envoyé**.

**Sur téléphone :** l’application Gmail ne permet pas d’ajouter l’adresse, mais elle utilise celle configurée sur ordinateur. Les réponses partent automatiquement de info@ ; pour un nouveau message, touchez **De** et choisissez info@surfacelegend.com.

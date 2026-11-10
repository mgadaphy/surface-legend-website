# Surface Legend admin and email

The website stays a static site. A second container runs the admin at https://surfacelegend.com/admin, with its own database that nothing outside the server can reach.

| Who | Does what |
|---|---|
| Founder (Super Admin) | Steps 1 to 5, and the sending service |
| CEO (Admin) | Enquiries, portfolio, testimonials, business details, staff accounts |

## 1. Before merging: three settings on the server

Without these the new containers refuse to start and the current site keeps running.

```bash
cd ~/projects/surface-legend-website
touch .env && chmod 600 .env
echo "POSTGRES_PASSWORD=$(openssl rand -hex 24)" >> .env
echo "PAYLOAD_SECRET=$(openssl rand -hex 32)" >> .env
echo "FIRST_ADMIN_EMAIL=YOUR_EMAIL_ADDRESS" >> .env
```

Keep a copy of `PAYLOAD_SECRET` somewhere safe: saved email keys cannot be read without it. If it ever changes, paste the keys again in **Email settings**.

## 2. Merge, then one full rebuild

Merge the `admin` branch into `main` and push. Then, **only this first time**, on the server:

```bash
cd ~/projects/surface-legend-website && bash scripts/deploy.sh --all
```

The server's previous deploy script only knew about the website container, so the admin has to be started once by hand. From then on, a push to `main` rebuilds whichever of the two changed. The first admin build takes several minutes; the site stays online meanwhile.

If a build ever fails, the previous version keeps running, the log shows `FAILED`, and it is tried again every 30 minutes:

```bash
tail -n 30 ~/projects/surface-legend-website/scripts/deploy.log
```

**Check it worked:**

```bash
docker compose ps
curl -s https://surfacelegend.com/api/health
```

## 3. Create your account

Open https://surfacelegend.com/admin. The first account must use the `FIRST_ADMIN_EMAIL` address and becomes the Super Admin. Then, under **Users**, create the CEO's account with the role **Admin**.

## 4. Email

Follow [EMAIL_SETUP.md](EMAIL_SETUP.md): forwarding info@ and quotes@ to the CEO's Gmail, the website's own Resend account, and replying as info@surfacelegend.com from Gmail on the computer and the phone.

## 5. Nightly backups

```bash
chmod +x ~/projects/surface-legend-website/admin/scripts/backup.sh
crontab -e
```

Add:

```cron
45 2 * * * /home/gadaphy/projects/surface-legend-website/admin/scripts/backup.sh >> /home/gadaphy/projects/surface-legend-website/scripts/backup.log 2>&1
```

Backups keep 14 days in `~/backups/surface-legend`. Copy them off the server once a month.

---

## Using the admin

**Address:** https://surfacelegend.com/admin

- **Enquiries:** every contact-form message is saved here, even if email fails. Reply by email or WhatsApp from the buttons at the top, then set the **Status**. Team notes stay private.
- **Portfolio:** add a project with a photo and a category, in English and French (**Editing language**, top right). Untick **Show on the website** to hide one without deleting it. Smaller **Order** numbers come first.
- **Blog:** write and edit articles in English and French. Untick **Published** to hide one. Six articles are there to start with.
- **Testimonials:** only publish words the client has approved. The home page section appears with the first one.
- **Business details:** the two WhatsApp numbers, the two email addresses and the social profiles used across the website (the footer shows only the profiles filled in). Digits only for numbers, with the country code.
- **Email templates:** the wording of every email, in both languages. Words in `{{double braces}}` are filled in automatically.

Changes appear on the website within about a minute.

**Not in the admin yet:** page text such as the home page, services and academy wording still lives in the website's translation files.

## Utiliser l’administration

**Adresse :** https://surfacelegend.com/admin

- **Demandes :** chaque message du formulaire de contact est enregistré ici, même si l’e-mail échoue. Répondez par e-mail ou WhatsApp avec les boutons en haut, puis changez le **Statut**. Les notes de l’équipe restent privées.
- **Réalisations :** ajoutez un projet avec une photo et une catégorie, en anglais et en français (**Langue de saisie**, en haut à droite). Décochez **Afficher sur le site** pour le masquer sans le supprimer. Les plus petits numéros d'**Ordre** passent en premier.
- **Blog :** rédigez et modifiez les articles en anglais et en français. Décochez **Publié** pour en masquer un. Six articles sont déjà en ligne.
- **Témoignages :** ne publiez que des propos validés par le client. La rubrique apparaît en page d’accueil avec le premier.
- **Informations de l’entreprise :** les deux numéros WhatsApp, les deux adresses e-mail et les réseaux sociaux utilisés sur tout le site (le pied de page n’affiche que ceux qui sont remplis). Chiffres uniquement pour les numéros, avec l’indicatif.
- **Modèles d’e-mail :** le texte de chaque e-mail, dans les deux langues. Les mots entre `{{doubles accolades}}` sont remplis automatiquement.

Les changements apparaissent sur le site en une minute environ.

**Pas encore dans l’administration :** les textes des pages (accueil, services, académie) restent dans les fichiers de traduction du site.

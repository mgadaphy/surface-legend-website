import Link from "next/link";
import type { AdminViewServerProps } from "payload";
import { getEmailConfig } from "@/lib/email/send";
import { AdminIcon, type AdminIconName } from "./icons";

type Lang = "en" | "fr";
type Attention = { icon: AdminIconName; text: string; action: string; href: string; tone: "urgent" | "normal" };

const TZ = "Africa/Douala";

function greeting(lang: Lang, name: string) {
  const hour = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: TZ }).format(new Date()));
  const first = name.split(" ")[0] || name;
  if (lang === "fr") return `${hour < 18 ? "Bonjour" : "Bonsoir"}, ${first}`;
  return `${hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"}, ${first}`;
}

function ago(iso: string, lang: Lang) {
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  const steps: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "second"],
    [3600, "minute"],
    [86400, "hour"],
    [604800, "day"],
    [2629800, "week"],
    [31557600, "month"],
  ];
  const abs = Math.abs(diff);
  if (abs < 60) return rtf.format(0, "minute");
  for (let i = 1; i < steps.length; i++) {
    if (abs < steps[i][0]) return rtf.format(Math.round(diff / steps[i - 1][0]), steps[i][1]);
  }
  return new Intl.DateTimeFormat(lang, { dateStyle: "medium", timeZone: TZ }).format(new Date(iso));
}

const STATUS_LABEL: Record<string, [string, string]> = {
  new: ["New", "Nouvelle"],
  "in-progress": ["In progress", "En cours"],
  replied: ["Replied", "Répondu"],
  won: ["Won", "Gagnée"],
  lost: ["Closed", "Close"],
  spam: ["Spam", "Indésirable"],
};

const CATEGORY_LABEL: Record<string, [string, string]> = {
  residential: ["Residential", "Résidentiel"],
  commercial: ["Commercial", "Commercial"],
  epoxy: ["Epoxy flooring", "Sols époxy"],
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function Dashboard({ payload, user, i18n, permissions }: AdminViewServerProps) {
  const lang: Lang = i18n?.language === "fr" ? "fr" : "en";
  const t = (en: string, fr: string) => (lang === "fr" ? fr : en);
  const role = (user as any)?.role as string | undefined;
  const isAdmin = role === "superadmin" || role === "admin";
  const can = (slug: string) => Boolean((permissions?.collections as any)?.[slug]?.read);
  const pick = (pair: [string, string] | undefined, fallback: string) => (pair ? pair[lang === "fr" ? 1 : 0] : fallback);

  const [enquiriesNew, enquiriesLatest, projects, testimonials, emailConfig] = await Promise.all([
    payload.count({ collection: "enquiries", where: { status: { equals: "new" } }, overrideAccess: true }),
    payload.find({ collection: "enquiries", sort: "-createdAt", limit: 5, depth: 0, overrideAccess: true }),
    payload.find({ collection: "projects", sort: "-updatedAt", limit: 300, depth: 0, locale: lang, overrideAccess: true }),
    payload.find({ collection: "testimonials", limit: 200, depth: 0, overrideAccess: true }),
    getEmailConfig(payload),
  ]);

  const projectDocs = projects.docs as any[];
  const shownProjects = projectDocs.filter((p) => p.show);
  const shownTestimonials = (testimonials.docs as any[]).filter((d) => d.show);
  const emailOff = emailConfig.provider === "off";

  // What needs a person today, most urgent first.
  const attention: Attention[] = [];
  if (can("enquiries") && enquiriesNew.totalDocs > 0) {
    const n = enquiriesNew.totalDocs;
    attention.push({
      icon: "inbox",
      tone: "urgent",
      text: n === 1 ? t("1 new enquiry is waiting for a reply", "1 nouvelle demande attend une réponse") : t(`${n} new enquiries are waiting for a reply`, `${n} nouvelles demandes attendent une réponse`),
      action: t("Open enquiries", "Voir les demandes"),
      href: "/admin/collections/enquiries?where[status][equals]=new",
    });
  }
  if (isAdmin && emailOff) {
    attention.push({
      icon: "send",
      tone: "normal",
      text: t("Email sending is off: enquiries are saved here but nobody is notified", "L’envoi d’e-mails est désactivé : les demandes sont enregistrées ici, sans notification"),
      action: t("Set up email", "Configurer"),
      href: "/admin/globals/email-settings",
    });
  }

  const today = new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: TZ }).format(new Date());

  const sections: { title: string; items: { icon: AdminIconName; label: string; note: string; href: string; slug: string; global?: boolean }[] }[] = [
    {
      title: t("Content", "Contenu"),
      items: [
        { icon: "image", slug: "projects", label: t("Portfolio", "Réalisations"), note: t(`${shownProjects.length} on the website`, `${shownProjects.length} sur le site`), href: "/admin/collections/projects" },
        { icon: "quote", slug: "testimonials", label: t("Testimonials", "Témoignages"), note: t(`${shownTestimonials.length} on the home page`, `${shownTestimonials.length} en page d’accueil`), href: "/admin/collections/testimonials" },
        { icon: "document", slug: "media", label: t("Images", "Images"), note: t("Uploaded photos", "Photos téléversées"), href: "/admin/collections/media" },
      ],
    },
    {
      title: t("Emails", "E-mails"),
      items: [
        { icon: "inbox", slug: "enquiries", label: t("Enquiries", "Demandes"), note: t("Messages from the contact form", "Messages du formulaire de contact"), href: "/admin/collections/enquiries" },
        { icon: "template", slug: "email-templates", label: t("Email templates", "Modèles d’e-mail"), note: t("Wording of every email the site sends", "Texte de chaque e-mail envoyé"), href: "/admin/collections/email-templates" },
      ],
    },
    {
      title: t("Settings", "Paramètres"),
      items: [
        { icon: "building", slug: "site-settings", global: true, label: t("Business details", "Informations de l’entreprise"), note: t("WhatsApp numbers and emails", "Numéros WhatsApp et e-mails"), href: "/admin/globals/site-settings" },
        { icon: "send", slug: "email-settings", global: true, label: t("Email settings", "Paramètres e-mail"), note: emailOff ? t("Sending is off", "Envoi désactivé") : t("Sending is on", "Envoi activé"), href: "/admin/globals/email-settings" },
        { icon: "user", slug: "users", label: t("Users", "Utilisateurs"), note: t("Accounts and roles", "Comptes et rôles"), href: "/admin/collections/users" },
      ],
    },
  ];
  const visible = (item: { slug: string; global?: boolean }) =>
    item.global ? Boolean((permissions?.globals as any)?.[item.slug]?.read) : can(item.slug);

  return (
    <div className="sl-dash gutter gutter--left gutter--right">
      <div className="sl-dash__inner">
      <header className="sl-dash__head">
        <div>
          <p className="sl-dash__date">{today}</p>
          <h1 className="sl-dash__title">{greeting(lang, (user as any)?.name || "")}</h1>
        </div>
        <Link className="sl-btn sl-btn-primary sl-btn-lg" href="/admin/collections/projects/create">
          <AdminIcon name="image" size={18} />
          {t("Add a project", "Ajouter une réalisation")}
        </Link>
      </header>

      <section className="sl-dash__attention" aria-labelledby="sl-attention">
        <h2 id="sl-attention" className="sl-dash__h2">{t("Needs your attention", "À traiter")}</h2>
        {attention.length === 0 ? (
          <p className="sl-dash__clear">{t("Nothing is waiting. New enquiries will appear here.", "Rien en attente. Les nouvelles demandes apparaîtront ici.")}</p>
        ) : (
          <ul className="sl-todo">
            {attention.map((a) => (
              <li key={a.href + a.text} className={`sl-todo__item sl-todo__item--${a.tone}`}>
                <AdminIcon name={a.icon} size={22} />
                <span className="sl-todo__text">{a.text}</span>
                <Link className="sl-todo__action" href={a.href}>
                  {a.action}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="sl-dash__cols">
        {can("enquiries") && (
          <section className="sl-dash__block" aria-labelledby="sl-latest-enquiries">
            <div className="sl-dash__block-head">
              <h2 id="sl-latest-enquiries" className="sl-dash__h2">{t("Latest enquiries", "Dernières demandes")}</h2>
              <Link href="/admin/collections/enquiries">{t("See all", "Tout voir")}</Link>
            </div>
            {enquiriesLatest.docs.length === 0 ? (
              <p className="sl-dash__empty">{t("No enquiries yet. Messages sent through the contact form appear here.", "Aucune demande pour l’instant. Les messages du formulaire de contact apparaîtront ici.")}</p>
            ) : (
              <ul className="sl-lines">
                {(enquiriesLatest.docs as any[]).map((e) => (
                  <li key={e.id}>
                    <Link className="sl-line" href={`/admin/collections/enquiries/${e.id}`}>
                      <span className="sl-line__main">
                        <strong>{e.name}</strong>
                        <span>{[e.type, e.detail].filter(Boolean).join(", ") || e.email}</span>
                      </span>
                      <span className="sl-line__meta">
                        <span className={`sl-pill sl-pill--${e.status}`}>{pick(STATUS_LABEL[e.status], e.status)}</span>
                        <time dateTime={e.createdAt}>{ago(e.createdAt, lang)}</time>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <section className="sl-dash__block" aria-labelledby="sl-latest-projects">
          <div className="sl-dash__block-head">
            <h2 id="sl-latest-projects" className="sl-dash__h2">{t("Portfolio", "Réalisations")}</h2>
            <Link href="/admin/collections/projects">{t("See all", "Tout voir")}</Link>
          </div>
          {projectDocs.length === 0 ? (
            <p className="sl-dash__empty">{t("No projects yet.", "Aucune réalisation pour l’instant.")}</p>
          ) : (
            <ul className="sl-lines">
              {projectDocs.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <Link className="sl-line" href={`/admin/collections/projects/${p.id}`}>
                    <span className="sl-line__main">
                      <strong>{p.title}</strong>
                      <span>
                        {pick(CATEGORY_LABEL[p.category], p.category)}, {t("edited", "modifiée")} {ago(p.updatedAt, lang)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="sl-dash__manage" aria-labelledby="sl-manage">
        <h2 id="sl-manage" className="sl-visually-hidden">{t("Manage", "Gérer")}</h2>
        {sections.map((s) => {
          const items = s.items.filter(visible);
          if (!items.length) return null;
          return (
            <div key={s.title} className="sl-manage">
              <h3 className="sl-manage__title">{s.title}</h3>
              <ul>
                {items.map((i) => (
                  <li key={i.href}>
                    <Link className="sl-manage__link" href={i.href}>
                      <AdminIcon name={i.icon} size={30} />
                      <span>
                        <strong>{i.label}</strong>
                        <span>{i.note}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>
      </div>
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

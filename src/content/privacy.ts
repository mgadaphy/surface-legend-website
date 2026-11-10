/**
 * Privacy policy, written for what this website actually does. To be approved by Surface Legend
 * (and ideally reviewed by a Cameroonian lawyer) before relying on it.
 * The retention periods and the 30-day reply time are proposals to confirm.
 */
type L = { en: string; fr: string };
export type Block = L | { list: L[] };

const t = (en: string, fr: string): L => ({ en, fr });
const list = (...items: [string, string][]): Block => ({ list: items.map(([en, fr]) => t(en, fr)) });

export const PRIVACY_UPDATED = "2026-11-10";

export const privacy: { heading: L; body: Block[] }[] = [
  {
    heading: t("Who we are", "Responsable du traitement"),
    body: [
      t(
        "Surface Legend (\"we\") is a painting and coatings company working in Douala, Yaoundé, Bamenda, Buea and Limbe, Cameroon. We are responsible for the personal data described in this policy. You can reach us at info@surfacelegend.com or on WhatsApp at +237 679 235 879.",
        "Surface Legend (« nous ») est une entreprise de peinture et de revêtements intervenant à Douala, Yaoundé, Bamenda, Buea et Limbe (Cameroun). Elle est le responsable du traitement des données à caractère personnel décrites dans la présente politique. Vous pouvez nous joindre à l’adresse info@surfacelegend.com ou sur WhatsApp au +237 679 235 879.",
      ),
      t(
        "This policy follows Law No. 2024/017 of 23 December 2024 on the protection of personal data in Cameroon.",
        "La présente politique est établie conformément à la loi n° 2024/017 du 23 décembre 2024 relative à la protection des données à caractère personnel au Cameroun.",
      ),
    ],
  },
  {
    heading: t("What we collect", "Données collectées"),
    body: [
      t("We collect only what we need:", "Nous ne collectons que les données dont nous avons besoin :"),
      list(
        [
          "What you send through our contact form: your name, email address, phone number, the type of request (service, product or Academy), the option you choose and your message.",
          "Ce que vous envoyez par notre formulaire de contact : nom, adresse e-mail, numéro de téléphone, type de demande (service, produit ou Académie), option choisie et message.",
        ],
        ["Messages you send us directly by email or WhatsApp.", "Les messages que vous nous adressez directement par e-mail ou par WhatsApp."],
        [
          "Technical data needed to run the website securely, such as your IP address and browser type in server logs, kept for a short period.",
          "Les données techniques nécessaires au fonctionnement sécurisé du site, comme votre adresse IP et le type de navigateur enregistrés dans les journaux du serveur, conservées pendant une courte durée.",
        ],
        [
          "Your language choice, saved in your own browser so the site opens in that language next time. It is not sent to us.",
          "Votre choix de langue, enregistré dans votre propre navigateur pour que le site s’ouvre dans cette langue la fois suivante. Il ne nous est pas transmis.",
        ],
      ),
      t(
        "The website does not use advertising or tracking cookies, and it does not measure your visits.",
        "Le site n’utilise pas de cookies publicitaires ou de traçage et ne mesure pas votre fréquentation.",
      ),
    ],
  },
  {
    heading: t("Why we use it, and on what basis", "Finalités et base légale du traitement"),
    body: [
      list(
        [
          "To reply to your request and prepare a quote, based on the consent you give when you tick the box on our form.",
          "Répondre à votre demande et préparer un devis, sur la base du consentement que vous donnez en cochant la case prévue dans notre formulaire.",
        ],
        [
          "To carry out and follow up the work once we agree to work together, based on our agreement with you.",
          "Réaliser et suivre les travaux une fois que nous avons convenu de travailler ensemble, sur la base de l’accord qui nous lie.",
        ],
        [
          "To keep the website secure and working, based on our legitimate interest and legal obligations.",
          "Assurer la sécurité et le bon fonctionnement du site, sur la base de notre intérêt légitime et de nos obligations légales.",
        ],
      ),
      t(
        "We never sell your data, and we do not add you to a marketing list without asking first.",
        "Nous ne vendons jamais vos données et nous ne vous inscrivons à aucune liste de prospection commerciale sans votre accord préalable.",
      ),
    ],
  },
  {
    heading: t("Who receives it", "Destinataires et transferts hors du Cameroun"),
    body: [
      t(
        "Your data is seen only by the Surface Legend team members who need it. We use a small number of service providers to run the website:",
        "Vos données ne sont accessibles qu’aux membres de l’équipe Surface Legend qui en ont besoin. Nous faisons appel à un nombre restreint de prestataires pour faire fonctionner le site :",
      ),
      list(
        ["Our hosting provider, which stores the website, the requests sent through it and the server logs.", "Notre hébergeur, qui stocke le site, les demandes envoyées par son intermédiaire et les journaux du serveur."],
        ["An email delivery service, which sends the notification of your request to our team and your confirmation email.", "Un service d’envoi d’e-mails, qui transmet la notification de votre demande à notre équipe et votre e-mail de confirmation."],
        ["Cloudflare, which forwards emails sent to our @surfacelegend.com addresses to our team's mailbox.", "Cloudflare, qui transfère les e-mails adressés à nos adresses @surfacelegend.com vers la messagerie de notre équipe."],
        ["Google, whose Gmail service hosts that mailbox, and which supplies the typefaces displayed on this site.", "Google, dont le service Gmail héberge cette messagerie et qui fournit les polices de caractères affichées sur ce site."],
        ["WhatsApp (Meta), if you choose to contact us on WhatsApp.", "WhatsApp (Meta), si vous choisissez de nous contacter par WhatsApp."],
      ),
      t(
        "Some of these providers store data outside Cameroon. Where the law requires it, we take the steps needed for such transfers and choose providers with strong security.",
        "Certains de ces prestataires stockent des données hors du Cameroun. Lorsque la loi l’exige, nous accomplissons les formalités requises pour ces transferts et retenons des prestataires offrant un niveau de sécurité élevé.",
      ),
    ],
  },
  {
    heading: t("How long we keep it", "Durée de conservation"),
    body: [
      t(
        "Requests that do not lead to work are deleted within 24 months. Client records are kept for as long as the work and its follow-up require, then for the period required by law for accounting and tax purposes. Server logs are kept for no more than 90 days.",
        "Les demandes qui n’aboutissent pas à des travaux sont supprimées dans un délai de 24 mois. Les dossiers clients sont conservés pendant la durée nécessaire aux travaux et à leur suivi, puis pendant la durée imposée par la loi à des fins comptables et fiscales. Les journaux du serveur sont conservés 90 jours au maximum.",
      ),
    ],
  },
  {
    heading: t("Your rights", "Vos droits"),
    body: [
      t("You can ask us at any time to:", "Vous pouvez à tout moment exercer auprès de nous les droits suivants :"),
      list(
        ["Access the personal data we hold about you.", "Droit d’accès aux données à caractère personnel que nous détenons à votre sujet."],
        ["Correct data that is wrong or incomplete.", "Droit de rectification des données inexactes ou incomplètes."],
        ["Delete your data, or restrict how we use it.", "Droit d’effacement de vos données, ou droit à la limitation de leur traitement."],
        ["Withdraw your consent, without affecting what we did before you withdrew it.", "Droit de retirer votre consentement, sans remettre en cause les traitements effectués avant ce retrait."],
      ),
      t(
        "Write to info@surfacelegend.com with the subject \"Personal data\". We reply within 30 days. If you are not satisfied, you may complain to Cameroon's personal data protection authority once it is in operation.",
        "Écrivez-nous à info@surfacelegend.com en indiquant pour objet « Données personnelles ». Nous vous répondons dans un délai de 30 jours. Si notre réponse ne vous satisfait pas, vous pourrez saisir l’autorité camerounaise de protection des données à caractère personnel dès qu’elle sera opérationnelle.",
      ),
    ],
  },
  {
    heading: t("Security", "Sécurité"),
    body: [
      t(
        "The website is served only over HTTPS, access to requests is limited to our team, and our systems are kept up to date. If we ever learn of a breach affecting your data, we will inform you and the authority as the law requires.",
        "Le site est accessible uniquement en HTTPS, l’accès aux demandes est réservé à notre équipe et nos systèmes sont tenus à jour. Si nous avons connaissance d’une violation affectant vos données, nous vous en informerons, ainsi que l’autorité compétente, dans les conditions prévues par la loi.",
      ),
    ],
  },
  {
    heading: t("Children", "Mineurs"),
    body: [
      t(
        "This website is intended for adults. If you contact us about the Art Academy for someone under 18, the request should come from their parent or guardian.",
        "Ce site s’adresse aux adultes. Pour toute demande concernant l’Académie d’Art au nom d’une personne de moins de 18 ans, la demande doit émaner de son parent ou de son tuteur.",
      ),
    ],
  },
  {
    heading: t("Changes", "Modifications"),
    body: [
      t(
        "We will update this page when our practices change and show the new date at the top.",
        "Nous mettrons cette page à jour en cas d’évolution de nos pratiques et indiquerons la nouvelle date en haut de page.",
      ),
    ],
  },
];

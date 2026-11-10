/**
 * The first six blog articles, imported once into the admin (Blog), where they can be edited or removed.
 * Body syntax: blank line = new paragraph, "## " heading, "### " subheading, "- " bullet, "1. " numbered step,
 * **bold**, [text](link).
 */
type Text = { title: string; excerpt: string; body: string };
export type SeedArticle = { slug: string; category: string; cover: string; publishedAt: string; en: Text; fr: Text };

export const ARTICLES: SeedArticle[] = [
  {
    slug: "choosing-paint-for-cameroon-climate",
    category: "painting-tips",
    cover: "/assets/images/services/exterior_painting_villa.png",
    publishedAt: "2026-11-02T08:00:00.000Z",
    en: {
      title: "How to choose the right paint for Cameroon's climate",
      excerpt: "Heat, heavy rain and constant humidity are hard on painted walls. Here is how to choose a paint that keeps its colour and stays on the wall for years.",
      body: `Paint that looks perfect on the day it is applied can start to fade, peel or turn green within a single rainy season. In Cameroon, walls face strong sun, long periods of rain and humidity that rarely drops. The right paint, on a well prepared surface, makes the difference between repainting every year and enjoying the same finish for many years.

## Start with where the paint will go

Interior and exterior paints are made for different conditions, and using one in place of the other is one of the most common causes of early failure.

- **Exterior walls** need a paint that resists ultraviolet light, rain and the growth of algae and mould. Look for products labelled for exterior or "all weather" use.
- **Interior living spaces** need a paint that is easy to clean and releases little odour, so rooms can be used again quickly.
- **Kitchens and bathrooms** need a washable finish that tolerates steam and splashes, ideally with an anti-mould additive.

## Water-based or oil-based?

For most walls, a good quality **water-based acrylic paint** is the best choice in our climate. It lets the wall breathe, so moisture trapped in the masonry can escape instead of pushing the paint off. It dries quickly, has a mild smell and keeps its colour well in the sun.

**Oil-based (solvent) paints** still have their place: on metal, on wood that takes knocks, and on surfaces that need a very hard finish. On masonry walls, however, they can trap moisture and blister.

## Choose the finish for the room, not only for the look

- **Matt** hides small imperfections in the wall but marks more easily. It suits ceilings and bedrooms.
- **Satin or eggshell** is easier to wipe clean and is a good everyday choice for living rooms, corridors and children's rooms.
- **Gloss** is the most resistant and the easiest to clean, which makes it useful on doors, frames and metal, but it shows every defect underneath.

## The primer and the preparation matter as much as the paint

Even the best paint will fail on a dusty, damp or salty wall. Before painting:

1. Repair cracks and fill holes.
2. Clean off dust, grease and any mould, and let the wall dry completely.
3. Apply a primer suited to the surface, especially on new plaster or on walls that have been patched.

New cement plaster needs time to cure and dry before it is painted. Painting too early is a frequent cause of stains and peeling.

## Colour and heat

Light colours reflect more sunlight and help keep exterior walls and rooms cooler. Very dark colours on sun-facing walls absorb more heat and tend to fade faster. If you love a strong colour, consider it for shaded walls or interior features.

## In short

Choose a paint made for the place it will go, prefer breathable water-based paints on masonry, match the finish to how the room is used, and never skip preparation. If you are not sure which system suits your building, [ask Surface Legend for advice and a free quote](/contact).`,
    },
    fr: {
      title: "Comment choisir la bonne peinture pour le climat du Cameroun",
      excerpt: "Chaleur, fortes pluies et humidité permanente mettent les murs à rude épreuve. Voici comment choisir une peinture qui garde sa couleur et tient pendant des années.",
      body: `Une peinture parfaite le jour de son application peut commencer à pâlir, à s’écailler ou à verdir dès la première saison des pluies. Au Cameroun, les murs subissent un soleil intense, de longues périodes de pluie et une humidité qui baisse rarement. La bonne peinture, sur un support bien préparé, fait la différence entre repeindre chaque année et profiter de la même finition pendant de nombreuses années.

## Partir de l’endroit où la peinture sera appliquée

Les peintures intérieures et extérieures sont conçues pour des conditions différentes, et utiliser l’une à la place de l’autre est l’une des causes les plus fréquentes de dégradation prématurée.

- **Les murs extérieurs** demandent une peinture qui résiste aux rayons ultraviolets, à la pluie et au développement des algues et moisissures. Choisissez des produits destinés à l’extérieur ou « toutes saisons ».
- **Les pièces de vie** demandent une peinture facile à nettoyer et peu odorante, pour pouvoir réutiliser rapidement les pièces.
- **Les cuisines et salles de bains** demandent une finition lessivable qui supporte la vapeur et les éclaboussures, idéalement avec un traitement anti-moisissure.

## Peinture à l’eau ou glycéro ?

Pour la plupart des murs, une **peinture acrylique à l’eau** de bonne qualité est le meilleur choix sous notre climat. Elle laisse respirer le mur : l’humidité contenue dans la maçonnerie peut s’échapper au lieu de décoller la peinture. Elle sèche vite, sent peu et garde bien sa couleur au soleil.

**Les peintures glycérophtaliques (à solvant)** restent utiles sur le métal, sur les boiseries exposées aux chocs et sur les surfaces qui doivent être très dures. Sur la maçonnerie, en revanche, elles peuvent emprisonner l’humidité et cloquer.

## Choisir la finition selon l’usage de la pièce

- **Le mat** masque les petits défauts du mur mais se marque plus facilement. Il convient aux plafonds et aux chambres.
- **Le satiné** se nettoie plus facilement : c’est un bon choix au quotidien pour les salons, couloirs et chambres d’enfants.
- **Le brillant** est le plus résistant et le plus facile à entretenir, idéal pour les portes, encadrements et surfaces métalliques, mais il révèle tous les défauts du support.

## La sous-couche et la préparation comptent autant que la peinture

Même la meilleure peinture ne tiendra pas sur un mur poussiéreux, humide ou salin. Avant de peindre :

1. Réparez les fissures et rebouchez les trous.
2. Éliminez poussière, graisse et moisissures, puis laissez le mur sécher complètement.
3. Appliquez une sous-couche adaptée au support, surtout sur un enduit neuf ou un mur rebouché.

Un enduit de ciment neuf doit avoir le temps de durcir et de sécher avant d’être peint. Peindre trop tôt provoque souvent taches et écaillage.

## Couleur et chaleur

Les teintes claires renvoient davantage la lumière du soleil et aident à garder murs extérieurs et pièces plus frais. Les couleurs très foncées sur des façades exposées absorbent plus de chaleur et ont tendance à pâlir plus vite. Si vous aimez une couleur soutenue, réservez-la aux murs ombragés ou aux éléments intérieurs.

## En résumé

Choisissez une peinture adaptée à son emplacement, privilégiez les peintures à l’eau respirantes sur la maçonnerie, adaptez la finition à l’usage de la pièce et ne négligez jamais la préparation. Si vous hésitez sur le système adapté à votre bâtiment, [demandez conseil et un devis gratuit à Surface Legend](/contact).`,
    },
  },
  {
    slug: "waterproofing-before-the-rainy-season",
    category: "waterproofing",
    cover: "/assets/images/services/waterproofing_terrace.png",
    publishedAt: "2026-11-03T08:00:00.000Z",
    en: {
      title: "Waterproofing before the rainy season: roofs, terraces and walls",
      excerpt: "Most water damage starts small: a crack on a terrace, a joint around a pipe, a wall that stays wet. Here is what to check, and when to act.",
      body: `Water is the most expensive enemy of a building. A small leak on a flat roof can soak a ceiling, damage electrical wiring and feed mould in the rooms below for months before anyone notices. The good news is that most of this damage can be prevented, and the best time to act is during the dry season, before the rains return.

## Where water usually gets in

- **Flat roofs and terraces**, especially where water collects instead of draining away.
- **Joints and edges**: where the roof meets a wall, around drains, pipes and water tanks.
- **Cracks** in plaster and concrete, even fine ones, which let water in by capillary action.
- **The base of walls**, where ground moisture rises and splashing rain hits.
- **Window and door frames** with failed seals.

## Signs that you already have a problem

1. Brown stains or rings on ceilings.
2. Paint that bubbles or flakes, often with a white powder underneath.
3. A musty smell, or black and green spots in corners.
4. Water pooling on a terrace for hours after rain.

If you see these signs, the source should be found and treated before repainting. Painting over a wet wall only hides the problem for a few weeks.

## How waterproofing works

Waterproofing creates a continuous barrier that water cannot cross, while letting the building shed the water it receives. Depending on the surface, this can be a liquid membrane that is rolled or brushed on, a cement-based coating, or a membrane laid in sheets. The details matter more than the product:

- The surface is cleaned, repaired and dried before application.
- Slopes are corrected so that water flows to the drains.
- Joints, corners and pipe penetrations are reinforced, because that is where most leaks start.
- The coating is applied in the thickness and number of coats the manufacturer specifies.

## Why timing matters

Most waterproofing products need a dry surface and dry weather to cure properly. Applied on a damp terrace or between two showers, they may never bond fully. Planning the work in the dry season gives the coating the conditions it needs and gives you time to correct anything before the first heavy rains.

## A simple yearly routine

1. Clear gutters, drains and terrace outlets before the rainy season.
2. Walk the roof or terrace and look for cracks, blisters and lifted edges.
3. Check ceilings and the tops of walls inside after the first big storm.
4. Repair small defects immediately, while they are still small.

A professional inspection costs far less than repairing a soaked ceiling. If your roof or terrace needs attention, [contact Surface Legend](/contact) to plan the work before the rains.`,
    },
    fr: {
      title: "L’étanchéité avant la saison des pluies : toitures, terrasses et murs",
      excerpt: "La plupart des dégâts des eaux commencent petit : une fissure sur une terrasse, un joint autour d’un tuyau, un mur qui reste humide. Voici quoi vérifier, et quand agir.",
      body: `L’eau est l’ennemi le plus coûteux d’un bâtiment. Une petite fuite sur un toit-terrasse peut imbiber un plafond, endommager l’installation électrique et entretenir des moisissures dans les pièces du dessous pendant des mois avant que quelqu’un ne s’en aperçoive. Bonne nouvelle : la plupart de ces dégâts peuvent être évités, et le meilleur moment pour agir est la saison sèche, avant le retour des pluies.

## Par où l’eau entre-t-elle ?

- **Les toits-terrasses et terrasses**, surtout là où l’eau stagne au lieu de s’écouler.
- **Les jonctions et rives** : là où la toiture rencontre un mur, autour des évacuations, des tuyaux et des réservoirs.
- **Les fissures** dans l’enduit et le béton, même fines, qui laissent entrer l’eau par capillarité.
- **Le bas des murs**, où remonte l’humidité du sol et où rebondit la pluie.
- **Les menuiseries** dont les joints sont usés.

## Les signes d’un problème existant

1. Des taches ou auréoles brunes au plafond.
2. Une peinture qui cloque ou s’écaille, souvent avec une poudre blanche dessous.
3. Une odeur de moisi, ou des points noirs et verts dans les angles.
4. De l’eau qui stagne sur une terrasse pendant des heures après la pluie.

Si vous constatez ces signes, il faut trouver et traiter l’origine avant de repeindre. Peindre un mur humide ne fait que masquer le problème quelques semaines.

## Comment fonctionne l’étanchéité

L’étanchéité crée une barrière continue que l’eau ne peut pas traverser, tout en permettant au bâtiment d’évacuer l’eau qu’il reçoit. Selon le support, il peut s’agir d’une membrane liquide appliquée au rouleau ou à la brosse, d’un revêtement à base de ciment ou d’une membrane en lés. Les détails comptent plus que le produit :

- Le support est nettoyé, réparé et séché avant l’application.
- Les pentes sont corrigées pour que l’eau s’écoule vers les évacuations.
- Les jonctions, angles et traversées de tuyaux sont renforcés, car c’est là que naissent la plupart des fuites.
- Le revêtement est appliqué selon l’épaisseur et le nombre de couches prévus par le fabricant.

## Pourquoi le calendrier compte

La plupart des produits d’étanchéité ont besoin d’un support sec et d’un temps sec pour bien sécher. Appliqués sur une terrasse humide ou entre deux averses, ils risquent de ne jamais adhérer complètement. Programmer les travaux en saison sèche donne au revêtement les conditions nécessaires et vous laisse le temps de corriger les défauts avant les premières fortes pluies.

## Une routine annuelle simple

1. Dégagez gouttières, évacuations et descentes de terrasse avant la saison des pluies.
2. Inspectez le toit ou la terrasse à la recherche de fissures, cloques et bords décollés.
3. Vérifiez les plafonds et le haut des murs à l’intérieur après le premier gros orage.
4. Réparez immédiatement les petits défauts, tant qu’ils sont encore petits.

Une inspection professionnelle coûte bien moins cher que la réparation d’un plafond détrempé. Si votre toiture ou votre terrasse a besoin d’attention, [contactez Surface Legend](/contact) pour programmer les travaux avant les pluies.`,
    },
  },
  {
    slug: "epoxy-floor-coatings-explained",
    category: "floors-and-coatings",
    cover: "/assets/images/services/industrial_painting_floor.png",
    publishedAt: "2026-11-04T08:00:00.000Z",
    en: {
      title: "Epoxy floor coatings: where they work best and how they are applied",
      excerpt: "Warehouses, workshops, garages, clinics and showrooms all ask a lot of their floors. Here is what an epoxy coating does, and what makes it last.",
      body: `Bare concrete floors produce dust, absorb oil and chemicals, and are hard to keep clean. An epoxy coating turns that concrete into a seamless, hard-wearing surface that is easy to clean and can be finished in the colours you choose. It is one of the most practical upgrades for floors that work hard every day.

## What is an epoxy floor?

Epoxy is a two-part resin: a base and a hardener that are mixed just before use. Once applied, they react and cure into a hard, dense layer that bonds to the concrete. Depending on the need, it can be applied as a thin coating, a thicker self-levelling layer, or with sand or flakes added for grip and appearance.

## Where it works best

- **Warehouses and factories**, where forklifts, pallets and spills wear down bare concrete.
- **Workshops and garages**, where oil and fuel would otherwise stain the floor for good.
- **Clinics, laboratories and kitchens**, where a seamless surface helps hygiene and cleaning.
- **Showrooms and offices**, where a smooth, bright floor improves the look of the space.

## What makes an epoxy floor last

The coating is only as good as its bond to the concrete. Almost every failed epoxy floor, with patches lifting or peeling, comes down to preparation.

1. **Mechanical preparation.** The concrete is ground or shot-blasted to remove the weak top layer and open the surface so the resin can grip.
2. **Repairs.** Cracks and holes are filled, and joints are treated.
3. **Moisture check.** Concrete that still holds a lot of water, or that receives moisture from the ground, can push a coating off. It must be checked before work starts.
4. **Primer, body coat and top coat**, each applied within the times the manufacturer specifies.
5. **Curing time.** The floor needs time before foot traffic, and longer before vehicles and heavy loads.

## Things to decide before the work

- **Slip resistance.** Areas that get wet or oily should have a textured finish.
- **Colours and markings.** Walkways, parking bays and safety zones can be marked in the coating itself.
- **Downtime.** Plan when the area can be closed while the floor is prepared and cured.
- **Sunlight.** Some epoxies yellow in direct sun, so outdoor and sunny areas may need a different top coat.

## Looking after it

Sweep regularly, clean spills quickly and use a neutral cleaner. A well applied coating can then serve for years, and worn areas can be recoated without replacing the whole floor.

Thinking about an epoxy floor for your warehouse, workshop or showroom? [Ask Surface Legend for a site visit and a quote](/contact).`,
    },
    fr: {
      title: "Les revêtements de sol époxy : où les utiliser et comment ils sont appliqués",
      excerpt: "Entrepôts, ateliers, garages, cliniques et showrooms sollicitent fortement leurs sols. Voici ce qu’apporte un revêtement époxy, et ce qui le fait durer.",
      body: `Un sol en béton brut produit de la poussière, absorbe huiles et produits chimiques et se nettoie mal. Un revêtement époxy transforme ce béton en une surface continue, très résistante, facile à entretenir et réalisable dans les couleurs de votre choix. C’est l’une des améliorations les plus utiles pour les sols très sollicités.

## Qu’est-ce qu’un sol époxy ?

L’époxy est une résine bicomposant : une base et un durcisseur mélangés juste avant l’emploi. Une fois appliqués, ils réagissent et forment une couche dure et dense qui adhère au béton. Selon le besoin, on l’applique en couche fine, en couche épaisse autolissante, ou avec du sable ou des paillettes pour l’adhérence et l’aspect.

## Où il est le plus utile

- **Entrepôts et usines**, où chariots élévateurs, palettes et déversements usent le béton nu.
- **Ateliers et garages**, où huiles et carburants tacheraient définitivement le sol.
- **Cliniques, laboratoires et cuisines**, où une surface sans joints facilite l’hygiène et le nettoyage.
- **Showrooms et bureaux**, où un sol lisse et lumineux valorise l’espace.

## Ce qui fait durer un sol époxy

Le revêtement ne vaut que par son adhérence au béton. Presque tous les sols époxy qui se décollent ou s’écaillent s’expliquent par une mauvaise préparation.

1. **Préparation mécanique.** Le béton est poncé ou grenaillé pour retirer la couche superficielle fragile et ouvrir la surface afin que la résine accroche.
2. **Réparations.** Fissures et trous sont rebouchés, les joints sont traités.
3. **Contrôle de l’humidité.** Un béton encore très humide, ou qui reçoit l’humidité du sol, peut faire décoller un revêtement. Il doit être contrôlé avant le début des travaux.
4. **Primaire, couche de masse et couche de finition**, chacune appliquée dans les délais prévus par le fabricant.
5. **Temps de séchage.** Le sol a besoin de temps avant la circulation piétonne, et plus encore avant les véhicules et charges lourdes.

## À décider avant les travaux

- **L’antidérapant.** Les zones mouillées ou grasses doivent recevoir une finition texturée.
- **Couleurs et marquages.** Allées, places de stationnement et zones de sécurité peuvent être tracées directement dans le revêtement.
- **L’immobilisation.** Prévoyez la période pendant laquelle la zone sera fermée pour la préparation et le séchage.
- **Le soleil.** Certains époxys jaunissent au soleil direct : les zones extérieures ou très ensoleillées peuvent nécessiter une autre couche de finition.

## L’entretien

Balayez régulièrement, nettoyez rapidement les déversements et utilisez un produit neutre. Un revêtement bien appliqué peut alors servir pendant des années, et les zones usées peuvent être reprises sans refaire tout le sol.

Vous envisagez un sol époxy pour votre entrepôt, votre atelier ou votre showroom ? [Demandez une visite et un devis à Surface Legend](/contact).`,
    },
  },
  {
    slug: "mould-and-damp-walls",
    category: "maintenance",
    cover: "/assets/images/services/mold_resistant_bathroom.png",
    publishedAt: "2026-11-05T08:00:00.000Z",
    en: {
      title: "Mould and damp walls: causes, and fixes that last",
      excerpt: "Black spots that keep coming back are a moisture problem first and a paint problem second. Here is how to find the cause and stop it returning.",
      body: `Mould on walls and ceilings is common in humid climates, and it is more than a cosmetic issue: it damages paint and plaster, smells, and can irritate the lungs, especially for children and people with asthma. Wiping it away or painting over it rarely works for long. To get rid of it, you need to deal with the moisture that feeds it.

## Where the moisture comes from

- **Condensation.** Warm, humid indoor air meets a cooler wall and leaves water behind. It is common in bathrooms, kitchens and bedrooms with closed windows.
- **Leaks.** Water from a roof, a terrace, a pipe or a window frame that soaks into the wall.
- **Rising damp.** Ground moisture that climbs into the base of walls, often leaving a tide mark and flaking paint near the floor.
- **Rain penetration.** Water driven into cracked or porous exterior walls.

The pattern is a good clue. Mould spread across the top corners of a room often points to condensation or a roof leak. A damp band along the bottom of a wall suggests rising damp or splashing rain outside.

## Fixing it properly

1. **Find and stop the source.** Repair the leak, improve drainage, seal cracks on the exterior, or treat rising damp. Nothing else lasts until this is done.
2. **Improve ventilation.** Open windows when possible, use extractor fans in bathrooms and kitchens, and avoid drying laundry indoors in closed rooms.
3. **Clean and treat the surface.** Remove the mould with a suitable fungicidal treatment, following the product instructions and protecting your eyes, hands and lungs.
4. **Let the wall dry fully.** This can take time after a leak. Paint applied on a wet wall will fail.
5. **Repaint with the right system.** A stain-blocking primer where needed, then an anti-mould paint designed for humid rooms.

## Anti-mould paint: what it can and cannot do

Anti-mould paints contain additives that slow the growth of mould on the paint surface, and they are a good choice for bathrooms, kitchens and laundries. They do not fix a leak or rising damp. Used on a dry, sound wall after the cause has been treated, they help keep the room clean for much longer.

## Everyday prevention

- Keep air moving, especially after showers and cooking.
- Leave a little space between furniture and exterior walls.
- Wipe condensation from windows and cold surfaces.
- Repair small leaks as soon as you see them.

If mould keeps coming back in your home or building, [talk to Surface Legend](/contact). We can help identify the cause and recommend a treatment and coating that suits the room.`,
    },
    fr: {
      title: "Moisissures et murs humides : les causes, et des solutions durables",
      excerpt: "Des taches noires qui reviennent sans cesse sont d’abord un problème d’humidité, ensuite un problème de peinture. Voici comment trouver la cause et empêcher leur retour.",
      body: `Les moisissures sur les murs et plafonds sont fréquentes sous les climats humides, et elles ne sont pas qu’un problème esthétique : elles abîment peinture et enduit, sentent mauvais et peuvent irriter les voies respiratoires, notamment chez les enfants et les personnes asthmatiques. Les essuyer ou peindre par-dessus suffit rarement longtemps. Pour s’en débarrasser, il faut traiter l’humidité qui les nourrit.

## D’où vient l’humidité ?

- **La condensation.** L’air chaud et humide de la pièce rencontre un mur plus frais et y dépose de l’eau. C’est fréquent dans les salles de bains, cuisines et chambres aux fenêtres fermées.
- **Les fuites.** L’eau d’un toit, d’une terrasse, d’un tuyau ou d’une menuiserie qui s’infiltre dans le mur.
- **Les remontées capillaires.** L’humidité du sol qui monte dans le bas des murs, laissant souvent une auréole et une peinture qui s’écaille près du sol.
- **Les infiltrations de pluie.** L’eau poussée dans des murs extérieurs fissurés ou poreux.

La répartition des taches est un bon indice. Des moisissures dans les angles hauts d’une pièce évoquent souvent la condensation ou une fuite de toiture. Une bande humide en bas d’un mur évoque plutôt des remontées capillaires ou des éclaboussures de pluie à l’extérieur.

## Le traitement durable

1. **Trouver et supprimer la source.** Réparez la fuite, améliorez l’évacuation des eaux, colmatez les fissures extérieures ou traitez les remontées capillaires. Rien d’autre ne tiendra tant que ce n’est pas fait.
2. **Améliorer la ventilation.** Ouvrez les fenêtres quand c’est possible, utilisez des extracteurs dans les salles de bains et cuisines, et évitez de faire sécher le linge dans des pièces fermées.
3. **Nettoyer et traiter le support.** Éliminez les moisissures avec un traitement fongicide adapté, en suivant le mode d’emploi et en protégeant yeux, mains et voies respiratoires.
4. **Laisser sécher complètement le mur.** Cela peut prendre du temps après une fuite. Une peinture appliquée sur un mur humide ne tiendra pas.
5. **Repeindre avec le bon système.** Une sous-couche bloquante si nécessaire, puis une peinture anti-moisissure conçue pour les pièces humides.

## La peinture anti-moisissure : ce qu’elle peut faire, et ce qu’elle ne peut pas faire

Les peintures anti-moisissure contiennent des additifs qui freinent le développement des moisissures à la surface de la peinture. Elles conviennent bien aux salles de bains, cuisines et buanderies. Elles ne réparent ni une fuite ni des remontées capillaires. Appliquées sur un mur sec et sain, une fois la cause traitée, elles aident à garder la pièce propre beaucoup plus longtemps.

## La prévention au quotidien

- Faites circuler l’air, surtout après la douche et la cuisine.
- Laissez un peu d’espace entre les meubles et les murs extérieurs.
- Essuyez la condensation sur les fenêtres et surfaces froides.
- Réparez les petites fuites dès que vous les voyez.

Si les moisissures reviennent sans cesse chez vous ou dans votre bâtiment, [parlez-en à Surface Legend](/contact). Nous pouvons vous aider à en identifier la cause et vous recommander un traitement et un revêtement adaptés à la pièce.`,
    },
  },
  {
    slug: "preparing-for-a-painting-project",
    category: "painting-tips",
    cover: "/assets/images/services/residential_painting_living_room.png",
    publishedAt: "2026-11-06T08:00:00.000Z",
    en: {
      title: "Planning a painting project: a step-by-step guide",
      excerpt: "From the first visit to the final walk-through, here is how a well run painting project unfolds, and how to prepare your home or building for it.",
      body: `Whether you are refreshing a single room or repainting a whole building, a little planning makes the work faster, cleaner and less stressful. Here is how a professional painting project usually unfolds, and what you can do at each stage.

## 1. Describe the project

Before the first visit, gather the basics: which rooms or walls, inside or outside, the approximate size, and anything you have noticed, such as cracks, damp patches or peeling paint. Photos help a lot. If you already have colours in mind, note them, even roughly.

## 2. The site visit and quote

A careful contractor looks at the surfaces before giving a price, because the condition of the walls decides how much preparation is needed. A good quote should make clear:

- Which surfaces are included, and which are not.
- The preparation work: repairs, cleaning, sanding, primer.
- The paint system: products, number of coats and finish.
- The expected duration and how the site will be protected.

Comparing quotes is easier when they describe the same work. A much lower price often means fewer coats or less preparation.

## 3. Choosing colours

Colours look different on a large wall and in different light. Try sample patches on the actual walls and look at them in the morning, at midday and in the evening before deciding. Remember that light colours make rooms feel larger and cooler, and that the finish (matt, satin or gloss) changes how a colour looks.

## 4. Preparing the space

- Move small furniture, decorations and electronics out of the room, and group large furniture in the centre.
- Take down curtains, frames and wall-mounted items.
- Agree on which areas the team can use for storing materials and cleaning tools.
- If people will keep living or working in the building, agree on a room-by-room schedule.

## 5. During the work

A well run job follows a clear order: protection of floors and furniture, repairs and preparation, primer, then the finishing coats. Expect some noise and dust during preparation. Ask questions at any stage, and point out anything you are unsure about while the team is still on site.

## 6. The final walk-through

Before the team leaves, walk through every room in good light with the person in charge. Check edges, corners, ceilings and the areas behind doors. Small touch-ups are normal and are much easier to do while the team and materials are still there. Ask for the names and colour references of the paints used, so future touch-ups match.

## Ready to start?

Send us your project details and a few photos, and [Surface Legend will arrange a visit and a free quote](/contact).`,
    },
    fr: {
      title: "Préparer un chantier de peinture : le guide étape par étape",
      excerpt: "De la première visite à la réception des travaux, voici comment se déroule un chantier de peinture bien mené, et comment préparer votre maison ou votre bâtiment.",
      body: `Que vous rafraîchissiez une seule pièce ou repeigniez tout un bâtiment, un peu de préparation rend les travaux plus rapides, plus propres et moins stressants. Voici comment se déroule habituellement un chantier de peinture professionnel, et ce que vous pouvez faire à chaque étape.

## 1. Décrire le projet

Avant la première visite, réunissez l’essentiel : quelles pièces ou quels murs, intérieur ou extérieur, la surface approximative, et ce que vous avez remarqué, comme des fissures, des taches d’humidité ou une peinture qui s’écaille. Les photos aident beaucoup. Si vous avez déjà des couleurs en tête, notez-les, même approximativement.

## 2. La visite et le devis

Un professionnel sérieux examine les surfaces avant de donner un prix, car l’état des murs détermine la préparation nécessaire. Un bon devis doit préciser :

- Les surfaces comprises, et celles qui ne le sont pas.
- Les travaux de préparation : réparations, nettoyage, ponçage, sous-couche.
- Le système de peinture : produits, nombre de couches et finition.
- La durée prévue et la façon dont le chantier sera protégé.

Comparer des devis est plus simple lorsqu’ils décrivent les mêmes travaux. Un prix beaucoup plus bas signifie souvent moins de couches ou moins de préparation.

## 3. Choisir les couleurs

Une couleur paraît différente sur un grand mur et selon la lumière. Faites des essais directement sur les murs et regardez-les le matin, à midi et le soir avant de décider. Les teintes claires agrandissent et rafraîchissent les pièces, et la finition (mate, satinée ou brillante) change l’aspect d’une couleur.

## 4. Préparer les lieux

- Sortez de la pièce les petits meubles, la décoration et l’électronique, et regroupez les grands meubles au centre.
- Décrochez rideaux, cadres et objets fixés aux murs.
- Convenez des espaces que l’équipe pourra utiliser pour stocker le matériel et nettoyer les outils.
- Si le bâtiment reste occupé pendant les travaux, convenez d’un planning pièce par pièce.

## 5. Pendant les travaux

Un chantier bien mené suit un ordre clair : protection des sols et du mobilier, réparations et préparation, sous-couche, puis couches de finition. Attendez-vous à un peu de bruit et de poussière pendant la préparation. Posez vos questions à tout moment, et signalez ce qui vous paraît douteux tant que l’équipe est encore sur place.

## 6. La réception des travaux

Avant le départ de l’équipe, faites le tour de chaque pièce, en bonne lumière, avec le responsable du chantier. Vérifiez les bords, les angles, les plafonds et les zones derrière les portes. Quelques retouches sont normales et bien plus simples à faire tant que l’équipe et le matériel sont encore là. Demandez les noms et références de couleur des peintures utilisées, pour que les futures retouches soient identiques.

## Prêt à commencer ?

Envoyez-nous les détails de votre projet et quelques photos, et [Surface Legend organisera une visite et un devis gratuit](/contact).`,
    },
  },
  {
    slug: "protecting-metal-and-steel-from-rust",
    category: "floors-and-coatings",
    cover: "/assets/images/services/steel_structure_beams.png",
    publishedAt: "2026-11-07T08:00:00.000Z",
    en: {
      title: "Protecting metal gates, roofs and steel structures from rust",
      excerpt: "Humidity, rain and salty sea air attack metal fast. Here is how a proper protective coating system keeps gates, roofs and structures sound for years.",
      body: `Metal is everywhere in our buildings: gates and grilles, roof sheets, water tanks, railings, and the steel frames of warehouses and factories. In a humid climate, and even more near the sea in cities such as Douala and Limbe, unprotected steel starts to rust quickly. Rust is not only ugly. It eats into the metal, weakens it and eventually makes replacement necessary.

## Why metal rusts so fast here

Rust forms when iron or steel is in contact with water and oxygen. Humidity provides the water almost all year round, and salt carried by sea air speeds the reaction up considerably. Scratches, sharp edges, welds and places where water collects are usually where rust starts first.

## A protective coating is a system, not a single paint

Lasting protection comes from several layers, each with its own job:

1. **Surface preparation.** Loose rust, old flaking paint, grease and salt are removed, by hand or power tools for small jobs, or by blasting for structures that need the best result. Paint applied over loose rust traps the problem underneath.
2. **Primer.** An anti-corrosive primer, often zinc-rich or zinc phosphate based, is applied on the clean metal as soon as possible, before new rust appears.
3. **Intermediate coat.** On structures and harsh environments, a thicker middle layer adds a barrier against moisture.
4. **Top coat.** The finishing layer resists sunlight and weather, and gives the colour.

The number of coats and their thickness depend on the environment. Steel near the coast or in industrial areas needs a stronger system than an indoor railing.

## Galvanised steel and roof sheets

Galvanised metal has a zinc coating that already protects it, but standard paint does not stick well to new galvanised surfaces. They need cleaning and a primer made for galvanised metal, otherwise the paint peels in sheets. Old roof sheets with rust spots should be treated locally before the whole roof is coated.

## Signs it is time to act

- Orange or brown streaks running down from bolts, joints and edges.
- Bubbles under the paint, which often hide rust spreading underneath.
- Flaking paint on gates and grilles where hands and hinges rub.

Treating rust early is quick and inexpensive. Waiting until the metal is pitted or holed costs far more.

## Simple maintenance

Wash metal surfaces, especially near the sea, to remove salt and dust. Inspect once or twice a year and touch up scratches and chips before rust spreads.

Do you have gates, roofs or steel structures that need protection? [Ask Surface Legend for an inspection and a quote](/contact).`,
    },
    fr: {
      title: "Protéger portails, toitures et structures métalliques contre la rouille",
      excerpt: "Humidité, pluie et air marin salé attaquent vite le métal. Voici comment un système de protection adapté garde portails, toitures et structures en bon état pendant des années.",
      body: `Le métal est partout dans nos bâtiments : portails et grilles, tôles de toiture, réservoirs d’eau, garde-corps, et charpentes métalliques des entrepôts et usines. Sous un climat humide, et plus encore près de la mer, dans des villes comme Douala ou Limbe, l’acier non protégé rouille rapidement. La rouille n’est pas seulement disgracieuse : elle ronge le métal, l’affaiblit et finit par imposer son remplacement.

## Pourquoi le métal rouille si vite ici

La rouille se forme lorsque le fer ou l’acier est au contact de l’eau et de l’oxygène. L’humidité apporte l’eau presque toute l’année, et le sel transporté par l’air marin accélère fortement la réaction. Les rayures, arêtes vives, soudures et zones où l’eau stagne sont généralement les premiers points d’attaque.

## Une protection est un système, pas une simple peinture

Une protection durable repose sur plusieurs couches, chacune avec son rôle :

1. **La préparation du support.** La rouille non adhérente, l’ancienne peinture qui s’écaille, la graisse et le sel sont éliminés, à la main ou avec des outils électriques pour les petits travaux, ou par sablage pour les structures qui exigent le meilleur résultat. Une peinture appliquée sur de la rouille non adhérente enferme le problème dessous.
2. **Le primaire.** Un primaire anticorrosion, souvent riche en zinc ou au phosphate de zinc, est appliqué sur le métal propre le plus tôt possible, avant l’apparition d’une nouvelle rouille.
3. **La couche intermédiaire.** Sur les structures et en milieu agressif, une couche plus épaisse ajoute une barrière contre l’humidité.
4. **La couche de finition.** Elle résiste au soleil et aux intempéries et donne la couleur.

Le nombre de couches et leur épaisseur dépendent de l’environnement. Une charpente proche de la mer ou en zone industrielle demande un système plus robuste qu’un garde-corps intérieur.

## L’acier galvanisé et les tôles

Le métal galvanisé possède une couche de zinc qui le protège déjà, mais une peinture ordinaire adhère mal sur une surface galvanisée neuve. Il faut la nettoyer et appliquer un primaire conçu pour le galvanisé, sinon la peinture se décolle par plaques. Sur une vieille toiture en tôle, les points de rouille doivent être traités localement avant de peindre l’ensemble.

## Les signes qu’il faut agir

- Des coulures orange ou brunes qui descendent des boulons, jonctions et arêtes.
- Des cloques sous la peinture, qui cachent souvent une rouille qui progresse.
- Une peinture qui s’écaille sur les portails et grilles, là où frottent les mains et les charnières.

Traiter la rouille tôt est rapide et peu coûteux. Attendre que le métal soit piqué ou percé coûte bien plus cher.

## Un entretien simple

Lavez les surfaces métalliques, surtout près de la mer, pour retirer le sel et la poussière. Inspectez-les une ou deux fois par an et retouchez rayures et éclats avant que la rouille ne s’étende.

Vous avez des portails, des toitures ou des structures métalliques à protéger ? [Demandez une inspection et un devis à Surface Legend](/contact).`,
    },
  },
];

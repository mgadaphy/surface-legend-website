import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import PaintProducts from "./pages/PaintProducts";
import ArtAcademy from "./pages/ArtAcademy";
import ResidentialPainting from "./pages/services/ResidentialPainting";
import CommercialPainting from "./pages/services/CommercialPainting";
import EpoxyFloorCoating from "./pages/services/EpoxyFloorCoating";
import POPDecorativeFinishes from "./pages/services/POPDecorativeFinishes";
import InteriorPainting from "./pages/services/InteriorPainting";
import Waterproofing from "./pages/services/Waterproofing";
import ExteriorPainting from "./pages/services/ExteriorPainting";
import MetalPainting from "./pages/services/MetalPainting";
import RoofPainting from "./pages/services/RoofPainting";
import SteelStructurePainting from "./pages/services/SteelStructurePainting";
import MoldResistantCoatings from "./pages/services/MoldResistantCoatings";
import HighriseBuildingPainting from "./pages/services/HighriseBuildingPainting";
import ProtectiveIndustrialCoatings from "./pages/services/ProtectiveIndustrialCoatings";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/services"} component={Services} />
      <Route path={"/products"} component={PaintProducts} />
      <Route path={"/academy"} component={ArtAcademy} />
      <Route path={"/portfolio"} component={Portfolio} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/services/residential-painting"} component={ResidentialPainting} />
      <Route path={"/services/commercial-painting"} component={CommercialPainting} />
      <Route path={"/services/interior-painting"} component={InteriorPainting} />
      <Route path={"/services/exterior-painting"} component={ExteriorPainting} />
      <Route path={"/services/metal-painting"} component={MetalPainting} />
      <Route path={"/services/roof-painting"} component={RoofPainting} />
      <Route path={"/services/waterproofing"} component={Waterproofing} />
      <Route path={"/services/epoxy-floor-coating"} component={EpoxyFloorCoating} />
      <Route path={"/services/pop-decorative-finishes"} component={POPDecorativeFinishes} />
      <Route path={"/services/steel-structure-painting"} component={SteelStructurePainting} />
      <Route path={"/services/mold-resistant-coatings"} component={MoldResistantCoatings} />
      <Route path={"/services/highrise-building-painting"} component={HighriseBuildingPainting} />
      <Route path={"/services/protective-industrial-coatings"} component={ProtectiveIndustrialCoatings} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - Craftsmanship Modernism Design: Light theme with charcoal, terracotta, and cream colors
// - Typography: Playfair Display (headers), Lato (body), Montserrat (accents)
// - No dark mode for this design

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider
          defaultTheme="light"
        >
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

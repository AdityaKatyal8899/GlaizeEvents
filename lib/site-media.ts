/**
 * GLAIZ EVENTS — Central Media Registry & Asset Slot System
 * 
 * DESIGN ARCHITECTURE:
 * 1. Current Phase (Phase 1):
 *    All site media placements are mapped to structured semantic slot IDs.
 *    Any manual photo update requested by the client can be updated right here in seconds.
 * 
 * 2. Future Intelligence Layer / Admin CMS (Phase 2 Upsell):
 *    These exact slot keys (e.g. 'home.hero.main', 'portfolio.royal-wedding') mirror the 
 *    future MongoDB `MediaPlacements` schema 1:1, allowing visual slot assignment 
 *    directly from the client admin dashboard without altering UI components.
 */

export interface MediaSlot {
  id: string
  label: string
  location: string
  aspectRatio: string
  recommendedResolution: string
  url: string
  alt: string
}

export const SITE_MEDIA = {
  home: {
    hero: {
      id: 'home.hero.main',
      label: 'Homepage Hero Primary Canvas',
      location: 'Homepage — Top fold background',
      aspectRatio: '16:9 or 21:9',
      recommendedResolution: '1920x1080px',
      url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=85',
      alt: 'Luxury event spatial architecture and ambient lighting',
    },
    heroDetail: {
      id: 'home.hero.detail',
      label: 'Homepage Hero Secondary Inset',
      location: 'Homepage — Hero floating vignette',
      aspectRatio: '4:5',
      recommendedResolution: '1000x1250px',
      url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=85',
      alt: 'Curated heritage tablescape with candlelight',
    },
    wedding: {
      id: 'home.service.wedding',
      label: 'Event Production Discipline Showcase',
      location: 'Homepage — Services Grid 04',
      aspectRatio: '16:10',
      recommendedResolution: '1200x750px',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      alt: 'Grand event stage and production setup',
    },
    corporate: {
      id: 'home.service.corporate',
      label: 'Corporate & Brand Events Showcase',
      location: 'Homepage — Services Grid 01',
      aspectRatio: '16:10',
      recommendedResolution: '1200x750px',
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
      alt: 'Glaiz Events Corporate and Brand Events Management & Production',
    },
    celebration: {
      id: 'home.service.celebration',
      label: 'Artist Management & Celebrations Showcase',
      location: 'Homepage — Services Grid 03',
      aspectRatio: '16:10',
      recommendedResolution: '1200x750px',
      url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85',
      alt: 'Intimate evening milestone celebration dining',
    },
    live: {
      id: 'home.service.live',
      label: 'Live Concerts & Productions Showcase',
      location: 'Homepage — Services Grid 02',
      aspectRatio: '16:10',
      recommendedResolution: '1200x750px',
      url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85',
      alt: 'Glaiz Events open-air live concert stage production',
    },
    cta: {
      id: 'home.cta.background',
      label: 'Homepage Closing Callout Showcase',
      location: 'Homepage — Final CTA section',
      aspectRatio: '16:9',
      recommendedResolution: '1400x800px',
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85',
      alt: 'Glaiz Events live production and unforgettable crowd experience',
    },
  },

  about: {
    studio1: {
      id: 'about.studio.architectural',
      label: 'Studio Atelier Scenography',
      location: 'About — Showcase Card 01',
      aspectRatio: '4:5',
      recommendedResolution: '1000x1250px',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=85',
      alt: 'Atelier design moodboard and spatial carpentry planning',
    },
    studio2: {
      id: 'about.studio.production',
      label: 'Live Production Engineering',
      location: 'About — Showcase Card 02',
      aspectRatio: '4:5',
      recommendedResolution: '1000x1250px',
      url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=85',
      alt: 'Acoustic sound check and precision trussing deployment',
    },
    leaders: [
      {
        id: 'about.leader.kunal',
        name: 'Kunal Rathor',
        role: 'Founder & Principal Creative Director',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
      },
    ],
  },

  services: {
    wedding: {
      id: 'services.wedding',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    },
    corporate: {
      id: 'services.corporate',
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
    },
    celebration: {
      id: 'services.celebration',
      url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85',
    },
    live: {
      id: 'services.live',
      url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85',
    },
  },

  portfolio: [
    {
      id: 'portfolio.corporate-summit',
      title: 'Corporate Conference Production',
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 'portfolio.brand-activation',
      title: 'Brand Activation Event',
      url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 'portfolio.summer-nights',
      title: 'Live Concert & Music Show',
      url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 'portfolio.evening-bloom',
      title: 'Dandiya & Festive Night',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 'portfolio.heritage-sangeet',
      title: 'Private Social Evening',
      url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 'portfolio.brand-premiere',
      title: 'College Fest & Campus Live',
      url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85',
    },
  ],
}

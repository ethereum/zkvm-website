# zkVM Website Restructure Design

**Date**: 2026-01-17
**Status**: Approved for Implementation
**Reference**: [HackMD Planning Document](https://hackmd.io/@c0g00/BJOSIfJ7Wl)

## Overview

This design restructures the zkVM website to serve as the authoritative resource answering three key questions:
1. "What is Ethereum's ZK L1 scaling project?"
2. "How will it reach production?"
3. "Where does the project stand today?"

**Target Audience**: Core developers, ZKVM teams, and researchers (primary); informed community members (secondary)

**Design Philosophy**: Technical + approachable (inspired by cpu.land) - custom illustrations, decorative elements, generous whitespace, conversational tone while maintaining technical rigor.

---

## Site Architecture

### Overall Structure

```
/                    → Minimal landing page
/learn               → Educational content (linear chapters)
/learn/chapter-0     → What is ZK L1 scaling?
/learn/chapter-1     → Provers, Builders, and Validators
/learn/chapter-2     → What ZKEVMs Can't Do
/learn/chapter-3     → The Path to Production
/track               → Progress tracking dashboard
/track/real-time-proving        → Workstream 1 category
/track/client-integration       → Workstream 2 category
/track/economic-security        → Workstream 3 category
/track/testing-validation       → Testing & validation category
/blog                → Existing blog (enhanced with workstream metadata)
/blog/[slug]         → Individual blog posts
```

### Navigation System

**Top Navigation Bar** (persistent across all pages):
- Logo/Home | Learn | Track | Blog

**Breadcrumbs**: Show current location
- Example: `Track > Client Integration > Geth`

**Contextual Sub-Navigation**:
- **Learn pages**: Left sidebar with chapter list, prev/next chapter buttons
- **Track pages**: Left sidebar with category list (workstream-based)
- **Blog pages**: Tag filtering by workstream/topic

---

## Page Designs

### 1. Home Page (`/`)

**Purpose**: Answer "What is this?" and direct to Learn/Track/Blog

**Layout**:
- Minimal hero section:
  - Project title: "Ethereum ZK L1 Scaling"
  - 2-3 sentence explanation
  - Simple architectural diagram showing: Builders → Provers → Validators flow
  - Three prominent navigation cards with descriptions:
    - **Learn How It Works** → Comprehensive educational content explaining ZK L1 scaling
    - **Track Progress** → Real-time progress across all workstreams and implementations
    - **Read Blog** → Technical deep-dives and research updates

**Visual Style**: Clean, spacious, friendly illustrations

**Migration Notes**:
- Remove existing multi-section homepage (Hero, ScalabilitySection, ImpactSection, RoadmapSection, etc.)
- Repurpose some content for Learn section chapters
- Keep branding/styling elements consistent

---

### 2. Learn Section

**Purpose**: Educational narrative answering "What is ZK L1 scaling?" and "How does it work?"

**Structure**: Linear chapter progression (cpu.land-inspired)

**Chapters**:

1. **Chapter 0: What is ZK L1 Scaling?**
   - The basic concept of ZK proofs on Ethereum L1
   - Why Ethereum needs this scaling approach
   - High-level benefits and tradeoffs

2. **Chapter 1: Provers, Builders, and Validators**
   - How these actors interact in the zkEVM architecture
   - The proving flow: block creation → proof generation → verification
   - Protocol integration points

3. **Chapter 2: What ZKEVMs Can't Do**
   - Technical limitations and constraints
   - Performance boundaries (latency, throughput)
   - Economic and security considerations

4. **Chapter 3: The Path to Production**
   - Roadmap overview (high-level version of Track section)
   - Key milestones and dependencies
   - Timeline considerations

**Content Strategy**:
- Launch with chapter outlines and brief summaries
- Mark detailed sections as "Coming soon"
- Progressive content fill-in (prevents perfect content from blocking launch)
- Repurpose existing homepage content where applicable

**Navigation**:
- Left sidebar: Chapter list with progress indicator
- Bottom of page: Prev/Next chapter buttons
- Breadcrumbs: `Learn > Chapter 1`

**Visual Elements**:
- Custom illustrations for key concepts
- Decorative SVG elements (cpu.land style)
- Code examples where relevant
- Interactive diagrams where helpful (optional enhancement)

---

### 3. Track Section

**Purpose**: Answer "Where does the project stand today?" with concrete, measurable progress

**Main Dashboard** (`/track`):

Landing page showing four category cards:

1. **Real-Time Proving** (Workstream 1)
   - Focus: Prover performance, benchmarks, hardware acceleration
   - Key metrics preview: Proof generation time, parallelization status

2. **Client & Protocol Integration** (Workstream 2)
   - Focus: Client readiness, protocol specifications
   - Key metrics preview: Client compliance progress

3. **Economic Incentives & Security** (Workstream 3)
   - Focus: Research milestones, audit status
   - Key metrics preview: Audits completed, research papers

4. **Testing & Validation**
   - Focus: Test coverage, RISC-V compliance, specification compliance
   - Key metrics preview: Test pass rates, compliance percentages

Each card shows:
- Category name and icon
- 1-sentence description
- High-level progress indicator
- "Last updated" timestamp
- Click to drill into detailed category page

**Recent Changes Feed**:
- Small section showing recent updates across all categories
- Example: "Jan 15: Geth witness generation marked complete"
- Supports monthly review visibility

---

**Category Detail Pages** (e.g., `/track/client-integration`):

Each category has custom visualizations suited to its data type:

**Real-Time Proving** (`/track/real-time-proving`):
- Performance charts showing proof time trends over time
- Benchmark comparison tables (SP1, Risc0, etc.)
- Progress bars for optimization milestones
- Checklist of measurable goals with verification:
  - ☐ / ⏳ / ✅ status with actual metrics
  - Example: "✅ Sub-15s proof generation (verified: 12.3s on Dec 2025)"

**Client & Protocol Integration** (`/track/client-integration`):
- Dependency graph showing client relationships (Vitalik roadmap style)
- Per-client progress cards (similar to current ClientStatus component)
- Checklist format for each client:
  - Up to date with hardforks
  - Passes EEST tests
  - Generates ExecutionWitness
  - Compiles to zkVM target
- Support matrix showing which zkVMs work with which clients

**Economic Incentives & Security** (`/track/economic-security`):
- Timeline/roadmap for research milestones
- Audit status table with links to reports
- Security review tracking
- Checklist for economic model components

**Testing & Validation** (`/track/testing-validation`):
- Test coverage matrices (RISC-V compliance, EEST tests)
- Compliance checkboxes with percentages
- Guest program support matrices
- Test trend charts over time

**Milestone Visualization Pattern** (used across all categories):

Checklist with three states:
- ☐ **Not achieved**: Gray, shows target
- ⏳ **In progress**: Orange/yellow, shows current metric (e.g., "82% - 1,234/1,500 tests")
- ✅ **Achieved**: Green checkmark, shows verification info (date, link, final value)

For metrics: Show actual numbers with checkbox state
For binary milestones: Just show achieved/not achieved

**Breadcrumbs**: `Track > Client Integration`

**Category Sub-navigation**: Sidebar showing all four categories, highlighting current

---

### 4. Blog Section

**Enhancement**: Link blog posts to Track workstreams

**Changes**:
1. Add metadata to blog posts:
   - `workstream`: "real-time-proving" | "client-integration" | "economic-security" | "testing-validation"
   - `topics`: ["security", "performance", "audits", etc.]

2. Blog index enhancements:
   - Filter by workstream/topic tags
   - Optional "featured post" section
   - "Related tracking" sidebar: Link to relevant Track category

3. Individual blog posts:
   - Show workstream badge at top
   - "See current progress" link to relevant Track category
   - Example: Post about proving performance → links to `/track/real-time-proving`

**Otherwise**: Keep existing blog structure unchanged

---

## Data Structure

### Track Data Management

**Single Source of Truth**: `/src/data/track-data.ts`

```typescript
// Unified tracking data structure
export interface Milestone {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'achieved';
  metric?: {
    current: number;
    target: number;
    unit: string;
  };
  verification?: {
    date: string;
    link?: string;
    note?: string;
  };
}

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  workstream: number; // 1, 2, 3, or null for testing-validation
  icon: string;
  lastUpdated: string;
  milestones: Milestone[];
  visualizations: {
    type: 'chart' | 'table' | 'graph' | 'matrix';
    data: any; // Specific to visualization type
  }[];
}

export interface RecentChange {
  date: string;
  category: string;
  description: string;
  milestoneId?: string;
}

export const trackData = {
  categories: CategoryData[];
  recentChanges: RecentChange[];
};
```

**Benefits**:
- Single import for all Track pages
- Easy to see cross-category dependencies
- Centralized updates for monthly reviews
- Type safety across all Track components

---

## Component Architecture

### New Components to Build

**Layout Components**:
1. `MinimalHeader.tsx` - Simplified nav for new structure
2. `Breadcrumbs.tsx` - Navigation breadcrumbs
3. `CategorySidebar.tsx` - Track category navigation
4. `ChapterSidebar.tsx` - Learn chapter navigation

**Home Page**:
1. `MinimalHero.tsx` - Title, description, diagram
2. `NavigationCards.tsx` - Three main nav cards

**Learn Section**:
1. `ChapterLayout.tsx` - Wrapper for all chapters
2. `ChapterContent.tsx` - Renders chapter markdown/content
3. `ChapterNavigation.tsx` - Prev/next buttons

**Track Section**:
1. `TrackDashboard.tsx` - Main landing with category cards
2. `CategoryCard.tsx` - Individual category preview card
3. `RecentChangesFeed.tsx` - Shows recent updates
4. `MilestoneChecklist.tsx` - Renders checklist with verification
5. `PerformanceChart.tsx` - For real-time proving metrics
6. `DependencyGraph.tsx` - For client integration (Vitalik-style)
7. `TimelineRoadmap.tsx` - For economic/security milestones
8. `TestMatrix.tsx` - For testing validation

**Blog**:
1. `WorkstreamBadge.tsx` - Shows associated workstream
2. `RelatedTracking.tsx` - Links to Track category

### Components to Repurpose

- Existing `ClientStatus.tsx` → Integrate into `/track/client-integration`
- Existing `ZKEVMTracker.tsx` → Integrate into `/track/real-time-proving` or `/track/testing-validation`
- Content from `ScalabilitySection`, `ImpactSection`, `RoadmapSection` → Repurpose for Learn chapters

### Components to Remove

From homepage (no longer needed with minimal landing):
- `Hero.tsx` (replaced by `MinimalHero`)
- `ScalabilitySection.tsx` (content → Learn)
- `ImpactSection.tsx` (content → Learn)
- `RoadmapSection.tsx` (content → Learn Ch 3 + Track)
- `ZKEVMReadiness.tsx` (functionality → Track)
- `BookSection.tsx` (evaluate if needed)
- `TeamSection.tsx` (evaluate if needed)

---

## Visual Design System

**Inspiration**: cpu.land (approachable technical content)

**Key Elements**:

1. **Typography**:
   - Clean, readable fonts
   - Generous line height and spacing
   - Clear hierarchy (h1, h2, h3)

2. **Illustrations**:
   - Custom diagrams for architecture concepts
   - Friendly, approachable style (not sterile technical diagrams)
   - Decorative SVG elements for visual breathing room
   - Example: Simple builder → prover → validator flow diagram

3. **Color Palette**:
   - Maintain existing brand colors
   - Status colors:
     - Green (✅): Achieved/Complete
     - Orange/Yellow (⏳): In Progress
     - Gray (☐): Not Started
     - Blue: Informational
     - Red: Caution/Warning

4. **Spacing & Layout**:
   - Generous whitespace (cpu.land style)
   - Max content width for readability
   - Card-based layouts for Track dashboard
   - Sidebar navigation with clear visual hierarchy

5. **Interactive Elements**:
   - Hover states for cards and links
   - Smooth transitions
   - Expandable sections where appropriate
   - Breadcrumbs for wayfinding

---

## Content Strategy

### Learn Section Content

**Phase 1** (Launch):
- Chapter structure with titles and descriptions
- Brief summaries (2-3 paragraphs per chapter)
- Key concept outlines
- Placeholder sections marked "Coming soon"

**Phase 2** (Progressive enhancement):
- Full chapter content with custom illustrations
- Code examples where relevant
- Interactive diagrams
- Cross-references to Track section

**Content Sources**:
- Repurpose existing homepage sections
- Extract from blog posts
- New educational writing where needed

### Track Section Content

**Monthly Review Cadence**:
- Update milestones and metrics
- Add entries to Recent Changes feed
- Update "Last updated" timestamps
- Review and verify achievements

**Milestone Criteria** (from HackMD):
- RISC-V compliance monitoring
- Test coverage metrics
- Guest program support matrices
- Proof generation performance benchmarks
- Audit tracking and security validation status

### Blog Section Content

**Metadata Addition**:
- Tag existing posts with workstream associations
- Add topic tags
- Create workstream relationship links

**Future Posts**:
- Reference Track progress where relevant
- Link to Learn chapters for background
- Add workstream metadata at creation time

---

## Implementation Phases

### Phase 1: Core Structure
1. Create new page routes (/, /learn, /track, /blog)
2. Build minimal home page with navigation cards
3. Set up Learn chapter structure with placeholders
4. Create Track dashboard with category cards
5. Update blog with workstream metadata
6. Implement navigation (top nav, breadcrumbs, sidebars)

### Phase 2: Track Categories
1. Build unified `track-data.ts` structure
2. Implement each category detail page:
   - Real-Time Proving (charts, benchmarks)
   - Client Integration (dependency graph, client cards)
   - Economic Security (timeline, audits)
   - Testing Validation (test matrices)
3. Build Recent Changes feed
4. Migrate existing tracker data

### Phase 3: Learn Content
1. Write chapter summaries and outlines
2. Create custom illustrations
3. Repurpose existing content
4. Fill in detailed chapter sections progressively

### Phase 4: Polish & Enhancement
1. Visual design refinements
2. Interactive elements
3. Performance optimization
4. Mobile responsiveness
5. Accessibility improvements

---

## Migration Strategy

### Existing Content Mapping

**Homepage Sections → New Location**:
- `Hero` → New `MinimalHero` on home page
- `ScalabilitySection` → Learn Chapter 0 content
- `ImpactSection` → Learn Chapter 0 or 3 content
- `RoadmapSection` → Learn Chapter 3 + Track overview
- `ZKEVMReadiness` → Track (real-time-proving or testing-validation)
- `ClientStatus` → Track (client-integration)
- `BlogSection` → Keep on new home? Or remove since Blog is top-nav
- `BookSection` → Evaluate retention
- `TeamSection` → Evaluate retention

### URL Redirects

Maintain existing URLs if possible:
- `/blog` → Keep same
- `/blog/[slug]` → Keep same
- `/zkvm-tracker` → Redirect to `/track/real-time-proving` or `/track`

Add redirects for any changed URLs to prevent broken links.

---

## Success Criteria

The restructure is successful when:

1. **Clear Navigation**: Visitors can immediately understand the three sections (Learn/Track/Blog) and navigate to what they need
2. **Question Answering**: Each section clearly answers its key question:
   - Home: "What is this project?"
   - Learn: "How does it work?"
   - Track: "Where does it stand today?"
3. **Measurable Progress**: Track section shows concrete milestones with verification
4. **Connected Content**: Blog posts link to Track categories, Learn chapters reference Track progress
5. **Maintainable**: Monthly updates to Track data are straightforward
6. **Approachable**: Technical content feels accessible (cpu.land aesthetic)

---

## Open Questions

1. **Team/Book sections**: Should these be retained somewhere or removed entirely?
2. **Detailed Learn content**: Who will write the full chapter content?
3. **Dependency graph implementation**: Should we build custom or use a library?
4. **Data update process**: Who manages monthly Track data updates?
5. **Blog post migration**: Do we need to update all existing posts with workstream metadata immediately, or can it be gradual?

---

## References

- [HackMD Planning Document](https://hackmd.io/@c0g00/BJOSIfJ7Wl)
- [cpu.land](https://cpu.land/) - Design inspiration
- [Butterfly Tracker](https://butterfly.raxhvl.com/glamsterdam/7928) - Visualization reference (contrast example)

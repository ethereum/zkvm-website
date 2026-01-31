# eth-act/planning Projects Integration Design

## Overview

Integrate the 8 interconnected projects from [eth-act/planning](https://github.com/eth-act/planning/blob/main/projects.md) into the zkEVM website roadmap tracking system. Map projects to existing categories, track phase-based progress, and add guest programs as trackable entities.

## Goals

- Map 8 projects from planning docs to existing 4 categories
- Track sequential phases as roadmap items with dependencies
- Add guest programs as first-class entities (like clients/zkVMs)
- Support new applicableType values: `guest-program` and `infrastructure`
- Leave timelines undefined where planning docs don't specify them
- Remove priority field from roadmap items

## Category Reorganization & Project Mapping

### Rename Category
- `economic-security` → `security`

### Project-to-Category Mapping

**client-integration** (3 projects):
- Project 1: ExecutionWitness - EL clients generate per-block stateless data
- Project 2: Guest Program - Stateless validation programs (phases 0-5)
- Project 4: Consensus Layer Integration - CL proof verification (phases 0-3)

**real-time-proving** (3 projects):
- Project 5: Prover Infrastructure - GPU proving, zkboost integration
- Project 6: Benchmarking & Metrics - Opcode repricing, hardware requirements
- Project 8: ePBS - Increase proof generation time (Q3 2026)

**security** (1 project):
- Project 7: Security - Audits, formal verification, threat modeling

**testing-validation** (1 project):
- Project 3: zkVM-guest API Standardization - Interface specs, precompile standards

Each project becomes multiple roadmap items (one per phase where applicable, or grouped deliverables for projects without phases).

## Data Model Updates

### Updated RoadmapItem Interface

```typescript
export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  category: string; // Category ID
  status: 'not-started' | 'in-progress' | 'completed';
  targetDate?: string; // Optional - undefined for items without known timelines
  dependencies?: string[]; // IDs of other roadmap items
  relatedClients?: string[]; // IDs of related clients
  milestoneIds?: string[]; // IDs of milestones this roadmap item tracks
  applicableType?: 'execution' | 'consensus' | 'zkvm' | 'both' | 'guest-program' | 'infrastructure';
  // REMOVED: priority field
}
```

### New applicableType Values

- `guest-program` - Tracks guest program implementations (reth-guest, geth-guest, etc.)
- `infrastructure` - For cross-cutting items like API standardization, prover infrastructure (no per-implementation progress tracking)

### New GuestProgram Interface

```typescript
export interface GuestProgram {
  id: string; // e.g., 'reth-guest', 'geth-guest'
  name: string; // e.g., 'Reth Guest Program'
  description: string;
  language: string; // e.g., 'Rust'
  repository?: string;
  maintainer?: string;

  // Track Guest Program phases 0-5
  milestoneStatuses: {
    [milestoneId: string]: MilestoneStatus; // 'guest-program-phase-0', etc.
  };
}
```

### Updated TrackData Interface

```typescript
export interface TrackData {
  categories: CategoryData[];
  roadmap: RoadmapItem[];
  clients: Client[];
  zkvms: ZKVM[];
  guestPrograms: GuestProgram[]; // NEW
}
```

## Roadmap Items Structure

### Project 1: ExecutionWitness (client-integration)

**Single roadmap item:**
```typescript
{
  id: 'execution-witness',
  title: 'ExecutionWitness Generation',
  description: 'Enable prover artifact creation for execution proofs via RPC endpoint. Generate Merkle Patricia Trie Multi Witness for recent blocks.',
  category: 'client-integration',
  status: 'in-progress',
  applicableType: 'execution'
}
```

### Project 2: Guest Program (client-integration)

**6 roadmap items (Phases 0-5) with sequential dependencies:**

```typescript
{
  id: 'guest-program-phase-0',
  title: 'Guest Program: Phase 0 - Compile Empty Program',
  description: 'Compile empty program to RV64IM-None RISC-V target using Dockerfile',
  category: 'client-integration',
  status: 'in-progress',
  dependencies: [],
  milestoneIds: ['guest-program-phase-0'],
  applicableType: 'guest-program'
}

{
  id: 'guest-program-phase-1',
  title: 'Guest Program: Phase 1 - MPT Witnesses',
  description: 'Create validation program using Merkle Patricia Trie witnesses and test against Ethereum specs',
  category: 'client-integration',
  status: 'not-started',
  dependencies: ['guest-program-phase-0'],
  milestoneIds: ['guest-program-phase-1'],
  applicableType: 'guest-program'
}

{
  id: 'guest-program-phase-2',
  title: 'Guest Program: Phase 2 - Target Compilation',
  description: 'Compile validation program to target architecture',
  category: 'client-integration',
  status: 'not-started',
  dependencies: ['guest-program-phase-1'],
  milestoneIds: ['guest-program-phase-2'],
  applicableType: 'guest-program'
}

{
  id: 'guest-program-phase-3',
  title: 'Guest Program: Phase 3 - I/O Integration',
  description: 'Integrate zkVM input/output mechanisms (stdout, stdin alternatives)',
  category: 'client-integration',
  status: 'not-started',
  dependencies: ['guest-program-phase-2'],
  milestoneIds: ['guest-program-phase-3'],
  applicableType: 'guest-program'
}

{
  id: 'guest-program-phase-4',
  title: 'Guest Program: Phase 4 - Precompiles',
  description: 'Integrate zkVM precompiles for function acceleration',
  category: 'client-integration',
  status: 'not-started',
  dependencies: ['guest-program-phase-3'],
  milestoneIds: ['guest-program-phase-4'],
  applicableType: 'guest-program'
}

{
  id: 'guest-program-phase-5',
  title: 'Guest Program: Phase 5 - Distribution',
  description: 'Reproducible builds, signed ELFs, Docker integration. Naming: <EL_NAME>-<EL_VERSION>-<ZKVM_NAME>-<ZKVM_SDK_VERSION>',
  category: 'client-integration',
  status: 'not-started',
  dependencies: ['guest-program-phase-4'],
  milestoneIds: ['guest-program-phase-5'],
  applicableType: 'guest-program'
}
```

### Project 4: Consensus Layer Integration (client-integration)

**4 roadmap items (Phases 0-3):**

```typescript
{
  id: 'cl-integration-phase-0',
  title: 'CL Integration: Phase 0 - Hoodi Dummy Proofs',
  description: 'Modified CL client receiving and verifying dummy proofs from subnets. Dora dashboard tracking execution proofs.',
  category: 'client-integration',
  status: 'in-progress',
  dependencies: [],
  applicableType: 'consensus'
}

{
  id: 'cl-integration-phase-1',
  title: 'CL Integration: Phase 1 - Single GPU Hoodi',
  description: 'Rent single GPU for devnet usage. Onboard operations teams to proof generation processes.',
  category: 'client-integration',
  status: 'not-started',
  dependencies: ['cl-integration-phase-0'],
  applicableType: 'consensus'
}

{
  id: 'cl-integration-phase-2',
  title: 'CL Integration: Phase 2 - BALs + ePBS Devnet',
  description: 'Integrate with Builder and ePBS systems. GPU monitoring and operationalization tools. 1-8 GPUs.',
  category: 'client-integration',
  status: 'not-started',
  dependencies: ['cl-integration-phase-1'],
  applicableType: 'consensus'
}

{
  id: 'cl-integration-phase-3',
  title: 'CL Integration: Phase 3 - Network at Scale',
  description: 'Official zkEVM mainnet deployment with BALs and ePBS. Finalize GPU infrastructure. 1-16 GPUs.',
  category: 'client-integration',
  status: 'not-started',
  dependencies: ['cl-integration-phase-2'],
  applicableType: 'consensus'
}
```

### Project 5: Prover Infrastructure (real-time-proving)

**Multiple roadmap items for key deliverables:**

```typescript
{
  id: 'prover-infra-ethproofs',
  title: 'Integrate zkVMs into Ethproofs',
  description: 'Integrate all production zkVMs into Ethproofs infrastructure',
  category: 'real-time-proving',
  status: 'in-progress',
  applicableType: 'infrastructure'
}

{
  id: 'prover-infra-gpu-opensource',
  title: 'GPU Implementations Open Source',
  description: 'Ensure GPU implementations are open-source and accessible',
  category: 'real-time-proving',
  status: 'not-started',
  applicableType: 'infrastructure'
}

{
  id: 'prover-infra-zkboost',
  title: 'zkboost Integration',
  description: 'Test zkboost with single and multiple GPUs. Establish reliability metrics.',
  category: 'real-time-proving',
  status: 'not-started',
  applicableType: 'infrastructure'
}

{
  id: 'prover-infra-attester-verification',
  title: 'Enable Attester Verification',
  description: 'Enable attesters to verify zkEVM proofs during validation',
  category: 'real-time-proving',
  status: 'not-started',
  applicableType: 'infrastructure'
}
```

### Project 6: Benchmarking & Metrics (real-time-proving)

```typescript
{
  id: 'benchmarking-guest-programs',
  title: 'Benchmark Guest Programs',
  description: 'Benchmark guest programs against zkVMs for performance analysis',
  category: 'real-time-proving',
  status: 'in-progress',
  applicableType: 'infrastructure'
}

{
  id: 'benchmarking-opcode-repricing',
  title: 'Opcode Repricing Projections',
  description: 'Document opcode repricing projections for zkEVM integration',
  category: 'real-time-proving',
  status: 'not-started',
  applicableType: 'infrastructure'
}

{
  id: 'benchmarking-hardware-requirements',
  title: 'Prover Hardware Requirements',
  description: 'Document prover hardware requirements and EIP-7870 verification time benchmarks',
  category: 'real-time-proving',
  status: 'not-started',
  applicableType: 'infrastructure'
}

{
  id: 'benchmarking-pandaops',
  title: 'Integrate into pandaOps Lab',
  description: 'Integrate metrics into pandaOps lab infrastructure',
  category: 'real-time-proving',
  status: 'not-started',
  applicableType: 'infrastructure'
}
```

### Project 8: ePBS (real-time-proving)

```typescript
{
  id: 'epbs-deployment',
  title: 'ePBS Deployment',
  description: 'Deploy enshrined Proposer-Builder Separation to increase proof generation time from 1-2s to 6-9s',
  category: 'real-time-proving',
  status: 'not-started',
  targetDate: 'Q3 2026',
  applicableType: 'consensus'
}
```

### Project 3: zkVM-guest API Standardization (testing-validation)

```typescript
{
  id: 'api-standardization-targets',
  title: 'Standardized Target List',
  description: 'Define and standardize compilation targets for zkVM guest programs',
  category: 'testing-validation',
  status: 'in-progress',
  applicableType: 'both'
}

{
  id: 'api-standardization-precompiles',
  title: 'Precompile Access Interfaces',
  description: 'Standardize precompile access interfaces between zkVM and guest programs',
  category: 'testing-validation',
  status: 'not-started',
  applicableType: 'both'
}

{
  id: 'api-standardization-io',
  title: 'I/O Access Standardization',
  description: 'Standardize input/output access patterns for zkVM guest programs',
  category: 'testing-validation',
  status: 'not-started',
  applicableType: 'both'
}

{
  id: 'api-standardization-assumptions',
  title: 'Codified Assumptions',
  description: 'Document and codify assumptions: alignment, memory layout, trap semantics',
  category: 'testing-validation',
  status: 'not-started',
  applicableType: 'both'
}
```

### Project 7: Security (security)

```typescript
{
  id: 'security-onboarding-docs',
  title: 'Prover/Guest Program Onboarding',
  description: 'Create onboarding documentation for prover and guest program teams',
  category: 'security',
  status: 'not-started',
  applicableType: 'infrastructure'
}

{
  id: 'security-specifications',
  title: 'Component Specifications',
  description: 'Establish specification formats and component guarantees',
  category: 'security',
  status: 'not-started',
  applicableType: 'infrastructure'
}

{
  id: 'security-formal-verification',
  title: 'Formal Verification Tracker',
  description: 'Identify formal verification minimums and track progress',
  category: 'security',
  status: 'not-started',
  applicableType: 'infrastructure'
}

{
  id: 'security-threat-modeling',
  title: 'Threat Modeling Documentation',
  description: 'Establish security/adversary model and threat modeling documentation',
  category: 'security',
  status: 'not-started',
  applicableType: 'infrastructure'
}

{
  id: 'security-testing',
  title: 'Differential Testing & Fuzzing',
  description: 'Implement differential testing and fuzzing plans across components',
  category: 'security',
  status: 'not-started',
  applicableType: 'infrastructure'
}

{
  id: 'security-soundcalc',
  title: 'Soundcalc Registry',
  description: 'Ensure all proving systems are listed in soundcalc registry',
  category: 'security',
  status: 'not-started',
  applicableType: 'infrastructure'
}
```

## Sample Guest Program Data

```typescript
guestPrograms: [
  {
    id: 'reth-guest',
    name: 'Reth Guest Program',
    description: 'Stateless validation program for Ethereum block execution',
    language: 'Rust',
    repository: 'https://github.com/paradigmxyz/reth',
    maintainer: 'Paradigm',
    milestoneStatuses: {
      'guest-program-phase-0': 'complete',
      'guest-program-phase-1': 'in-progress',
      'guest-program-phase-2': 'not-started',
      'guest-program-phase-3': 'not-started',
      'guest-program-phase-4': 'not-started',
      'guest-program-phase-5': 'not-started'
    }
  },
  {
    id: 'geth-guest',
    name: 'Geth Guest Program',
    description: 'Stateless validation program for Ethereum block execution',
    language: 'Go',
    repository: 'https://github.com/ethereum/go-ethereum',
    maintainer: 'Ethereum Foundation',
    milestoneStatuses: {
      'guest-program-phase-0': 'in-progress',
      'guest-program-phase-1': 'not-started',
      'guest-program-phase-2': 'not-started',
      'guest-program-phase-3': 'not-started',
      'guest-program-phase-4': 'not-started',
      'guest-program-phase-5': 'not-started'
    }
  },
  // Additional guest programs: nethermind-guest, besu-guest, erigon-guest, ethrex-guest
]
```

## Progress Tracking & Display

### RoadmapView Updates

Extend `calculateRoadmapProgress` to handle new applicableType values:

```typescript
case 'guest-program':
  applicableItems = guestPrograms;
  label = 'guest programs';
  break;
case 'infrastructure':
  return null; // No progress bar, just status badge
  break;
```

### Guest Program Pages

Similar structure to zkVMs:
- Index page: `/guest-programs`
- Individual pages: `/guest-programs/reth-guest`
- Grid view showing phase progression
- Progress bars: "2/6 phases complete (33%)"

### Category Display

Update category name in data:
```typescript
{
  id: 'security',  // renamed from 'economic-security'
  name: 'Security',
  description: 'Security audits, formal verification, and threat modeling',
  workstream: 3,
  // ...
}
```

## Migration Strategy

1. Add `GuestProgram` interface to types
2. Add `guestPrograms` array to `TrackData`
3. Add new `applicableType` values to type definitions
4. Remove `priority` field from `RoadmapItem` interface
5. Rename `economic-security` category to `security`
6. Add guest program milestone data
7. Add new roadmap items for all 8 projects
8. Update `RoadmapView` component to handle `guest-program` and `infrastructure`
9. Create guest program components (similar to zkVMs)
10. Create guest program pages

## Future Enhancements

- Fine-grained milestone tracking: separate milestones for zkVM-only vs guest-program-only in Project 3
- Guest program comparison table
- Cross-reference guest programs with their compilation targets
- Timeline visualization for phase progression
- Dependency graph visualization showing project interconnections

## Success Criteria

- All 8 projects mapped to categories
- Phase-based progression tracked via roadmap items with dependencies
- Guest programs tracked as entities with phase completion status
- Infrastructure items display without progress bars
- Category renamed from economic-security to security
- No priority field in roadmap items
- Timelines left undefined where not specified in planning docs

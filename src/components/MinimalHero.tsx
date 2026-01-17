export default function MinimalHero() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Ethereum ZK L1 Scaling
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Zero-knowledge proofs enable Ethereum to scale while preserving decentralization.
          This initiative brings zkEVMs to Layer 1, allowing validators to verify blocks
          efficiently through cryptographic proofs instead of re-executing all transactions.
        </p>

        {/* Simple architecture diagram placeholder */}
        <div className="mx-auto mb-12 max-w-2xl rounded-lg border bg-muted/30 p-8">
          <div className="flex items-center justify-center gap-4 text-sm font-medium">
            <div className="rounded-lg bg-blue-100 px-4 py-2 text-blue-900">
              Builders
            </div>
            <span className="text-muted-foreground">→</span>
            <div className="rounded-lg bg-green-100 px-4 py-2 text-green-900">
              Provers
            </div>
            <span className="text-muted-foreground">→</span>
            <div className="rounded-lg bg-purple-100 px-4 py-2 text-purple-900">
              Validators
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Builders create blocks, Provers generate cryptographic proofs, Validators verify proofs
          </p>
        </div>
      </div>
    </section>
  );
}
